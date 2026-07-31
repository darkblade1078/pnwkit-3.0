import * as Pusher from 'pusher-js';
import type { EventTime, Model, SubscribeOptions, SubscriptionParams } from '../../types/subscriptions/other';
import Subscription, { type SubscriptionDeps } from './subscriptions';

/**
 * Manages real-time Politics & War subscriptions over a shared Pusher connection.
 *
 * Each `subscribe()` call returns an independent {@link Subscription} handle, so a
 * client can watch as many model/event streams as it likes and tear each down
 * individually. On reconnect, every active subscription replays missed events.
 *
 * @category Subscriptions
 */
export default class Subscriptions
{
    private pusher;
    private readonly active = new Set<Subscription<any, any>>();
    private readonly pusherKey: string = "a22734a47847a64386c8";
    private readonly wsHost: string = "socket.politicsandwar.com";
    private readonly authEndpoint: string = "https://api.politicsandwar.com/subscriptions/v1/auth";
    private readonly baseEndpoint: string = "https://api.politicsandwar.com/subscriptions/v1/subscribe";
    private readonly rollbackEndpoint: string = "https://api.politicsandwar.com/subscriptions/v1/rollback";
    private readonly cluster = "us2";

    constructor(private readonly apiKey: string)
    {
        this.pusher = new (Pusher as any).default(this.pusherKey, {
            cluster: this.cluster,
            wsHost: this.wsHost,
            disableStats: true,
            authEndpoint: this.authEndpoint,
            forceTLS: true,
        });

        // On reconnect, replay events missed by every active subscription.
        this.pusher.connection.bind('state_change', (states: { previous: string; current: string }) => {
            if (states.current === 'connected')
                for (const sub of this.active)
                    void sub.rollback();
        });
    }

    /**
     * Subscribe to a Politics & War event stream.
     *
     * @param options - Model, event, optional filters, and typed `onData` / `onError` handlers
     * @returns A {@link Subscription} handle; call `.unsubscribe()` to stop it
     *
     * @example
     * ```typescript
     * const sub = await pnwkit.subscriptions.subscribe({
     *   model: "nation",
     *   event: "update",
     *   filters: { alliance_id: "1234" },
     *   onData: (nation) => console.log(nation.id, nation.nation_name),
     * });
     *
     * // later
     * sub.unsubscribe();
     * ```
     */
    public async subscribe<M extends Model, B extends boolean = false>(
        options: SubscribeOptions<M, B>,
    ): Promise<Subscription<M, B>>
    {
        // Runs the HTTP subscribe handshake and returns a fresh Pusher channel.
        // Reused by the subscription itself when a channel expires (404 rollback).
        const subscribeChannel = async (resumeFrom?: EventTime | null): Promise<Pusher.Channel> => {
            const paramString = options.filters ? this.buildParams(options.filters) : "";
            // On an expired-channel rollback, resume from the last event seen so
            // the missed window is replayed instead of dropped.
            const resume = resumeFrom ? `&since=${resumeFrom.millis}&nanos=${resumeFrom.nanos}` : "";
            // Per-call key override falls back to the client's default key.
            const apiKey = options.apiKey ?? this.apiKey;

            let response: Response;
            try
            {
                response = await fetch(
                    `${this.baseEndpoint}/${options.model}/${options.event}?api_key=${apiKey}&${paramString}&metadata=true${resume}`,
                    { method: 'GET' },
                );
            }
            catch (error)
            {
                throw new Error(`Network error during subscription: ${(error as Error).message}`);
            }

            const result: any = await response.json();

            if (!response.ok)
                throw new Error(`Subscription error: ${result.message || response.statusText}`);

            const channel: Pusher.Channel = this.pusher.subscribe(result.channel);

            if (!channel)
                throw new Error("Failed to subscribe to channel");

            return channel;
        };

        const channel = await subscribeChannel();

        // eslint-disable-next-line prefer-const -- captured by the onClose closure below
        let subscription: Subscription<M, B>;

        const deps: SubscriptionDeps = {
            pusher: this.pusher,
            rollbackEndpoint: this.rollbackEndpoint,
            subscribeChannel,
            onClose: () => this.active.delete(subscription),
        };

        subscription = new Subscription<M, B>(channel, options, deps);
        this.active.add(subscription);
        return subscription;
    }

    /**
     * Stop every active subscription.
     */
    public unsubscribeAll(): void
    {
        for (const sub of [...this.active])
            sub.unsubscribe();
    }

    /**
     * Serialize subscription filters into a URL query string.
     * @internal
     */
    private buildParams(params: SubscriptionParams): string
    {
        const queryParams = new URLSearchParams();

        for (const key in params)
        {
            const value = params[key as keyof SubscriptionParams];
            if (value !== undefined)
                queryParams.append(key, value);
        }

        return queryParams.toString();
    }
}
