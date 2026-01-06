[**Query Builders**](../../README.md)

***

[Query Builders](../../modules.md) / [index](../README.md) / default

# Class: default

Defined in: [api/queries/index.ts:50](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L50)

Container class for all Politics & War GraphQL query builders.

Provides factory methods to create fresh instances of query builders
for each available GraphQL query endpoint. Each method returns a new
builder instance with full type safety and fluent API support.

## Example

```typescript
const queries = new Queries(api);

// Get nations data
const nations = await queries.nations()
  .select('id', 'nation_name')
  .where({ first: 10 })
  .execute();

// Get alliance data with nested relations
const alliances = await queries.alliances()
  .select('id', 'name')
  .include('nations', builder => builder.select('id', 'nation_name'))
  .execute();
```

## Constructors

### Constructor

> **new default**(`api`): `Queries`

Defined in: [api/queries/index.ts:51](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L51)

#### Parameters

##### api

`PnwKitApi`

#### Returns

`Queries`

## Methods

### activityStats()

> **activityStats**(): [`ActivityStatsQuery`](../../activityStats/classes/ActivityStatsQuery.md)\<\[\]\>

Defined in: [api/queries/index.ts:246](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L246)

Create a new activity stats query builder

#### Returns

[`ActivityStatsQuery`](../../activityStats/classes/ActivityStatsQuery.md)\<\[\]\>

A fresh ActivityStatsQuery instance

***

### alliances()

> **alliances**(): [`AlliancesQuery`](../../alliances/classes/AlliancesQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:57](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L57)

Create a new alliances query builder

#### Returns

[`AlliancesQuery`](../../alliances/classes/AlliancesQuery.md)\<\[\], \[\]\>

A fresh AlliancesQuery instance

***

### apiKeyDetails()

> **apiKeyDetails**(): [`ApiKeyDetailsQuery`](../../apiKeyDetails/classes/ApiKeyDetailsQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:66](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L66)

Create a new API key details query builder

#### Returns

[`ApiKeyDetailsQuery`](../../apiKeyDetails/classes/ApiKeyDetailsQuery.md)\<\[\], \[\]\>

A fresh ApiKeyDetailsQuery instance

***

### bankrecs()

> **bankrecs**(): [`BankrecsQuery`](../../bankrecs/classes/BankrecsQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:201](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L201)

Create a new bankrecs query builder

#### Returns

[`BankrecsQuery`](../../bankrecs/classes/BankrecsQuery.md)\<\[\], \[\]\>

A fresh BankrecsQuery instance

***

### bannedNations()

> **bannedNations**(): [`BannedNationsQuery`](../../bannedNations/classes/BannedNationsQuery.md)\<\[\]\>

Defined in: [api/queries/index.ts:183](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L183)

Create a new banned nations query builder

#### Returns

[`BannedNationsQuery`](../../bannedNations/classes/BannedNationsQuery.md)\<\[\]\>

A fresh BannedNationsQuery instance

***

### bounties()

> **bounties**(): [`BountiesQuery`](../../bounties/classes/BountiesQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:174](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L174)

Create a new bounties query builder

#### Returns

[`BountiesQuery`](../../bounties/classes/BountiesQuery.md)\<\[\], \[\]\>

A fresh BountiesQuery instance

***

### bulletinReplies()

> **bulletinReplies**(): [`BulletinRepliesQuery`](../../bulletinReplies/classes/BulletinRepliesQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:219](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L219)

Create a new bulletin replies query builder

#### Returns

[`BulletinRepliesQuery`](../../bulletinReplies/classes/BulletinRepliesQuery.md)\<\[\], \[\]\>

A fresh BulletinRepliesQuery instance

***

### bulletins()

> **bulletins**(): [`BulletinsQuery`](../../bulletins/classes/BulletinsQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:210](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L210)

Create a new bulletins query builder

#### Returns

[`BulletinsQuery`](../../bulletins/classes/BulletinsQuery.md)\<\[\], \[\]\>

A fresh BulletinsQuery instance

***

### cities()

> **cities**(): [`CitiesQuery`](../../cities/classes/CitiesQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:192](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L192)

Create a new cities query builder

#### Returns

[`CitiesQuery`](../../cities/classes/CitiesQuery.md)\<\[\], \[\]\>

A fresh CitiesQuery instance

***

### colors()

> **colors**(): [`ColorsQuery`](../../colors/classes/ColorsQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:75](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L75)

Create a new colors query builder

#### Returns

[`ColorsQuery`](../../colors/classes/ColorsQuery.md)\<\[\], \[\]\>

A fresh ColorsQuery instance

***

### embargoes()

> **embargoes**(): [`EmbargoesQuery`](../../embargoes/classes/EmbargoesQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:228](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L228)

Create a new embargoes query builder

#### Returns

[`EmbargoesQuery`](../../embargoes/classes/EmbargoesQuery.md)\<\[\], \[\]\>

A fresh EmbargoesQuery instance

***

### gameInfo()

> **gameInfo**(): [`GameInfoQuery`](../../gameInfo/classes/GameInfoQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:93](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L93)

Create a new game info query builder

#### Returns

[`GameInfoQuery`](../../gameInfo/classes/GameInfoQuery.md)\<\[\], \[\]\>

A fresh GameInfoQuery instance

***

### nationResourceStats()

> **nationResourceStats**(): [`NationResourceStatsQuery`](../../nationResourceStats/classes/NationResourceStatsQuery.md)\<\[\], \{ \}\>

Defined in: [api/queries/index.ts:111](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L111)

Create a new nation resource stats query builder

#### Returns

[`NationResourceStatsQuery`](../../nationResourceStats/classes/NationResourceStatsQuery.md)\<\[\], \{ \}\>

A fresh NationResourceStatsQuery instance

***

### nations()

> **nations**(): [`NationsQuery`](../../nations/classes/NationsQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:102](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L102)

Create a new nations query builder

#### Returns

[`NationsQuery`](../../nations/classes/NationsQuery.md)\<\[\], \[\]\>

A fresh NationsQuery instance

***

### resourceStats()

> **resourceStats**(): [`ResourceStatsQuery`](../../resourceStats/classes/ResourceStatsQuery.md)\<\[\]\>

Defined in: [api/queries/index.ts:255](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L255)

Create a new resource stats query builder

#### Returns

[`ResourceStatsQuery`](../../resourceStats/classes/ResourceStatsQuery.md)\<\[\]\>

A fresh ResourceStatsQuery instance

***

### topTradeInfo()

> **topTradeInfo**(): [`TopTradeInfoQuery`](../../topTradeInfo/classes/TopTradeInfoQuery.md)\<\[\], \{ \}\>

Defined in: [api/queries/index.ts:120](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L120)

Create a new top trade info query builder

#### Returns

[`TopTradeInfoQuery`](../../topTradeInfo/classes/TopTradeInfoQuery.md)\<\[\], \{ \}\>

A fresh TopTradeInfoQuery instance

***

### tradePrices()

> **tradePrices**(): [`TradePricesQuery`](../../tradePrices/classes/TradePricesQuery.md)\<\[\]\>

Defined in: [api/queries/index.ts:138](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L138)

Create a new trade prices query builder

#### Returns

[`TradePricesQuery`](../../tradePrices/classes/TradePricesQuery.md)\<\[\]\>

A fresh TradePricesQuery instance

***

### trades()

> **trades**(): [`TradesQuery`](../../trades/classes/TradesQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:129](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L129)

Create a new trades query builder

#### Returns

[`TradesQuery`](../../trades/classes/TradesQuery.md)\<\[\], \[\]\>

A fresh TradesQuery instance

***

### treasures()

> **treasures**(): [`TreasuresQuery`](../../treasures/classes/TreasuresQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:84](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L84)

Create a new treasures query builder

#### Returns

[`TreasuresQuery`](../../treasures/classes/TreasuresQuery.md)\<\[\], \[\]\>

A fresh TreasuresQuery instance

***

### treasureTrades()

> **treasureTrades**(): [`TreasureTradesQuery`](../../treasureTrades/classes/TreasureTradesQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:237](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L237)

Create a new treasure trades query builder

#### Returns

[`TreasureTradesQuery`](../../treasureTrades/classes/TreasureTradesQuery.md)\<\[\], \[\]\>

A fresh TreasureTradesQuery instance

***

### treaties()

> **treaties**(): [`TreatiesQuery`](../../treaties/classes/TreatiesQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:147](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L147)

Create a new treaties query builder

#### Returns

[`TreatiesQuery`](../../treaties/classes/TreatiesQuery.md)\<\[\], \[\]\>

A fresh TreatiesQuery instance

***

### warAttacks()

> **warAttacks**(): [`WarAttacksQuery`](../../warAttacks/classes/WarAttacksQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:165](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L165)

Create a new war attacks query builder

#### Returns

[`WarAttacksQuery`](../../warAttacks/classes/WarAttacksQuery.md)\<\[\], \[\]\>

A fresh WarAttacksQuery instance

***

### wars()

> **wars**(): [`WarsQuery`](../../wars/classes/WarsQuery.md)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:156](https://github.com/darkblade1078/pnwkit-3.0/blob/2c2ccc96faa529413e40656865f3cc9a4bfaaed9/src/api/queries/index.ts#L156)

Create a new wars query builder

#### Returns

[`WarsQuery`](../../wars/classes/WarsQuery.md)\<\[\], \[\]\>

A fresh WarsQuery instance
