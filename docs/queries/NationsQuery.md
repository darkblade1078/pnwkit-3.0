[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [nations](../README.md) / NationsQuery

# Class: NationsQuery\<F, I\>

Defined in: [api/queries/nations.ts:86](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/api/queries/nations.ts#L86)

Query builder for fetching nation data from the Politics & War API.

Create new instances using the factory method: `pnwkit.queries.nations()`
Each call creates a fresh instance with no shared state, preventing filter pollution.

Features:
- Type-safe field selection and filtering
- Unlimited recursive nesting with automatic type inference
- Automatic cardinality detection (singular vs array relations)
- Pagination support with optional paginatorInfo

Return types:
- `execute()` → Returns array of nations
- `execute(true)` → Returns `{ data: Nation[], paginatorInfo: {...} }`

## Example

```typescript
// Basic query with filtering and pagination
const nations = await pnwkit.queries.nations()
  .select('id', 'nation_name', 'score', 'alliance_id')
  .where({ 
    min_score: 1000, 
    max_score: 5000,
    orderBy: [{ column: 'SCORE', order: 'DESC' }]
  })
  .first(100)
  .execute();
// Type: { id: number, nation_name: string, score: number, alliance_id: number }[]

// Nested query with singular and array relations
const nations = await pnwkit.queries.nations()
  .select('id', 'nation_name')
  .include('alliance', builder => builder  // Singular: returns object
    .select('id', 'name', 'score')
    .where({ min_score: 5000 })
  )
  .include('cities', builder => builder  // Array: returns array
    .select('id', 'name', 'infrastructure')
  )
  .first(50)
  .execute();
// Type: { 
//   id: number, 
//   nation_name: string,
//   alliance: { id: number, name: string, score: number },
//   cities: { id: number, name: string, infrastructure: number }[]
// }[]

// Unlimited nesting depth
const nations = await pnwkit.queries.nations()
  .select('id', 'nation_name')
  .include('alliance', b1 => b1
    .select('id', 'name')
    .include('nations', b2 => b2  // Nested nations
      .select('id', 'nation_name')
      .include('cities', b3 => b3  // Unlimited depth!
        .select('id', 'name')
      )
    )
  )
  .execute();

// With pagination info
const result = await pnwkit.queries.nations()
  .select('id', 'nation_name')
  .first(500)
  .page(2)
  .execute(true);
console.log(result.data);           // Nations array
console.log(result.paginatorInfo);  // { currentPage, total, hasMorePages, ... }
```

## Extends

- `QueryBuilder`\<`NationFields`, `NationQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `NationFields`[] = \[\]

Selected field names (tracked through chaining for precise autocomplete)

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations (tracked through chaining with proper cardinality)

## Constructors

### Constructor

> **new NationsQuery**\<`F`, `I`\>(`kit`): `NationsQuery`\<`F`, `I`\>

Defined in: [api/queries/nations.ts:102](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/api/queries/nations.ts#L102)

**`Internal`**

Create a new NationsQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`NationsQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder< NationFields, // Main entity fields NationQueryParams // Filter parameters >.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: [builders/queryBuilder.ts:220](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L220)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `NationQueryParams`

Defined in: [builders/queryBuilder.ts:226](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L226)

#### Inherited from

`QueryBuilder.filters`

***

### limit?

> `protected` `optional` **limit**: `number`

Defined in: [builders/queryBuilder.ts:218](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L218)

#### Inherited from

`QueryBuilder.limit`

***

### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [builders/queryBuilder.ts:219](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L219)

#### Inherited from

`QueryBuilder.pageNum`

***

### queryName

> `protected` **queryName**: `string` = `'nations'`

Defined in: [api/queries/nations.ts:95](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/api/queries/nations.ts#L95)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `NationFields`[] = `[]`

Defined in: [builders/queryBuilder.ts:225](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L225)

#### Inherited from

`QueryBuilder.selectedFields`

***

### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: [builders/queryBuilder.ts:223](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L223)

#### Inherited from

`QueryBuilder.subqueries`

## Methods

### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [builders/queryBuilder.ts:431](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L431)

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

Defined in: [builders/queryBuilder.ts:394](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L394)

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

Defined in: [builders/queryBuilder.ts:325](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L325)

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

> **execute**(): `Promise`\<`SelectFields`\<`NationFields`, `F`, `I`\>[]\>

Defined in: [api/queries/nations.ts:218](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/api/queries/nations.ts#L218)

Execute the nations query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of nations
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

##### Returns

`Promise`\<`SelectFields`\<`NationFields`, `F`, `I`\>[]\>

Array of nations, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const nations = await query.execute();
// Type: { id: number, nation_name: string }[]
nations.forEach(nation => console.log(nation.id, nation.nation_name));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Nations array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.hasMorePages); // Boolean
```

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`NationFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/nations.ts:219](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/api/queries/nations.ts#L219)

Execute the nations query and return results.

Return type changes based on withPaginator parameter:
- `execute()` or `execute(false)` → Returns array of nations
- `execute(true)` → Returns object with data array and paginatorInfo

Results only include selected fields and included relations.
All other fields are excluded from the response.

##### Parameters

###### withPaginator

`true`

Whether to include pagination metadata in response

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`NationFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Array of nations, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Returns array directly
const nations = await query.execute();
// Type: { id: number, nation_name: string }[]
nations.forEach(nation => console.log(nation.id, nation.nation_name));

// Returns object with pagination info
const result = await query.execute(true);
// Type: { data: {...}[], paginatorInfo: {...} }
console.log(result.data);                    // Nations array
console.log(result.paginatorInfo.total);     // Total count
console.log(result.paginatorInfo.hasMorePages); // Boolean
```

***

### first()

> **first**(`count`): `this`

Defined in: [builders/queryBuilder.ts:240](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L240)

Set the maximum number of records to retrieve

#### Parameters

##### count

`number`

Number of records (max 500)

#### Returns

`this`

This query instance for method chaining

#### Example

```typescript
.first(500) // Get up to 500 records
```

#### Inherited from

`QueryBuilder.first`

***

### include()

> **include**\<`K`, `TConfig`, `TNestedResult`, `TWrappedResult`\>(`relation`, `config`): `NationsQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

Defined in: [api/queries/nations.ts:175](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/api/queries/nations.ts#L175)

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

#### Type Parameters

##### K

`K` *extends* keyof `NationRelations`

##### TConfig

`TConfig` *extends* `SubqueryConfig`\<`NationRelations`\[`K`\], `GetRelationsFor`\<`NationRelations`\[`K`\]\>, `GetQueryParamsFor`\<`NationRelations`\[`K`\]\>\>

##### TNestedResult

`TNestedResult` = `InferSubqueryType`\<`ReturnType`\<`TConfig`\>\>

##### TWrappedResult

`TWrappedResult` = `NationRelations`\[`K`\] *extends* `any`[] ? `TNestedResult`[] : `TNestedResult`

#### Parameters

##### relation

`K`

The relation name to include

##### config

`TConfig`

A builder function for configuring the subquery

#### Returns

`NationsQuery`\<`F`, `I` & `Record`\<`K`, `TWrappedResult`\>\>

New query instance with included relation

#### Example

```typescript
// Basic subquery with field selection
.include('cities', builder => builder
  .select('id', 'name', 'infrastructure')
)

// Subquery with filtering
.include('alliance', builder => builder
  .select('id', 'name', 'score')
  .where({ id: [1234] })
)

// Deeply nested subquery with unlimited depth
.include('alliance', builder => builder
  .select('id', 'name', 'score')
  .where({ min_score: 1000 })
  .include('nations', builder2 => builder2  // Unlimited nesting!
    .select('id', 'nation_name')
    .where({ min_score: 500 })
    .include('cities', builder3 => builder3
      .select('id', 'name', 'infrastructure')
    )
  )
)

// Important: Always select at least one scalar field at each level
// GraphQL requires this - you cannot query an object without selecting fields
```

***

### page()

> **page**(`pageNumber`): `this`

Defined in: [builders/queryBuilder.ts:255](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L255)

Set the page number for pagination

#### Parameters

##### pageNumber

`number`

The page number to retrieve (1-based)

#### Returns

`this`

This query instance for method chaining

#### Example

```typescript
.page(2) // Get the second page of results
```

#### Inherited from

`QueryBuilder.page`

***

### sanitizeString()

> `protected` **sanitizeString**(`str`): `string`

Defined in: [builders/queryBuilder.ts:267](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L267)

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

> **select**\<`Fields`\>(...`fields`): `NationsQuery`\<`Fields`\>

Defined in: [api/queries/nations.ts:114](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/api/queries/nations.ts#L114)

Select specific fields to retrieve from nations

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `NationFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`NationsQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```ts
.select('id', 'nation_name', 'score')
```

***

### serializeFilterValue()

> `protected` **serializeFilterValue**(`value`): `string`

Defined in: [builders/queryBuilder.ts:366](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L366)

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

Defined in: [builders/queryBuilder.ts:287](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L287)

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

Defined in: [builders/queryBuilder.ts:511](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/builders/queryBuilder.ts#L511)

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

Defined in: [api/queries/nations.ts:130](https://github.com/darkblade1078/pnwkit-3.0/blob/5f4e70cb9434cc0709809c75c8e5936e2af7e7fa/src/api/queries/nations.ts#L130)

Apply filters to the query

#### Parameters

##### filters

`NationQueryParams`

Query parameters for filtering results

#### Returns

`this`

This query instance for method chaining

#### Example

```ts
.where({ min_score: 1000, max_score: 5000 })
```
