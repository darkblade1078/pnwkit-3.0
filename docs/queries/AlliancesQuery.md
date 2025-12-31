[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [alliance](../README.md) / AlliancesQuery

# Class: AlliancesQuery\<F, I\>

Defined in: api/queries/alliance.ts:26

Query builder for fetching alliance data from the Politics & War API

## Example

```typescript
const alliances = await pnwkit.alliancesQuery
  .select('id', 'name', 'score', 'color')
  .where({ 
    name: ['Rose', 'Grumpy'],
    orderBy: [{ column: 'SCORE', order: 'DESC' }]
  })
  .include('bankrecs', ['id', 'date', 'money'])
  .first(50)
  .execute();
```

## Extends

- `QueryBuilder`\<`AllianceFields`, `AllianceQueryParams`\>

## Type Parameters

### F

`F` *extends* readonly keyof `AllianceFields`[] = \[\]

Selected field names as a readonly tuple

### I

`I` *extends* `Record`\<`string`, `any`\> = \{ \}

Included relations as a record type

## Constructors

### Constructor

> **new AlliancesQuery**\<`F`, `I`\>(`kit`): `AlliancesQuery`\<`F`, `I`\>

Defined in: api/queries/alliance.ts:39

**`Internal`**

Create a new AlliancesQuery instance

#### Parameters

##### kit

`PnwKitApi`

The PnWKit instance containing API credentials

#### Returns

`AlliancesQuery`\<`F`, `I`\>

#### Overrides

`QueryBuilder<AllianceFields, AllianceQueryParams>.constructor`

## Properties

### apiKey

> `protected` **apiKey**: `string`

Defined in: [builders/queryBuilder.ts:15](https://github.com/darkblade1078/pnwkit-3.0/blob/1eb4395bcdc033fe1c217703338f514e9d6a7a9a/src/builders/queryBuilder.ts#L15)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `AllianceQueryParams`

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

> `protected` **queryName**: `string` = `'alliances'`

Defined in: api/queries/alliance.ts:32

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `AllianceFields`[] = `[]`

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

> **execute**(): `Promise`\<`SelectFields`\<`AllianceFields`, `F`, `I`\>[]\>

Defined in: api/queries/alliance.ts:121

Execute the alliances query and return results

##### Returns

`Promise`\<`SelectFields`\<`AllianceFields`, `F`, `I`\>[]\>

Array of alliances, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Without paginator
const alliances = await query.execute();

// With paginator
const result = await query.execute(true);
console.log(result.data, result.paginatorInfo);
```

#### Call Signature

> **execute**(`withPaginator`): `Promise`\<\{ `data`: `SelectFields`\<`AllianceFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Defined in: api/queries/alliance.ts:122

Execute the alliances query and return results

##### Parameters

###### withPaginator

`true`

##### Returns

`Promise`\<\{ `data`: `SelectFields`\<`AllianceFields`, `F`, `I`\>[]; `paginatorInfo`: `paginatorInfo`; \}\>

Array of alliances, or object with data and paginatorInfo if withPaginator is true

##### Throws

Error if the query fails or returns no data

##### Example

```typescript
// Without paginator
const alliances = await query.execute();

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

> **include**\<`K`, `R`\>(`relation`, `fields`): `AlliancesQuery`\<`F`, `I` & `Record`\<`K`, `Pick`\<`AllianceRelations`\[`K`\], `R`\[`number`\]\>[]\>\>

Defined in: api/queries/alliance.ts:93

Include related data in the query results

#### Type Parameters

##### K

`K` *extends* keyof `AllianceRelations`

##### R

`R` *extends* readonly keyof `AllianceRelations`\[`K`\][]

#### Parameters

##### relation

`K`

The relation name to include

##### fields

`R`

Fields to select from the relation

#### Returns

`AlliancesQuery`\<`F`, `I` & `Record`\<`K`, `Pick`\<`AllianceRelations`\[`K`\], `R`\[`number`\]\>[]\>\>

New query instance with included relation

#### Example

```typescript
.include('bankrecs', ['id', 'date', 'money', 'note'])
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

> **select**\<`Fields`\>(...`fields`): `AlliancesQuery`\<`Fields`\>

Defined in: api/queries/alliance.ts:53

Select specific fields to retrieve from alliances

#### Type Parameters

##### Fields

`Fields` *extends* readonly keyof `AllianceFields`[]

#### Parameters

##### fields

...`Fields`

Field names to select

#### Returns

`AlliancesQuery`\<`Fields`\>

New query instance with selected fields

#### Throws

Error if no fields are provided

#### Example

```typescript
.select('id', 'name', 'score', 'color')
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

Defined in: api/queries/alliance.ts:77

Apply filters to the query

#### Parameters

##### filters

`AllianceQueryParams`

Query parameters for filtering results

#### Returns

`this`

This query instance for method chaining

#### Example

```typescript
.where({ 
  name: ['Rose', 'Grumpy'], 
  color: ['AQUA', 'BLUE'] 
})
```
