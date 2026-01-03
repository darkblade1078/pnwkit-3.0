[**PnWKit 3.0 v3.0.0**](../README.md)

***

[PnWKit 3.0](../globals.md) / default

# Class: default

Defined in: [index.ts:23](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/index.ts#L23)

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

Defined in: [index.ts:30](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/index.ts#L30)

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

Defined in: [api/index.ts:7](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/api/index.ts#L7)

#### Inherited from

`PnwKitApi.apiKey`

***

### queries

> `readonly` **queries**: `Queries`

Defined in: [api/index.ts:5](https://github.com/darkblade1078/pnwkit-3.0/blob/aaba923a4468d857224fcdff638e5813fc948928/src/api/index.ts#L5)

#### Inherited from

`PnwKitApi.queries`
