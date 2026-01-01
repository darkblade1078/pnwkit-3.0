import { NationsQuery } from "./queries/nations.js";
import { AlliancesQuery } from "./queries/alliances.js";


export default class PnwKitApi
{
    public readonly nationsQuery: NationsQuery;
    public readonly alliancesQuery: AlliancesQuery;

    constructor(protected readonly apiKey: string)
    {
        this.nationsQuery = new NationsQuery(this);
        this.alliancesQuery = new AlliancesQuery(this);
    }
}

