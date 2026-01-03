[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [colors](../README.md) / ColorsQuery

# Class: ColorsQuery\<F, I\>

Defined in: api/queries/colors.ts:52

Query builder for fetching color trade bloc data from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.colors()`
Each call creates a fresh instance with no shared state, preventing filter pollution.

Colors represent trade blocs in the game, each providing different bonuses and benefits.

Features:
- Type-safe field selection
- Access to color names, bloc names, and turn bonuses
- No filtering parameters (returns all colors)

Return types:
- `execute()` → Returns array of colors
- `execute(true)` → Returns `{ data: Color[], paginatorInfo: {...} }`

## Example

```typescript
// Basic query with field selection
const colors = await pnwkit.queries.colors()
  .select('color', 'bloc_name', 'turn_bonus')
  .execute();
// Type: { color: string, bloc_name: string, turn_bonus: number }[]

// Query all available colors
const allColors = await pnwkit.queries.colors()
  .select('color', 'bloc_name')
  .execute();
console.log(allColors);  // Array of all colors

// With pagination info
const result = await pnwkit.queries.colors()
  .select('color', 'bloc_name', 'turn_bonus')
  .execute(true);
console.log(result.data);           // Colors array
console.log(result.paginatorInfo);  // Pagination metadata
```

## Extends

- `QueryBuilder`\<`ColorFields`, `ColorQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `ColorFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

## Constructors

### Constructor

> **new ColorsQuery**\<`F`, `I`\>(`kit`): `ColorsQuery`\<`F`, `I`\>

Defined in: api/queries/colors.ts:65

**`Internal`**

Create a new ColorsQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`ColorsQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder<ColorFields, ColorQueryParams>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: [builders/queryBuilder.ts:220](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L220)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `ColorQueryParams`

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

> `protected` **queryName**: `string` = `'colors'`

Defined in: api/queries/colors.ts:58

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `ColorFields`[] = `[]`

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

> **execute**(): `Promise`\<`SelectFields`\<`ColorFields`, `F`, `I`\>[]\>

Defined in: api/queries/colors.ts:179

Execute the colors query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of colors
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields.
All other fields are excluded from the response.

##### Returns

`Promise`\<`SelectFields`\<`ColorFields`, `F`, `I`\>[]\>

Array of colors, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const colors = await query.execute();
// Type: { color: string, bloc_name: string, turn_bonus: number }[]
colors.forEach(color => console.log(color.color, color.bloc_name));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Colors array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`ColorFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: api/queries/colors.ts:180

Execute the colors query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of colors
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields.
All other fields are excluded from the response.

##### Parameters

###### withPaginator

`true`

Whether to include pagination metadata in response

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`ColorFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Array of colors, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const colors = await query.execute();
// Type: { color: string, bloc_name: string, turn_bonus: number }[]
colors.forEach(color => console.log(color.color, color.bloc_name));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Colors array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

***

### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): `ColorsQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: api/queries/colors.ts:136

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

#### Type Parameters

##### K

`K` *extends* `never`

##### TConfig

`TConfig` *extends* `SubqueryConfig`\<`ColorRelations`\[`K`\], `GetRelationsFor`\<`ColorRelations`\[`K`\]\>, `GetQueryParamsFor`\<`ColorRelations`\[`K`\]\>\>

##### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

##### TWrappedResult

`TWrappedResult` = `ColorRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

#### Parameters

##### relation

`K`

The relation name to include

##### config

`TConfig`

A builder function for configuring the subquery

#### Returns

`ColorsQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

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

> **select**\<`Fields`\>(...`fields`): `ColorsQuery`\<`Fields`\>

Defined in: api/queries/colors.ts:79

Select specific fields to retrieve from colors

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `ColorFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`ColorsQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```typescript
.select('color', 'bloc_name', 'turn_bonus')
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

Defined in: api/queries/colors.ts:101

Apply filters to the query

#### Parameters

##### filters

`ColorQueryParams`

Query parameters for filtering results

#### Returns

`this`

This query instance for method chaining

#### Note

Colors query does not support filtering parameters

#### Example

```typescript
.where({})
```
