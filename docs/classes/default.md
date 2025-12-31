[**PnWKit 3.0 v3.0.0**](../README.md)

***

[PnWKit 3.0](../globals.md) / default

# Class: default

Defined in: [index.ts:18](https://github.com/darkblade1078/pnwkit-3.0/blob/cc95a87004632e21c2da620d9706a754d4350f73/src/index.ts#L18)

Main PnWKit client for interacting with the Politics & War API

## Example

```typescript
const pnwkit = new PnWKit("your-api-key");

// Access the nations query builder directly
const nations = await pnwkit.nationsQuery
  .select('id', 'nation_name', 'score')
  .where({ min_score: 1000 })
  .first(10)
  .execute();
```

## Extends

- `default`

## Constructors

### Constructor

> **new default**(`apiKey`): `PnWKit`

Defined in: [index.ts:36](https://github.com/darkblade1078/pnwkit-3.0/blob/cc95a87004632e21c2da620d9706a754d4350f73/src/index.ts#L36)

Main PnWKit client for interacting with the Politics & War API

#### Parameters

##### apiKey

`string`

#### Returns

`PnWKit`

#### Example

```typescript
const pnwkit = new PnWKit("your-api-key");

// Access the nations query builder directly
const nations = await pnwkit.nationsQuery
  .select('id', 'nation_name', 'score')
  .where({ min_score: 1000 })
  .first(10)
  .execute();
```

#### Overrides

`PnwKitApi.constructor`

## Other

### apiKey

> `protected` `readonly` **apiKey**: `string`

Defined in: [api/index.ts:8](https://github.com/darkblade1078/pnwkit-3.0/blob/cc95a87004632e21c2da620d9706a754d4350f73/src/api/index.ts#L8)

#### Inherited from

`PnwKitApi.apiKey`

***

### nationsQuery

> `readonly` **nationsQuery**: [`NationsQuery`](NationsQuery.md)

Defined in: [api/index.ts:6](https://github.com/darkblade1078/pnwkit-3.0/blob/cc95a87004632e21c2da620d9706a754d4350f73/src/api/index.ts#L6)

#### Inherited from

`PnwKitApi.nationsQuery`
