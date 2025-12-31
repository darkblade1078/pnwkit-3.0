import NationsQuery from "./queries/nations.js";


export default class PnwKitApi
{
    public readonly nationsQuery: NationsQuery;

    constructor(protected readonly apiKey: string)
    {
        this.nationsQuery = new NationsQuery(this);
    }
}

