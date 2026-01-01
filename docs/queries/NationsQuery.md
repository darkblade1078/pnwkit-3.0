[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [nations](../README.md) / NationsQuery

# Class: NationsQuery\<F, I\>

Defined in: [api/queries/nations.ts:50](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/api/queries/nations.ts#L50)

Query builder for fetching nation data from the Politics & War API

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder function receives complete type safety for fields, relations,
and query parameters specific to that entity.

## Example

```typescript
// Query with filters and field selection
const nations = await pnwkit.nationsQuery
  .select('id', 'nation_name', 'score', 'alliance_id')
  .where({ 
    min_score: 1000, 
    max_score: 5000,
    orderBy: [{ column: 'SCORE', order: 'DESC' }]
  })
  .first(100)
  .execute();

// Deeply nested query with unlimited depth
const nations = await pnwkit.nationsQuery
  .select('id', 'nation_name', 'alliance_id')
  .include('alliance', builder => builder
    .select('id', 'name', 'score')
    .where({ min_score: 5000 })
    .include('nations', builder2 => builder2  // Unlimited nesting!
      .select('id', 'nation_name')
      .where({ min_score: 1000 })
      .include('cities', builder3 => builder3
        .select('id', 'name', 'infrastructure')
      )
    )
  )
  .first(50)
  .execute();
```

## Extends

- `QueryBuilder`\<`NationFields`, `NationQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `NationFields`[] = \[\]

Selected field names as a readonly tuple

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations as a record type

## Constructors

### Constructor

> **new NationsQuery**\<`F`, `I`\>(`kit`): `NationsQuery`\<`F`, `I`\>

Defined in: [api/queries/nations.ts:66](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/api/queries/nations.ts#L66)

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

Defined in: [builders/queryBuilder.ts:157](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L157)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `NationQueryParams`

Defined in: [builders/queryBuilder.ts:163](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L163)

#### Inherited from

`QueryBuilder.filters`

***

### limit?

> `protected` `optional` **limit**: `number`

Defined in: [builders/queryBuilder.ts:155](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L155)

#### Inherited from

`QueryBuilder.limit`

***

### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [builders/queryBuilder.ts:156](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L156)

#### Inherited from

`QueryBuilder.pageNum`

***

### queryName

> `protected` **queryName**: `string` = `'nations'`

Defined in: [api/queries/nations.ts:59](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/api/queries/nations.ts#L59)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `NationFields`[] = `[]`

Defined in: [builders/queryBuilder.ts:162](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L162)

#### Inherited from

`QueryBuilder.selectedFields`

***

### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \}, `Record`\<`string`, `any`\>\>\>

Defined in: [builders/queryBuilder.ts:160](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L160)

#### Inherited from

`QueryBuilder.subqueries`

## Methods

### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [builders/queryBuilder.ts:368](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L368)

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

Defined in: [builders/queryBuilder.ts:331](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L331)

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

Defined in: [builders/queryBuilder.ts:262](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L262)

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

Defined in: [api/queries/nations.ts:161](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/api/queries/nations.ts#L161)

Execute the nations query and return results

##### Returns

`Promise`\<`SelectFields`\<`NationFields`, `F`, `I`\>[]\>

Array of nations, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```ts
// Without paginator
const result = await query.execute();
console.log(result);

// With paginator
const result = await query.execute(true);
console.log(result.data, result.paginatorInfo);
```

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`NationFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: [api/queries/nations.ts:162](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/api/queries/nations.ts#L162)

Execute the nations query and return results

##### Parameters

###### withPaginator

`true`

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`NationFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Array of nations, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```ts
// Without paginator
const result = await query.execute();
console.log(result);

// With paginator
const result = await query.execute(true);
console.log(result.data, result.paginatorInfo);
```

***

### first()

> **first**(`count`): `this`

Defined in: [builders/queryBuilder.ts:177](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L177)

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

> **include**\<`K`\>(`relation`, `config`): `NationsQuery`\<`F`, `I` & `Record`\<`K`, `any`\>\>

Defined in: [api/queries/nations.ts:139](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/api/queries/nations.ts#L139)

Include related data in the query results

Supports unlimited recursive nesting with full type inference at every level.
Each nested builder receives complete type safety for fields, relations, and query parameters.

#### Type Parameters

##### K

`K` *extends* keyof `NationRelations`

#### Parameters

##### relation

`K`

The relation name to include

##### config

`SubqueryConfig`\<`NationRelations`\[`K`\], `GetRelationsFor`\<`NationRelations`\[`K`\]\>, `GetQueryParamsFor`\<`NationRelations`\[`K`\]\>\>

A builder function for configuring the subquery

#### Returns

`NationsQuery`\<`F`, `I` & `Record`\<`K`, `any`\>\>

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

Defined in: [builders/queryBuilder.ts:192](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L192)

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

Defined in: [builders/queryBuilder.ts:204](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L204)

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

Defined in: [api/queries/nations.ts:78](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/api/queries/nations.ts#L78)

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

Defined in: [builders/queryBuilder.ts:303](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L303)

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

Defined in: [builders/queryBuilder.ts:224](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L224)

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

Defined in: [builders/queryBuilder.ts:446](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/builders/queryBuilder.ts#L446)

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

Defined in: [api/queries/nations.ts:94](https://github.com/darkblade1078/pnwkit-3.0/blob/bd51b74f3b4caf6fb140612b8a7449e108864c8c/src/api/queries/nations.ts#L94)

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
