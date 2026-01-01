import type { AllianceFields, AllianceRelations } from "./queries/alliance.js";
import type { NationFields, NationRelations } from "./queries/nation.js";

/**
 * Global registry mapping field types to their relation types
 * Add new entries here when you define relations for a new entity
*/
export interface FieldsToRelationsMap {
    [key: string]: any;
}

/**
 * Lookup the Relations type for a given Fields type
 * Uses conditional type checking to find the match
*/
export type GetRelationsFor<TFields> = 
    TFields extends AllianceFields ? AllianceRelations :
    TFields extends NationFields ? NationRelations :
    {}; // Default to empty object for types without relations
