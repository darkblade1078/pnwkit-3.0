import { describe, it, expect } from "vitest";
import infraCost from "./infraCost";

describe("infraCost", () => {
    it("calculates cost with no discounts", () => {
        const costValue = 32_806.00;
        const cost = infraCost(100, 200);
        expect(typeof cost).toBe("number");
        expect(cost).toBeGreaterThan(0);
        expect(cost).toEqual(costValue);
    });

    it("calculates cost with all discounts", () => {
        const costValue = 26_654.88;
        const cost = infraCost(100, 200, true, true, true, true, true);
        expect(typeof cost).toBe("number");
        expect(cost).toBeGreaterThan(0);
        expect(cost).toEqual(costValue);
    });

    it("calculates large difference with no discounts", () => {
        const costValue = 86_032_983.00;
        const cost = infraCost(3000, 4000);
        expect(typeof cost).toBe("number");
        expect(cost).toBeGreaterThan(0);
        expect(cost).toEqual(costValue);
    });

    it("calculates large difference with all discounts", () => {
        const costValue = 69_901_798.69;
        const cost = infraCost(3000, 4000, true, true, true, true, true);
        expect(typeof cost).toBe("number");
        expect(cost).toBeGreaterThan(0);
        expect(cost).toEqual(costValue);
    });

    it("returns 0 if no infra is bought", () => {
        const cost = infraCost(100, 100);
        expect(cost).toBe(0);
    });

    it("throws if difference is too large", () => {
        expect(() => infraCost(0, 10001)).toThrow();
    });
});
