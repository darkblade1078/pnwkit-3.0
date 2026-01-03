[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [alliances](../README.md) / AlliancesQuery

# Class: AlliancesQuery\<F, I\>

Defined in: [api/queries/alliances.ts:82](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/alliances.ts#L82)

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

Defined in: [api/queries/alliances.ts:95](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/alliances.ts#L95)

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

Defined in: [builders/queryBuilder.ts:220](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L220)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `AllianceQueryParams`

Defined in: [builders/queryBuilder.ts:226](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L226)

#### Inherited from

`QueryBuilder.filters`

***

### limit?

> `protected` `optional` **limit**: `number`

Defined in: [builders/queryBuilder.ts:218](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L218)

#### Inherited from

`QueryBuilder.limit`

***

### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [builders/queryBuilder.ts:219](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L219)

#### Inherited from

`QueryBuilder.pageNum`

***

### queryName

> `protected` **queryName**: `string` = `'alliances'`

Defined in: [api/queries/alliances.ts:88](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/alliances.ts#L88)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `AllianceFields`[] = `[]`

Defined in: [builders/queryBuilder.ts:225](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L225)

#### Inherited from

`QueryBuilder.selectedFields`

***

### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: [builders/queryBuilder.ts:223](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L223)

#### Inherited from

`QueryBuilder.subqueries`

***

### QUERIES\_WITHOUT\_DATA\_WRAPPER

> `protected` `readonly` `static` **QUERIES\_WITHOUT\_DATA\_WRAPPER**: `Set`\<`string`\>

Defined in: [builders/queryBuilder.ts:231](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L231)

#### Inherited from

`QueryBuilder.QUERIES_WITHOUT_DATA_WRAPPER`

## Methods

### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [builders/queryBuilder.ts:407](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L407)

Build the final GraphQL query string

#### Parameters

##### includePaginator

`boolean`

Whether to include pagination info in response

#### Returns

`string`

Complete GraphQL query string

#### Throws

Error if field names are too long or filters contain invalid values

#### Inherited from

`QueryBuilder.buildQuery`

***

### buildSubqueryFields()

> `protected` **buildSubqueryFields**(`config`, `baseIndent`): `object`

Defined in: [builders/queryBuilder.ts:370](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L370)

**`Internal`**

Recursively build subquery fields with proper indentation

#### Parameters

##### config

`SubqueryConfig`\<`any`\>

The subquery configuration

##### baseIndent

`number`

Base indentation level

#### Returns

`object`

Object with paramString and fieldList

##### fieldList

> **fieldList**: `string`

##### paramString

> **paramString**: `string`

#### Inherited from

`QueryBuilder.buildSubqueryFields`

***

### buildSubqueryString()

> `protected` **buildSubqueryString**(`config`): `object`

Defined in: [builders/queryBuilder.ts:299](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L299)

**`Internal`**

Build subquery configuration into structured data

#### Parameters

##### config

`SubqueryConfig`\<`any`\>

A builder function for configuring the subquery

#### Returns

`object`

Object containing scalar fields, nested relations, and filter parameters

##### nested

> **nested**: `object`[]

##### params

> **params**: `Record`\<`string`, `any`\>

##### scalar

> **scalar**: `string`[]

#### Inherited from

`QueryBuilder.buildSubqueryString`

***

### execute()

#### Call Signature

> **execute**(): `Promise`\<`SelectFields`\<`AllianceFields`, `F`, `I`\>[]\>

Defined in: [api/queries/alliances.ts:221](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/alliances.ts#L221)

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

Defined in: [api/queries/alliances.ts:222](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/alliances.ts#L222)

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

Defined in: [api/queries/alliances.ts:178](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/alliances.ts#L178)

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

Defined in: [builders/queryBuilder.ts:241](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L241)

Sanitize and escape a string value for safe GraphQL usage

#### Parameters

##### str

`string`

The string to sanitize

#### Returns

`string`

Sanitized string with escaped special characters

#### Throws

Error if string exceeds maximum length

#### Inherited from

`QueryBuilder.sanitizeString`

***

### select()

> **select**\<`Fields`\>(...`fields`): `AlliancesQuery`\<`Fields`\>

Defined in: [api/queries/alliances.ts:109](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/alliances.ts#L109)

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

Defined in: [builders/queryBuilder.ts:340](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L340)

**`Internal`**

Serialize filter value for GraphQL query

#### Parameters

##### value

`any`

The filter value to serialize

#### Returns

`string`

Serialized string representation

#### Inherited from

`QueryBuilder.serializeFilterValue`

***

### serializeObject()

> `protected` **serializeObject**(`obj`): `string`

Defined in: [builders/queryBuilder.ts:261](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L261)

Serialize an object to GraphQL format (enum values without quotes)

#### Parameters

##### obj

`Record`\<`string`, `any`\>

Object to serialize

#### Returns

`string`

GraphQL-formatted object string

#### Throws

Error if object is null/undefined or contains invalid field names

#### Inherited from

`QueryBuilder.serializeObject`

***

### validateInputLength()

> `protected` **validateInputLength**(`str`, `maxLength`): `void`

Defined in: [builders/queryBuilder.ts:489](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L489)

Validate input string length to prevent excessively large queries

#### Parameters

##### str

`string`

String to validate

##### maxLength

`number` = `10000`

Maximum allowed length (default: 10000)

#### Returns

`void`

#### Throws

Error if string exceeds maximum length

#### Inherited from

`QueryBuilder.validateInputLength`

***

### where()

> **where**(`filters`): `this`

Defined in: [api/queries/alliances.ts:133](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/alliances.ts#L133)

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
