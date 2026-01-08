[**pnwkit 3.0 v3.0.0**](../../README.md)

***

[pnwkit 3.0](../../modules.md) / utilities/city/infraCost

# utilities/city/infraCost

## Functions

### infraCost()

> **infraCost**(`startingAmount`, `endingAmount`, `centerOfCivilEngineering`, `advancedEngineeringCorps`, `urbanization`, `governmentSupportAgency`, `bureauOfDomesticAffairs`): `number`

Defined in: utilities/city/infraCost.ts:18

Calculates the total infrastructure cost between two amounts, applying discounts for various projects.

#### Parameters

##### startingAmount

`number`

Starting infrastructure amount

##### endingAmount

`number`

Ending infrastructure amount

##### centerOfCivilEngineering

`boolean` = `false`

If true, applies 5% or 10% discount with advancedEngineeringCorps

##### advancedEngineeringCorps

`boolean` = `false`

If true, applies additional discount with centerOfCivilEngineering

##### urbanization

`boolean` = `false`

If true, applies discount based on governmentSupportAgency or bureauOfDomesticAffairs

##### governmentSupportAgency

`boolean` = `false`

If true, increases urbanization discount

##### bureauOfDomesticAffairs

`boolean` = `false`

If true, increases urbanization discount further

#### Returns

`number`

Total infrastructure cost after discounts

#### Example

```ts
// Basic usage
const cost = infraCost(100, 200);
// With all discounts
const discounted = infraCost(100, 200, true, true, true, true, true);
```
