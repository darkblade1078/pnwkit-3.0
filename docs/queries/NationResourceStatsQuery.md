[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [nationResourceStats](../README.md) / NationResourceStatsQuery

# Class: NationResourceStatsQuery\<F, I\>

Defined in: [api/queries/nationResourceStats.ts:62](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/nationResourceStats.ts#L62)

Query builder for fetching nation resource statistics from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.nationResourceStats()`
Each call creates a fresh instance with no shared state, preventing filter pollution.

Nation resource stats provide historical data on resource holdings for a specific nation.

Features:
- Type-safe field selection and filtering
- Date range filtering (before/after)
- Sorting support with orderBy
- Pagination support with optional paginatorInfo

Return types:
- `execute()` → Returns array of resource stats
- `execute(true)` → Returns `{ data: NationResourceStats[], paginatorInfo: {...} }`

## Example

```typescript
// Basic query with field selection
const stats = await pnwkit.queries.nationResourceStats()
  .select('date', 'money', 'food', 'steel')
  .where({ 
    after: '2025-01-01',
    orderBy: { column: 'DATE', order: 'DESC' }
  })
  .first(50)
  .execute();
// Type: { date: string, money: string, food: string, steel: string }[]

// Query all resources with date filtering
const allStats = await pnwkit.queries.nationResourceStats()
  .select('date', 'money', 'food', 'steel', 'aluminum', 'gasoline')
  .where({ 
    before: '2025-12-31',
    after: '2025-01-01'
  })
  .execute();

// With pagination info
const result = await pnwkit.queries.nationResourceStats()
  .select('date', 'money', 'food')
  .first(100)
  .execute(true);
console.log(result.data);           // Resource stats array
console.log(result.paginatorInfo);  // Pagination metadata
```

## Extends

- `QueryBuilder`\<`NationResourceStatsFields`, `NationResourceStatsQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `NationResourceStatsFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

## Constructors

### Constructor

> **new NationResourceStatsQuery**\<`F`, `I`\>(`kit`): `NationResourceStatsQuery`\<`F`, `I`\>

Defined in: [api/queries/nationResourceStats.ts:75](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/nationResourceStats.ts#L75)

**`Internal`**

Create a new NationResourceStatsQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`NationResourceStatsQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder<NationResourceStatsFields, NationResourceStatsQueryParams>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: [builders/queryBuilder.ts:220](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L220)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `NationResourceStatsQueryParams`

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

> `protected` **queryName**: `string` = `'nation_resource_stats'`

Defined in: [api/queries/nationResourceStats.ts:68](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/nationResourceStats.ts#L68)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `NationResourceStatsFields`[] = `[]`

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

> **execute**(): `Promise`\<`SelectFields`\<`NationResourceStatsFields`, `F`, `I`\>[]\>

Defined in: [api/queries/nationResourceStats.ts:192](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/nationResourceStats.ts#L192)

Execute the nation resource stats query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of resource stats
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields.
All other fields are excluded from the response.

##### Returns

`Promise`\<`SelectFields`\<`NationResourceStatsFields`, `F`, `I`\>[]\>

Array of resource stats, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const stats = await query.execute();
// Type: { date: string, money: string, food: string }[]
stats.forEach(stat => console.log(stat.date, stat.money));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Resource stats array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`NationResourceStatsFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/nationResourceStats.ts:193](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/nationResourceStats.ts#L193)

Execute the nation resource stats query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of resource stats
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields.
All other fields are excluded from the response.

##### Parameters

###### withPaginator

`true`

Whether to include pagination metadata in response

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`NationResourceStatsFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Array of resource stats, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const stats = await query.execute();
// Type: { date: string, money: string, food: string }[]
stats.forEach(stat => console.log(stat.date, stat.money));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Resource stats array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

***

### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): `NationResourceStatsQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/nationResourceStats.ts:149](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/nationResourceStats.ts#L149)

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

#### Type Parameters

##### K

`K` *extends* `never`

##### TConfig

`TConfig` *extends* `SubqueryConfig`\<`NationResourceStatsRelations`\[`K`\], `GetRelationsFor`\<`NationResourceStatsRelations`\[`K`\]\>, `GetQueryParamsFor`\<`NationResourceStatsRelations`\[`K`\]\>\>

##### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

##### TWrappedResult

`TWrappedResult` = `NationResourceStatsRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

#### Parameters

##### relation

`K`

The relation name to include

##### config

`TConfig`

A builder function for configuring the subquery

#### Returns

`NationResourceStatsQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

New query instance with included relation

#### Example

```typescript
// Basic subquery with field selection
.include('nation', builder => builder
  .select('id', 'nation_name', 'score')
)

// Subquery with filtering and nesting
.include('nation', builder => builder
  .select('id', 'nation_name')
  .where({ min_score: 1000 })
  .include('alliance', builder2 => builder2  // Unlimited nesting!
    .select('id', 'name', 'score')
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

> **select**\<`Fields`\>(...`fields`): `NationResourceStatsQuery`\<`Fields`\>

Defined in: [api/queries/nationResourceStats.ts:89](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/nationResourceStats.ts#L89)

Select specific fields to retrieve from nation resource stats

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `NationResourceStatsFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`NationResourceStatsQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```typescript
.select('date', 'money', 'food', 'steel', 'aluminum')
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

Defined in: [api/queries/nationResourceStats.ts:114](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/nationResourceStats.ts#L114)

Apply filters to the query

#### Parameters

##### filters

`NationResourceStatsQueryParams`

Query parameters for filtering results

#### Returns

`this`

This query instance for method chaining

#### Example

```typescript
.where({ 
  before: '2025-12-31',
  after: '2025-01-01',
  orderBy: { column: 'DATE', order: 'DESC' }
})
```
