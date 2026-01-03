import type { GetRelationsFor, GetQueryParamsFor } from "../types/relationMappings.js";
import type { InferSubqueryType } from "../types/others.js";

/**
 * Configuration for a subquery that accepts a builder function with full type inference.
 * 
 * The builder function receives a SubqueryBuilder instance with complete type safety for:
 * - Fields available for selection (specific to the relation's entity type)
 * - Relations available for nesting (auto-resolved from field type)
 * - Query parameters for filtering (auto-resolved from field type)
 * 
 * Array types are automatically unwrapped before type resolution, so relations like
 * `nations: NationFields[]` are properly typed as individual `NationFields` entities.
 * 
 * @template TFields - The fields type of the relation (arrays are unwrapped automatically)
 * @template TRelations - The relations type (auto-resolved via GetRelationsFor)
 * @template TQueryParams - The query parameters type (auto-resolved via GetQueryParamsFor)
 * 
 * @example
 * ```typescript
 * // Builder with field selection and filtering
 * SubqueryConfig<AllianceFields> = builder => builder
 *   .select('id', 'name', 'score')
 *   .where({ id: [1234], min_score: 1000 })  // Fully typed as AllianceQueryParams!
 * 
 * // Builder with unlimited recursive nesting
 * SubqueryConfig<NationFields[]> = builder => builder  // Array automatically unwrapped
 *   .select('id', 'nation_name')
 *   .include('alliance', nested => nested
 *     .select('id', 'name')
 *     .include('nations', deeper => deeper  // Unlimited depth!
 *       .select('id', 'nation_name')
 *     )
 *   )
 * ```
*/
export type SubqueryConfig<TFields, TRelations = GetRelationsFor<TFields>, TQueryParams = GetQueryParamsFor<TFields>> = 
    (builder: SubqueryBuilder<TFields extends any[] ? TFields[number] : TFields, [], TRelations, {}, TQueryParams>) => SubqueryBuilder<TFields extends any[] ? TFields[number] : TFields, any, TRelations, any, TQueryParams>;

/**
 * Builder for configuring nested subqueries with full type inference at all nesting levels.
 * 
 * Provides type-safe field selection, filtering, and unlimited recursive relation nesting.
 * The generic type parameters track state through method chaining:
 * - TSelected accumulates selected fields for precise autocomplete
 * - TIncluded accumulates included relations with proper cardinality (singular vs array)
 * 
 * Cardinality is automatically detected from the relation type:
 * - `alliance: AllianceFields` → returns singular object
 * - `nations: NationFields[]` → returns array of objects
 * 
 * @template TFields - The fields available for selection (entity-specific)
 * @template TSelected - Currently selected fields (tracks state for return type)
 * @template TRelations - The relations available for inclusion (entity-specific)
 * @template TIncluded - Included relations (tracks state for return type)
 * @template TQueryParams - The query parameters available for filtering (entity-specific)
 * 
 * @example
 * ```typescript
 * // Field selection with type tracking
 * .include('alliance', builder => builder
 *   .select('id', 'name')  // TSelected = ['id', 'name']
 * )  // Returns: { id: number, name: string }
 * 
 * // Singular vs array cardinality
 * .include('alliance', b => b.select('id'))  // Returns: { id: number }
 * .include('nations', b => b.select('id'))   // Returns: { id: number }[]
 * 
 * // Unlimited nesting with filtering
 * .include('alliance', builder => builder
 *   .select('id', 'name')
 *   .where({ id: [1234] })  // Typed as AllianceQueryParams
 *   .include('nations', nested => nested  // Fully typed!
 *     .select('id', 'nation_name')
 *     .where({ min_score: 1000 })  // Typed as NationQueryParams
 *   )
 * )
 * ```
*/
export class SubqueryBuilder<
    TFields, 
    TSelected extends readonly (keyof TFields)[] = [],
    TRelations = {}, 
    TIncluded extends Record<string, any> = {}, 
    TQueryParams = Record<string, any>
>
{
    // Type brand properties for inference (not used at runtime)
    declare _fields: TFields;
    declare _selected: TSelected;
    declare _included: TIncluded;
    
    private fields: (keyof TFields)[] = [];
    private nestedSubqueries: Map<string, SubqueryConfig<any>> = new Map();
    private filters: Partial<TQueryParams> = {};

    /**
     * Select fields from the subquery
    */
    select<const F extends readonly (keyof TFields)[]>(
        ...fields: F
    ): SubqueryBuilder<TFields, F, TRelations, TIncluded, TQueryParams>
    {
        this.fields = [...new Set(fields)] as any;
        return this as any;
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
    where(filters: Partial<TQueryParams>): SubqueryBuilder<TFields, TSelected, TRelations, TIncluded, TQueryParams>
    {
        this.filters = { ...this.filters, ...filters };
        return this as any;
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
    include<
        K extends keyof TRelations,
        TConfig extends SubqueryConfig<TRelations[K], GetRelationsFor<TRelations[K]>, GetQueryParamsFor<TRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = TRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): SubqueryBuilder<TFields, TSelected, TRelations, TIncluded & Record<K, TWrappedResult>, TQueryParams>
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
 * Abstract base class for building type-safe GraphQL queries.
 * 
 * Provides core functionality for query construction including:
 * - Field selection with deduplication
 * - Filter parameter handling and serialization
 * - Pagination support (first/page)
 * - Recursive subquery building with unlimited nesting depth
 * - GraphQL string sanitization and validation
 * 
 * Subclasses (NationsQuery, AlliancesQuery, ApiKeyDetailsQuery) provide:
 * - Entity-specific type parameters
 * - Custom execute() methods (with/without pagination)
 * - Query name specification
 * 
 * Note: buildQuery() currently has a temporary fix for API key details query
 * which doesn't wrap results in a 'data' object (see line with 'me' check).
 * 
 * @category Query Builders
 * @template TFields - The type of fields available for selection on this entity
 * @template TQueryParams - The type of query parameters/filters for this entity
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
    
    // Queries that don't wrap results in a 'data' object
    // Temporary fix for certain queries
    protected static readonly QUERIES_WITHOUT_DATA_WRAPPER = new Set(['me', 'treasures', 'colors']);

    constructor() {}

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

        const builder = new SubqueryBuilder<any, [], any, {}, any>();
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
        if (typeof value === 'object' && value !== null)
            return this.serializeObject(value);
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

        // Check if this query type wraps results in 'data' object
        const usesDataWrapper = !QueryBuilder.QUERIES_WITHOUT_DATA_WRAPPER.has(this.queryName);

        // Return the final query string
        return `
            query {
                ${this.queryName}${varString} {
                    ${usesDataWrapper ? 'data {' : ''}
                        ${allFields}
                    ${usesDataWrapper ? '}' : ''}
                    ${paginatorFields}
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