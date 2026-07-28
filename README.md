# pnwkit-3.0

A type-safe, fluent [Politics & War](https://politicsandwar.com) GraphQL API wrapper for TypeScript & JavaScript.

- 🔒 **Fully typed** — field selection, filters, and nested relations are all type-checked, with autocomplete that narrows the return type to exactly what you selected.
- 🧱 **Fluent query builder** — compose queries with `.select()`, `.where()`, and unlimited nested `.include()`.
- ♻️ **Built-in resilience** — automatic retries with exponential backoff, rate limiting, and request timeouts.
- ⚡ **Optional LRU caching** — configurable TTL and size.
- 📡 **Live subscriptions** — subscribe to real-time game events.
- 🧮 **Utilities** — helpers for common in-game calculations (city costs, population, projects, and more).

## Installation

```bash
npm install pnwkit-3.0
```

> Requires Node.js 18 or newer.

## Quick start

```typescript
import PnWKit from "pnwkit-3.0";

const pnwkit = new PnWKit("your-api-key");

// Query nations with field selection and filters
const nations = await pnwkit.queries.nations()
  .select("id", "nation_name", "score")
  .where({ min_score: 1000, first: 10 })
  .execute();
```

Only the fields you `.select()` appear on the result type — no guessing, no `any`.

## Nested relations

Include related entities to any depth; each level is independently typed and filterable.

```typescript
const alliances = await pnwkit.queries.alliances()
  .select("id", "name")
  .include("nations", nation => nation
    .select("id", "nation_name", "score")
  )
  .where({ first: 5 })
  .execute();
```

## Caching

Enable an LRU cache to avoid refetching identical queries:

```typescript
const pnwkit = new PnWKit("your-api-key", {
  cache: {
    enabled: true,
    ttl: 60_000,   // cache entries live for 1 minute
    maxSize: 100,  // store up to 100 queries
  },
});

pnwkit.clearCache();                   // clear everything
const stats = pnwkit.getCacheStats();  // { size, max } — or undefined if disabled
```

## Subscriptions

Subscribe to real-time events over websockets:

```typescript
await pnwkit.subscriptions.subscribe({
  model: "nation",
  event: "update",
  callback: (data) => console.log("Nation updated:", data),
});
```

## Utilities

Pure helpers for common Politics & War calculations:

```typescript
const cost = pnwkit.utilities.cityCost(cityCount, top20Average);
const hasProject = pnwkit.utilities.convertBitsToProject(projectBits, projectNumber);
```

## Documentation

Full API reference is generated from the source and published at
**[darkblade1078.github.io/pnwkit-3.0](https://darkblade1078.github.io/pnwkit-3.0)**.

## License

[MIT](./LICENSE) © Darkblade
