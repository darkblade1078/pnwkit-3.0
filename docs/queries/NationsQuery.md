[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [nations](../README.md) / NationsQuery

# Class: NationsQuery\<F, I\>

Defined in: [api/queries/nations.ts:27](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/api/queries/nations.ts#L27)

Query builder for fetching nation data from the Politics & War API

## Example

```typescript
const nations = await pnwkit.nationsQuery
  .select('id', 'nation_name', 'score', 'alliance_id')
  .where({ 
    min_score: 1000, 
    max_score: 5000,
    orderBy: [{ column: 'SCORE', order: 'DESC' }]
  })
  .include('alliance', ['id', 'name'])
  .first(100)
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

Defined in: [api/queries/nations.ts:43](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/api/queries/nations.ts#L43)

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

Defined in: [builders/queryBuilder.ts:15](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L15)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `NationQueryParams`

Defined in: [builders/queryBuilder.ts:18](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L18)

#### Inherited from

`QueryBuilder.filters`

***

### limit?

> `protected` `optional` **limit**: `number`

Defined in: [builders/queryBuilder.ts:13](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L13)

#### Inherited from

`QueryBuilder.limit`

***

### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [builders/queryBuilder.ts:14](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L14)

#### Inherited from

`QueryBuilder.pageNum`

***

### queryName

> `protected` **queryName**: `string` = `'nations'`

Defined in: [api/queries/nations.ts:36](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/api/queries/nations.ts#L36)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `NationFields`[] = `[]`

Defined in: [builders/queryBuilder.ts:17](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L17)

#### Inherited from

`QueryBuilder.selectedFields`

***

### subqueries

> `protected` **subqueries**: `Map`\<`string`, readonly `string`[]\>

Defined in: [builders/queryBuilder.ts:16](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L16)

#### Inherited from

`QueryBuilder.subqueries`

## Methods

### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [builders/queryBuilder.ts:114](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L114)

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

### execute()

#### Call Signature

> **execute**(): `Promise`\<`SelectFields`\<`NationFields`, `F`, `I`\>[]\>

Defined in: [api/queries/nations.ts:116](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/api/queries/nations.ts#L116)

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

Defined in: [api/queries/nations.ts:117](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/api/queries/nations.ts#L117)

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

Defined in: [builders/queryBuilder.ts:32](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L32)

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

> **include**\<`K`, `R`\>(`relation`, `fields`): `NationsQuery`\<`F`, `I` & `Record`\<`K`, `Pick`\<`NationRelations`\[`K`\], `R`\[`number`\]\>[]\>\>

Defined in: [api/queries/nations.ts:89](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/api/queries/nations.ts#L89)

Include related data in the query results

#### Type Parameters

##### K

`K` *extends* keyof `NationRelations`

##### R

`R` *extends* readonly keyof `NationRelations`\[`K`\][]

#### Parameters

##### relation

`K`

The relation name to include

##### fields

`R`

Fields to select from the relation

#### Returns

`NationsQuery`\<`F`, `I` & `Record`\<`K`, `Pick`\<`NationRelations`\[`K`\], `R`\[`number`\]\>[]\>\>

New query instance with included relation

#### Example

```ts
.include('cities', ['id', 'city_name', 'infrastructure'])
```

***

### page()

> **page**(`pageNumber`): `this`

Defined in: [builders/queryBuilder.ts:47](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L47)

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

Defined in: [builders/queryBuilder.ts:59](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L59)

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

Defined in: [api/queries/nations.ts:56](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/api/queries/nations.ts#L56)

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

### serializeObject()

> `protected` **serializeObject**(`obj`): `string`

Defined in: [builders/queryBuilder.ts:79](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L79)

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

Defined in: [builders/queryBuilder.ts:225](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L225)

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

Defined in: [api/queries/nations.ts:75](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/api/queries/nations.ts#L75)

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
