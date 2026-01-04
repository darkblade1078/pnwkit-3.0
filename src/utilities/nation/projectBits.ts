import { ProjectBits } from "../../types/utilities/projectBits.js";

/**
 * Check if a nation has a specific project built.
 * 
 * The Politics & War API stores project data as a bit field where each bit
 * represents whether a project is built. Bits are indexed right-to-left using
 * standard bit shift operations, where position 0 is the rightmost/least significant bit.
 * 
 * @param projectBits - The project_bits string from the API (e.g., "1679868772347")
 * @param projectPosition - The bit position (0-40) using standard right-to-left indexing
 * @returns true if the nation has the project, false otherwise
 * 
 * @example
 * ```typescript
 * const hasAUP = ConvertBitsToProject(data[0].project_bits, 15); // ADVANCED_URBAN_PLANNING
 * console.log(hasAUP); // true or false
 * ```
 */
export function ConvertBitsToProject(projectBits: string, projectPosition: number): boolean
{
    const bits = BigInt(projectBits);
    return (bits & (1n << BigInt(projectPosition))) !== 0n;
}