class GraphQLService 
{
    private url = 'https://api.politicsandwar.com/graphql';

    public async queryCall(apiKey: string, query: string): Promise<any>
    {
        const url = `${this.url}?api_key=${apiKey}`;

        const repsonse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        const result = await repsonse.json();

        if(result.errors)
            throw new Error(result.errors.map((e: any) => e.message).join(', '));

        return result.data;
    }
} 

export default new GraphQLService();