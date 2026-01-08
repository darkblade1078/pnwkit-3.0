[**pnwkit 3.0 v3.0.0**](../../README.md)

***

[pnwkit 3.0](../../modules.md) / utilities/city/cityCost

# utilities/city/cityCost

## Functions

### cityCost()

> **cityCost**(`cityToBuy`, `top20Average`, `manifestDestiny`, `governmentSupportAgency`, `bureauOfDomesticAffairs`): `number`

Defined in: [utilities/city/cityCost.ts:18](https://github.com/darkblade1078/pnwkit-3.0/blob/085419c46a49bbb98b19db9f48afa54e31903c55/src/utilities/city/cityCost.ts#L18)

Calculate the cost of a new city based on the new formula (effective late February 2025).

The city cost projects (MP, UP, AUP) were removed and replaced with a dynamic formula
that considers the top 20% average city count.

#### Parameters

##### cityToBuy

`number`

The city number being purchased (e.g., if you have 10 cities, this is 11)

##### top20Average

`number`

The average city count of the top 20% of active nations (updated monthly)

##### manifestDestiny

`boolean` = `false`

##### governmentSupportAgency

`boolean` = `false`

##### bureauOfDomesticAffairs

`boolean` = `false`

#### Returns

`number`

The cost in dollars for the next city

#### Throws

Error if parameters are invalid (not finite, out of range, or produce unsafe results)

#### Example

```typescript
const cost = cityCost(41, 43.2035);
console.log(cost); // Cost for city 41 with current top20Average
```
