/**
 * Abstract base class for building GraphQL queries with type safety
 * @category Internal
 * @internal
 * @template TFields - The type of fields available for selection
 * @template TQueryParams - The type of query parameters/filters
*/
abstract class QueryBuilder<
TFields = any, // Type of the main query fields
TQueryParams = any // Type of the query parameters
>
{
    protected limit?: number;   // max records to retrieve
    protected pageNum?: number; // page number for pagination
    protected apiKey!: string;  // API key for authentication
    protected subqueries: Map<string, readonly string[]> = new Map(); // subquery fields
    protected selectedFields: (keyof TFields)[] = []; // main query fields
    protected filters: TQueryParams = {} as TQueryParams; // query filters
    protected abstract queryName: string; // name of the query (e.g., 'nations')

    constructor() {}

    /**
     * Set the maximum number of records to retrieve
     * @param count - Number of records (max 500)
     * @returns This query instance for method chaining
    */
    first(count: number): this
    {
        this.limit = count <= 500 ? count : 500;
        return this;
    }

    /**
     * Set the page number for pagination
     * @param pageNumber - The page number to retrieve
     * @returns This query instance for method chaining
    */
    page(pageNumber: number): this
    {
        this.pageNum = pageNumber;
        return this;
    }

    /**
     * Sanitize and escape a string value for safe GraphQL usage
     * @param str - The string to sanitize
     * @returns Sanitized string with escaped special characters
     * @throws Error if string exceeds maximum length
    */
    protected sanitizeString(str: string): string
    {
        // Validate length
        this.validateInputLength(str);

        // Escape special characters
        return str
            .replace(/\\/g, '\\\\')  // Escape backslashes
            .replace(/"/g, '\\"')     // Escape quotes
            .replace(/\n/g, '\\n')    // Escape newlines
            .replace(/\r/g, '\\r')    // Escape carriage returns
            .replace(/\t/g, '\\t');   // Escape tabs
    }

    /**
     * Serialize an object to GraphQL format (enum values without quotes)
     * @param obj - Object to serialize
     * @returns GraphQL-formatted object string
     * @throws Error if object is null/undefined or contains invalid field names
    */
    protected serializeObject(obj: Record<string, any>): string
    {
        if (obj === null || obj === undefined)
            throw new Error('Cannot serialize null or undefined object');

        const pairs = Object.entries(obj)
        .filter(([_, val]) => val !== null && val !== undefined)
        .map(([key, val]) => {
            // Validate key format (GraphQL field names)
            if (!/^[_A-Za-z][_0-9A-Za-z]*$/.test(key))
                throw new Error(`Invalid GraphQL field name: ${key}`);
            
            // Handle different value types
            let serializedValue: string;
            if (typeof val === 'string') {
                // Keep strings as enum values (no quotes for orderBy column/order)
                serializedValue = val;
            } else if (typeof val === 'number' || typeof val === 'boolean') {
                serializedValue = String(val);
            } else {
                throw new Error(`Unsupported value type in GraphQL object: ${typeof val}`);
            }
            
            return `${key}:${serializedValue}`;
        });
        
        return `{${pairs.join(',')}}`;
    }

    /**
     * Build the final GraphQL query string
     * @param includePaginator - Whether to include pagination info in response
     * @returns Complete GraphQL query string
     * @throws Error if field names are too long or filters contain invalid values
    */
    protected buildQuery(includePaginator: boolean): string
    {
        // Build the fields string including subqueries
        const mainFields = this.selectedFields
        .filter((f: keyof TFields) => !this.subqueries.has(f as string))
        .join('\n                        ');

        // Build subquery strings
        const subqueryStrings: string[] = [];

        // Add subqueries
        this.subqueries
        .forEach((fields, relation) => {
            const fieldList = fields.join('\n                            ');
            subqueryStrings.push(`
                ${relation} {
                    ${fieldList}
                }`);
        });

        // Combine main fields and subqueries
        const allFields = [mainFields, ...subqueryStrings]
        .filter(s => s.length > 0).join('\n                        ');

        const variables: string[] = [];

        // Add pagination variables
        if (this.limit)
            variables.push(`first: ${this.limit}`);

        // Add page variable
        if (this.pageNum)
            variables.push(`page: ${this.pageNum}`);

        // Validate field names length
        this.selectedFields.forEach(f => {
            const fieldName = String(f);
            if (fieldName.length > 100)
                throw new Error(`Field name too long: ${fieldName.substring(0, 50)}...`);
        });

        // Add filters to prevent injections and other forms of abuse
        Object.entries(this.filters as Record<string, any>)
        .filter(([_, value]) => value !== null && value !== undefined)
        .forEach(([key, value]) => 
        {
            if (Array.isArray(value))
            {
                // Serialize array values
                const formatted = value.map(v => {
                    if (typeof v === 'string')
                        return `"${this.sanitizeString(v)}"`;
                    else if (typeof v === 'object' && v !== null)
                        return this.serializeObject(v);
                    else if (typeof v === 'number' || typeof v === 'boolean')
                        return String(v);
                    else
                        throw new Error(`Unsupported array value type: ${typeof v}`);
                }).join(', ');

                variables.push(`${key}: [${formatted}]`);
            }

            // Sanitize string values
            else if (typeof value === 'string')
                variables.push(`${key}: "${this.sanitizeString(value)}"`);

            // push number and boolean values directly
            else if (typeof value === 'number' || typeof value === 'boolean')
                variables.push(`${key}: ${value}`);
            
            else
                throw new Error(`Unsupported filter value type for ${key}: ${typeof value}`);
        });

        // Construct variable string
        const varString = variables.length > 0 ? `(${variables.join(', ')})` : '';

        // Construct paginator fields if needed
        const paginatorFields = includePaginator ? `
            paginatorInfo {
                count
                currentPage
                firstItem
                hasMorePages
                lastItem
                lastPage
                perPage
                total
            }
        ` : '';


        // return the final query string
        return `
            query {
                ${this.queryName}${varString} {
                    data {
                        ${allFields}
                    }${paginatorFields}
                }
            }
        `.trim();
    }

    /**
     * Validate input string length to prevent excessively large queries
     * @param str - String to validate
     * @param maxLength - Maximum allowed length (default: 10000)
     * @throws Error if string exceeds maximum length
    */
    protected validateInputLength(str: string, maxLength: number = 10000): void
    {
        if (str.length > maxLength)
            throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
    }
}

export default QueryBuilder;