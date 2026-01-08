[**pnwkit 3.0 v3.0.0**](../../README.md)

***

[pnwkit 3.0](../../modules.md) / api/queries/apiKeyDetails

# api/queries/apiKeyDetails

## Classes

### Query Builders

#### ApiKeyDetailsQuery

Defined in: [api/queries/apiKeyDetails.ts:71](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/apiKeyDetails.ts#L71)

Query builder for fetching API key details from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.apiKeyDetails()`
Each call creates a fresh instance with no shared state.

**Important differences from other queries:**
- Returns a **single object**, not an array
- Does **not support pagination** (no first/page methods)
- Does **not accept filter parameters** (where clause is empty)
- Only has **one relation**: `nation` (the nation associated with the API key)

Features:
- Type-safe field selection
- Nested relation support (unlimited depth through nation)
- Automatic cardinality detection

Return type:
- `execute()` → Returns single API key details object (NOT an array)

##### Example

```typescript
// Basic query - returns single object
const apiKey = await pnwkit.queries.apiKeyDetails()
  .select('key', 'requests', 'max_requests', 'permissions')
  .execute();
// Type: { key: string, requests: number, max_requests: number, permissions: string }
console.log(apiKey.key);  // Direct access - NOT apiKey[0].key

// With nested nation data (singular relation)
const apiKey = await pnwkit.queries.apiKeyDetails()
  .select('key', 'requests')
  .include('nation', builder => builder  // Singular: returns single object
    .select('id', 'nation_name', 'score')
  )
  .execute();
// Type: { 
//   key: string, 
//   requests: number,
//   nation: { id: number, nation_name: string, score: number }
// }
console.log(apiKey.nation.nation_name);  // Direct access to nested object

// Deep nesting through nation relation
const apiKey = await pnwkit.queries.apiKeyDetails()
  .select('key')
  .include('nation', b1 => b1
    .select('id', 'nation_name')
    .include('alliance', b2 => b2  // Nest through nation's relations
      .select('id', 'name')
      .include('nations', b3 => b3  // Unlimited depth!
        .select('id', 'nation_name')
      )
    )
  )
  .execute();
```

##### Extends

- `QueryBuilder`\<`ApiKeyDetailsFields`, `ApiKeyDetailsQueryParams`\>

##### Type Parameters

###### F

`F` *extends* readonly keyof `ApiKeyDetailsFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

###### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

##### Properties

###### apiKey

> `protected` **apiKey**: `string`

Defined in: [services/queryBuilder.ts:234](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L234)

###### Inherited from

`QueryBuilder.apiKey`

###### filters

> `protected` **filters**: `ApiKeyDetailsQueryParams`

Defined in: [services/queryBuilder.ts:240](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L240)

###### Inherited from

`QueryBuilder.filters`

###### limit?

> `protected` `optional` **limit**: `number`

Defined in: [services/queryBuilder.ts:232](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L232)

###### Inherited from

`QueryBuilder.limit`

###### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [services/queryBuilder.ts:233](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L233)

###### Inherited from

`QueryBuilder.pageNum`

###### queryName

> `protected` **queryName**: `string` = `'me'`

Defined in: [api/queries/apiKeyDetails.ts:77](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/apiKeyDetails.ts#L77)

###### Overrides

`QueryBuilder.queryName`

###### selectedFields

> `protected` **selectedFields**: keyof `ApiKeyDetailsFields`[] = `[]`

Defined in: [services/queryBuilder.ts:239](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L239)

###### Inherited from

`QueryBuilder.selectedFields`

###### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: [services/queryBuilder.ts:237](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L237)

###### Inherited from

`QueryBuilder.subqueries`

###### MAX\_ARRAY\_SIZE

> `protected` `readonly` `static` **MAX\_ARRAY\_SIZE**: `1000` = `1000`

Defined in: [services/queryBuilder.ts:254](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L254)

###### Inherited from

`QueryBuilder.MAX_ARRAY_SIZE`

###### MAX\_FIELD\_NAME\_LENGTH

> `protected` `readonly` `static` **MAX\_FIELD\_NAME\_LENGTH**: `100` = `100`

Defined in: [services/queryBuilder.ts:255](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L255)

###### Inherited from

`QueryBuilder.MAX_FIELD_NAME_LENGTH`

###### MAX\_FIELDS\_PER\_LEVEL

> `protected` `readonly` `static` **MAX\_FIELDS\_PER\_LEVEL**: `100` = `100`

Defined in: [services/queryBuilder.ts:251](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L251)

###### Inherited from

`QueryBuilder.MAX_FIELDS_PER_LEVEL`

###### MAX\_NESTING\_DEPTH

> `protected` `readonly` `static` **MAX\_NESTING\_DEPTH**: `10` = `10`

Defined in: [services/queryBuilder.ts:250](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L250)

###### Inherited from

`QueryBuilder.MAX_NESTING_DEPTH`

###### MAX\_QUERY\_SIZE

> `protected` `readonly` `static` **MAX\_QUERY\_SIZE**: `50000` = `50000`

Defined in: [services/queryBuilder.ts:252](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L252)

###### Inherited from

`QueryBuilder.MAX_QUERY_SIZE`

###### MAX\_STRING\_LENGTH

> `protected` `readonly` `static` **MAX\_STRING\_LENGTH**: `10000` = `10000`

Defined in: [services/queryBuilder.ts:253](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L253)

###### Inherited from

`QueryBuilder.MAX_STRING_LENGTH`

###### QUERIES\_WITHOUT\_DATA\_WRAPPER

> `protected` `readonly` `static` **QUERIES\_WITHOUT\_DATA\_WRAPPER**: `Set`\<`string`\>

Defined in: [services/queryBuilder.ts:247](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L247)

Queries that return data directly without wrapping in a 'data' object.
These queries follow a different GraphQL schema structure.

###### Inherited from

`QueryBuilder.QUERIES_WITHOUT_DATA_WRAPPER`

##### Methods

###### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [services/queryBuilder.ts:549](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L549)

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

> **execute**(): `Promise`\<`SelectFields`\<`ApiKeyDetailsFields`, `F`, `I`\>\>

Defined in: [api/queries/apiKeyDetails.ts:197](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/apiKeyDetails.ts#L197)

Execute the API key details query and return a single object.

**Important:** Unlike nations/alliances queries, this returns a **single object**,
not an array. There is no pagination support.

Results only include selected fields and included relations.
All other fields are excluded from the response.

###### Returns

`Promise`\<`SelectFields`\<`ApiKeyDetailsFields`, `F`, `I`\>\>

Single API key details object with selected fields and included relations

###### Throws

Error if the query fails or returns no data

###### Example

```typescript
// Returns single object (NOT an array)
const apiKey = await query.execute();
// Type: { key: string, requests: number }
console.log(apiKey.key);  // Direct access - no [0] needed

// With nested data
const apiKey = await pnwkit.queries.apiKeyDetails()
  .select('key')
  .include('nation', b => b.select('id', 'nation_name'))
  .execute();
console.log(apiKey.nation.nation_name);  // Direct nested access
```

###### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): [`ApiKeyDetailsQuery`](#apikeydetailsquery)\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/apiKeyDetails.ts:156](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/apiKeyDetails.ts#L156)

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

###### Type Parameters

###### K

`K` *extends* `"nation"`

###### TConfig

`TConfig` *extends* `SubqueryConfig`\<`ApiKeyDetailsRelations`\[`K`\], `GetRelationsFor`\<`ApiKeyDetailsRelations`\[`K`\]\>, `GetQueryParamsFor`\<`ApiKeyDetailsRelations`\[`K`\]\>\>

###### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

###### TWrappedResult

`TWrappedResult` = `ApiKeyDetailsRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

###### Parameters

###### relation

`K`

The relation name to include

###### config

`TConfig`

A builder function for configuring the subquery

###### Returns

[`ApiKeyDetailsQuery`](#apikeydetailsquery)\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

New query instance with included relation

###### Example

```typescript
// Basic subquery - include nation data
.include('nation', builder => builder
  .select('id', 'nation_name', 'score')
)

// Deeply nested query with unlimited depth
.include('nation', builder => builder
  .select('id', 'nation_name')
  .include('alliance', builder2 => builder2
    .select('id', 'name', 'score')
    .include('nations', builder3 => builder3
      .select('id', 'nation_name')
    )
  )
)

// Important: Always select at least one scalar field at each level
// GraphQL requires this - you cannot query an object without selecting fields
```

###### sanitizeString()

> `protected` **sanitizeString**(`str`): `string`

Defined in: [services/queryBuilder.ts:278](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L278)

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

> **select**\<`Fields`\>(...`fields`): [`ApiKeyDetailsQuery`](#apikeydetailsquery)\<`Fields`\>

Defined in: [api/queries/apiKeyDetails.ts:98](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/apiKeyDetails.ts#L98)

Select specific fields to retrieve from API key details

###### Type Parameters

###### Fields

`Fields` *extends* readonly keyof `ApiKeyDetailsFields`[]

###### Parameters

###### fields

...`Fields`

Field names to select

###### Returns

[`ApiKeyDetailsQuery`](#apikeydetailsquery)\<`Fields`\>

New query instance with selected fields

###### Throws

Error if no fields are provided

###### Example

```typescript
.select('key', 'requests', 'max_requests', 'permissions')
```

###### serializeObject()

> `protected` **serializeObject**(`obj`): `string`

Defined in: [services/queryBuilder.ts:314](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L314)

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

Defined in: [api/queries/apiKeyDetails.ts:119](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/apiKeyDetails.ts#L119)

Apply filters to the query (not supported for API key details)

###### Parameters

###### filters

`ApiKeyDetailsQueryParams`

Query parameters (empty for this query)

###### Returns

`this`

This query instance for method chaining

###### Example

```typescript
.where({})  // No filters available for API key details
```
