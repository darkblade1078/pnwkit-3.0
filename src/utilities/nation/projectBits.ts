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
 * @throws Error if parameters are invalid
 * 
 * @example
 * ```typescript
 * const hasAUP = ConvertBitsToProject(data[0].project_bits, 15); // ADVANCED_URBAN_PLANNING
 * console.log(hasAUP); // true or false
 * ```
 */
export function ConvertBitsToProject(projectBits: string, projectPosition: number): boolean
{
    // Validate projectPosition
    if (!Number.isInteger(projectPosition) || projectPosition < 0 || projectPosition > 63)
        throw new Error('projectPosition must be an integer between 0 and 63');
    
    // Validate projectBits format
    if (typeof projectBits !== 'string' || !/^\d+$/.test(projectBits))
        throw new Error('projectBits must be a numeric string');
    
    try 
    {
        const bits = BigInt(projectBits);
        return (bits & (1n << BigInt(projectPosition))) !== 0n;
    } 
    catch (error) 
    {
        throw new Error(`Invalid project bits value: ${projectBits}`);
    }
}