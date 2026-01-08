import { describe, it, expect } from "vitest";
import { cityCost } from "./cityCost";

describe("cityCost", () => {
    const TOP20_AVG = 43.2035; // Current average

    describe("basic calculations", () => {
        it("should calculate cost for second city", () => {
            const expectedCost = 400_000;
            const cost = cityCost(2, TOP20_AVG);
            expect(cost).toBeCloseTo(expectedCost);
        });

        it("should calculate cost for 10th city", () => {
            const cost = cityCost(10, TOP20_AVG);
            expect(cost).toBeGreaterThan(0);
            expect(Number.isFinite(cost)).toBe(true);
        });

        it("should calculate cost for 50th city", () => {
            const expectedCost = 6_029_180_309.75;
            const cost = cityCost(50, TOP20_AVG);
            expect(cost).toBeCloseTo(expectedCost);
        });

        it("should calculate cost for maximum city (999)", () => {
            const expectedCost = 96_501_499_660_345.22;
            const cost = cityCost(999, TOP20_AVG);
            expect(cost).toBeCloseTo(expectedCost);
        });
    });

    describe("discounts", () => {
        it("should apply Manifest Destiny discount", () => {
            const expectedCost = 2_369_242_864.58;
            const discountedCost = cityCost(40, TOP20_AVG, true);
            expect(discountedCost).toBeCloseTo(expectedCost);
        });

        it("should apply Manifest Destiny + Government Support Agency discounts", () => {
            const expectedCost = 2_306_894_368.15;
            const discountedCost = cityCost(40, TOP20_AVG, true, true);
            expect(discountedCost).toBeCloseTo(expectedCost);
        });

        it("should apply all discounts", () => {
            const expectedCost = 2_275_720_119.93;
            const discountedCost = cityCost(40, TOP20_AVG, true, true, true);
            expect(discountedCost).toBeCloseTo(expectedCost);
        });
    });
});