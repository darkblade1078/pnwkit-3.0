[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [topTradeInfo](../README.md) / TopTradeInfoQuery

# Class: TopTradeInfoQuery\<F, I\>

Defined in: [api/queries/topTradeInfo.ts:52](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/topTradeInfo.ts#L52)

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
  .select('market_index', 'resources')
  .execute();
// Type: { market_index: number, resources: TopTradeResourceInfo[] }[]

// Access the data
console.log(tradeInfo[0].market_index);
console.log(tradeInfo[0].resources[0].resource);       // "FOOD"
console.log(tradeInfo[0].resources[0].average_price);  // Current avg price
console.log(tradeInfo[0].resources[0].best_buy_offer); // Best buy offer details

// With pagination info
const result = await pnwkit.queries.topTradeInfo()
  .select('market_index', 'resources')
  .execute(true);
console.log(result.data);           // Trade info array
console.log(result.paginatorInfo);  // Pagination metadata
```

## Extends

- `QueryBuilder`\<`TopTradeInfo`, \{ \}\>

## Type Parameters

### F

`F` *extends* readonly keyof `TopTradeInfo`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

## Constructors

### Constructor

> **new TopTradeInfoQuery**\<`F`, `I`\>(`kit`): `TopTradeInfoQuery`\<`F`, `I`\>

Defined in: [api/queries/topTradeInfo.ts:65](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/topTradeInfo.ts#L65)

**`Internal`**

Create a new TopTradeInfoQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`TopTradeInfoQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder<TopTradeInfo, {}>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: [builders/queryBuilder.ts:220](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/builders/queryBuilder.ts#L220)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `object`

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

> `protected` **queryName**: `string` = `'top_trade_info'`

Defined in: [api/queries/topTradeInfo.ts:58](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/topTradeInfo.ts#L58)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `TopTradeInfo`[] = `[]`

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

> **execute**(): `Promise`\<`SelectFields`\<`TopTradeInfo`, `F`, `I`\>[]\>

Defined in: [api/queries/topTradeInfo.ts:120](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/topTradeInfo.ts#L120)

Execute the top trade info query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array with top trade info object
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields.
All other fields are excluded from the response.

##### Returns

`Promise`\<`SelectFields`\<`TopTradeInfo`, `F`, `I`\>[]\>

Array containing top trade info object, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const tradeInfo = await query.execute();
// Type: { market_index: number, resources: TopTradeResourceInfo[] }[]
console.log(tradeInfo[0].market_index);
console.log(tradeInfo[0].resources[0].average_price);

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Trade info array
console.log(result.paginatorInfo.total);     // Total count
```

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`TopTradeInfo`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/topTradeInfo.ts:121](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/topTradeInfo.ts#L121)

Execute the top trade info query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array with top trade info object
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields.
All other fields are excluded from the response.

##### Parameters

###### withPaginator

`true`

Whether to include pagination metadata in response

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`TopTradeInfo`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Array containing top trade info object, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const tradeInfo = await query.execute();
// Type: { market_index: number, resources: TopTradeResourceInfo[] }[]
console.log(tradeInfo[0].market_index);
console.log(tradeInfo[0].resources[0].average_price);

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Trade info array
console.log(result.paginatorInfo.total);     // Total count
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

> **select**\<`Fields`\>(...`fields`): `TopTradeInfoQuery`\<`Fields`\>

Defined in: [api/queries/topTradeInfo.ts:79](https://github.com/darkblade1078/pnwkit-3.0/blob/3f6bfbce5d04df75da826889d485b71c55f30978/src/api/queries/topTradeInfo.ts#L79)

Select specific fields to retrieve from top trade info

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `TopTradeInfo`[]

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
.select('market_index', 'resources')
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
