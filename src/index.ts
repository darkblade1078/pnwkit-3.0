import PnwKitApi from "./api/index.js";

class Kit extends PnwKitApi
{
    constructor(apiKey: string, botKey?: string)
    {
        super(apiKey, botKey);
    }
}

export default Kit;