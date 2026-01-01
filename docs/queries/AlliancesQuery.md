[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [alliance](../README.md) / AlliancesQuery

# Class: AlliancesQuery\<F, I\>

Defined in: [api/queries/alliance.ts:43](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/queries/alliance.ts#L43)

Query builder for fetching alliance data from the Politics & War API

Supports two levels of nested queries:
- Level 1: Use builder functions to configure subqueries with full type support
- Level 2: Use field arrays for nested subqueries

## Example

```typescript
// Simple query with flat includes
const alliances = await pnwkit.alliancesQuery
  .select('id', 'name', 'score', 'color')
  .where({ 
    name: ['Rose', 'Grumpy'],
    orderBy: [{ column: 'SCORE', order: 'DESC' }]
  })
  .include('bankrecs', ['id', 'date', 'money'])
  .first(50)
  .execute();

// Nested query (two levels deep)
const alliances = await pnwkit.alliancesQuery
  .select('id', 'name', 'score')
  .include('nations', builder => builder
    .select('id', 'nation_name', 'score')
    .include('cities', ['id', 'name', 'infrastructure'])
  )
  .first(10)
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

Defined in: [api/queries/alliance.ts:56](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/queries/alliance.ts#L56)

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

Defined in: [builders/queryBuilder.ts:129](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L129)

#### Inherited from

`QueryBuilder.apiKey`

***

### filters

> `protected` **filters**: `AllianceQueryParams`

Defined in: [builders/queryBuilder.ts:135](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L135)

#### Inherited from

`QueryBuilder.filters`

***

### limit?

> `protected` `optional` **limit**: `number`

Defined in: [builders/queryBuilder.ts:127](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L127)

#### Inherited from

`QueryBuilder.limit`

***

### pageNum?

> `protected` `optional` **pageNum**: `number`

Defined in: [builders/queryBuilder.ts:128](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L128)

#### Inherited from

`QueryBuilder.pageNum`

***

### queryName

> `protected` **queryName**: `string` = `'alliances'`

Defined in: [api/queries/alliance.ts:49](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/queries/alliance.ts#L49)

#### Overrides

`QueryBuilder.queryName`

***

### selectedFields

> `protected` **selectedFields**: keyof `AllianceFields`[] = `[]`

Defined in: [builders/queryBuilder.ts:134](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L134)

#### Inherited from

`QueryBuilder.selectedFields`

***

### subqueries

> `protected` **subqueries**: `Map`\<`string`, `SubqueryConfig`\<`any`, \{ \} \| `NationRelations` \| `AllianceRelations`\>\>

Defined in: [builders/queryBuilder.ts:132](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L132)

#### Inherited from

`QueryBuilder.subqueries`

## Methods

### buildQuery()

> `protected` **buildQuery**(`includePaginator`): `string`

Defined in: [builders/queryBuilder.ts:283](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L283)

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

### buildSubqueryString()

> `protected` **buildSubqueryString**(`config`, `depth`): `string`

Defined in: [builders/queryBuilder.ts:235](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L235)

**`Internal`**

Recursively build subquery string from config

#### Parameters

##### config

`SubqueryConfig`\<`any`\>

Either an array of fields or a builder function

##### depth

`number` = `0`

Current nesting depth (for indentation)

#### Returns

`string`

GraphQL string for the subquery fields

#### Inherited from

`QueryBuilder.buildSubqueryString`

***

### execute()

#### Call Signature

> **execute**(): `Promise`\<`SelectFields`\<`AllianceFields`, `F`, `I`\>[]\>

Defined in: [api/queries/alliance.ts:152](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/queries/alliance.ts#L152)

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

Defined in: [api/queries/alliance.ts:153](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/queries/alliance.ts#L153)

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

Defined in: [builders/queryBuilder.ts:149](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L149)

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

> **include**\<`K`\>(`relation`, `config`): `AlliancesQuery`\<`F`, `I` & `Record`\<`K`, `any`\>\>

Defined in: [api/queries/alliance.ts:129](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/queries/alliance.ts#L129)

Include related data in the query results

Supports two formats:
1. Field array - Simple list of fields to select from the relation
2. Builder function - For relations that have their own nested relations

When using builder functions, the nested include() only accepts field arrays.
This provides two levels of nesting: query -> subquery -> nested subquery

#### Type Parameters

##### K

`K` *extends* keyof `AllianceRelations`

#### Parameters

##### relation

`K`

The relation name to include

##### config

`SubqueryConfig`\<`AllianceRelations`\[`K`\], `GetRelationsFor`\<`AllianceRelations`\[`K`\]\>\>

Either an array of fields OR a builder function for nested queries

#### Returns

`AlliancesQuery`\<`F`, `I` & `Record`\<`K`, `any`\>\>

New query instance with included relation

#### Example

```typescript
// Simple field array (one level)
.include('bankrecs', ['id', 'date', 'money', 'note'])

// Builder function with nested relations (two levels)
.include('nations', builder => builder
  .select('id', 'nation_name', 'score')  // Select fields from nations
  .include('cities', ['id', 'name', 'infrastructure'])  // Nested: only arrays allowed
  .include('alliance', ['id', 'name'])  // Can include multiple nested relations
)

// Important: Always select at least one scalar field at each level
// GraphQL requires this - you cannot query an object without selecting fields
```

***

### page()

> **page**(`pageNumber`): `this`

Defined in: [builders/queryBuilder.ts:164](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L164)

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

Defined in: [builders/queryBuilder.ts:176](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L176)

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

Defined in: [api/queries/alliance.ts:70](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/queries/alliance.ts#L70)

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

Defined in: [builders/queryBuilder.ts:196](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L196)

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

Defined in: [builders/queryBuilder.ts:392](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/builders/queryBuilder.ts#L392)

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

Defined in: [api/queries/alliance.ts:94](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/queries/alliance.ts#L94)

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
