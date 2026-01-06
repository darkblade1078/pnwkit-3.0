[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [alliances](../README.md) / AlliancesQuery

# Class: AlliancesQuery\<F, I\>

Defined in: [api/queries/alliances.ts:82](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/alliances.ts#L82)

Query builder for fetching alliance data from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.alliances()`
Each call creates a fresh instance with no shared state, preventing filter pollution.

Features:
- Type-safe field selection and filtering
- Unlimited recursive nesting with automatic type inference
- Automatic cardinality detection (all alliance relations are arrays)
- Pagination support with optional paginatorInfo

Return types:
- `execute()` → Returns array of alliances
- `execute(true)` → Returns `{ data: Alliance[], paginatorInfo: {...} }`

## Example

```typescript
// Basic query with filtering
const alliances = await pnwkit.queries.alliances()
  .select('id', 'name', 'score', 'color')
  .where({ 
    name: ['Rose', 'Grumpy'],
    orderBy: [{ column: 'SCORE', order: 'DESC' }]
  })
  .first(50)
  .execute();
// Type: { id: number, name: string, score: number, color: string }[]

// Nested query with array relations (all alliance relations return arrays)
const alliances = await pnwkit.queries.alliances()
  .select('id', 'name')
  .include('nations', builder => builder  // Array: returns nation[]
    .select('id', 'nation_name', 'score')
    .where({ min_score: 1000 })
  )
  .include('bankrecs', builder => builder  // Array: returns bankrec[]
    .select('id', 'date', 'money')
  )
  .first(10)
  .execute();
// Type: { 
//   id: number, 
//   name: string,
//   nations: { id: number, nation_name: string, score: number }[],
//   bankrecs: { id: number, date: string, money: number }[]
// }[]

// Unlimited nesting depth
const alliances = await pnwkit.queries.alliances()
  .select('id', 'name')
  .include('nations', b1 => b1
    .select('id', 'nation_name')
    .include('cities', b2 => b2  // Unlimited nesting!
      .select('id', 'name', 'infrastructure')
      .where({ min_infrastructure: 500 })
    )
  )
  .execute();

// With pagination info
const result = await pnwkit.queries.alliances()
  .select('id', 'name')
  .first(100)
  .execute(true);
console.log(result.data);           // Alliances array
console.log(result.paginatorInfo);  // Pagination metadata
```

## Extends

- `QueryBuilder`\<`AllianceFields`, `AllianceQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `AllianceFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining, all arrays for alliances)

## Constructors

### Constructor

> **new AlliancesQuery**\<`F`, `I`\>(`kit`): `AlliancesQuery`\<`F`, `I`\>

Defined in: [api/queries/alliances.ts:95](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/alliances.ts#L95)

**`Internal`**

Create a new AlliancesQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`AlliancesQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder<AllianceFields, AllianceQueryParams>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: services/queryBuilder.ts:234

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `AllianceQueryParams`

Defined in: services/queryBuilder.ts:240

#### Inherited from

`QueryBuilder.filters`

***

### limit?

> `protected` `optional` **limit**: `number`

Defined in: services/queryBuilder.ts:232

#### Inherited from

`QueryBuilder.limit`

***

### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: services/queryBuilder.ts:233

#### Inherited from

`QueryBuilder.pageNum`

***

### queryName

> `protected` **queryName**: `string` = `'alliances'`

Defined in: [api/queries/alliances.ts:88](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/alliances.ts#L88)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `AllianceFields`[] = `[]`

Defined in: services/queryBuilder.ts:239

#### Inherited from

`QueryBuilder.selectedFields`

***

### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: services/queryBuilder.ts:237

#### Inherited from

`QueryBuilder.subqueries`

***

### MAX\_ARRAY\_SIZE

> `protected` `readonly` `static` **MAX\_ARRAY\_SIZE**: `1000` = `1000`

Defined in: services/queryBuilder.ts:254

#### Inherited from

`QueryBuilder.MAX_ARRAY_SIZE`

***

### MAX\_FIELD\_NAME\_LENGTH

> `protected` `readonly` `static` **MAX\_FIELD\_NAME\_LENGTH**: `100` = `100`

Defined in: services/queryBuilder.ts:255

#### Inherited from

`QueryBuilder.MAX_FIELD_NAME_LENGTH`

***

### MAX\_FIELDS\_PER\_LEVEL

> `protected` `readonly` `static` **MAX\_FIELDS\_PER\_LEVEL**: `100` = `100`

Defined in: services/queryBuilder.ts:251

#### Inherited from

`QueryBuilder.MAX_FIELDS_PER_LEVEL`

***

### MAX\_NESTING\_DEPTH

> `protected` `readonly` `static` **MAX\_NESTING\_DEPTH**: `10` = `10`

Defined in: services/queryBuilder.ts:250

#### Inherited from

`QueryBuilder.MAX_NESTING_DEPTH`

***

### MAX\_QUERY\_SIZE

> `protected` `readonly` `static` **MAX\_QUERY\_SIZE**: `50000` = `50000`

Defined in: services/queryBuilder.ts:252

#### Inherited from

`QueryBuilder.MAX_QUERY_SIZE`

***

### MAX\_STRING\_LENGTH

> `protected` `readonly` `static` **MAX\_STRING\_LENGTH**: `10000` = `10000`

Defined in: services/queryBuilder.ts:253

#### Inherited from

`QueryBuilder.MAX_STRING_LENGTH`

***

### QUERIES\_WITHOUT\_DATA\_WRAPPER

> `protected` `readonly` `static` **QUERIES\_WITHOUT\_DATA\_WRAPPER**: `Set`\<`string`\>

Defined in: services/queryBuilder.ts:247

Queries that return data directly without wrapping in a 'data' object.
These queries follow a different GraphQL schema structure.

#### Inherited from

`QueryBuilder.QUERIES_WITHOUT_DATA_WRAPPER`

## Methods

### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: services/queryBuilder.ts:549

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

Defined in: services/queryBuilder.ts:487

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

Defined in: services/queryBuilder.ts:369

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

#### Call Signature

> **execute**(): `Promise`\<`SelectFields`\<`AllianceFields`, `F`, `I`\>[]\>

Defined in: [api/queries/alliances.ts:221](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/alliances.ts#L221)

Execute the alliances query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of alliances
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

##### Returns

`Promise`\<`SelectFields`\<`AllianceFields`, `F`, `I`\>[]\>

Array of alliances, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const alliances = await query.execute();
// Type: { id: number, name: string }[]
alliances.forEach(alliance => console.log(alliance.id, alliance.name));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Alliances array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`AllianceFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/alliances.ts:222](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/alliances.ts#L222)

Execute the alliances query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of alliances
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

##### Parameters

###### withPaginator

`true`

Whether to include pagination metadata in response

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`AllianceFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Array of alliances, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const alliances = await query.execute();
// Type: { id: number, name: string }[]
alliances.forEach(alliance => console.log(alliance.id, alliance.name));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Alliances array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

***

### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): `AlliancesQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/alliances.ts:178](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/alliances.ts#L178)

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

#### Type Parameters

##### K

`K` *extends* keyof `AllianceRelations`

##### TConfig

`TConfig` *extends* `SubqueryConfig`\<`AllianceRelations`\[`K`\], `GetRelationsFor`\<`AllianceRelations`\[`K`\]\>, `GetQueryParamsFor`\<`AllianceRelations`\[`K`\]\>\>

##### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

##### TWrappedResult

`TWrappedResult` = `AllianceRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

#### Parameters

##### relation

`K`

The relation name to include

##### config

`TConfig`

A builder function for configuring the subquery

#### Returns

`AlliancesQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

New query instance with included relation

#### Example

```typescript
// Basic subquery with field selection
.include('bankrecs', builder => builder
  .select('id', 'date', 'money', 'note')
)

// Subquery with filtering
.include('nations', builder => builder
  .select('id', 'nation_name', 'score')
  .where({ min_score: 1000 })
)

// Deeply nested subquery with unlimited depth
.include('nations', builder => builder
  .select('id', 'nation_name', 'score')
  .where({ min_score: 1000 })
  .include('cities', builder2 => builder2  // Unlimited nesting!
    .select('id', 'name', 'infrastructure')
    .where({ min_infrastructure: 500 })
    .include('buildings', builder3 => builder3
      .select('id', 'type')
    )
  )
)

// Important: Always select at least one scalar field at each level
// GraphQL requires this - you cannot query an object without selecting fields
```

***

### sanitizeString()

> `protected` **sanitizeString**(`str`): `string`

Defined in: services/queryBuilder.ts:278

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

> **select**\<`Fields`\>(...`fields`): `AlliancesQuery`\<`Fields`\>

Defined in: [api/queries/alliances.ts:109](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/alliances.ts#L109)

Select specific fields to retrieve from alliances

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `AllianceFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`AlliancesQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```typescript
.select('id', 'name', 'score', 'color')
```

***

### serializeFilterValue()

> `protected` **serializeFilterValue**(`value`): `string`

Defined in: services/queryBuilder.ts:459

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

Defined in: services/queryBuilder.ts:314

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

### where()

> **where**(`filters`): `this`

Defined in: [api/queries/alliances.ts:133](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/alliances.ts#L133)

Apply filters to the query

#### Parameters

##### filters

`AllianceQueryParams`

Query parameters for filtering results

#### Returns

`this`

This query instance for method chaining

#### Example

```typescript
.where({ 
  name: ['Rose', 'Grumpy'], 
  color: ['AQUA', 'BLUE'] 
})
```
