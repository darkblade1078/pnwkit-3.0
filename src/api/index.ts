import { Queries } from "./queries/index.js";

export default class PnwKitApi
{
    public readonly queries: Queries;

    constructor(protected readonly apiKey: string) 
    {
        this.queries = new Queries(this);
    }
}

