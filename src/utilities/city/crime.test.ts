import { describe, it, expect } from "vitest";
import { crimeRate, policeModifier, crimeDeaths } from "../city/crime";

describe("crimeRate", () => {
    it("calculates crime rate correctly", () => {
        const modi = policeModifier(1, true);
        expect(crimeRate(125, 3000, modi)).toBeCloseTo(0);
    });
});

describe("policeModifier", () => {
    it("calculates police modifier without training program", () => {
        expect(policeModifier(2)).toBeCloseTo(5);
    });
    it("calculates police modifier with training program", () => {
        expect(policeModifier(2, true)).toBeCloseTo(7);
    });
});

describe("crimeDeaths", () => {
    it("calculates crime deaths correctly", () => {
        const modi = policeModifier(1, true);
        const CR = crimeRate(125, 3000, modi);
        expect(crimeDeaths(CR, 3000)).toBeCloseTo(0);
    });
});
