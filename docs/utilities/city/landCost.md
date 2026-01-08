[**pnwkit 3.0 v3.0.0**](../../README.md)

***

[pnwkit 3.0](../../modules.md) / utilities/city/landCost

# utilities/city/landCost

## Functions

### landCost()

> **landCost**(`startingAmount`, `endingAmount`, `arableLandAgency`, `advancedEngineeringCorps`, `rapidExpansion`, `governmentSupportAgency`, `bureauOfDomesticAffairs`): `number`

Defined in: [utilities/city/landCost.ts:20](https://github.com/darkblade1078/pnwkit-3.0/blob/7be0cfb947feae03d5bb93d0b330b9e11d4123aa/src/utilities/city/landCost.ts#L20)

Calculates the total land cost between two amounts, applying discounts for various projects.

#### Parameters

##### startingAmount

`number`

Starting land amount

##### endingAmount

`number`

Ending land amount

##### arableLandAgency

`boolean` = `false`

If true, applies 5% or 10% discount with advancedEngineeringCorps

##### advancedEngineeringCorps

`boolean` = `false`

If true, applies additional discount with arableLandAgency

##### rapidExpansion

`boolean` = `false`

If true, applies discount based on governmentSupportAgency or bureauOfDomesticAffairs

##### governmentSupportAgency

`boolean` = `false`

If true, increases rapidExpansion discount

##### bureauOfDomesticAffairs

`boolean` = `false`

If true, increases rapidExpansion discount further

#### Returns

`number`

Total land cost after discounts

#### Example

```ts
// Basic usage
const cost = landCost(20, 500);
// With all discounts
const discounted = landCost(20, 500, true, true, true, true, true);
```
