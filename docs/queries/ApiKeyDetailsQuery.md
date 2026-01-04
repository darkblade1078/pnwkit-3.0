[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [apiKeyDetails](../README.md) / ApiKeyDetailsQuery

# Class: ApiKeyDetailsQuery\<F, I\>

Defined in: [api/queries/apiKeyDetails.ts:71](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/apiKeyDetails.ts#L71)

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

## Example

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

## Extends

- `QueryBuilder`\<`ApiKeyDetailsFields`, `ApiKeyDetailsQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `ApiKeyDetailsFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

## Constructors

### Constructor

> **new ApiKeyDetailsQuery**\<`F`, `I`\>(`kit`): `ApiKeyDetailsQuery`\<`F`, `I`\>

Defined in: [api/queries/apiKeyDetails.ts:84](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/apiKeyDetails.ts#L84)

**`Internal`**

Create a new ApiKeyDetailsQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`ApiKeyDetailsQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder<ApiKeyDetailsFields, ApiKeyDetailsQueryParams>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: [builders/queryBuilder.ts:232](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L232)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `ApiKeyDetailsQueryParams`

Defined in: [builders/queryBuilder.ts:238](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L238)

#### Inherited from

`QueryBuilder.filters`

***

### limit?

> `protected` `optional` **limit**: `number`

Defined in: [builders/queryBuilder.ts:230](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L230)

#### Inherited from

`QueryBuilder.limit`

***

### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [builders/queryBuilder.ts:231](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L231)

#### Inherited from

`QueryBuilder.pageNum`

***

### queryName

> `protected` **queryName**: `string` = `'me'`

Defined in: [api/queries/apiKeyDetails.ts:77](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/apiKeyDetails.ts#L77)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `ApiKeyDetailsFields`[] = `[]`

Defined in: [builders/queryBuilder.ts:237](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L237)

#### Inherited from

`QueryBuilder.selectedFields`

***

### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: [builders/queryBuilder.ts:235](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L235)

#### Inherited from

`QueryBuilder.subqueries`

***

### MAX\_FIELDS\_PER\_LEVEL

> `protected` `readonly` `static` **MAX\_FIELDS\_PER\_LEVEL**: `100` = `100`

Defined in: [builders/queryBuilder.ts:247](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L247)

#### Inherited from

`QueryBuilder.MAX_FIELDS_PER_LEVEL`

***

### MAX\_NESTING\_DEPTH

> `protected` `readonly` `static` **MAX\_NESTING\_DEPTH**: `10` = `10`

Defined in: [builders/queryBuilder.ts:246](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L246)

#### Inherited from

`QueryBuilder.MAX_NESTING_DEPTH`

***

### MAX\_QUERY\_SIZE

> `protected` `readonly` `static` **MAX\_QUERY\_SIZE**: `50000` = `50000`

Defined in: [builders/queryBuilder.ts:248](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L248)

#### Inherited from

`QueryBuilder.MAX_QUERY_SIZE`

***

### MAX\_STRING\_LENGTH

> `protected` `readonly` `static` **MAX\_STRING\_LENGTH**: `10000` = `10000`

Defined in: [builders/queryBuilder.ts:249](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L249)

#### Inherited from

`QueryBuilder.MAX_STRING_LENGTH`

***

### QUERIES\_WITHOUT\_DATA\_WRAPPER

> `protected` `readonly` `static` **QUERIES\_WITHOUT\_DATA\_WRAPPER**: `Set`\<`string`\>

Defined in: [builders/queryBuilder.ts:243](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L243)

#### Inherited from

`QueryBuilder.QUERIES_WITHOUT_DATA_WRAPPER`

## Methods

### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [builders/queryBuilder.ts:541](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L541)

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

#### Parameters

##### includePaginator

`boolean`

Whether to include pagination info in response

#### Returns

`string`

Complete GraphQL query string ready for execution

#### Throws

Error if field count/name/size limits exceeded or filters contain invalid values

#### Inherited from

`QueryBuilder.buildQuery`

***

### buildSubqueryFields()

> `protected` **buildSubqueryFields**(`config`, `baseIndent`, `depth`): `object`

Defined in: [builders/queryBuilder.ts:488](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L488)

**`Internal`**

Recursively build subquery fields with proper indentation and depth tracking.

Processes scalar fields and nested relations, applying proper GraphQL formatting
and indentation. Validates depth at each level to prevent stack overflow.

#### Parameters

##### config

`SubqueryConfig`\<`any`\>

The subquery configuration

##### baseIndent

`number`

Base indentation level (incremented for each nesting level)

##### depth

`number` = `0`

Current nesting depth (default: 0, max: 10)

#### Returns

`object`

Object with paramString (query parameters) and fieldList (formatted fields)

##### fieldList

> **fieldList**: `string`

##### paramString

> **paramString**: `string`

#### Throws

Error if nesting depth exceeds MAX_NESTING_DEPTH

#### Inherited from

`QueryBuilder.buildSubqueryFields`

***

### buildSubqueryString()

> `protected` **buildSubqueryString**(`config`, `depth`): `object`

Defined in: [builders/queryBuilder.ts:362](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L362)

**`Internal`**

Build subquery configuration into structured data.

Validates nesting depth and field count to prevent resource exhaustion.
Recursively processes nested builder configurations while tracking depth.

#### Parameters

##### config

`SubqueryConfig`\<`any`\>

A builder function for configuring the subquery

##### depth

`number` = `0`

Current nesting depth (default: 0, max: 10)

#### Returns

`object`

Object containing scalar fields, nested relations, and filter parameters

##### nested

> **nested**: `object`[]

##### params

> **params**: `Record`\<`string`, `any`\>

##### scalar

> **scalar**: `string`[]

#### Throws

Error if depth exceeds MAX_NESTING_DEPTH or field count exceeds MAX_FIELDS_PER_LEVEL

#### Inherited from

`QueryBuilder.buildSubqueryString`

***

### execute()

> **execute**(): `Promise`\<`SelectFields`\<`ApiKeyDetailsFields`, `F`, `I`\>\>

Defined in: [api/queries/apiKeyDetails.ts:200](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/apiKeyDetails.ts#L200)

Execute the API key details query and return a single object.

**Important:** Unlike nations/alliances queries, this returns a **single object**,
not an array. There is no pagination support.

Results only include selected fields and included relations.
All other fields are excluded from the response.

#### Returns

`Promise`\<`SelectFields`\<`ApiKeyDetailsFields`, `F`, `I`\>\>

Single API key details object with selected fields and included relations

#### Throws

Error if the query fails or returns no data

#### Example

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

***

### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): `ApiKeyDetailsQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/apiKeyDetails.ts:159](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/apiKeyDetails.ts#L159)

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

#### Type Parameters

##### K

`K` *extends* `"nation"`

##### TConfig

`TConfig` *extends* `SubqueryConfig`\<`ApiKeyDetailsRelations`\[`K`\], `GetRelationsFor`\<`ApiKeyDetailsRelations`\[`K`\]\>, `GetQueryParamsFor`\<`ApiKeyDetailsRelations`\[`K`\]\>\>

##### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

##### TWrappedResult

`TWrappedResult` = `ApiKeyDetailsRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

#### Parameters

##### relation

`K`

The relation name to include

##### config

`TConfig`

A builder function for configuring the subquery

#### Returns

`ApiKeyDetailsQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

New query instance with included relation

#### Example

```typescript
// Basic subquery with field selection
.include('bankrecs', builder => builder
  .select('id', 'date', 'money', 'note')
)Include nation data
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

***

### sanitizeString()

> `protected` **sanitizeString**(`str`): `string`

Defined in: [builders/queryBuilder.ts:264](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L264)

Sanitize and escape a string value for safe GraphQL usage.

Validates input type and length, checks for null bytes, and escapes
special characters including backslashes, quotes, newlines, carriage
returns, tabs, form feeds, and backspaces.

#### Parameters

##### str

`string`

The string to sanitize

#### Returns

`string`

Sanitized string with all special characters properly escaped

#### Throws

Error if input is not a string, exceeds maximum length (10KB), or contains null bytes

#### Inherited from

`QueryBuilder.sanitizeString`

***

### select()

> **select**\<`Fields`\>(...`fields`): `ApiKeyDetailsQuery`\<`Fields`\>

Defined in: [api/queries/apiKeyDetails.ts:98](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/apiKeyDetails.ts#L98)

Select specific fields to retrieve from API key details

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `ApiKeyDetailsFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`ApiKeyDetailsQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```typescript
.select('key', 'requests', 'max_requests', 'permissions')
```

***

### serializeFilterValue()

> `protected` **serializeFilterValue**(`value`): `string`

Defined in: [builders/queryBuilder.ts:415](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L415)

**`Internal`**

Serialize filter value for GraphQL query with validation.

Handles arrays (max 1000 elements), strings (sanitized), numbers (finite only),
booleans, and objects. Recursively processes nested structures.

#### Parameters

##### value

`any`

The filter value to serialize (string, number, boolean, array, or object)

#### Returns

`string`

Serialized string representation in GraphQL format

#### Throws

Error if value is null/undefined, array exceeds 1000 elements, number is not finite, or type is unsupported

#### Inherited from

`QueryBuilder.serializeFilterValue`

***

### serializeObject()

> `protected` **serializeObject**(`obj`): `string`

Defined in: [builders/queryBuilder.ts:301](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L301)

Serialize an object to GraphQL format (enum values without quotes).

Validates object structure and prevents prototype pollution by:
- Using own properties only (not inherited)
- Blocking dangerous keys (__proto__, constructor, prototype)
- Validating GraphQL field name format
- Validating enum value format (uppercase with underscores)
- Ensuring numbers are finite (rejecting NaN, Infinity)

#### Parameters

##### obj

`Record`\<`string`, `any`\>

Plain object to serialize (not arrays)

#### Returns

`string`

GraphQL-formatted object string in format {key:value, ...}

#### Throws

Error if object is null/undefined/array, contains invalid field names, or has unsafe values

#### Inherited from

`QueryBuilder.serializeObject`

***

### validateInputLength()

> `protected` **validateInputLength**(`str`, `maxLength`): `void`

Defined in: [builders/queryBuilder.ts:639](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L639)

Validate input string length to prevent excessively large queries and DoS attacks.

Used by sanitizeString and other methods to enforce size limits on user input.

#### Parameters

##### str

`string`

String to validate

##### maxLength

`number` = `10000`

Maximum allowed length in characters (default: 10000)

#### Returns

`void`

#### Throws

Error if string exceeds maximum length

#### Inherited from

`QueryBuilder.validateInputLength`

***

### where()

> **where**(`filters`): `this`

Defined in: [api/queries/apiKeyDetails.ts:119](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/apiKeyDetails.ts#L119)

Apply filters to the query (not supported for API key details)

#### Parameters

##### filters

`ApiKeyDetailsQueryParams`

Query parameters (empty for this query)

#### Returns

`this`

This query instance for method chaining

#### Example

```typescript
.where({})  // No filters available for API key details
```
