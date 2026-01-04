[**PnWKit 3.0 v3.0.0**](../README.md)

***

[PnWKit 3.0](../globals.md) / default

# Class: default

Defined in: [index.ts:23](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/index.ts#L23)

Main PnWKit client for interacting with the Politics & War API

## Example

```typescript
const pnwkit = new PnWKit("your-api-key");

// Query nations with filters
const nations = await pnwkit.queries.nations()
  .select('id', 'nation_name', 'score')
  .where({ min_score: 1000, first: 10 })
  .execute();

// Query alliances
const alliances = await pnwkit.queries.alliances()
  .select('id', 'name')
  .where({ first: 5 })
  .execute();
```

## Extends

- `default`

## Constructors

### Constructor

> **new default**(`apiKey`): `PnWKit`

Defined in: [index.ts:30](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/index.ts#L30)

Create a new PnWKit instance

#### Parameters

##### apiKey

`string`

Your Politics & War API key

#### Returns

`PnWKit`

#### Overrides

`PnwKitApi.constructor`

## Properties

### apiKey

> `protected` `readonly` **apiKey**: `string`

Defined in: [api/index.ts:9](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/index.ts#L9)

#### Inherited from

`PnwKitApi.apiKey`

***

### queries

> `readonly` **queries**: `Queries`

Defined in: [api/index.ts:6](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/index.ts#L6)

#### Inherited from

`PnwKitApi.queries`

***

### utilities

> `readonly` **utilities**: `utilities`

Defined in: [api/index.ts:7](https://github.com/darkblade1078/pnwkit-3.0/blob/8eac265e6869960c4fa52d0af0a54a5ed7c01c95/src/api/index.ts#L7)

#### Inherited from

`PnwKitApi.utilities`
