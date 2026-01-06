import type { GetRelationsFor, GetQueryParamsFor } from "../types/relationMappings.js";
import type { InferSubqueryType } from "../types/others.js";

/**
 * Unwraps array types to their element type, leaves non-arrays unchanged.
 * @example `NationFields[]` → `NationFields`, `AllianceFields` → `AllianceFields`
 */
type UnwrapArray<T> = T extends any[] ? T[number] : T;

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
export type SubqueryConfig<
    TFields,
    TRelations = GetRelationsFor<UnwrapArray<TFields>>,
    TQueryParams = GetQueryParamsFor<UnwrapArray<TFields>>
> = (builder: SubqueryBuilder<UnwrapArray<TFields>, [], {}>) => SubqueryBuilder<UnwrapArray<TFields>, any, any>;

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
    TIncluded extends Record<string, any> = {}
>
{
    private fields: (keyof TFields)[] = [];
    private nestedSubqueries: Map<string, SubqueryConfig<any>> = new Map();
    private filters: Partial<GetQueryParamsFor<TFields>> = {};

    /**
     * Select fields from the subquery
    */
    select<const F extends readonly (keyof TFields)[]>(
        ...fields: F
    ): SubqueryBuilder<TFields, F, TIncluded>
    {
        this.fields = [...new Set(fields)] as (keyof TFields)[];
        return this as SubqueryBuilder<TFields, F, TIncluded>;
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
    where(filters: Partial<GetQueryParamsFor<TFields>>): SubqueryBuilder<TFields, TSelected, TIncluded>
    {
        this.filters = { ...this.filters, ...filters };
        return this as SubqueryBuilder<TFields, TSelected, TIncluded>;
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
        K extends keyof GetRelationsFor<TFields>,
        TConfig extends SubqueryConfig<GetRelationsFor<TFields>[K]>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = GetRelationsFor<TFields>[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): SubqueryBuilder<TFields, TSelected, TIncluded & Record<K, TWrappedResult>>
    {
        this.nestedSubqueries.set(relation as string, config as SubqueryConfig<any>);
        return this as SubqueryBuilder<TFields, TSelected, TIncluded & Record<K, TWrappedResult>>;
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
    getFilters(): Partial<GetQueryParamsFor<TFields>>
    {
        return this.filters;
    }
}

/**
 * Abstract base class for building type-safe GraphQL queries.
 * 
 * Provides core functionality for query construction including:
 * - Field selection with deduplication and validation
 * - Filter parameter handling and serialization with security checks
 * - Pagination support (first/page)
 * - Recursive subquery building with configurable depth limits
 * - GraphQL string sanitization and escape sequence handling
 * - Input validation and protection against common attacks
 * 
 * Security Features:
 * - Maximum nesting depth limit (10 levels) to prevent stack overflow
 * - Field count limits (100 per level) to prevent resource exhaustion
 * - Query size limits (50KB) to prevent DoS attacks
 * - String length validation (10KB max) and null byte checking
 * - Prototype pollution prevention in object serialization
 * - Field name format validation to prevent injection attacks
 * - Enum value format validation
 * - Safe number handling (rejects NaN, Infinity)
 * - Array size limits (1000 elements max)
 * 
 * Subclasses (NationsQuery, AlliancesQuery, ApiKeyDetailsQuery) provide:
 * - Entity-specific type parameters
 * - Custom execute() methods (with/without pagination)
 * - Query name specification
 * 
 * Note: buildQuery() has special handling for queries that don't wrap
 * results in a 'data' object (me, treasures, colors).
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
    
    /**
     * Queries that return data directly without wrapping in a 'data' object.
     * These queries follow a different GraphQL schema structure.
     */
    protected static readonly QUERIES_WITHOUT_DATA_WRAPPER = new Set(['me', 'treasures', 'colors', 'game_info', 'top_trade_info']);
    
    // Security constants
    protected static readonly MAX_NESTING_DEPTH = 10;
    protected static readonly MAX_FIELDS_PER_LEVEL = 100;
    protected static readonly MAX_QUERY_SIZE = 50000;
    protected static readonly MAX_STRING_LENGTH = 10000;
    protected static readonly MAX_ARRAY_SIZE = 1000;
    protected static readonly MAX_FIELD_NAME_LENGTH = 100;
    
    // Formatting constants
    private static readonly INDENT_UNIT = '    ';
    private static readonly QUERY_BASE_INDENT = '                        ';
    
    // Compiled regex patterns (reused across calls)
    private static readonly GRAPHQL_FIELD_NAME_PATTERN = /^[_A-Za-z][_0-9A-Za-z]*$/;
    private static readonly ENUM_VALUE_PATTERN = /^[_A-Z][_0-9A-Z]*$/;

    constructor() {}

    /**
     * Sanitize and escape a string value for safe GraphQL usage.
     * 
     * Validates input type and length, checks for null bytes, and escapes
     * special characters including backslashes, quotes, newlines, carriage
     * returns, tabs, form feeds, and backspaces.
     * 
     * @param str - The string to sanitize
     * @returns Sanitized string with all special characters properly escaped
     * @throws Error if input is not a string, exceeds maximum length (10KB), or contains null bytes
    */
    protected sanitizeString(str: string): string
    {
        if (typeof str !== 'string')
            throw new Error('Input must be a string');

        if (str.length > QueryBuilder.MAX_STRING_LENGTH)
            throw new Error(`Input exceeds maximum length of ${QueryBuilder.MAX_STRING_LENGTH} characters`);

        if (str.includes('\0'))
            throw new Error('String contains null byte');

        // Escape special characters (backslashes first to avoid double-escaping)
        return str
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/\f/g, '\\f')
            .replace(/\b/g, '\\b');
    }

    /**
     * Serialize an object to GraphQL format (enum values without quotes).
     * 
     * Validates object structure and prevents prototype pollution by:
     * - Using own properties only (not inherited)
     * - Blocking dangerous keys (__proto__, constructor, prototype)
     * - Validating GraphQL field name format
     * - Validating enum value format (uppercase with underscores)
     * - Ensuring numbers are finite (rejecting NaN, Infinity)
     * 
     * @param obj - Plain object to serialize (not arrays)
     * @returns GraphQL-formatted object string in format {key:value, ...}
     * @throws Error if object is null/undefined/array, contains invalid field names, or has unsafe values
    */
    protected serializeObject(obj: Record<string, any>): string
    {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj))
            throw new Error('Input must be a plain object');

        const pairs: string[] = [];
        
        for (const key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
            
            const val = obj[key];
            if (val === null || val === undefined) continue;

            // Validate key format
            if (!QueryBuilder.GRAPHQL_FIELD_NAME_PATTERN.test(key))
                throw new Error(`Invalid GraphQL field name: ${key}`);

            if (key === '__proto__' || key === 'constructor' || key === 'prototype')
                throw new Error(`Forbidden field name: ${key}`);
            
            // Serialize value based on type
            let serializedValue: string;
            if (typeof val === 'string') {
                if (!QueryBuilder.ENUM_VALUE_PATTERN.test(val))
                    throw new Error(`Invalid enum value format: ${val}`);
                serializedValue = val;
            }
            else if (typeof val === 'number') {
                if (!Number.isFinite(val))
                    throw new Error(`Invalid number value: ${val}`);
                serializedValue = String(val);
            }
            else if (typeof val === 'boolean')
                serializedValue = String(val);
            else
                throw new Error(`Unsupported value type in GraphQL object: ${typeof val}`);
            
            pairs.push(`${key}:${serializedValue}`);
        }
        
        return `{${pairs.join(', ')}}`;
    }

    /**
     * Build subquery configuration into structured data.
     * 
     * Validates nesting depth and field count to prevent resource exhaustion.
     * Recursively processes nested builder configurations while tracking depth.
     * 
     * @param config - A builder function for configuring the subquery
     * @param depth - Current nesting depth (default: 0, max: 10)
     * @returns Object containing scalar fields, nested relations, and filter parameters
     * @throws Error if depth exceeds MAX_NESTING_DEPTH or field count exceeds MAX_FIELDS_PER_LEVEL
     * @internal
    */
    protected buildSubqueryString(
        config: SubqueryConfig<any>, 
        depth: number = 0
    ): 
    { 
        scalar: string[]; 
        nested: Array<{ relation: string; config: SubqueryConfig<any> }>; 
        params: Record<string, any> 
    }
    {
        if(typeof config !== 'function')
            throw new Error('Invalid subquery config: expected function');

        if (depth > QueryBuilder.MAX_NESTING_DEPTH)
            throw new Error(`Maximum nesting depth of ${QueryBuilder.MAX_NESTING_DEPTH} exceeded`);

        const builder = new SubqueryBuilder<any, [], {}>();
        const configuredBuilder = config(builder);
        
        const fields = configuredBuilder.getFields();
        const nestedQueries = configuredBuilder.getNestedSubqueries();
        const filters = configuredBuilder.getFilters();

        // Validate field count
        if (fields.length > QueryBuilder.MAX_FIELDS_PER_LEVEL)
            throw new Error(`Maximum ${QueryBuilder.MAX_FIELDS_PER_LEVEL} fields per level exceeded`);

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
     * Check if a string is a GraphQL enum value (uppercase with underscores)
     * @internal
    */
    private static isEnumValue(str: string): boolean
    {
        return QueryBuilder.ENUM_VALUE_PATTERN.test(str);
    }

    /**
     * Serialize a single value (non-array) for GraphQL
     * @internal
    */
    private serializeSingleValue(value: any): string
    {
        if (typeof value === 'string')
            return QueryBuilder.isEnumValue(value) ? value : `"${this.sanitizeString(value)}"`;
        
        if (typeof value === 'number') {
            if (!Number.isFinite(value))
                throw new Error(`Invalid number value: ${value}`);
            return String(value);
        }
        
        if (typeof value === 'boolean')
            return String(value);
        
        if (typeof value === 'object' && value !== null)
            return this.serializeObject(value);
        
        throw new Error(`Unsupported value type: ${typeof value}`);
    }

    /**
     * Serialize filter value for GraphQL query with validation.
     * 
     * Handles arrays (max 1000 elements), strings (sanitized), numbers (finite only),
     * booleans, and objects. Recursively processes nested structures.
     * 
     * @param value - The filter value to serialize (string, number, boolean, array, or object)
     * @returns Serialized string representation in GraphQL format
     * @throws Error if value is null/undefined, array exceeds 1000 elements, number is not finite, or type is unsupported
     * @internal
    */
    protected serializeFilterValue(value: any): string
    {
        if (value === null || value === undefined)
            throw new Error('Cannot serialize null or undefined value');

        if (Array.isArray(value)) {
            if (value.length > QueryBuilder.MAX_ARRAY_SIZE)
                throw new Error(`Array size exceeds maximum of ${QueryBuilder.MAX_ARRAY_SIZE} elements`);
            
            return `[${value.map(v => this.serializeSingleValue(v)).join(', ')}]`;
        }

        return this.serializeSingleValue(value);
    }

    /**
     * Recursively build subquery fields with proper indentation and depth tracking.
     * 
     * Processes scalar fields and nested relations, applying proper GraphQL formatting
     * and indentation. Validates depth at each level to prevent stack overflow.
     * 
     * @param config - The subquery configuration
     * @param baseIndent - Base indentation level (incremented for each nesting level)
     * @param depth - Current nesting depth (default: 0, max: 10)
     * @returns Object with paramString (query parameters) and fieldList (formatted fields)
     * @throws Error if nesting depth exceeds MAX_NESTING_DEPTH
     * @internal
    */
    protected buildSubqueryFields(
        config: SubqueryConfig<any>, 
        baseIndent: number, 
        depth: number = 0
    ): 
    { 
        paramString: string; 
        fieldList: string 
    }
    {
        if (depth > QueryBuilder.MAX_NESTING_DEPTH)
            throw new Error(`Maximum nesting depth of ${QueryBuilder.MAX_NESTING_DEPTH} exceeded`);

        const { scalar, nested, params } = this.buildSubqueryString(config, depth);
        
        // Build parameter string
        const paramEntries = Object.entries(params)
            .filter(([_, value]) => value !== null && value !== undefined)
            .map(([key, value]) => `${key}: ${this.serializeFilterValue(value)}`);
        
        const paramString = paramEntries.length > 0 ? `(${paramEntries.join(', ')})` : '';
        const indent = QueryBuilder.INDENT_UNIT.repeat(baseIndent);
        const childIndent = `${indent}${QueryBuilder.INDENT_UNIT}`;
        const fieldLines: string[] = [];
        
        // Add scalar fields
        for (const field of scalar) 
        {
            fieldLines.push(`${childIndent}${field}`);
        }
        
        // Add nested relations (recursively)
        for (const { relation, config: nestedConfig } of nested) 
        {
            const nestedResult = this.buildSubqueryFields(nestedConfig, baseIndent + 1, depth + 1);
            fieldLines.push(`${childIndent}${relation}${nestedResult.paramString} {`);
            fieldLines.push(nestedResult.fieldList);
            fieldLines.push(`${childIndent}}`);
        }
        
        return { paramString, fieldList: fieldLines.join('\n') };
    }

    /**
     * Build the final GraphQL query string with comprehensive validation.
     * 
     * Constructs a complete GraphQL query including:
     * - Main fields and subqueries with proper formatting
     * - Pagination variables (first, page)
     * - Filter parameters with type-safe serialization
     * - Optional paginator info fields
     * 
     * Validation includes:
     * - Field count limits (max 100 per level)
     * - Field name format and length validation (max 100 chars)
     * - Query size validation (max 50KB)
     * - All filter values properly sanitized and escaped
     * 
     * @param includePaginator - Whether to include pagination info in response
     * @returns Complete GraphQL query string ready for execution
     * @throws Error if field count/name/size limits exceeded or filters contain invalid values
    */
    protected buildQuery(includePaginator: boolean): string
    {
        // Validate field count and names
        if (this.selectedFields.length > QueryBuilder.MAX_FIELDS_PER_LEVEL)
            throw new Error(`Maximum ${QueryBuilder.MAX_FIELDS_PER_LEVEL} fields exceeded`);

        for (const f of this.selectedFields) 
        {
            const fieldName = String(f);

            if (fieldName.length > QueryBuilder.MAX_FIELD_NAME_LENGTH)
                throw new Error(`Field name too long: ${fieldName.substring(0, 50)}...`);
            
            if (!QueryBuilder.GRAPHQL_FIELD_NAME_PATTERN.test(fieldName))
                throw new Error(`Invalid field name format: ${fieldName}`);
        }

        // Separate scalar fields from subqueries
        const scalarFields = this.selectedFields
            .filter((f: keyof TFields) => !this.subqueries.has(f as string))
            .join(`\n${QueryBuilder.QUERY_BASE_INDENT}`);

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

        const allFields = [scalarFields, ...subqueryStrings]
            .filter(Boolean)
            .join(`\n${QueryBuilder.QUERY_BASE_INDENT}`);

        // Build query variables (pagination + filters)
        const variables: string[] = [];
        if (this.limit) variables.push(`first: ${this.limit}`);
        if (this.pageNum) variables.push(`page: ${this.pageNum}`);

        // Iterate filters with prototype pollution protection (hasOwnProperty check)
        // Prevents __proto__ and constructor injection attacks
        for (const key in this.filters) 
        {
            if (!Object.prototype.hasOwnProperty.call(this.filters, key)) continue;
            
            const value = (this.filters as Record<string, any>)[key];

            if (value !== null && value !== undefined)
                variables.push(`${key}: ${this.serializeFilterValue(value)}`);
        }

        const variablesString = variables.length > 0 ? `(${variables.join(', ')})` : '';

        // Build paginator fields if needed
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

        // Construct the final query string
        const finalQuery = `
            query {
                ${this.queryName}${variablesString} {
                    ${usesDataWrapper ? 'data {' : ''}
                        ${allFields}
                    ${usesDataWrapper ? '}' : ''}
                    ${paginatorFields}
                }
            }
        `.trim();

        // Validate final query size to prevent DoS
        if (finalQuery.length > QueryBuilder.MAX_QUERY_SIZE)
            throw new Error(`Query size exceeds maximum of ${QueryBuilder.MAX_QUERY_SIZE} characters`);

        return finalQuery;
    }
}