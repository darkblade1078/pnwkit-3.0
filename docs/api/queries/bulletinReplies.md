[**pnwkit 3.0 v3.0.0**](../../README.md)

***

[pnwkit 3.0](../../modules.md) / api/queries/bulletinReplies

# api/queries/bulletinReplies

## Classes

### Query Builders

#### BulletinRepliesQuery

Defined in: [api/queries/bulletinReplies.ts:49](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/bulletinReplies.ts#L49)

Query builder for fetching bulletin reply data from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.bulletinReplies()`
Replies are comments posted on bulletins.

Features:
- Type-safe field selection and filtering
- Include author nation and parent bulletin data
- Filter by ID, bulletin ID, date range, nation
- Access to reply content and like count
- Pagination support

##### Example

```typescript
// Get recent replies to a bulletin
const replies = await pnwkit.queries.bulletinReplies()
  .select('id', 'message', 'date', 'nation_name', 'like_count')
  .where({ bulletin_id: [123456] })
  .first(100)
  .execute();
// Type: { id: number, message: string, date: string, nation_name: string, like_count: number }[]

// Query replies with author and bulletin details
const replies = await pnwkit.queries.bulletinReplies()
  .select('id', 'message', 'date', 'like_count')
  .include('nation', builder => builder
    .select('id', 'nation_name', 'alliance_id')
  )
  .include('bulletin', builder => builder
    .select('id', 'headline')
  )
  .execute();
// Type: { id: number, ..., nation: {...}, bulletin: {...} }[]
```

##### Extends

- `QueryBuilder`\<`BulletinReplyFields`, `BulletinRepliesQueryParams`\>

##### Type Parameters

###### F

`F` *extends* readonly keyof `BulletinReplyFields`[] = \[\]

Selected field names

###### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations

##### Properties

###### apiKey

> `protected` **apiKey**: `string`

Defined in: [services/queryBuilder.ts:234](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/services/queryBuilder.ts#L234)

###### Inherited from

`QueryBuilder.apiKey`

###### filters

> `protected` **filters**: `BulletinRepliesQueryParams`

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

> `protected` **queryName**: `string` = `'bulletin_replies'`

Defined in: [api/queries/bulletinReplies.ts:55](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/bulletinReplies.ts#L55)

###### Overrides

`QueryBuilder.queryName`

###### selectedFields

> `protected` **selectedFields**: keyof `BulletinReplyFields`[] = `[]`

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

> **execute**(): `Promise`\<`SelectFields`\<`BulletinReplyFields`, `F`, `I`\>[]\>

Defined in: [api/queries/bulletinReplies.ts:110](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/bulletinReplies.ts#L110)

###### Returns

`Promise`\<`SelectFields`\<`BulletinReplyFields`, `F`, `I`\>[]\>

###### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`BulletinReplyFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/bulletinReplies.ts:111](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/bulletinReplies.ts#L111)

###### Parameters

###### withPaginator

`true`

###### Returns

`Promise`\<\{ `data`: `SelectFields`\<`BulletinReplyFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

###### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): [`BulletinRepliesQuery`](#bulletinrepliesquery)\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/bulletinReplies.ts:96](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/bulletinReplies.ts#L96)

###### Type Parameters

###### K

`K` *extends* keyof `BulletinReplyRelations`

###### TConfig

`TConfig` *extends* `SubqueryConfig`\<`BulletinReplyRelations`\[`K`\], `GetRelationsFor`\<`BulletinReplyRelations`\[`K`\]\>, `GetQueryParamsFor`\<`BulletinReplyRelations`\[`K`\]\>\>

###### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

###### TWrappedResult

`TWrappedResult` = `BulletinReplyRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

###### Parameters

###### relation

`K`

###### config

`TConfig`

###### Returns

[`BulletinRepliesQuery`](#bulletinrepliesquery)\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

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

> **select**\<`Fields`\>(...`fields`): [`BulletinRepliesQuery`](#bulletinrepliesquery)\<`Fields`\>

Defined in: [api/queries/bulletinReplies.ts:74](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/bulletinReplies.ts#L74)

Select specific fields to retrieve from bulletin replies

###### Type Parameters

###### Fields

`Fields` *extends* readonly keyof `BulletinReplyFields`[]

###### Parameters

###### fields

...`Fields`

Field names to select

###### Returns

[`BulletinRepliesQuery`](#bulletinrepliesquery)\<`Fields`\>

New query instance with selected fields

###### Throws

Error if no fields are provided

###### Example

```ts
.select('id', 'message', 'date', 'nation_name', 'like_count')
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

Defined in: [api/queries/bulletinReplies.ts:90](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/api/queries/bulletinReplies.ts#L90)

Apply filters to the query

###### Parameters

###### filters

`BulletinRepliesQueryParams`

Query parameters for filtering results

###### Returns

`this`

This query instance for method chaining

###### Example

```ts
.where({ bulletin_id: [12345], after: '2026-01-01' })
```
