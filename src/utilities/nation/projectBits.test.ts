import { describe, it, expect } from "vitest";
import { ConvertBitsToProject } from "./projectBits";

describe("ConvertBitsToProject", () => {
    describe("basic bit checking", () => {
        it("should return true when bit 0 is set", () => {
            // Binary: 1 (bit 0 is set)
            expect(ConvertBitsToProject("1", 0)).toBe(true);
        });

        it("should return false when bit 0 is not set", () => {
            // Binary: 0 (no bits set)
            expect(ConvertBitsToProject("0", 0)).toBe(false);
        });

        it("should return true when bit 1 is set", () => {
            // Binary: 10 (bit 1 is set) = decimal 2
            expect(ConvertBitsToProject("2", 1)).toBe(true);
        });

        it("should return false when bit 1 is not set", () => {
            // Binary: 1 (bit 0 is set, bit 1 is not)
            expect(ConvertBitsToProject("1", 1)).toBe(false);
        });

        it("should handle multiple bits set correctly", () => {
            // Binary: 101 (bits 0 and 2 are set) = decimal 5
            const bits = "5";
            expect(ConvertBitsToProject(bits, 0)).toBe(true);
            expect(ConvertBitsToProject(bits, 1)).toBe(false);
            expect(ConvertBitsToProject(bits, 2)).toBe(true);
        });

        it("should handle all bits unset (zero)", () => {
            expect(ConvertBitsToProject("0", 0)).toBe(false);
            expect(ConvertBitsToProject("0", 5)).toBe(false);
            expect(ConvertBitsToProject("0", 10)).toBe(false);
            expect(ConvertBitsToProject("0", 40)).toBe(false);
        });
    });

    describe("larger bit values", () => {
        it("should handle bit position 10", () => {
            // 2^10 = 1024
            expect(ConvertBitsToProject("1024", 10)).toBe(true);
            expect(ConvertBitsToProject("1024", 9)).toBe(false);
            expect(ConvertBitsToProject("1024", 11)).toBe(false);
        });

        it("should handle bit position 20", () => {
            // 2^20 = 1048576
            expect(ConvertBitsToProject("1048576", 20)).toBe(true);
            expect(ConvertBitsToProject("1048576", 19)).toBe(false);
        });

        it("should handle bit position 30", () => {
            // 2^30 = 1073741824
            expect(ConvertBitsToProject("1073741824", 30)).toBe(true);
        });

        it("should handle maximum bit position (40)", () => {
            // 2^40 = 1099511627776
            expect(ConvertBitsToProject("1099511627776", 40)).toBe(true);
            expect(ConvertBitsToProject("1099511627776", 39)).toBe(false);
        });

        it("should handle very large bit values", () => {
            // Large number with multiple bits set
            const largeBits = "1099511627777"; // 2^40 + 1 (bits 0 and 40 set)
            expect(ConvertBitsToProject(largeBits, 0)).toBe(true);
            expect(ConvertBitsToProject(largeBits, 40)).toBe(true);
            expect(ConvertBitsToProject(largeBits, 1)).toBe(false);
        });
    });

    describe("realistic game scenarios", () => {
        it("should check Iron Dome (position 0)", () => {
            const withIronDome = "1"; // First bit set
            const withoutIronDome = "0";
            
            expect(ConvertBitsToProject(withIronDome, 0)).toBe(true);
            expect(ConvertBitsToProject(withoutIronDome, 0)).toBe(false);
        });

        it("should check multiple projects at once", () => {
            // Nation with first 3 projects: 111 in binary = 7 in decimal
            const projectBits = "7";
            
            expect(ConvertBitsToProject(projectBits, 0)).toBe(true);
            expect(ConvertBitsToProject(projectBits, 1)).toBe(true);
            expect(ConvertBitsToProject(projectBits, 2)).toBe(true);
            expect(ConvertBitsToProject(projectBits, 3)).toBe(false);
        });

        it("should handle nation with many projects", () => {
            // All first 10 bits set: 1111111111 = 1023
            const projectBits = "1023";
            
            for (let i = 0; i < 10; i++) {
                expect(ConvertBitsToProject(projectBits, i)).toBe(true);
            }
            expect(ConvertBitsToProject(projectBits, 10)).toBe(false);
        });

        it("should handle sparse project distribution", () => {
            // Projects at positions 0, 5, 10, 15, 20
            // 2^0 + 2^5 + 2^10 + 2^15 + 2^20 = 1 + 32 + 1024 + 32768 + 1048576 = 1082401
            const projectBits = "1082401";
            
            expect(ConvertBitsToProject(projectBits, 0)).toBe(true);
            expect(ConvertBitsToProject(projectBits, 5)).toBe(true);
            expect(ConvertBitsToProject(projectBits, 10)).toBe(true);
            expect(ConvertBitsToProject(projectBits, 15)).toBe(true);
            expect(ConvertBitsToProject(projectBits, 20)).toBe(true);
            
            // Check gaps
            expect(ConvertBitsToProject(projectBits, 1)).toBe(false);
            expect(ConvertBitsToProject(projectBits, 6)).toBe(false);
            expect(ConvertBitsToProject(projectBits, 11)).toBe(false);
        });
    });

    describe("input validation", () => {
        it("should throw error for negative position", () => {
            expect(() => ConvertBitsToProject("1", -1)).toThrow(
                "projectPosition must be an integer between 0 and 40"
            );
            expect(() => ConvertBitsToProject("1", -10)).toThrow(
                "projectPosition must be an integer between 0 and 40"
            );
        });

        it("should throw error for position too high", () => {
            expect(() => ConvertBitsToProject("1", 41)).toThrow(
                "projectPosition must be an integer between 0 and 40"
            );
            expect(() => ConvertBitsToProject("1", 100)).toThrow(
                "projectPosition must be an integer between 0 and 40"
            );
        });

        it("should throw error for non-integer position", () => {
            expect(() => ConvertBitsToProject("1", 3.5)).toThrow(
                "projectPosition must be an integer between 0 and 40"
            );
            expect(() => ConvertBitsToProject("1", 10.1)).toThrow(
                "projectPosition must be an integer between 0 and 40"
            );
        });

        it("should throw error for non-numeric string", () => {
            expect(() => ConvertBitsToProject("abc", 0)).toThrow(
                "projectBits must be a numeric string"
            );
            expect(() => ConvertBitsToProject("12a34", 0)).toThrow(
                "projectBits must be a numeric string"
            );
            expect(() => ConvertBitsToProject("12.34", 0)).toThrow(
                "projectBits must be a numeric string"
            );
        });

        it("should throw error for non-string projectBits", () => {
            // @ts-expect-error Testing invalid input
            expect(() => ConvertBitsToProject(123, 0)).toThrow(
                "projectBits must be a numeric string"
            );
            // @ts-expect-error Testing invalid input
            expect(() => ConvertBitsToProject(null, 0)).toThrow(
                "projectBits must be a numeric string"
            );
        });

        it("should throw error for empty string", () => {
            expect(() => ConvertBitsToProject("", 0)).toThrow();
        });

        it("should throw error for string with spaces", () => {
            expect(() => ConvertBitsToProject("1 234", 0)).toThrow(
                "projectBits must be a numeric string"
            );
        });
    });

    describe("edge cases", () => {
        it("should handle valid positions from 0 to 40", () => {
            const allBitsSet = "2199023255551"; // 2^41 - 1 (all 41 bits set: positions 0-40)
            
            for (let i = 0; i <= 40; i++) {
                expect(ConvertBitsToProject(allBitsSet, i)).toBe(true);
            }
        });

        it("should handle zero with any valid position", () => {
            for (let i = 0; i <= 40; i++) {
                expect(ConvertBitsToProject("0", i)).toBe(false);
            }
        });

        it("should handle alternating bits", () => {
            // Bits at positions 0, 2, 4, 6, 8, 10... (alternating)
            // 10101010101... in binary
            const alternating = "1431655765"; // 0x55555555 in hex
            
            expect(ConvertBitsToProject(alternating, 0)).toBe(true);
            expect(ConvertBitsToProject(alternating, 1)).toBe(false);
            expect(ConvertBitsToProject(alternating, 2)).toBe(true);
            expect(ConvertBitsToProject(alternating, 3)).toBe(false);
        });

        it("should handle only highest bit set", () => {
            const onlyHighest = "1099511627776"; // 2^40
            
            expect(ConvertBitsToProject(onlyHighest, 40)).toBe(true);
            for (let i = 0; i < 40; i++) {
                expect(ConvertBitsToProject(onlyHighest, i)).toBe(false);
            }
        });

        it("should handle consecutive bits", () => {
            // First 5 bits set: 11111 = 31
            const first5 = "31";
            
            for (let i = 0; i < 5; i++) {
                expect(ConvertBitsToProject(first5, i)).toBe(true);
            }
            for (let i = 5; i <= 40; i++) {
                expect(ConvertBitsToProject(first5, i)).toBe(false);
            }
        });
    });

    describe("BigInt compatibility", () => {
        it("should handle numbers larger than Number.MAX_SAFE_INTEGER", () => {
            const largeNumber = "9007199254740992"; // 2^53 (beyond MAX_SAFE_INTEGER)
            expect(() => ConvertBitsToProject(largeNumber, 0)).not.toThrow();
        });

        it("should correctly parse very large bit strings", () => {
            const veryLarge = "999999999999999999999"; // Extremely large
            expect(() => ConvertBitsToProject(veryLarge, 0)).not.toThrow();
        });
    });
});