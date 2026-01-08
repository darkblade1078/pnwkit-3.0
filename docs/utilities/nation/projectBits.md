[**pnwkit 3.0 v3.0.0**](../../README.md)

***

[pnwkit 3.0](../../modules.md) / utilities/nation/projectBits

# utilities/nation/projectBits

## Functions

### ConvertBitsToProject()

> **ConvertBitsToProject**(`projectBits`, `projectPosition`): `boolean`

Defined in: [utilities/nation/projectBits.ts:20](https://github.com/darkblade1078/pnwkit-3.0/blob/90a5a52aed3afbb66ab886d65370a1461d0b47a4/src/utilities/nation/projectBits.ts#L20)

Check if a nation has a specific project built.

The Politics & War API stores project data as a bit field where each bit
represents whether a project is built. Bits are indexed right-to-left using
standard bit shift operations, where position 0 is the rightmost/least significant bit.

#### Parameters

##### projectBits

`string`

The project_bits string from the API (e.g., "1679868772347")

##### projectPosition

`number`

The bit position (0-40) using standard right-to-left indexing

#### Returns

`boolean`

true if the nation has the project, false otherwise

#### Throws

Error if parameters are invalid

#### Example

```typescript
const hasIronDome = ConvertBitsToProject(data[0].project_bits, 0); // IRON_DOME
const hasVDS = ConvertBitsToProject(data[0].project_bits, 1);      // VITAL_DEFENSE_SYSTEM
console.log(hasIronDome); // true or false
```
