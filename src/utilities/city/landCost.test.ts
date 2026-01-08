import { describe, it, expect } from "vitest";
import { landCost } from "./landCost";

describe("landCost", () => {
    it("calculates cost with no discounts", () => {
        const costValue = 6_280.00;
        const cost = landCost(100, 200);
        expect(typeof cost).toBe("number");
        expect(cost).toBeGreaterThan(0);
        expect(cost).toEqual(costValue);
    });

    it("calculates cost with all discounts", () => {
        const costValue = 5_102.50;
        const cost = landCost(100, 200, true, true, true, true, true);
        expect(typeof cost).toBe("number");
        expect(cost).toBeGreaterThan(0);
        expect(cost).toEqual(costValue);
    });

    it("calculates large difference with no discounts", () => {
        const costValue = 21_040_800.00;
        const cost = landCost(3000, 4000);
        expect(typeof cost).toBe("number");
        expect(cost).toBeGreaterThan(0);
        expect(cost).toEqual(costValue);
    });

    it("calculates large difference with all discounts", () => {
        const costValue = 17_095_650.00;
        const cost = landCost(3000, 4000, true, true, true, true, true);
        expect(typeof cost).toBe("number");
        expect(cost).toBeGreaterThan(0);
        expect(cost).toEqual(costValue);
    });

    it("returns 0 if no land is bought", () => {
        const cost = landCost(100, 100);
        expect(cost).toBe(0);
    });

    it("throws if difference is too large", () => {
        expect(() => landCost(0, 10001)).toThrow();
    });
});
