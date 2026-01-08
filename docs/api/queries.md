[**pnwkit 3.0 v3.0.0**](../README.md)

***

[pnwkit 3.0](../modules.md) / api/queries

# api/queries

## Classes

### default

Defined in: [api/queries/index.ts:50](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L50)

Container class for all Politics & War GraphQL query builders.

Provides factory methods to create fresh instances of query builders
for each available GraphQL query endpoint. Each method returns a new
builder instance with full type safety and fluent API support.

#### Example

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

#### Constructors

##### Constructor

> **new default**(`api`): [`default`](#default)

Defined in: [api/queries/index.ts:51](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L51)

###### Parameters

###### api

`PnwKitApi`

###### Returns

[`default`](#default)

#### Methods

##### activityStats()

> **activityStats**(): [`ActivityStatsQuery`](queries/activityStats.md#activitystatsquery)\<\[\]\>

Defined in: [api/queries/index.ts:246](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L246)

Create a new activity stats query builder

###### Returns

[`ActivityStatsQuery`](queries/activityStats.md#activitystatsquery)\<\[\]\>

A fresh ActivityStatsQuery instance

##### alliances()

> **alliances**(): [`AlliancesQuery`](queries/alliances.md#alliancesquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:57](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L57)

Create a new alliances query builder

###### Returns

[`AlliancesQuery`](queries/alliances.md#alliancesquery)\<\[\], \[\]\>

A fresh AlliancesQuery instance

##### apiKeyDetails()

> **apiKeyDetails**(): [`ApiKeyDetailsQuery`](queries/apiKeyDetails.md#apikeydetailsquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:66](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L66)

Create a new API key details query builder

###### Returns

[`ApiKeyDetailsQuery`](queries/apiKeyDetails.md#apikeydetailsquery)\<\[\], \[\]\>

A fresh ApiKeyDetailsQuery instance

##### bankrecs()

> **bankrecs**(): [`BankrecsQuery`](queries/bankrecs.md#bankrecsquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:201](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L201)

Create a new bankrecs query builder

###### Returns

[`BankrecsQuery`](queries/bankrecs.md#bankrecsquery)\<\[\], \[\]\>

A fresh BankrecsQuery instance

##### bannedNations()

> **bannedNations**(): [`BannedNationsQuery`](queries/bannedNations.md#bannednationsquery)\<\[\]\>

Defined in: [api/queries/index.ts:183](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L183)

Create a new banned nations query builder

###### Returns

[`BannedNationsQuery`](queries/bannedNations.md#bannednationsquery)\<\[\]\>

A fresh BannedNationsQuery instance

##### bounties()

> **bounties**(): [`BountiesQuery`](queries/bounties.md#bountiesquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:174](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L174)

Create a new bounties query builder

###### Returns

[`BountiesQuery`](queries/bounties.md#bountiesquery)\<\[\], \[\]\>

A fresh BountiesQuery instance

##### bulletinReplies()

> **bulletinReplies**(): [`BulletinRepliesQuery`](queries/bulletinReplies.md#bulletinrepliesquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:219](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L219)

Create a new bulletin replies query builder

###### Returns

[`BulletinRepliesQuery`](queries/bulletinReplies.md#bulletinrepliesquery)\<\[\], \[\]\>

A fresh BulletinRepliesQuery instance

##### bulletins()

> **bulletins**(): [`BulletinsQuery`](queries/bulletins.md#bulletinsquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:210](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L210)

Create a new bulletins query builder

###### Returns

[`BulletinsQuery`](queries/bulletins.md#bulletinsquery)\<\[\], \[\]\>

A fresh BulletinsQuery instance

##### cities()

> **cities**(): [`CitiesQuery`](queries/cities.md#citiesquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:192](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L192)

Create a new cities query builder

###### Returns

[`CitiesQuery`](queries/cities.md#citiesquery)\<\[\], \[\]\>

A fresh CitiesQuery instance

##### colors()

> **colors**(): [`ColorsQuery`](queries/colors.md#colorsquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:75](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L75)

Create a new colors query builder

###### Returns

[`ColorsQuery`](queries/colors.md#colorsquery)\<\[\], \[\]\>

A fresh ColorsQuery instance

##### embargoes()

> **embargoes**(): [`EmbargoesQuery`](queries/embargoes.md#embargoesquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:228](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L228)

Create a new embargoes query builder

###### Returns

[`EmbargoesQuery`](queries/embargoes.md#embargoesquery)\<\[\], \[\]\>

A fresh EmbargoesQuery instance

##### gameInfo()

> **gameInfo**(): [`GameInfoQuery`](queries/gameInfo.md#gameinfoquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:93](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L93)

Create a new game info query builder

###### Returns

[`GameInfoQuery`](queries/gameInfo.md#gameinfoquery)\<\[\], \[\]\>

A fresh GameInfoQuery instance

##### nationResourceStats()

> **nationResourceStats**(): [`NationResourceStatsQuery`](queries/nationResourceStats.md#nationresourcestatsquery)\<\[\], \{ \}\>

Defined in: [api/queries/index.ts:111](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L111)

Create a new nation resource stats query builder

###### Returns

[`NationResourceStatsQuery`](queries/nationResourceStats.md#nationresourcestatsquery)\<\[\], \{ \}\>

A fresh NationResourceStatsQuery instance

##### nations()

> **nations**(): [`NationsQuery`](queries/nations.md#nationsquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:102](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L102)

Create a new nations query builder

###### Returns

[`NationsQuery`](queries/nations.md#nationsquery)\<\[\], \[\]\>

A fresh NationsQuery instance

##### resourceStats()

> **resourceStats**(): [`ResourceStatsQuery`](queries/resourceStats.md#resourcestatsquery)\<\[\]\>

Defined in: [api/queries/index.ts:255](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L255)

Create a new resource stats query builder

###### Returns

[`ResourceStatsQuery`](queries/resourceStats.md#resourcestatsquery)\<\[\]\>

A fresh ResourceStatsQuery instance

##### topTradeInfo()

> **topTradeInfo**(): [`TopTradeInfoQuery`](queries/topTradeInfo.md#toptradeinfoquery)\<\[\], \{ \}\>

Defined in: [api/queries/index.ts:120](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L120)

Create a new top trade info query builder

###### Returns

[`TopTradeInfoQuery`](queries/topTradeInfo.md#toptradeinfoquery)\<\[\], \{ \}\>

A fresh TopTradeInfoQuery instance

##### tradePrices()

> **tradePrices**(): [`TradePricesQuery`](queries/tradePrices.md#tradepricesquery)\<\[\]\>

Defined in: [api/queries/index.ts:138](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L138)

Create a new trade prices query builder

###### Returns

[`TradePricesQuery`](queries/tradePrices.md#tradepricesquery)\<\[\]\>

A fresh TradePricesQuery instance

##### trades()

> **trades**(): [`TradesQuery`](queries/trades.md#tradesquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:129](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L129)

Create a new trades query builder

###### Returns

[`TradesQuery`](queries/trades.md#tradesquery)\<\[\], \[\]\>

A fresh TradesQuery instance

##### treasures()

> **treasures**(): [`TreasuresQuery`](queries/treasures.md#treasuresquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:84](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L84)

Create a new treasures query builder

###### Returns

[`TreasuresQuery`](queries/treasures.md#treasuresquery)\<\[\], \[\]\>

A fresh TreasuresQuery instance

##### treasureTrades()

> **treasureTrades**(): [`TreasureTradesQuery`](queries/treasureTrades.md#treasuretradesquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:237](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L237)

Create a new treasure trades query builder

###### Returns

[`TreasureTradesQuery`](queries/treasureTrades.md#treasuretradesquery)\<\[\], \[\]\>

A fresh TreasureTradesQuery instance

##### treaties()

> **treaties**(): [`TreatiesQuery`](queries/treaties.md#treatiesquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:147](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L147)

Create a new treaties query builder

###### Returns

[`TreatiesQuery`](queries/treaties.md#treatiesquery)\<\[\], \[\]\>

A fresh TreatiesQuery instance

##### warAttacks()

> **warAttacks**(): [`WarAttacksQuery`](queries/warAttacks.md#warattacksquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:165](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L165)

Create a new war attacks query builder

###### Returns

[`WarAttacksQuery`](queries/warAttacks.md#warattacksquery)\<\[\], \[\]\>

A fresh WarAttacksQuery instance

##### wars()

> **wars**(): [`WarsQuery`](queries/wars.md#warsquery)\<\[\], \[\]\>

Defined in: [api/queries/index.ts:156](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/api/queries/index.ts#L156)

Create a new wars query builder

###### Returns

[`WarsQuery`](queries/wars.md#warsquery)\<\[\], \[\]\>

A fresh WarsQuery instance
