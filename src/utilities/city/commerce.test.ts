import { describe, it, expect } from "vitest";
import commerce from "../city/commerce";

describe("commerce", () => {
    it("calculates commerce correctly with no bonuses", () => {
        expect(commerce(4, 6, 5, 3, 1)).toBe(100);
    });
    it("throws error for exceeding limits", () => {
        expect(() => commerce(5, 2, 2, 1, 1)).toThrow();
    });
    it("applies internationalTradeCenter bonus", () => {
        expect(commerce(4, 6, 5, 3, 1, true)).toBe(115);
    });
    it("applies telecommunicationsSatellite bonus", () => {
        expect(commerce(4, 6, 5, 3, 1, false, true)).toBe(100);
    });
});
