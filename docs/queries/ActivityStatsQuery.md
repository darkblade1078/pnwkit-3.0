[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [activityStats](../README.md) / ActivityStatsQuery

# Class: ActivityStatsQuery\<F\>

Defined in: [api/queries/activityStats.ts:23](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/activityStats.ts#L23)

Query builder for fetching activity statistics from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.activityStats()`
Provides historical data on player activity metrics.

Features:
- Type-safe field selection and filtering
- Filter by date range
- Access to daily activity statistics
- Pagination support

## Extends

- `QueryBuilder`\<`ActivityStatsFields`, `ActivityStatsQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `ActivityStatsFields`[] = \[\]

Selected field names

## Constructors

### Constructor

> **new ActivityStatsQuery**\<`F`\>(`kit`): `ActivityStatsQuery`\<`F`\>

Defined in: [api/queries/activityStats.ts:35](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/activityStats.ts#L35)

**`Internal`**

Create a new ActivityStatsQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`ActivityStatsQuery`\<`F`\>

#### Overrides

`QueryBuilder<ActivityStatsFields, ActivityStatsQueryParams>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: services/queryBuilder.ts:234

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `ActivityStatsQueryParams`

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

> `protected` **queryName**: `string` = `'activity_stats'`

Defined in: [api/queries/activityStats.ts:28](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/activityStats.ts#L28)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `ActivityStatsFields`[] = `[]`

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

> **execute**(): `Promise`\<`Required`\<`Pick`\<`ActivityStatsFields`, `F`\[`number`\]\>\>[]\>

Defined in: [api/queries/activityStats.ts:69](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/activityStats.ts#L69)

##### Returns

`Promise`\<`Required`\<`Pick`\<`ActivityStatsFields`, `F`\[`number`\]\>\>[]\>

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `Required`\<`Pick`\<`ActivityStatsFields`, `F`\[`number`\]\>\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/activityStats.ts:70](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/activityStats.ts#L70)

##### Parameters

###### withPaginator

`true`

##### Returns

`Promise`\<\{ `data`: `Required`\<`Pick`\<`ActivityStatsFields`, `F`\[`number`\]\>\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

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

> **select**\<`Fields`\>(...`fields`): `ActivityStatsQuery`\<`Fields`\>

Defined in: [api/queries/activityStats.ts:47](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/activityStats.ts#L47)

Select specific fields to retrieve from activity stats

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `ActivityStatsFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`ActivityStatsQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```ts
.select('date', 'total_nations', 'active_1_day', 'active_1_week')
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

Defined in: [api/queries/activityStats.ts:63](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/queries/activityStats.ts#L63)

Apply filters to the query

#### Parameters

##### filters

`ActivityStatsQueryParams`

Query parameters for filtering results

#### Returns

`this`

This query instance for method chaining

#### Example

```ts
.where({ before: '2026-01-01', after: '2025-12-01' })
```
