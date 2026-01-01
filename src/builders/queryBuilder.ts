import type { GetRelationsFor, GetQueryParamsFor } from "../types/relationMappings.js";

/**
 * Configuration for a subquery - accepts only a builder function.
 * 
 * The builder function receives a SubqueryBuilder with full type inference for the relation's fields,
 * relations, and query parameters. Nested includes within the builder only accept field arrays.
 * 
 * @template TFields - The fields type of the relation being included
 * @template TRelations - The relations type of the relation (auto-resolved via GetRelationsFor)
 * @template TQueryParams - The query params type of the relation (auto-resolved via GetQueryParamsFor)
 * 
 * @example
 * ```typescript
 * // Builder function format (with nested support and typed where)
 * SubqueryConfig<AllianceFields, AllianceRelations, AllianceQueryParams> = 
 *   builder => builder
 *     .select('id', 'name')
 *     .where({ id: [1234], min_score: 1000 })  // Fully typed!
 *     .include('nations', ['id', 'nation_name'])
 * ```
*/
export type SubqueryConfig<TFields, TRelations = GetRelationsFor<TFields>, TQueryParams = GetQueryParamsFor<TFields>> = 
    (builder: SubqueryBuilder<TFields, TRelations, {}, TQueryParams>) => SubqueryBuilder<TFields, TRelations, any, TQueryParams>;

/**
 * Builder for configuring nested subquery fields and relations
 * 
 * Provides type-safe field selection, filtering, and relation inclusion for subqueries.
 * This builder is used for the first level of nesting. Any relations included
 * within this builder only accept field arrays (no further builder functions).
 * 
 * @template TFields - The fields available for selection in this subquery
 * @template TRelations - The relations available for inclusion in this subquery
 * @template TIncluded - Accumulator type for tracking included relations
 * @template TQueryParams - The query parameters available for filtering this subquery
 * 
 * @example
 * ```typescript
 * // Used within an include() call
 * .include('alliance', builder => builder
 *   .select('id', 'name', 'score')  // Type-safe: only AllianceFields allowed
 *   .where({ id: [1234] })  // Type-safe: only AllianceQueryParams allowed
 *   .include('nations', ['id', 'nation_name'])  // Type-safe: only field arrays
 * )
 * ```
*/
export class SubqueryBuilder<TFields, TRelations = {}, TIncluded extends Record<string, any> = {}, TQueryParams = Record<string, any>>
{
    private fields: (keyof TFields)[] = [];
    private nestedSubqueries: Map<string, SubqueryConfig<any>> = new Map();
    private filters: Partial<TQueryParams> = {};

    /**
     * Select fields from the subquery
    */
    select<const F extends readonly (keyof TFields)[]>(
        ...fields: F
    ): SubqueryBuilder<TFields, TRelations, TIncluded, TQueryParams>
    {
        this.fields = [...new Set(fields)] as any;
        return this;
    }

    /**
     * Apply filters to the subquery
     * @param filters - Filter parameters for the subquery (fully typed based on the entity)
     * @returns This builder instance for method chaining
     * @example
     * ```typescript
     * // When including an alliance, filters are typed as AllianceQueryParams
     * builder
     *   .select('id', 'name')
     *   .where({ id: [1234], min_score: 1000 })  // TypeScript will validate these!
     * ```
    */
    where(filters: Partial<TQueryParams>): SubqueryBuilder<TFields, TRelations, TIncluded, TQueryParams>
    {
        this.filters = { ...this.filters, ...filters };
        return this;
    }

    /**
     * Include nested relations with full builder support and type inference
     * 
     * Supports unlimited nesting depth - each nested builder receives full type inference
     * for its fields, relations, and query parameters.
     * 
     * @param relation - The relation name to include (must be a key of TRelations)
     * @param config - A builder function for configuring the nested subquery
     * @returns This builder instance for method chaining
     * 
     * @example
     * ```typescript
     * builder
     *   .select('id', 'name')
     *   .include('nations', builder2 => builder2  // builder2 is fully typed!
     *     .select('id', 'nation_name', 'score')
     *     .where({ min_score: 1000 })  // TypeScript validates NationQueryParams
     *     .include('cities', builder3 => builder3  // builder3 is fully typed!
     *       .select('id', 'name', 'infrastructure')
     *     )
     *   )
     * ```
    */
    include<K extends keyof TRelations>(
        relation: K,
        config: SubqueryConfig<TRelations[K], GetRelationsFor<TRelations[K]>, GetQueryParamsFor<TRelations[K]>>
    ): SubqueryBuilder<TFields, TRelations, TIncluded & Record<K, any>, TQueryParams>
    {
        this.nestedSubqueries.set(relation as string, config as SubqueryConfig<any>);
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
     * Get nested subqueries (returns builder configs)
    */
    getNestedSubqueries(): Map<string, SubqueryConfig<any>>
    {
        return this.nestedSubqueries;
    }

    /**
     * @internal
     * Get the filters for this subquery
    */
    getFilters(): Partial<TQueryParams>
    {
        return this.filters;
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
     * Build subquery configuration into structured data
     * @param config - A builder function for configuring the subquery
     * @returns Object containing scalar fields, nested relations, and filter parameters
     * @internal
    */
    protected buildSubqueryString(config: SubqueryConfig<any>): { 
        scalar: string[]; 
        nested: Array<{ relation: string; config: SubqueryConfig<any> }>; 
        params: Record<string, any> 
    }
    {
        if(typeof config !== 'function')
            throw new Error('Invalid subquery config: expected function');

        const builder = new SubqueryBuilder<any>();
        const configuredBuilder = config(builder);
        
        const fields = configuredBuilder.getFields();
        const nestedQueries = configuredBuilder.getNestedSubqueries();
        const filters = configuredBuilder.getFilters();

        // Get scalar fields (non-relation fields)
        const scalarFieldsArray = fields.filter(f => !nestedQueries.has(f as string)).map(f => String(f));

        // Build nested relation objects (recursively process nested builders)
        const nestedRelations: Array<{ relation: string; config: SubqueryConfig<any> }> = [];
        nestedQueries.forEach((nestedConfig, relation) => {
            nestedRelations.push({ 
                relation: String(relation), 
                config: nestedConfig
            });
        });

        return { 
            scalar: scalarFieldsArray,
            nested: nestedRelations,
            params: filters 
        };
    }

    /**
     * Serialize filter value for GraphQL query
     * @param value - The filter value to serialize
     * @returns Serialized string representation
     * @internal
    */
    protected serializeFilterValue(value: any): string
    {
        if (Array.isArray(value)) {
            const formatted = value.map(v => {
                if (typeof v === 'string')
                    return `"${this.sanitizeString(v)}"`;
                if (typeof v === 'object' && v !== null)
                    return this.serializeObject(v);
                if (typeof v === 'number' || typeof v === 'boolean')
                    return String(v);
                throw new Error(`Unsupported array value type: ${typeof v}`);
            }).join(', ');
            return `[${formatted}]`;
        }
        if (typeof value === 'string')
            return `"${this.sanitizeString(value)}"`;
        if (typeof value === 'number' || typeof value === 'boolean')
            return String(value);
        throw new Error(`Unsupported filter value type: ${typeof value}`);
    }

    /**
     * Recursively build subquery fields with proper indentation
     * @param config - The subquery configuration
     * @param baseIndent - Base indentation level
     * @returns Object with paramString and fieldList
     * @internal
    */
    protected buildSubqueryFields(config: SubqueryConfig<any>, baseIndent: number): { paramString: string; fieldList: string }
    {
        const { scalar, nested, params } = this.buildSubqueryString(config);
        
        // Build parameter string
        const paramString = Object.keys(params).length > 0
            ? `(${Object.entries(params)
                .filter(([_, value]) => value !== null && value !== undefined)
                .map(([key, value]) => `${key}: ${this.serializeFilterValue(value)}`)
                .join(', ')})`
            : '';
        
        const indent = '    '.repeat(baseIndent);
        const fieldLines: string[] = [];
        
        // Add scalar fields
        scalar.forEach((field: string) => {
            fieldLines.push(`${indent}    ${field}`);
        });
        
        // Add nested relations (recursively)
        nested.forEach(({ relation: nestedRel, config: nestedConfig }: { relation: string; config: SubqueryConfig<any> }) => {
            const nestedResult = this.buildSubqueryFields(nestedConfig, baseIndent + 1);
            fieldLines.push(`${indent}    ${nestedRel}${nestedResult.paramString} {`);
            fieldLines.push(nestedResult.fieldList);
            fieldLines.push(`${indent}    }`);
        });
        
        return { paramString, fieldList: fieldLines.join('\n') };
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

        this.subqueries.forEach((config, relation) => {
            const result = this.buildSubqueryFields(config, 5);
            subqueryStrings.push(`
                ${relation}${result.paramString} {
                    ${result.fieldList}
                }
            `);
        });

        const allFields = [mainFields, ...subqueryStrings]
            .filter(s => s.length > 0)
            .join('\n                        ');

        const variables: string[] = [];

        // Add pagination variables
        if (this.limit) variables.push(`first: ${this.limit}`);
        if (this.pageNum) variables.push(`page: ${this.pageNum}`);

        // Validate field names length
        this.selectedFields.forEach(f => {
            const fieldName = String(f);
            if (fieldName.length > 100)
                throw new Error(`Field name too long: ${fieldName.substring(0, 50)}...`);
        });

        // Add main query filters
        Object.entries(this.filters as Record<string, any>)
            .filter(([_, value]) => value !== null && value !== undefined)
            .forEach(([key, value]) => {
                variables.push(`${key}: ${this.serializeFilterValue(value)}`);
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

        // Return the final query string
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