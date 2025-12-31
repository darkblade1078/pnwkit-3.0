[**PnWKit 3.0 v3.0.0**](../README.md)

***

[PnWKit 3.0](../globals.md) / default

# Class: default

Defined in: [index.ts:15](https://github.com/darkblade1078/pnwkit-3.0/blob/e28a0fb83d5810e801cb9a64f1a0a0116e78f04f/src/index.ts#L15)

Main PnWKit client for interacting with the Politics & War API

## Example

```typescript
const pnwkit = new PnWKit("your-api-key");
const nations = await pnwkit.nationsQuery()
  .select('id', 'nation_name', 'score')
  .first(10)
  .execute();
```

## Extends

- `default`

## Constructors

### Constructor

> **new default**(`apiKey`, `botKey?`): `PnWKit`

Defined in: [index.ts:22](https://github.com/darkblade1078/pnwkit-3.0/blob/e28a0fb83d5810e801cb9a64f1a0a0116e78f04f/src/index.ts#L22)

Create a new PnWKit instance

#### Parameters

##### apiKey

`string`

Your Politics & War API key

##### botKey?

`string`

Optional bot key for additional permissions

#### Returns

`PnWKit`

#### Overrides

`PnwKitApi.constructor`

## Methods

### nationsQuery()

> **nationsQuery**(): `NationsQuery`\<\[\], \{ \}\>

Defined in: [api/index.ts:22](https://github.com/darkblade1078/pnwkit-3.0/blob/e28a0fb83d5810e801cb9a64f1a0a0116e78f04f/src/api/index.ts#L22)

Create a new nations query

#### Returns

`NationsQuery`\<\[\], \{ \}\>

A NationsQuery builder instance

#### Example

```typescript
const query = pnwkit.nationsQuery()
  .select('id', 'nation_name')
  .where({ min_score: 1000 })
  .first(50);
```

#### Inherited from

`PnwKitApi.nationsQuery`
