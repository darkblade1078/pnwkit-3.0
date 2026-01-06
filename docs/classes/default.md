[**PnWKit 3.0 v3.0.0**](../README.md)

***

[PnWKit 3.0](../globals.md) / default

# Class: default

Defined in: [index.ts:43](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/index.ts#L43)

Main PnWKit client for interacting with the Politics & War API.

Provides a type-safe, fluent API for querying Politics & War GraphQL endpoints
with built-in retry logic, rate limiting, and optional caching.

## Example

```typescript
// Simple usage without caching
const pnwkit = new PnWKit("your-api-key");

// With LRU caching enabled (recommended for production)
const pnwkit = new PnWKit("your-api-key", {
  cache: {
    enabled: true,
    ttl: 60000,    // Cache for 1 minute
    maxSize: 100   // Store up to 100 queries
  }
});

// Query nations with filters
const nations = await pnwkit.queries.nations()
  .select('id', 'nation_name', 'score')
  .where({ min_score: 1000, first: 10 })
  .execute();

// Query alliances with nested relations
const alliances = await pnwkit.queries.alliances()
  .select('id', 'name')
  .include('nations', builder => builder.select('id', 'nation_name'))
  .where({ first: 5 })
  .execute();

// Manage cache
pnwkit.clearCache(); // Clear all cached queries
const stats = pnwkit.getCacheStats(); // Check cache utilization
```

## Extends

- `default`

## Constructors

### Constructor

> **new default**(`apiKey`, `options?`): `PnWKit`

Defined in: [index.ts:63](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/index.ts#L63)

Create a new PnWKit instance.

#### Parameters

##### apiKey

`string`

Your Politics & War API key

##### options?

`PnWKitOptions`

Optional configuration including cache settings

#### Returns

`PnWKit`

#### Example

```typescript
// Without caching
const pnwkit = new PnWKit("your-api-key");

// With caching
const pnwkit = new PnWKit("your-api-key", {
  cache: { enabled: true, ttl: 60000, maxSize: 100 }
});
```

#### Overrides

`PnwKitApi.constructor`

## Properties

### apiKey

> `protected` `readonly` **apiKey**: `string`

Defined in: [api/index.ts:35](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/index.ts#L35)

Politics & War API key for authentication

#### Inherited from

`PnwKitApi.apiKey`

***

### cacheOptions?

> `protected` `readonly` `optional` **cacheOptions**: `CacheOptions`

Defined in: [api/index.ts:23](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/index.ts#L23)

Cache configuration (if enabled)

#### Inherited from

`PnwKitApi.cacheOptions`

***

### queries

> `readonly` **queries**: `Queries`

Defined in: [api/index.ts:17](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/index.ts#L17)

Query builders for all Politics & War GraphQL queries

#### Inherited from

`PnwKitApi.queries`

***

### utilities

> `readonly` **utilities**: `utilities`

Defined in: [api/index.ts:20](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/index.ts#L20)

Utility functions for calculations and data transformations

#### Inherited from

`PnwKitApi.utilities`

## Methods

### clearCache()

> **clearCache**(): `void`

Defined in: [api/index.ts:53](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/index.ts#L53)

Clear all cached query responses.

Useful for forcing fresh data retrieval or managing memory usage.
Safe to call even if caching is disabled.

#### Returns

`void`

#### Inherited from

`PnwKitApi.clearCache`

***

### getCacheStats()

> **getCacheStats**(): \{ `max`: `number`; `size`: `number`; \} \| `undefined`

Defined in: [api/index.ts:63](https://github.com/darkblade1078/pnwkit-3.0/blob/88b72e1b56360f1739d9ed0782d2c6652815ba6c/src/api/index.ts#L63)

Get cache statistics including current size and maximum capacity.

#### Returns

\{ `max`: `number`; `size`: `number`; \} \| `undefined`

Object with `size` (current entries) and `max` (capacity limit),
         or undefined if caching is disabled

#### Inherited from

`PnwKitApi.getCacheStats`
