import { NationsQuery } from "./api/index.js";

class Kit
{
    constructor(private apiKey: string, private botKey?: string)
    {
    }

    get nations() {
        return new NationsQuery(this.apiKey);
    }
}

export default Kit;