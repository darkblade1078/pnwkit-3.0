[**pnwkit 3.0 v3.0.0**](../../README.md)

***

[pnwkit 3.0](../../modules.md) / api/queries/gameInfo

# api/queries/gameInfo

## Classes

### Query Builders

#### GameInfoQuery

Defined in: [api/queries/gameInfo.ts:54](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/gameInfo.ts#L54)

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

##### Example

```typescript
// Basic query with field selection
const gameInfo = await pnwkit.queries.gameInfo()
  .select('game_date', 'radiation', 'city_average')
  .execute();
// Type: { game_date: string, radiation: Radiation, city_average: number }

// Access radiation data by continent
const gameInfo = await pnwkit.queries.gameInfo()
  .select('game_date', 'radiation')
  .execute();
console.log(gameInfo.radiation.global);        // Global radiation
console.log(gameInfo.radiation.north_america); // North America radiation

// Get current game date and city average
const gameInfo = await pnwkit.queries.gameInfo()
  .select('game_date', 'city_average')
  .execute();
console.log(gameInfo.game_date);      // Current game date
console.log(gameInfo.city_average);   // Average city infrastructure
```

##### Extends

- `QueryBuilder`\<`GameInfoFields`, `GameInfoQueryParams`\>

##### Type Parameters

###### F

`F` *extends* readonly keyof `GameInfoFields`[] = \[\]

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

> `protected` **filters**: `GameInfoQueryParams`

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

> `protected` **queryName**: `string` = `'game_info'`

Defined in: [api/queries/gameInfo.ts:60](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/gameInfo.ts#L60)

###### Overrides

`QueryBuilder.queryName`

###### selectedFields

> `protected` **selectedFields**: keyof `GameInfoFields`[] = `[]`

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

> **execute**(): `Promise`\<`SelectFields`\<`GameInfoFields`, `F`, `I`\>\>

Defined in: [api/queries/gameInfo.ts:182](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/gameInfo.ts#L182)

Execute the game info query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns single game info object
- `execute(true)` → Returns object with data and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

###### Returns

`Promise`\<`SelectFields`\<`GameInfoFields`, `F`, `I`\>\>

Single game info object, or object with data and paginatorInfo if withPaginator is true

###### Throws

Error if the query fails or returns no data

###### Example

```typescript
// Returns single object directly
const gameInfo = await query.execute();
// Type: { game_date: string, radiation: Radiation, city_average: number }
console.log(gameInfo.game_date);
console.log(gameInfo.radiation.global);

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}, paginatorInfo: {...} }
console.log(result.data);                    // Game info object
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

###### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`GameInfoFields`, `F`, `I`\>; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/gameInfo.ts:183](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/gameInfo.ts#L183)

Execute the game info query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns single game info object
- `execute(true)` → Returns object with data and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

###### Parameters

###### withPaginator

`true`

Whether to include pagination metadata in response

###### Returns

`Promise`\<\{ `data`: `SelectFields`\<`GameInfoFields`, `F`, `I`\>; `paginatorInfo`: `paginatorInfo`; \}\>

Single game info object, or object with data and paginatorInfo if withPaginator is true

###### Throws

Error if the query fails or returns no data

###### Example

```typescript
// Returns single object directly
const gameInfo = await query.execute();
// Type: { game_date: string, radiation: Radiation, city_average: number }
console.log(gameInfo.game_date);
console.log(gameInfo.radiation.global);

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}, paginatorInfo: {...} }
console.log(result.data);                    // Game info object
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

###### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): [`GameInfoQuery`](#gameinfoquery)\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/gameInfo.ts:138](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/gameInfo.ts#L138)

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

###### Type Parameters

###### K

`K` *extends* `never`

###### TConfig

`TConfig` *extends* `SubqueryConfig`\<`GameInfoRelations`\[`K`\], `GetRelationsFor`\<`GameInfoRelations`\[`K`\]\>, `GetQueryParamsFor`\<`GameInfoRelations`\[`K`\]\>\>

###### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

###### TWrappedResult

`TWrappedResult` = `GameInfoRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

###### Parameters

###### relation

`K`

The relation name to include

###### config

`TConfig`

A builder function for configuring the subquery

###### Returns

[`GameInfoQuery`](#gameinfoquery)\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

New query instance with included relation

###### Example

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

> **select**\<`Fields`\>(...`fields`): [`GameInfoQuery`](#gameinfoquery)\<`Fields`\>

Defined in: [api/queries/gameInfo.ts:81](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/gameInfo.ts#L81)

Select specific fields to retrieve from game info

###### Type Parameters

###### Fields

`Fields` *extends* readonly keyof `GameInfoFields`[]

###### Parameters

###### fields

...`Fields`

Field names to select

###### Returns

[`GameInfoQuery`](#gameinfoquery)\<`Fields`\>

New query instance with selected fields

###### Throws

Error if no fields are provided

###### Example

```typescript
.select('game_date', 'radiation', 'city_average')
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

Defined in: [api/queries/gameInfo.ts:103](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/gameInfo.ts#L103)

Apply filters to the query

###### Parameters

###### filters

`GameInfoQueryParams`

Query parameters for filtering results

###### Returns

`this`

This query instance for method chaining

###### Note

Game info query does not support filtering parameters

###### Example

```typescript
.where({})
```
