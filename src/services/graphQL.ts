class GraphQLService 
{
    private url = 'https://api.politicsandwar.com/graphql';
    private readonly MAX_QUERY_LENGTH = 50000;
    private readonly REQUEST_TIMEOUT = 30000; // 30 seconds

    public async queryCall(apiKey: string, query: string): Promise<any>
    {
        // Validate inputs
        if (!apiKey || typeof apiKey !== 'string')
            throw new Error('Invalid API key');
        
        if (!query || typeof query !== 'string')
            throw new Error('Invalid query');
        
        if (query.length > this.MAX_QUERY_LENGTH)
            throw new Error(`Query exceeds maximum length of ${this.MAX_QUERY_LENGTH} characters`);

        // Sanitize API key to prevent injection in URL
        const sanitizedApiKey = encodeURIComponent(apiKey);
        const url = `${this.url}?api_key=${sanitizedApiKey}`;

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if(result.errors)
            {
                const errorMessages = Array.isArray(result.errors) 
                    ? result.errors.map((e: { message: string }) => e.message).join(', ')
                    : 'Unknown GraphQL error';
                throw new Error(errorMessages);
            }

            return result.data;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error instanceof Error) {
                if (error.name === 'AbortError')
                    throw new Error(`Request timeout after ${this.REQUEST_TIMEOUT}ms`);
                throw error;
            }
            throw new Error('Unknown error occurred during GraphQL query');
        }
    }
} 

export default new GraphQLService();