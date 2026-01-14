import { describe, it, expect } from "vitest";
import { foodProduction, radiationModifier } from "../city/food";

describe("foodProduction", () => {
    it("calculates food production correctly for spring", () => {
        expect(foodProduction(20, 6000, 0.2409, false, 'spring')).toBeCloseTo(273.276);
    });
    it("calculates food production correctly for summer", () => {
        expect(foodProduction(20, 6000, 0.2409, false, "summer")).toBeCloseTo(327.9312);
    });
    it("calculates food production correctly for winter", () => {
        expect(foodProduction(20, 6000, 0.2409, false, 'winter')).toBeCloseTo(218.6208);
    });
    it("calculates food production correctly with mass irrigation", () => {
        expect(foodProduction(20, 3000, 0.2409, true, 'fall')).toBeCloseTo(170.7975);
    });
});

describe("radiationModifier", () => {
    it("calculates radiation modifier correctly", () => {
        expect(radiationModifier(159.11, 121.08)).toBeCloseTo(0.2802);
    });
    it("calculates radiation modifier with fallout shelter", () => {
        expect(radiationModifier(159.11, 121.08, true)).toBeCloseTo(0.23817);
    });
});
