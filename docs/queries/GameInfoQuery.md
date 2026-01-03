[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [gameInfo](../README.md) / GameInfoQuery

# Class: GameInfoQuery\<F, I\>

Defined in: api/queries/gameInfo.ts:54

Query builder for fetching game information from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.gameInfo()`
Each call creates a fresh instance with no shared state, preventing filter pollution.

Game info provides current game state data including the game date, radiation levels by continent,
and average city infrastructure.

Features:
- Type-safe field selection
- Access to current game date, global and regional radiation levels
- Real-time city average data

Return types:
- `execute()` → Returns game info object
- `execute(true)` → Returns `{ data: GameInfo, paginatorInfo: {...} }`

## Example

```typescript
// Basic query with field selection
const gameInfo = await pnwkit.queries.gameInfo()
  .select('game_date', 'radiation', 'city_average')
  .execute();
// Type: { game_date: string, radiation: Radiation, city_average: number }[]

// Access radiation data by continent
const gameInfo = await pnwkit.queries.gameInfo()
  .select('game_date', 'radiation')
  .execute();
console.log(gameInfo[0].radiation.global);        // Global radiation
console.log(gameInfo[0].radiation.north_america); // North America radiation

// Get current game date and city average
const gameInfo = await pnwkit.queries.gameInfo()
  .select('game_date', 'city_average')
  .execute();
console.log(gameInfo[0].game_date);      // Current game date
console.log(gameInfo[0].city_average);   // Average city infrastructure
```

## Extends

- `QueryBuilder`\<`GameInfoFields`, `GameInfoQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `GameInfoFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

## Constructors

### Constructor

> **new GameInfoQuery**\<`F`, `I`\>(`kit`): `GameInfoQuery`\<`F`, `I`\>

Defined in: api/queries/gameInfo.ts:67

**`Internal`**

Create a new GameInfoQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`GameInfoQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder<GameInfoFields, GameInfoQueryParams>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: [builders/queryBuilder.ts:220](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L220)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `GameInfoQueryParams`

Defined in: [builders/queryBuilder.ts:226](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L226)

#### Inherited from

`QueryBuilder.filters`

***

### limit?

> `protected` `optional` **limit**: `number`

Defined in: [builders/queryBuilder.ts:218](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L218)

#### Inherited from

`QueryBuilder.limit`

***

### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [builders/queryBuilder.ts:219](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L219)

#### Inherited from

`QueryBuilder.pageNum`

***

### queryName

> `protected` **queryName**: `string` = `'game_info'`

Defined in: api/queries/gameInfo.ts:60

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `GameInfoFields`[] = `[]`

Defined in: [builders/queryBuilder.ts:225](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L225)

#### Inherited from

`QueryBuilder.selectedFields`

***

### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: [builders/queryBuilder.ts:223](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L223)

#### Inherited from

`QueryBuilder.subqueries`

***

### QUERIES\_WITHOUT\_DATA\_WRAPPER

> `protected` `readonly` `static` **QUERIES\_WITHOUT\_DATA\_WRAPPER**: `Set`\<`string`\>

Defined in: [builders/queryBuilder.ts:231](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L231)

#### Inherited from

`QueryBuilder.QUERIES_WITHOUT_DATA_WRAPPER`

## Methods

### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [builders/queryBuilder.ts:407](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L407)

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

Defined in: [builders/queryBuilder.ts:370](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L370)

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

Defined in: [builders/queryBuilder.ts:299](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L299)

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

> **execute**(): `Promise`\<`SelectFields`\<`GameInfoFields`, `F`, `I`\>[]\>

Defined in: api/queries/gameInfo.ts:182

Execute the game info query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array with game info object
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

##### Returns

`Promise`\<`SelectFields`\<`GameInfoFields`, `F`, `I`\>[]\>

Array containing game info object, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const gameInfo = await query.execute();
// Type: { game_date: string, radiation: Radiation, city_average: number }[]
console.log(gameInfo[0].game_date);
console.log(gameInfo[0].radiation.global);

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Game info array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`GameInfoFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: api/queries/gameInfo.ts:183

Execute the game info query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array with game info object
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

##### Parameters

###### withPaginator

`true`

Whether to include pagination metadata in response

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`GameInfoFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Array containing game info object, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const gameInfo = await query.execute();
// Type: { game_date: string, radiation: Radiation, city_average: number }[]
console.log(gameInfo[0].game_date);
console.log(gameInfo[0].radiation.global);

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Game info array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

***

### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): `GameInfoQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: api/queries/gameInfo.ts:138

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

#### Type Parameters

##### K

`K` *extends* `never`

##### TConfig

`TConfig` *extends* `SubqueryConfig`\<`GameInfoRelations`\[`K`\], `GetRelationsFor`\<`GameInfoRelations`\[`K`\]\>, `GetQueryParamsFor`\<`GameInfoRelations`\[`K`\]\>\>

##### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

##### TWrappedResult

`TWrappedResult` = `GameInfoRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

#### Parameters

##### relation

`K`

The relation name to include

##### config

`TConfig`

A builder function for configuring the subquery

#### Returns

`GameInfoQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

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

Defined in: [builders/queryBuilder.ts:241](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L241)

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

> **select**\<`Fields`\>(...`fields`): `GameInfoQuery`\<`Fields`\>

Defined in: api/queries/gameInfo.ts:81

Select specific fields to retrieve from game info

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `GameInfoFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`GameInfoQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```typescript
.select('game_date', 'radiation', 'city_average')
```

***

### serializeFilterValue()

> `protected` **serializeFilterValue**(`value`): `string`

Defined in: [builders/queryBuilder.ts:340](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L340)

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

Defined in: [builders/queryBuilder.ts:261](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L261)

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

Defined in: [builders/queryBuilder.ts:489](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L489)

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

Defined in: api/queries/gameInfo.ts:103

Apply filters to the query

#### Parameters

##### filters

`GameInfoQueryParams`

Query parameters for filtering results

#### Returns

`this`

This query instance for method chaining

#### Note

Game info query does not support filtering parameters

#### Example

```typescript
.where({})
```
