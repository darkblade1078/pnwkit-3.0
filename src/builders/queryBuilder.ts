class QueryBuilder
{
    protected limit?: number;
    protected pageNum?: number;
    protected apiKey: string;
    protected subqueries: Map<string, readonly string[]> = new Map();

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    first(count: number): this
    {
        this.limit = count <= 500 ? count : 500;
        return this;
    }

    page(pageNumber: number): this
    {
        this.pageNum = pageNumber;
        return this;
    }
}

export default QueryBuilder;