[**pnwkit 3.0 v3.0.0**](README.md)

***

[pnwkit 3.0](modules.md) / utilities

# utilities

## Classes

### default

Defined in: [utilities/index.ts:23](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/utilities/index.ts#L23)

Collection of utility functions for Politics & War calculations and data transformations.

Provides helper functions for:
- Converting project bits to boolean values
- Calculating city costs based on city count
- Other game-related calculations

#### Example

```typescript
const utils = new utilities();

// Check if nation has a specific project
const hasProject = utils.convertBitsToProject(projectBits, projectNumber);

// Calculate cost for next city
const cost = utils.cityCost(cityCount, top20Average);
```

#### Constructors

##### Constructor

> **new default**(): [`default`](#default)

###### Returns

[`default`](#default)

#### Properties

##### cityCost()

> **cityCost**: (`cityToBuy`, `top20Average`, `manifestDestiny`, `governmentSupportAgency`, `bureauOfDomesticAffairs`) => `number`

Defined in: [utilities/index.ts:29](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/utilities/index.ts#L29)

Calculate the cost of purchasing a city based on current city count

Calculate the cost of a new city based on the new formula (effective late February 2025).

The city cost projects (MP, UP, AUP) were removed and replaced with a dynamic formula
that considers the top 20% average city count.

###### Parameters

###### cityToBuy

`number`

The city number being purchased (e.g., if you have 10 cities, this is 11)

###### top20Average

`number`

The average city count of the top 20% of active nations (updated monthly)

###### manifestDestiny

`boolean` = `false`

###### governmentSupportAgency

`boolean` = `false`

###### bureauOfDomesticAffairs

`boolean` = `false`

###### Returns

`number`

The cost in dollars for the next city

###### Throws

Error if parameters are invalid (not finite, out of range, or produce unsafe results)

###### Example

```typescript
const cost = cityCost(41, 43.2035);
console.log(cost); // Cost for city 41 with current top20Average
```

##### convertBitsToProject()

> **convertBitsToProject**: (`projectBits`, `projectPosition`) => `boolean` = `ConvertBitsToProject`

Defined in: [utilities/index.ts:26](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/utilities/index.ts#L26)

Convert project bits to boolean indicating if nation has specific project

Check if a nation has a specific project built.

The Politics & War API stores project data as a bit field where each bit
represents whether a project is built. Bits are indexed right-to-left using
standard bit shift operations, where position 0 is the rightmost/least significant bit.

###### Parameters

###### projectBits

`string`

The project_bits string from the API (e.g., "1679868772347")

###### projectPosition

`number`

The bit position (0-40) using standard right-to-left indexing

###### Returns

`boolean`

true if the nation has the project, false otherwise

###### Throws

Error if parameters are invalid

###### Example

```typescript
const hasIronDome = ConvertBitsToProject(data[0].project_bits, 0); // IRON_DOME
const hasVDS = ConvertBitsToProject(data[0].project_bits, 1);      // VITAL_DEFENSE_SYSTEM
console.log(hasIronDome); // true or false
```
