[**pnwkit 3.0 v3.0.0**](../../README.md)

***

[pnwkit 3.0](../../modules.md) / api/queries/nations

# api/queries/nations

## Classes

### Query Builders

#### NationsQuery

Defined in: [api/queries/nations.ts:86](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/nations.ts#L86)

Query builder for fetching nation data from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.nations()`
Each call creates a fresh instance with no shared state, preventing filter pollution.

Features:
- Type-safe field selection and filtering
- Unlimited recursive nesting with automatic type inference
- Automatic cardinality detection (singular vs array relations)
- Pagination support with optional paginatorInfo

Return types:
- `execute()` → Returns array of nations
- `execute(true)` → Returns `{ data: Nation[], paginatorInfo: {...} }`

##### Example

```typescript
// Basic query with filtering and pagination
const nations = await pnwkit.queries.nations()
  .select('id', 'nation_name', 'score', 'alliance_id')
  .where({ 
    min_score: 1000, 
    max_score: 5000,
    orderBy: [{ column: 'SCORE', order: 'DESC' }]
  })
  .first(100)
  .execute();
// Type: { id: number, nation_name: string, score: number, alliance_id: number }[]

// Nested query with singular and array relations
const nations = await pnwkit.queries.nations()
  .select('id', 'nation_name')
  .include('alliance', builder => builder  // Singular: returns object
    .select('id', 'name', 'score')
    .where({ min_score: 5000 })
  )
  .include('cities', builder => builder  // Array: returns array
    .select('id', 'name', 'infrastructure')
  )
  .first(50)
  .execute();
// Type: { 
//   id: number, 
//   nation_name: string,
//   alliance: { id: number, name: string, score: number },
//   cities: { id: number, name: string, infrastructure: number }[]
// }[]

// Unlimited nesting depth
const nations = await pnwkit.queries.nations()
  .select('id', 'nation_name')
  .include('alliance', b1 => b1
    .select('id', 'name')
    .include('nations', b2 => b2  // Nested nations
      .select('id', 'nation_name')
      .include('cities', b3 => b3  // Unlimited depth!
        .select('id', 'name')
      )
    )
  )
  .execute();

// With pagination info
const result = await pnwkit.queries.nations()
  .select('id', 'nation_name')
  .first(500)
  .page(2)
  .execute(true);
console.log(result.data);           // Nations array
console.log(result.paginatorInfo);  // { currentPage, total, hasMorePages, ... }
```

##### Extends

- `QueryBuilder`\<`NationFields`, `NationQueryParams`\>

##### Type Parameters

###### F

`F` *extends* readonly keyof `NationFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

###### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

##### Properties

###### apiKey

> `protected` **apiKey**: `string`

Defined in: [services/queryBuilder.ts:234](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L234)

###### Inherited from

`QueryBuilder.apiKey`

###### filters

> `protected` **filters**: `NationQueryParams`

Defined in: [services/queryBuilder.ts:240](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L240)

###### Inherited from

`QueryBuilder.filters`

###### limit?

> `protected` `optional` **limit**: `number`

Defined in: [services/queryBuilder.ts:232](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L232)

###### Inherited from

`QueryBuilder.limit`

###### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [services/queryBuilder.ts:233](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L233)

###### Inherited from

`QueryBuilder.pageNum`

###### queryName

> `protected` **queryName**: `string` = `'nations'`

Defined in: [api/queries/nations.ts:95](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/nations.ts#L95)

###### Overrides

`QueryBuilder.queryName`

###### selectedFields

> `protected` **selectedFields**: keyof `NationFields`[] = `[]`

Defined in: [services/queryBuilder.ts:239](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L239)

###### Inherited from

`QueryBuilder.selectedFields`

###### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: [services/queryBuilder.ts:237](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L237)

###### Inherited from

`QueryBuilder.subqueries`

###### MAX\_ARRAY\_SIZE

> `protected` `readonly` `static` **MAX\_ARRAY\_SIZE**: `1000` = `1000`

Defined in: [services/queryBuilder.ts:254](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L254)

###### Inherited from

`QueryBuilder.MAX_ARRAY_SIZE`

###### MAX\_FIELD\_NAME\_LENGTH

> `protected` `readonly` `static` **MAX\_FIELD\_NAME\_LENGTH**: `100` = `100`

Defined in: [services/queryBuilder.ts:255](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L255)

###### Inherited from

`QueryBuilder.MAX_FIELD_NAME_LENGTH`

###### MAX\_FIELDS\_PER\_LEVEL

> `protected` `readonly` `static` **MAX\_FIELDS\_PER\_LEVEL**: `100` = `100`

Defined in: [services/queryBuilder.ts:251](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L251)

###### Inherited from

`QueryBuilder.MAX_FIELDS_PER_LEVEL`

###### MAX\_NESTING\_DEPTH

> `protected` `readonly` `static` **MAX\_NESTING\_DEPTH**: `10` = `10`

Defined in: [services/queryBuilder.ts:250](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L250)

###### Inherited from

`QueryBuilder.MAX_NESTING_DEPTH`

###### MAX\_QUERY\_SIZE

> `protected` `readonly` `static` **MAX\_QUERY\_SIZE**: `50000` = `50000`

Defined in: [services/queryBuilder.ts:252](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L252)

###### Inherited from

`QueryBuilder.MAX_QUERY_SIZE`

###### MAX\_STRING\_LENGTH

> `protected` `readonly` `static` **MAX\_STRING\_LENGTH**: `10000` = `10000`

Defined in: [services/queryBuilder.ts:253](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L253)

###### Inherited from

`QueryBuilder.MAX_STRING_LENGTH`

###### QUERIES\_WITHOUT\_DATA\_WRAPPER

> `protected` `readonly` `static` **QUERIES\_WITHOUT\_DATA\_WRAPPER**: `Set`\<`string`\>

Defined in: [services/queryBuilder.ts:247](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L247)

Queries that return data directly without wrapping in a 'data' object.
These queries follow a different GraphQL schema structure.

###### Inherited from

`QueryBuilder.QUERIES_WITHOUT_DATA_WRAPPER`

##### Methods

###### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [services/queryBuilder.ts:549](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L549)

Build the final GraphQL query string with comprehensive validation.

Constructs a complete GraphQL query including:
- Main fields and subqueries with proper formatting
- Pagination variables (first, page)
- Filter parameters with type-safe serialization
- Optional paginator info fields

Validation includes:
- Field count limits (max 100 per level)
- Field name format and length validation (max 100 chars)
- Query size validation (max 50KB)
- All filter values properly sanitized and escaped

###### Parameters

###### includePaginator

`boolean`

Whether to include pagination info in response

###### Returns

`string`

Complete GraphQL query string ready for execution

###### Throws

Error if field count/name/size limits exceeded or filters contain invalid values

###### Inherited from

`QueryBuilder.buildQuery`

###### execute()

###### Call Signature

> **execute**(): `Promise`\<`SelectFields`\<`NationFields`, `F`, `I`\>[]\>

Defined in: [api/queries/nations.ts:218](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/nations.ts#L218)

Execute the nations query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of nations
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

###### Returns

`Promise`\<`SelectFields`\<`NationFields`, `F`, `I`\>[]\>

Array of nations, or object with data and paginatorInfo if withPaginator is true

###### Throws

Error if the query fails or returns no data

###### Example

```typescript
// Returns array directly
const nations = await query.execute();
// Type: { id: number, nation_name: string }[]
nations.forEach(nation => console.log(nation.id, nation.nation_name));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Nations array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.hasMorePages); // Boolean
```

###### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`NationFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/nations.ts:219](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/nations.ts#L219)

Execute the nations query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of nations
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

###### Parameters

###### withPaginator

`true`

Whether to include pagination metadata in response

###### Returns

`Promise`\<\{ `data`: `SelectFields`\<`NationFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Array of nations, or object with data and paginatorInfo if withPaginator is true

###### Throws

Error if the query fails or returns no data

###### Example

```typescript
// Returns array directly
const nations = await query.execute();
// Type: { id: number, nation_name: string }[]
nations.forEach(nation => console.log(nation.id, nation.nation_name));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Nations array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.hasMorePages); // Boolean
```

###### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): [`NationsQuery`](#nationsquery)\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/nations.ts:175](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/nations.ts#L175)

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

###### Type Parameters

###### K

`K` *extends* keyof `NationRelations`

###### TConfig

`TConfig` *extends* `SubqueryConfig`\<`NationRelations`\[`K`\], `GetRelationsFor`\<`NationRelations`\[`K`\]\>, `GetQueryParamsFor`\<`NationRelations`\[`K`\]\>\>

###### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

###### TWrappedResult

`TWrappedResult` = `NationRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

###### Parameters

###### relation

`K`

The relation name to include

###### config

`TConfig`

A builder function for configuring the subquery

###### Returns

[`NationsQuery`](#nationsquery)\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

New query instance with included relation

###### Example

```typescript
// Basic subquery with field selection
.include('cities', builder => builder
  .select('id', 'name', 'infrastructure')
)

// Subquery with filtering
.include('alliance', builder => builder
  .select('id', 'name', 'score')
  .where({ id: [1234] })
)

// Deeply nested subquery with unlimited depth
.include('alliance', builder => builder
  .select('id', 'name', 'score')
  .where({ min_score: 1000 })
  .include('nations', builder2 => builder2  // Unlimited nesting!
    .select('id', 'nation_name')
    .where({ min_score: 500 })
    .include('cities', builder3 => builder3
      .select('id', 'name', 'infrastructure')
    )
  )
)

// Important: Always select at least one scalar field at each level
// GraphQL requires this - you cannot query an object without selecting fields
```

###### sanitizeString()

> `protected` **sanitizeString**(`str`): `string`

Defined in: [services/queryBuilder.ts:278](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L278)

Sanitize and escape a string value for safe GraphQL usage.

Validates input type and length, checks for null bytes, and escapes
special characters including backslashes, quotes, newlines, carriage
returns, tabs, form feeds, and backspaces.

###### Parameters

###### str

`string`

The string to sanitize

###### Returns

`string`

Sanitized string with all special characters properly escaped

###### Throws

Error if input is not a string, exceeds maximum length (10KB), or contains null bytes

###### Inherited from

`QueryBuilder.sanitizeString`

###### select()

> **select**\<`Fields`\>(...`fields`): [`NationsQuery`](#nationsquery)\<`Fields`\>

Defined in: [api/queries/nations.ts:114](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/nations.ts#L114)

Select specific fields to retrieve from nations

###### Type Parameters

###### Fields

`Fields` *extends* readonly keyof `NationFields`[]

###### Parameters

###### fields

...`Fields`

Field names to select

###### Returns

[`NationsQuery`](#nationsquery)\<`Fields`\>

New query instance with selected fields

###### Throws

Error if no fields are provided

###### Example

```ts
.select('id', 'nation_name', 'score')
```

###### serializeObject()

> `protected` **serializeObject**(`obj`): `string`

Defined in: [services/queryBuilder.ts:314](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L314)

Serialize an object to GraphQL format (enum values without quotes).

Validates object structure and prevents prototype pollution by:
- Using own properties only (not inherited)
- Blocking dangerous keys (__proto__, constructor, prototype)
- Validating GraphQL field name format
- Validating enum value format (uppercase with underscores)
- Ensuring numbers are finite (rejecting NaN, Infinity)

###### Parameters

###### obj

`Record`\<`string`, `any`\>

Plain object to serialize (not arrays)

###### Returns

`string`

GraphQL-formatted object string in format {key:value, ...}

###### Throws

Error if object is null/undefined/array, contains invalid field names, or has unsafe values

###### Inherited from

`QueryBuilder.serializeObject`

###### where()

> **where**(`filters`): `this`

Defined in: [api/queries/nations.ts:130](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/nations.ts#L130)

Apply filters to the query

###### Parameters

###### filters

`NationQueryParams`

Query parameters for filtering results

###### Returns

`this`

This query instance for method chaining

###### Example

```ts
.where({ min_score: 1000, max_score: 5000 })
```
