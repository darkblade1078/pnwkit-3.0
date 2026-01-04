[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [topTradeInfo](../README.md) / TopTradeInfoQuery

# Class: TopTradeInfoQuery\<F, I\>

Defined in: [api/queries/topTradeInfo.ts:58](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/topTradeInfo.ts#L58)

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

Defined in: [api/queries/topTradeInfo.ts:71](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/topTradeInfo.ts#L71)

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

Defined in: [builders/queryBuilder.ts:232](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/builders/queryBuilder.ts#L232)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `TopTradeInfoQueryParams`

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

> `protected` **queryName**: `string` = `'top_trade_info'`

Defined in: [api/queries/topTradeInfo.ts:64](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/topTradeInfo.ts#L64)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `TopTradeInfoFields`[] = `[]`

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

#### Call Signature

> **execute**(): `Promise`\<`SelectFields`\<`TopTradeInfoFields`, `F`, `I`\>\>

Defined in: [api/queries/topTradeInfo.ts:169](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/topTradeInfo.ts#L169)

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

Defined in: [api/queries/topTradeInfo.ts:170](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/topTradeInfo.ts#L170)

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

Defined in: [api/queries/topTradeInfo.ts:126](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/topTradeInfo.ts#L126)

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

> **select**\<`Fields`\>(...`fields`): `TopTradeInfoQuery`\<`Fields`\>

Defined in: [api/queries/topTradeInfo.ts:85](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/topTradeInfo.ts#L85)

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

Defined in: [api/queries/topTradeInfo.ts:106](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/queries/topTradeInfo.ts#L106)

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
