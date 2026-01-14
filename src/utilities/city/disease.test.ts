import { describe, it, expect } from "vitest";
import { diseaseRate, hospitalModifier, pollutionModifier, diseaseDeaths } from "../city/disease";

describe("diseaseRate", () => {
    it("calculates disease rate correctly", () => {
        const pol = pollutionModifier(5);
        const hospital = hospitalModifier(1, true);
        expect(diseaseRate(75, 300000, pol, hospital)).toBeCloseTo(0);
    });
});

describe("hospitalModifier", () => {
    it("calculates hospital modifier without research center", () => {
        expect(hospitalModifier(2)).toBeCloseTo(5);
    });
    it("calculates hospital modifier with research center", () => {
        expect(hospitalModifier(2, true)).toBeCloseTo(7);
    });
});

describe("pollutionModifier", () => {
    it("calculates pollution modifier correctly", () => {
        expect(pollutionModifier(10)).toBeCloseTo(0.5);
    });
});

describe("diseaseDeaths", () => {
    it("calculates disease deaths correctly", () => {
        const pol = pollutionModifier(5);
        const hospital = hospitalModifier(1, true);
        const DR = diseaseRate(75, 300000, pol, hospital);
        expect(diseaseDeaths(DR, 300000)).toBeCloseTo(0);
    });
});
