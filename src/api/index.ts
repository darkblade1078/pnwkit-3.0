import NationsQuery from "./queries/nations.js";

export default class PnwKitApi
{
    private apiKey: string;
    private botKey?: string;

    constructor(apiKey: string, botKey?: string) {
        this.apiKey = apiKey;

        if(botKey)
            this.botKey = botKey;
    }

    nationsQuery() {
        return new NationsQuery(this.apiKey);
    }
}
