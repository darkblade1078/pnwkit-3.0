[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [topTradeInfo](../README.md) / TopTradeInfoQuery

# Class: TopTradeInfoQuery\<F, I\>

Defined in: [api/queries/topTradeInfo.ts:58](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/topTradeInfo.ts#L58)

Query builder for fetching top trade information from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.topTradeInfo()`
Each call creates a fresh instance with no shared state, preventing filter pollution.

Top trade info provides current market data including market index and resource-specific
trade information with best buy/sell offers.

Features:
- Type-safe field selection
- Access to real-time market index and resource prices
- Best buy/sell offer data per resource

Return types:
- `execute()` → Returns top trade info object
- `execute(true)` → Returns `{ data: TopTradeInfo, paginatorInfo: {...} }`

## Example

```typescript
// Basic query with fields
const tradeInfo = await pnwkit.queries.topTradeInfo()
  .select('market_index')
  .include('resources', builder => builder
    .select('resource', 'average_price')
  )
  .execute();
// Type: { market_index: number, resources: { resource: string, average_price: number }[] }

// Access the data
console.log(tradeInfo.market_index);
console.log(tradeInfo.resources[0].resource);       // "FOOD"
console.log(tradeInfo.resources[0].average_price);  // Current avg price

// With pagination info
const result = await pnwkit.queries.topTradeInfo()
  .select('market_index')
  .include('resources', builder => builder
    .select('resource', 'average_price')
  )
  .execute(true);
console.log(result.data);           // Trade info object
console.log(result.paginatorInfo);  // Pagination metadata
```

## Extends

- `QueryBuilder`\<`TopTradeInfoFields`, `TopTradeInfoQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `TopTradeInfoFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

## Constructors

### Constructor

> **new TopTradeInfoQuery**\<`F`, `I`\>(`kit`): `TopTradeInfoQuery`\<`F`, `I`\>

Defined in: [api/queries/topTradeInfo.ts:71](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/topTradeInfo.ts#L71)

**`Internal`**

Create a new TopTradeInfoQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`TopTradeInfoQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder<TopTradeInfoFields, TopTradeInfoQueryParams>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: [services/queryBuilder.ts:234](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L234)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `TopTradeInfoQueryParams`

Defined in: [services/queryBuilder.ts:240](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L240)

#### Inherited from

`QueryBuilder.filters`

***

### limit?

> `protected` `optional` **limit**: `number`

Defined in: [services/queryBuilder.ts:232](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L232)

#### Inherited from

`QueryBuilder.limit`

***

### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [services/queryBuilder.ts:233](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L233)

#### Inherited from

`QueryBuilder.pageNum`

***

### queryName

> `protected` **queryName**: `string` = `'top_trade_info'`

Defined in: [api/queries/topTradeInfo.ts:64](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/topTradeInfo.ts#L64)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `TopTradeInfoFields`[] = `[]`

Defined in: [services/queryBuilder.ts:239](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L239)

#### Inherited from

`QueryBuilder.selectedFields`

***

### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: [services/queryBuilder.ts:237](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L237)

#### Inherited from

`QueryBuilder.subqueries`

***

### MAX\_ARRAY\_SIZE

> `protected` `readonly` `static` **MAX\_ARRAY\_SIZE**: `1000` = `1000`

Defined in: [services/queryBuilder.ts:254](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L254)

#### Inherited from

`QueryBuilder.MAX_ARRAY_SIZE`

***

### MAX\_FIELD\_NAME\_LENGTH

> `protected` `readonly` `static` **MAX\_FIELD\_NAME\_LENGTH**: `100` = `100`

Defined in: [services/queryBuilder.ts:255](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L255)

#### Inherited from

`QueryBuilder.MAX_FIELD_NAME_LENGTH`

***

### MAX\_FIELDS\_PER\_LEVEL

> `protected` `readonly` `static` **MAX\_FIELDS\_PER\_LEVEL**: `100` = `100`

Defined in: [services/queryBuilder.ts:251](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L251)

#### Inherited from

`QueryBuilder.MAX_FIELDS_PER_LEVEL`

***

### MAX\_NESTING\_DEPTH

> `protected` `readonly` `static` **MAX\_NESTING\_DEPTH**: `10` = `10`

Defined in: [services/queryBuilder.ts:250](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L250)

#### Inherited from

`QueryBuilder.MAX_NESTING_DEPTH`

***

### MAX\_QUERY\_SIZE

> `protected` `readonly` `static` **MAX\_QUERY\_SIZE**: `50000` = `50000`

Defined in: [services/queryBuilder.ts:252](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L252)

#### Inherited from

`QueryBuilder.MAX_QUERY_SIZE`

***

### MAX\_STRING\_LENGTH

> `protected` `readonly` `static` **MAX\_STRING\_LENGTH**: `10000` = `10000`

Defined in: [services/queryBuilder.ts:253](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L253)

#### Inherited from

`QueryBuilder.MAX_STRING_LENGTH`

***

### QUERIES\_WITHOUT\_DATA\_WRAPPER

> `protected` `readonly` `static` **QUERIES\_WITHOUT\_DATA\_WRAPPER**: `Set`\<`string`\>

Defined in: [services/queryBuilder.ts:247](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L247)

Queries that return data directly without wrapping in a 'data' object.
These queries follow a different GraphQL schema structure.

#### Inherited from

`QueryBuilder.QUERIES_WITHOUT_DATA_WRAPPER`

## Methods

### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [services/queryBuilder.ts:549](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L549)

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

Defined in: [services/queryBuilder.ts:487](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L487)

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

Defined in: [services/queryBuilder.ts:369](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L369)

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

> **execute**(): `Promise`\<`SelectFields`\<`TopTradeInfoFields`, `F`, `I`\>\>

Defined in: [api/queries/topTradeInfo.ts:169](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/topTradeInfo.ts#L169)

Execute the top trade info query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns single top trade info object
- `execute(true)` → Returns object with data and paginatorInfo

Results only include selected fields.
All other fields are excluded from the response.

##### Returns

`Promise`\<`SelectFields`\<`TopTradeInfoFields`, `F`, `I`\>\>

Single top trade info object, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns single object directly
const tradeInfo = await query.execute();
// Type: { market_index: number, resources: TopTradeResourceInfo[] }
console.log(tradeInfo.market_index);
console.log(tradeInfo.resources[0].average_price);

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}, paginatorInfo: {...} }
console.log(result.data);                    // Trade info object
console.log(result.paginatorInfo.total);     // Total count
```

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`TopTradeInfoFields`, `F`, `I`\>; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/topTradeInfo.ts:170](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/topTradeInfo.ts#L170)

Execute the top trade info query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns single top trade info object
- `execute(true)` → Returns object with data and paginatorInfo

Results only include selected fields.
All other fields are excluded from the response.

##### Parameters

###### withPaginator

`true`

Whether to include pagination metadata in response

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`TopTradeInfoFields`, `F`, `I`\>; `paginatorInfo`: `paginatorInfo`; \}\>

Single top trade info object, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns single object directly
const tradeInfo = await query.execute();
// Type: { market_index: number, resources: TopTradeResourceInfo[] }
console.log(tradeInfo.market_index);
console.log(tradeInfo.resources[0].average_price);

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}, paginatorInfo: {...} }
console.log(result.data);                    // Trade info object
console.log(result.paginatorInfo.total);     // Total count
```

***

### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): `TopTradeInfoQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/topTradeInfo.ts:126](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/topTradeInfo.ts#L126)

Include related data in the query results

#### Type Parameters

##### K

`K` *extends* `"resources"`

##### TConfig

`TConfig` *extends* `SubqueryConfig`\<`TopTradeInfoRelations`\[`K`\], `GetRelationsFor`\<`TopTradeInfoRelations`\[`K`\]\>, `GetQueryParamsFor`\<`TopTradeInfoRelations`\[`K`\]\>\>

##### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

##### TWrappedResult

`TWrappedResult` = `TopTradeInfoRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

#### Parameters

##### relation

`K`

The relation name to include

##### config

`TConfig`

A builder function for configuring the subquery

#### Returns

`TopTradeInfoQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

New query instance with included relation

#### Example

```typescript
// Include resources with specific fields
.include('resources', builder => builder
  .select('resource', 'average_price')
)
```

***

### sanitizeString()

> `protected` **sanitizeString**(`str`): `string`

Defined in: [services/queryBuilder.ts:278](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L278)

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

> **select**\<`Fields`\>(...`fields`): `TopTradeInfoQuery`\<`Fields`\>

Defined in: [api/queries/topTradeInfo.ts:85](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/topTradeInfo.ts#L85)

Select specific fields to retrieve from top trade info

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `TopTradeInfoFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`TopTradeInfoQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```typescript
.select('market_index')
```

***

### serializeFilterValue()

> `protected` **serializeFilterValue**(`value`): `string`

Defined in: [services/queryBuilder.ts:459](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L459)

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

Defined in: [services/queryBuilder.ts:314](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/services/queryBuilder.ts#L314)

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

Defined in: [api/queries/topTradeInfo.ts:106](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/topTradeInfo.ts#L106)

Apply filters to the query

#### Parameters

##### filters

`TopTradeInfoQueryParams`

Query parameters for filtering results

#### Returns

`this`

This query instance for method chaining

#### Example

```typescript
.where({ resources: [Resources.FOOD, Resources.COAL] })
```
