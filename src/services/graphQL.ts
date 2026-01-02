class GraphQLService 
{
    private url = 'https://api.politicsandwar.com/graphql';

    public async queryCall(apiKey: string, query: string): Promise<any>
    {
        const url = `${this.url}?api_key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        const result = await response.json();

        if(result.errors)
        {
            const errorMessages = Array.isArray(result.errors) 
                ? result.errors.map((e: { message: string }) => e.message).join(', ')
                : 'Unknown GraphQL error';
            throw new Error(errorMessages);
        }

        return result.data;
    }
} 

export default new GraphQLService();