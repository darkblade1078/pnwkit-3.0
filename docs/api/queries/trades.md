[**pnwkit 3.0 v3.0.0**](../../README.md)

***

[pnwkit 3.0](../../modules.md) / api/queries/trades

# api/queries/trades

## Classes

### Query Builders

#### TradesQuery

Defined in: [api/queries/trades.ts:48](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/trades.ts#L48)

Query builder for fetching trade data from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.trades()`
Each call creates a fresh instance with no shared state, preventing filter pollution.

Features:
- Type-safe field selection and filtering
- Recursive nesting with automatic type inference
- Pagination support with optional paginatorInfo

##### Example

```typescript
// Get recent trades for a specific resource
const trades = await pnwkit.queries.trades()
  .select('id', 'type', 'date', 'offer_resource', 'buy_or_sell', 'price', 'accepted')
  .where({ offer_resource: 'FOOD', accepted: false })
  .first(100)
  .execute();
// Type: { id: number, type: string, date: string, offer_resource: string, buy_or_sell: string, price: number, accepted: boolean }[]

// Query trades with sender and receiver nation details
const trades = await pnwkit.queries.trades()
  .select('id', 'date', 'offer_resource', 'offer_amount', 'price')
  .include('sender', builder => builder
    .select('id', 'nation_name', 'alliance_id')
  )
  .include('receiver', builder => builder
    .select('id', 'nation_name', 'alliance_id')
  )
  .where({ type: 'GLOBAL' })
  .execute();
// Type: { id: number, ..., sender: {...}, receiver: {...} }[]
```

##### Extends

- `QueryBuilder`\<`TradeFields`, `TradeQueryParams`\>

##### Type Parameters

###### F

`F` *extends* readonly keyof `TradeFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

###### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

##### Properties

###### apiKey

> `protected` **apiKey**: `string`

Defined in: [services/queryBuilder.ts:234](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L234)

###### Inherited from

`QueryBuilder.apiKey`

###### filters

> `protected` **filters**: `TradeQueryParams`

Defined in: [services/queryBuilder.ts:240](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L240)

###### Inherited from

`QueryBuilder.filters`

###### limit?

> `protected` `optional` **limit**: `number`

Defined in: [services/queryBuilder.ts:232](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L232)

###### Inherited from

`QueryBuilder.limit`

###### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [services/queryBuilder.ts:233](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L233)

###### Inherited from

`QueryBuilder.pageNum`

###### queryName

> `protected` **queryName**: `string` = `'trades'`

Defined in: [api/queries/trades.ts:54](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/trades.ts#L54)

###### Overrides

`QueryBuilder.queryName`

###### selectedFields

> `protected` **selectedFields**: keyof `TradeFields`[] = `[]`

Defined in: [services/queryBuilder.ts:239](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L239)

###### Inherited from

`QueryBuilder.selectedFields`

###### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: [services/queryBuilder.ts:237](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L237)

###### Inherited from

`QueryBuilder.subqueries`

###### MAX\_ARRAY\_SIZE

> `protected` `readonly` `static` **MAX\_ARRAY\_SIZE**: `1000` = `1000`

Defined in: [services/queryBuilder.ts:254](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L254)

###### Inherited from

`QueryBuilder.MAX_ARRAY_SIZE`

###### MAX\_FIELD\_NAME\_LENGTH

> `protected` `readonly` `static` **MAX\_FIELD\_NAME\_LENGTH**: `100` = `100`

Defined in: [services/queryBuilder.ts:255](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L255)

###### Inherited from

`QueryBuilder.MAX_FIELD_NAME_LENGTH`

###### MAX\_FIELDS\_PER\_LEVEL

> `protected` `readonly` `static` **MAX\_FIELDS\_PER\_LEVEL**: `100` = `100`

Defined in: [services/queryBuilder.ts:251](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L251)

###### Inherited from

`QueryBuilder.MAX_FIELDS_PER_LEVEL`

###### MAX\_NESTING\_DEPTH

> `protected` `readonly` `static` **MAX\_NESTING\_DEPTH**: `10` = `10`

Defined in: [services/queryBuilder.ts:250](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L250)

###### Inherited from

`QueryBuilder.MAX_NESTING_DEPTH`

###### MAX\_QUERY\_SIZE

> `protected` `readonly` `static` **MAX\_QUERY\_SIZE**: `50000` = `50000`

Defined in: [services/queryBuilder.ts:252](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L252)

###### Inherited from

`QueryBuilder.MAX_QUERY_SIZE`

###### MAX\_STRING\_LENGTH

> `protected` `readonly` `static` **MAX\_STRING\_LENGTH**: `10000` = `10000`

Defined in: [services/queryBuilder.ts:253](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L253)

###### Inherited from

`QueryBuilder.MAX_STRING_LENGTH`

###### QUERIES\_WITHOUT\_DATA\_WRAPPER

> `protected` `readonly` `static` **QUERIES\_WITHOUT\_DATA\_WRAPPER**: `Set`\<`string`\>

Defined in: [services/queryBuilder.ts:247](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L247)

Queries that return data directly without wrapping in a 'data' object.
These queries follow a different GraphQL schema structure.

###### Inherited from

`QueryBuilder.QUERIES_WITHOUT_DATA_WRAPPER`

##### Methods

###### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [services/queryBuilder.ts:549](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L549)

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

> **execute**(): `Promise`\<`SelectFields`\<`TradeFields`, `F`, `I`\>[]\>

Defined in: [api/queries/trades.ts:109](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/trades.ts#L109)

###### Returns

`Promise`\<`SelectFields`\<`TradeFields`, `F`, `I`\>[]\>

###### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`TradeFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/trades.ts:110](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/trades.ts#L110)

###### Parameters

###### withPaginator

`true`

###### Returns

`Promise`\<\{ `data`: `SelectFields`\<`TradeFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

###### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): [`TradesQuery`](#tradesquery)\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/trades.ts:95](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/trades.ts#L95)

###### Type Parameters

###### K

`K` *extends* `never`

###### TConfig

`TConfig` *extends* `SubqueryConfig`\<`TradeRelations`\[`K`\], `GetRelationsFor`\<`TradeRelations`\[`K`\]\>, `GetQueryParamsFor`\<`TradeRelations`\[`K`\]\>\>

###### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

###### TWrappedResult

`TWrappedResult` = `TradeRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

###### Parameters

###### relation

`K`

###### config

`TConfig`

###### Returns

[`TradesQuery`](#tradesquery)\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

###### sanitizeString()

> `protected` **sanitizeString**(`str`): `string`

Defined in: [services/queryBuilder.ts:278](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L278)

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

> **select**\<`Fields`\>(...`fields`): [`TradesQuery`](#tradesquery)\<`Fields`\>

Defined in: [api/queries/trades.ts:73](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/trades.ts#L73)

Select specific fields to retrieve from trades

###### Type Parameters

###### Fields

`Fields` *extends* readonly keyof `TradeFields`[]

###### Parameters

###### fields

...`Fields`

Field names to select

###### Returns

[`TradesQuery`](#tradesquery)\<`Fields`\>

New query instance with selected fields

###### Throws

Error if no fields are provided

###### Example

```ts
.select('id', 'type', 'date', 'offer_resource', 'price')
```

###### serializeObject()

> `protected` **serializeObject**(`obj`): `string`

Defined in: [services/queryBuilder.ts:314](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/services/queryBuilder.ts#L314)

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

Defined in: [api/queries/trades.ts:89](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/api/queries/trades.ts#L89)

Apply filters to the query

###### Parameters

###### filters

`TradeQueryParams`

Query parameters for filtering results

###### Returns

`this`

This query instance for method chaining

###### Example

```ts
.where({ type: 'GLOBAL', accepted: true })
```
