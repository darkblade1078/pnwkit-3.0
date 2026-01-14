import * as Pusher from 'pusher-js';
import CRC32 from 'crc-32';
import type { EventTime, SubscriptionParams, subscriptionData } from '../../types/subscriptions/other.js';

export default class Subscriptions
{
    private pusher;
    private channel: Pusher.Channel | null = null;
    private subData: subscriptionData | null = null;
    private lastEventTime: EventTime | null = null;
    private lastCrc32: number | null = null;
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
    }

    public async subscribe(data: subscriptionData): Promise<void>
    {
        const { model, event, callback, params, bulk } = data;

        const paramString = params ? this.buildParams(params) : "";

        let response;

        try
        {
            response = await fetch(`${this.baseEndpoint}/${model}/${event}?api_key=${this.apiKey}&${paramString}&metadata=true`, {
                method: 'GET'
            });
        }
        catch (error)
        {
            throw new Error(`Network error during subscription: ${(error as Error).message}`);
        }

        if(!this.subData)
            this.subData = data;

        const channelResult = await response.json();

        if(!response.ok)
            throw new Error(`Subscription error: ${channelResult.message || response.statusText}`);

        const channelName = channelResult.channel;

        this.channel = this.pusher.subscribe(channelName);

        if(!this.channel)
            throw new Error("Failed to subscribe to channel");

        this.channel?.bind(`${bulk ? 'BULK_' : ''}${model.toUpperCase()}_${event.toUpperCase()}`, callback);

        this.subscribeMetaData(model, event, bulk ? true : false);
        this.subscribeStateChange();
    }

    public async unsubscribe(): Promise<void>
    {
        if(!this.channel)
            throw new Error("No active subscription to unsubscribe from");

        this.pusher.unsubscribe(this.channel.name);
        this.channel = null;
        this.lastEventTime = null;
    }

    private async rollbackChannel(): Promise<any>
    {

        let response;

        try
        {
            response = await fetch(this.rollbackEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  
                    channel_name: this.channel?.name,
                    time: this.lastEventTime?.millis,
                    nanos: this.lastEventTime?.nanos
                }),
            });
        }
        catch(error)
        {
            throw new Error(`Network error during rollback: ${(error as Error).message}`);
        }


        if(response.status === 404 && this.subData)
        {
            this.subscribe(this.subData);
        }
        else if (!response.ok)
            throw new Error(`Rollback error: ${response.statusText}`);

        const data = await response.json();

        return data;
    }

    private async subscribeStateChange()
    {
        this.pusher.connection.bind('state_change', async (states: { previous: string, current: string }) => {

            console.log(`Pusher state changed: ${states.previous} -> ${states.current}`);
            
            switch(states.current)
            {
                case 'connected':
                {
                    console.log("Connected to subscription channel.");

                    if (
                        this.lastEventTime &&
                        typeof this.lastEventTime.millis !== "undefined" &&
                        typeof this.lastEventTime.nanos !== "undefined" &&
                        this.channel?.name
                    ) 
                    {
                        console.log("Attempting rollback with:", {
                            channel_name: this.channel.name,
                            time: this.lastEventTime.millis,
                            nanos: this.lastEventTime.nanos
                        });

                        await this.rollbackChannel();
                    }
                    break;
                }
            }
        });
    }

    private subscribeMetaData(model: string, event: string, bulk: boolean): void
    {
        if(!this.channel)
            throw new Error("No active subscription to retrieve metadata from");

        this.channel?.bind(`${bulk ? 'BULK_' : ''}${model.toUpperCase()}_${event.toUpperCase()}_METADATA`, (metadata: any) => {
            if 
            (
                metadata && 
                metadata.max && 
                typeof metadata.max.millis !== "undefined" && 
                typeof metadata.max.nanos !== "undefined" &&
                typeof metadata.crc32 !== "undefined"

            )
            {
                this.lastEventTime = metadata.max;
                this.lastCrc32 = metadata.crc32;
            }
        });
    }

    private buildParams(params: SubscriptionParams): string
    {
        const queryParams = new URLSearchParams();

        for(const key in params)
        {
            const value = params[key as keyof SubscriptionParams];

            if(value !== undefined)
                queryParams.append(key, value as string);
        }

        return queryParams.toString();
    }
}