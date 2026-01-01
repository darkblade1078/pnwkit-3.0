[**PnWKit 3.0 v3.0.0**](../README.md)

***

[PnWKit 3.0](../globals.md) / default

# Class: default

Defined in: [index.ts:18](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/index.ts#L18)

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

Defined in: [index.ts:36](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/index.ts#L36)

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

### alliancesQuery

> `readonly` **alliancesQuery**: `AlliancesQuery`

Defined in: [api/index.ts:8](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/index.ts#L8)

#### Inherited from

`PnwKitApi.alliancesQuery`

***

### apiKey

> `protected` `readonly` **apiKey**: `string`

Defined in: [api/index.ts:10](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/index.ts#L10)

#### Inherited from

`PnwKitApi.apiKey`

***

### nationsQuery

> `readonly` **nationsQuery**: `NationsQuery`

Defined in: [api/index.ts:7](https://github.com/darkblade1078/pnwkit-3.0/blob/cefe16cd02dc363296a7f3269e6bae9eeb0226e7/src/api/index.ts#L7)

#### Inherited from

`PnwKitApi.nationsQuery`
