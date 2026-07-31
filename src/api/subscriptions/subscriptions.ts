import type * as Pusher from "pusher-js";
import type { EventTime, Model, SubscribeOptions } from "../../types/subscriptions/other";

/**
 * Wiring the parent Subscriptions container provides to each subscription.
 * @internal
 */
export interface SubscriptionDeps {
    /** The shared Pusher client (used to release the channel). */
    pusher: { unsubscribe(name: string): void };
    /** POST endpoint used to replay events missed while disconnected. */
    rollbackEndpoint: string;
    /**
     * Re-runs the HTTP subscribe flow and returns a fresh Pusher channel.
     * Pass `resumeFrom` to resume the stream after that event time (replays the
     * gap when re-subscribing to an expired channel).
     */
    subscribeChannel: (resumeFrom?: EventTime | null) => Promise<Pusher.Channel>;
    /** Called on teardown so the container can drop this subscription. */
    onClose: () => void;
}

/**
 * A single active subscription, returned by `Subscriptions.subscribe()`.
 *
 * Each instance owns its own Pusher channel and tracks its own event time, so it
 * can be torn down and rolled back independently of every other subscription.
 *
 * @template M - The subscribed model (drives the typed payload)
 * @template B - Whether this is a bulk subscription
 * @category Subscriptions
 */
export default class Subscription<M extends Model, B extends boolean = false>
{
    private lastEventTime: EventTime | null = null;
    private closed = false;
    private readonly eventName: string;

    /** @internal */
    constructor(
        private channel: Pusher.Channel,
        private readonly options: SubscribeOptions<M, B>,
        private readonly deps: SubscriptionDeps,
    )
    {
        const { model, event, bulk } = options;
        this.eventName = `${bulk ? "BULK_" : ""}${model.toUpperCase()}_${event.toUpperCase()}`;
        this.bind();
    }

    /** Bind the data + metadata events on the current channel. */
    private bind(): void
    {
        // Data event: parse the JSON payload, hand a typed object (or array for
        // bulk) to the caller.
        this.channel.bind(this.eventName, (raw: unknown) => {
            try
            {
                const data: any = typeof raw === "string" ? JSON.parse(raw) : raw;
                this.options.onData(data);
            }
            catch (error)
            {
                this.options.onError?.(error instanceof Error ? error : new Error(String(error)));
            }
        });

        // Metadata event: remember the newest event time so we can roll back
        // reliably after a reconnect.
        this.channel.bind(`${this.eventName}_METADATA`, (metadata: any) => {
            if (metadata?.max
                && typeof metadata.max.millis !== "undefined"
                && typeof metadata.max.nanos !== "undefined")
            {
                this.lastEventTime = metadata.max;
            }
        });
    }

    /**
     * Replay events missed while disconnected. Called by the container when the
     * websocket reconnects. No-op if closed or nothing has been seen yet.
     * @internal
     */
    public async rollback(): Promise<void>
    {
        if (this.closed || !this.lastEventTime)
            return;

        let response: Response;
        try
        {
            response = await fetch(this.deps.rollbackEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    channel_name: this.channel.name,
                    time: this.lastEventTime.millis,
                    nanos: this.lastEventTime.nanos,
                }),
            });
        }
        catch (error)
        {
            this.options.onError?.(new Error(`Network error during rollback: ${(error as Error).message}`));
            return;
        }

        // 404 = channel expired; re-establish a fresh one.
        if (response.status === 404)
        {
            await this.resubscribe();
            return;
        }

        if (!response.ok)
            this.options.onError?.(new Error(`Rollback error: ${response.statusText}`));
    }

    /** Tear down the stale channel and rebind this subscription on a fresh one. */
    private async resubscribe(): Promise<void>
    {
        if (this.closed)
            return;

        this.channel.unbind_all();
        // Resume from the last event we saw so events missed while the channel
        // was gone are replayed, not dropped.
        this.channel = await this.deps.subscribeChannel(this.lastEventTime);
        this.bind();
    }

    /** Stop this subscription and release its channel. */
    public unsubscribe(): void
    {
        if (this.closed)
            return;

        this.closed = true;
        this.channel.unbind_all();
        this.deps.pusher.unsubscribe(this.channel.name);
        this.deps.onClose();
    }

    /** The underlying Pusher channel name. @internal */
    public get channelName(): string
    {
        return this.channel.name;
    }
}
