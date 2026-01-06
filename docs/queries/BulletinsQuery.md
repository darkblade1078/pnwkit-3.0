[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [bulletins](../README.md) / BulletinsQuery

# Class: BulletinsQuery\<F, I\>

Defined in: [api/queries/bulletins.ts:26](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/bulletins.ts#L26)

Query builder for fetching bulletin data from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.bulletins()`
Bulletins are announcements posted by nations and alliances.

Features:
- Type-safe field selection and filtering
- Include author nation and alliance data
- Filter by ID, date range, nation, alliance, type
- Access to bulletin content and metadata
- Pagination support

## Extends

- `QueryBuilder`\<`BulletinFields`, `BulletinQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `BulletinFields`[] = \[\]

Selected field names

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations

## Constructors

### Constructor

> **new BulletinsQuery**\<`F`, `I`\>(`kit`): `BulletinsQuery`\<`F`, `I`\>

Defined in: [api/queries/bulletins.ts:39](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/bulletins.ts#L39)

**`Internal`**

Create a new BulletinsQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`BulletinsQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder<BulletinFields, BulletinQueryParams>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: services/queryBuilder.ts:234

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `BulletinQueryParams`

Defined in: services/queryBuilder.ts:240

#### Inherited from

`QueryBuilder.filters`

***

### limit?

> `protected` `optional` **limit**: `number`

Defined in: services/queryBuilder.ts:232

#### Inherited from

`QueryBuilder.limit`

***

### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: services/queryBuilder.ts:233

#### Inherited from

`QueryBuilder.pageNum`

***

### queryName

> `protected` **queryName**: `string` = `'bulletins'`

Defined in: [api/queries/bulletins.ts:32](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/bulletins.ts#L32)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `BulletinFields`[] = `[]`

Defined in: services/queryBuilder.ts:239

#### Inherited from

`QueryBuilder.selectedFields`

***

### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: services/queryBuilder.ts:237

#### Inherited from

`QueryBuilder.subqueries`

***

### MAX\_ARRAY\_SIZE

> `protected` `readonly` `static` **MAX\_ARRAY\_SIZE**: `1000` = `1000`

Defined in: services/queryBuilder.ts:254

#### Inherited from

`QueryBuilder.MAX_ARRAY_SIZE`

***

### MAX\_FIELD\_NAME\_LENGTH

> `protected` `readonly` `static` **MAX\_FIELD\_NAME\_LENGTH**: `100` = `100`

Defined in: services/queryBuilder.ts:255

#### Inherited from

`QueryBuilder.MAX_FIELD_NAME_LENGTH`

***

### MAX\_FIELDS\_PER\_LEVEL

> `protected` `readonly` `static` **MAX\_FIELDS\_PER\_LEVEL**: `100` = `100`

Defined in: services/queryBuilder.ts:251

#### Inherited from

`QueryBuilder.MAX_FIELDS_PER_LEVEL`

***

### MAX\_NESTING\_DEPTH

> `protected` `readonly` `static` **MAX\_NESTING\_DEPTH**: `10` = `10`

Defined in: services/queryBuilder.ts:250

#### Inherited from

`QueryBuilder.MAX_NESTING_DEPTH`

***

### MAX\_QUERY\_SIZE

> `protected` `readonly` `static` **MAX\_QUERY\_SIZE**: `50000` = `50000`

Defined in: services/queryBuilder.ts:252

#### Inherited from

`QueryBuilder.MAX_QUERY_SIZE`

***

### MAX\_STRING\_LENGTH

> `protected` `readonly` `static` **MAX\_STRING\_LENGTH**: `10000` = `10000`

Defined in: services/queryBuilder.ts:253

#### Inherited from

`QueryBuilder.MAX_STRING_LENGTH`

***

### QUERIES\_WITHOUT\_DATA\_WRAPPER

> `protected` `readonly` `static` **QUERIES\_WITHOUT\_DATA\_WRAPPER**: `Set`\<`string`\>

Defined in: services/queryBuilder.ts:247

Queries that return data directly without wrapping in a 'data' object.
These queries follow a different GraphQL schema structure.

#### Inherited from

`QueryBuilder.QUERIES_WITHOUT_DATA_WRAPPER`

## Methods

### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: services/queryBuilder.ts:549

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

Defined in: services/queryBuilder.ts:487

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

Defined in: services/queryBuilder.ts:369

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

> **execute**(): `Promise`\<`SelectFields`\<`BulletinFields`, `F`, `I`\>[]\>

Defined in: [api/queries/bulletins.ts:87](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/bulletins.ts#L87)

##### Returns

`Promise`\<`SelectFields`\<`BulletinFields`, `F`, `I`\>[]\>

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`BulletinFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/bulletins.ts:88](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/bulletins.ts#L88)

##### Parameters

###### withPaginator

`true`

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`BulletinFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

***

### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): `BulletinsQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/bulletins.ts:73](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/bulletins.ts#L73)

#### Type Parameters

##### K

`K` *extends* keyof `BulletinRelations`

##### TConfig

`TConfig` *extends* `SubqueryConfig`\<`BulletinRelations`\[`K`\], `GetRelationsFor`\<`BulletinRelations`\[`K`\]\>, `GetQueryParamsFor`\<`BulletinRelations`\[`K`\]\>\>

##### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

##### TWrappedResult

`TWrappedResult` = `BulletinRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

#### Parameters

##### relation

`K`

##### config

`TConfig`

#### Returns

`BulletinsQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

***

### sanitizeString()

> `protected` **sanitizeString**(`str`): `string`

Defined in: services/queryBuilder.ts:278

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

> **select**\<`Fields`\>(...`fields`): `BulletinsQuery`\<`Fields`\>

Defined in: [api/queries/bulletins.ts:51](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/bulletins.ts#L51)

Select specific fields to retrieve from bulletins

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `BulletinFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`BulletinsQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```ts
.select('id', 'headline', 'body', 'date', 'pinned')
```

***

### serializeFilterValue()

> `protected` **serializeFilterValue**(`value`): `string`

Defined in: services/queryBuilder.ts:459

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

Defined in: services/queryBuilder.ts:314

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

Defined in: [api/queries/bulletins.ts:67](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/bulletins.ts#L67)

Apply filters to the query

#### Parameters

##### filters

`BulletinQueryParams`

Query parameters for filtering results

#### Returns

`this`

This query instance for method chaining

#### Example

```ts
.where({ alliance_id: [1234], after: '2026-01-01' })
```
