import type { GetRelationsFor } from "../types/relationMappings.js";

/**
 * Configuration for a subquery - can be either:
 * - An array of field names for simple field selection
 * - A builder function that configures nested fields with type support (first level only)
 * 
 * The builder function receives a SubqueryBuilder with full type inference for the relation's fields
 * and nested relations. Nested includes within the builder only accept field arrays.
 * 
 * @template TFields - The fields type of the relation being included
 * @template TRelations - The relations type of the relation (auto-resolved via GetRelationsFor)
 * 
 * @example
 * ```typescript
 * // Field array format
 * SubqueryConfig<CityFields> = ['id', 'name', 'infrastructure']
 * 
 * // Builder function format (with nested support)
 * SubqueryConfig<AllianceFields, AllianceRelations> = 
 *   builder => builder
 *     .select('id', 'name')
 *     .include('nations', ['id', 'nation_name'])
 * ```
*/
export type SubqueryConfig<TFields, TRelations = GetRelationsFor<TFields>> = 
    | readonly (keyof TFields)[]
    | ((builder: SubqueryBuilder<TFields, TRelations>) => SubqueryBuilder<TFields, TRelations, any>);

/**
 * Builder for configuring nested subquery fields and relations
 * 
 * Provides type-safe field selection and relation inclusion for subqueries.
 * This builder is used for the first level of nesting. Any relations included
 * within this builder only accept field arrays (no further builder functions).
 * 
 * @template TFields - The fields available for selection in this subquery
 * @template TRelations - The relations available for inclusion in this subquery
 * @template TIncluded - Accumulator type for tracking included relations
 * 
 * @example
 * ```typescript
 * // Used within an include() call
 * .include('alliance', builder => builder
 *   .select('id', 'name', 'score')  // Type-safe: only AllianceFields allowed
 *   .include('nations', ['id', 'nation_name'])  // Type-safe: only field arrays
 * )
 * ```
*/
export class SubqueryBuilder<TFields, TRelations = {}, TIncluded extends Record<string, any> = {}>
{
    private fields: (keyof TFields)[] = [];
    private nestedSubqueries: Map<string, readonly (keyof any)[]> = new Map();

    /**
     * Select fields from the subquery
    */
    select<const F extends readonly (keyof TFields)[]>(
        ...fields: F
    ): SubqueryBuilder<TFields, TRelations, TIncluded>
    {
        this.fields = [...new Set(fields)] as any;
        return this;
    }

    /**
     * Include nested relations (only accepts field arrays, not builder functions)
     * 
     * This is the second level of nesting - you can only specify fields to select,
     * not additional builder functions. This limits nesting to two levels total.
     * 
     * @param relation - The relation name to include (must be a key of TRelations)
     * @param fields - Array of fields to select from the relation
     * @returns This builder instance for method chaining
     * 
     * @example
     * ```typescript
     * builder
     *   .select('id', 'name')
     *   .include('nations', ['id', 'nation_name', 'score'])
     *   .include('tax_brackets', ['id', 'tax_rate'])
     * ```
    */
    include<
        K extends keyof TRelations,
        R extends readonly (keyof TRelations[K])[]
    >(
        relation: K,
        fields: R
    ): SubqueryBuilder<TFields, TRelations, TIncluded & Record<K, any>>
    {
        this.nestedSubqueries.set(relation as string, fields as readonly (keyof any)[]);
        return this as any;
    }

    /**
     * @internal
     * Get the selected fields
    */
    getFields(): (keyof TFields)[]
    {
        return this.fields;
    }

    /**
     * @internal
     * Get nested subqueries (returns field arrays only)
    */
    getNestedSubqueries(): Map<string, readonly (keyof any)[]>
    {
        return this.nestedSubqueries;
    }
}

/**
 * Abstract base class for building GraphQL queries with type safety
 * @category Internal
 * @internal
 * @template TFields - The type of fields available for selection
 * @template TQueryParams - The type of query parameters/filters
*/
export abstract class QueryBuilder<
TFields = any, // Type of the main query fields
TQueryParams = any // Type of the query parameters
>
{
    protected limit?: number;   // max records to retrieve
    protected pageNum?: number; // page number for pagination
    protected apiKey!: string;  // API key for authentication
    
    // Updated: Now supports both simple arrays and nested builders
    protected subqueries: Map<string, SubqueryConfig<any>> = new Map();
    
    protected selectedFields: (keyof TFields)[] = []; // main query fields
    protected filters: TQueryParams = {} as TQueryParams; // query filters
    protected abstract queryName: string; // name of the query (e.g., 'nations')

    constructor() {}

    /**
     * Set the maximum number of records to retrieve
     * @param count - Number of records (max 500)
     * @returns This query instance for method chaining
     * @example
     * ```typescript
     * .first(500) // Get up to 500 records
     * ```
    */
    first(count: number): this
    {
        this.limit = count <= 500 ? count : 500;
        return this;
    }

    /**
     * Set the page number for pagination
     * @param pageNumber - The page number to retrieve (1-based)
     * @returns This query instance for method chaining
     * @example
     * ```typescript
     * .page(2) // Get the second page of results
     * ```
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
        .map(([key, val]) => 
        {

            // Validate key format (GraphQL field names)
            if (!/^[_A-Za-z][_0-9A-Za-z]*$/.test(key))
                throw new Error(`Invalid GraphQL field name: ${key}`);
            
            // Handle different value types
            let serializedValue: string;
            if (typeof val === 'string')
                // Keep strings as enum values (no quotes for orderBy column/order)
                serializedValue = val;

            else if (typeof val === 'number' || typeof val === 'boolean')

                serializedValue = String(val);
            else
                throw new Error(`Unsupported value type in GraphQL object: ${typeof val}`);
            
            return `${key}:${serializedValue}`;
        });
        
        return `{${pairs.join(', ')}}`;
    }

    /**
     * Recursively build subquery string from config
     * @param config - Either an array of fields or a builder function
     * @param depth - Current nesting depth (for indentation)
     * @returns GraphQL string for the subquery fields
     * @internal
    */
    protected buildSubqueryString(config: SubqueryConfig<any>, depth: number = 0): string
    {
        const indent = '    '.repeat(depth + 6); // Base indentation
        const fieldIndent = '    '.repeat(depth + 7);

        // Simple field array
        if (Array.isArray(config))
            return config.join(`\n${fieldIndent}`);

        if(typeof config !== 'function')
            throw new Error('Invalid subquery config: expected function or array');

        // Builder function
        const builder = new SubqueryBuilder<any>();
        const configuredBuilder = config(builder);
        
        const fields = configuredBuilder.getFields();
        const nestedQueries = configuredBuilder.getNestedSubqueries();

        // Get scalar fields (non-relation fields)
        const scalarFields = fields
            .filter(f => !nestedQueries.has(f as string))
            .join(`\n${fieldIndent}`);

        // Build nested relation strings (these are always arrays at this level)
        const nestedStrings: string[] = [];
        nestedQueries.forEach((fieldArray, relation) => {
            const nestedFields = fieldArray.join(`\n${fieldIndent}    `);

            nestedStrings.push(`
${fieldIndent}${relation} {
${fieldIndent}    ${nestedFields}
${fieldIndent}}`
            );
        });

        // Combine scalar fields and nested relations
        return [scalarFields, ...nestedStrings]
            .filter(s => s.length > 0)
            .join(`\n${fieldIndent}`);
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

        // Build subquery strings (now supports nesting)
        const subqueryStrings: string[] = [];

        this.subqueries.forEach((config, relation) => {
            const fieldList = this.buildSubqueryString(config, 0);
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