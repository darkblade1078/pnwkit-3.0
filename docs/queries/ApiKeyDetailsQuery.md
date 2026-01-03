[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [apiKeyDetails](../README.md) / ApiKeyDetailsQuery

# Class: ApiKeyDetailsQuery\<F, I\>

Defined in: [api/queries/apiKeyDetails.ts:71](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/apiKeyDetails.ts#L71)

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

Defined in: [api/queries/apiKeyDetails.ts:84](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/apiKeyDetails.ts#L84)

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

Defined in: [builders/queryBuilder.ts:220](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L220)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `ApiKeyDetailsQueryParams`

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

> `protected` **queryName**: `string` = `'me'`

Defined in: [api/queries/apiKeyDetails.ts:77](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/apiKeyDetails.ts#L77)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `ApiKeyDetailsFields`[] = `[]`

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

> **execute**(): `Promise`\<`SelectFields`\<`ApiKeyDetailsFields`, `F`, `I`\>\>

Defined in: [api/queries/apiKeyDetails.ts:200](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/apiKeyDetails.ts#L200)

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

Defined in: [api/queries/apiKeyDetails.ts:159](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/apiKeyDetails.ts#L159)

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

> **select**\<`Fields`\>(...`fields`): `ApiKeyDetailsQuery`\<`Fields`\>

Defined in: [api/queries/apiKeyDetails.ts:98](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/apiKeyDetails.ts#L98)

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

Defined in: [api/queries/apiKeyDetails.ts:119](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/apiKeyDetails.ts#L119)

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
