import { describe, it, expect } from 'vitest';
import { basePopulation, populationDensity, ageBonus } from '../city/population';

describe("basePopulation", () => {
    it("calculates base population correctly", () => {
        expect(basePopulation(10)).toBe(1000);
    });
    it("throws error for negative infrastructure", () => {
        expect(() => basePopulation(-1)).toThrow();
    });
});

describe("populationDensity", () => {
    it("calculates population density correctly", () => {
        expect(populationDensity(1000, 10)).toBe(100);
    });
    it("throws error for zero land", () => {
        expect(() => populationDensity(1000, 0)).toThrow();
    });
    it("throws error for negative population", () => {
        expect(() => populationDensity(-1, 10)).toThrow();
    });
});

describe("ageBonus", () => {
    it("calculates age bonus correctly", () => {
        expect(Math.round(ageBonus(2022) * 300000)).toBeCloseTo(452237, 4);
    });
    it("throws error for negative city age", () => {
        expect(() => ageBonus(-1)).toThrow();
    });
});
