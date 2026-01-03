[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [treasures](../README.md) / TreasuresQuery

# Class: TreasuresQuery\<F, I\>

Defined in: api/queries/treasures.ts:67

Query builder for fetching treasure data from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.treasures()`
Each call creates a fresh instance with no shared state, preventing filter pollution.

Treasures are special bonus items that can be obtained through various means in the game.

Features:
- Type-safe field selection and filtering
- Unlimited recursive nesting with automatic type inference
- Automatic cardinality detection for relations
- Pagination support with optional paginatorInfo

Return types:
- `execute()` → Returns array of treasures
- `execute(true)` → Returns `{ data: Treasure[], paginatorInfo: {...} }`

## Example

```typescript
// Basic query with field selection
const treasures = await pnwkit.queries.treasures()
  .select('name', 'color', 'continent', 'bonus', 'spawn_date')
  .first(50)
  .execute();
// Type: { name: string, color: string, continent: string, bonus: number, spawn_date: string }[]

// Query with filtering
const treasures = await pnwkit.queries.treasures()
  .select('name', 'bonus')
  .where({ 
    name: ['The Chalice'],
    orderBy: [{ column: 'BONUS', order: 'DESC' }]
  })
  .execute();

// With nested nation data (if treasure has nation relation)
const treasures = await pnwkit.queries.treasures()
  .select('name', 'bonus')
  .include('nation', builder => builder  // Singular or array based on schema
    .select('id', 'nation_name', 'score')
  )
  .first(100)
  .execute();

// With pagination info
const result = await pnwkit.queries.treasures()
  .select('name', 'bonus', 'color')
  .first(100)
  .execute(true);
console.log(result.data);           // Treasures array
console.log(result.paginatorInfo);  // Pagination metadata
```

## Extends

- `QueryBuilder`\<`TreasureFields`, `TreasureQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `TreasureFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

## Constructors

### Constructor

> **new TreasuresQuery**\<`F`, `I`\>(`kit`): `TreasuresQuery`\<`F`, `I`\>

Defined in: api/queries/treasures.ts:80

**`Internal`**

Create a new TreasuresQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`TreasuresQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder<TreasureFields, TreasureQueryParams>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: [builders/queryBuilder.ts:220](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/builders/queryBuilder.ts#L220)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `TreasureQueryParams`

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

> `protected` **queryName**: `string` = `'treasures'`

Defined in: api/queries/treasures.ts:73

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `TreasureFields`[] = `[]`

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

> **execute**(): `Promise`\<`SelectFields`\<`TreasureFields`, `F`, `I`\>[]\>

Defined in: api/queries/treasures.ts:196

Execute the treasures query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of treasures
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

##### Returns

`Promise`\<`SelectFields`\<`TreasureFields`, `F`, `I`\>[]\>

Array of treasures, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const treasures = await query.execute();
// Type: { name: string, bonus: number }[]
treasures.forEach(treasure => console.log(treasure.name, treasure.bonus));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Treasures array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`TreasureFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: api/queries/treasures.ts:197

Execute the treasures query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of treasures
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

##### Parameters

###### withPaginator

`true`

Whether to include pagination metadata in response

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`TreasureFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Array of treasures, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const treasures = await query.execute();
// Type: { name: string, bonus: number }[]
treasures.forEach(treasure => console.log(treasure.name, treasure.bonus));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Treasures array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.currentPage); // Current page number
```

***

### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): `TreasuresQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: api/queries/treasures.ts:153

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

#### Type Parameters

##### K

`K` *extends* `"nation"`

##### TConfig

`TConfig` *extends* `SubqueryConfig`\<`TreasureRelations`\[`K`\], `GetRelationsFor`\<`TreasureRelations`\[`K`\]\>, `GetQueryParamsFor`\<`TreasureRelations`\[`K`\]\>\>

##### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

##### TWrappedResult

`TWrappedResult` = `TreasureRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

#### Parameters

##### relation

`K`

The relation name to include

##### config

`TConfig`

A builder function for configuring the subquery

#### Returns

`TreasuresQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

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

> **select**\<`Fields`\>(...`fields`): `TreasuresQuery`\<`Fields`\>

Defined in: api/queries/treasures.ts:94

Select specific fields to retrieve from treasures

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `TreasureFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`TreasuresQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```typescript
.select('name', 'color', 'continent', 'bonus', 'spawn_date')
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

Defined in: api/queries/treasures.ts:118

Apply filters to the query

#### Parameters

##### filters

`TreasureQueryParams`

Query parameters for filtering results

#### Returns

`this`

This query instance for method chaining

#### Example

```typescript
.where({ 
  name: ['The Chalice', 'The Ark'],
  color: ['BLACK', 'MAROON']
})
```
