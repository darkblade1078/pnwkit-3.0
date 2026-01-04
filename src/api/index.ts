import Queries from "./queries/index.js";
import Utilities from "../utilities/index.js";

export default class PnwKitApi
{
    public readonly queries: Queries;
    public readonly utilities: Utilities

    constructor(protected readonly apiKey: string) 
    {
        this.queries = new Queries(this);
        this.utilities = new Utilities();
    }
}

