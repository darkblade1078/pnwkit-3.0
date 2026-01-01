import type { AllianceRelations, AllianceQueryParams } from "./queries/alliance.js";
import type { NationRelations, NationQueryParams } from "./queries/nation.js";

/**
 * Explicit lookup table mapping Fields types to their QueryParams types
 * This uses the __typename discriminator for reliable type resolution
*/
export interface FieldsToQueryParamsMap {
    Alliance: AllianceQueryParams;
    Nation: NationQueryParams;
}

/**
 * Explicit lookup table mapping Fields types to their Relations types
*/
export interface FieldsToRelationsMap {
    Alliance: AllianceRelations;
    Nation: NationRelations;
}

/**
 * Extract the __typename from a Fields type
*/
type ExtractTypeName<T> = T extends { __typename?: infer U } ? U : never;

/**
 * Lookup the Relations type for a given Fields type using __typename
*/
export type GetRelationsFor<TFields> = 
    ExtractTypeName<TFields> extends keyof FieldsToRelationsMap
        ? FieldsToRelationsMap[ExtractTypeName<TFields>]
        : {};

/**
 * Lookup the QueryParams type for a given Fields type using __typename
*/
export type GetQueryParamsFor<TFields> = 
    ExtractTypeName<TFields> extends keyof FieldsToQueryParamsMap
        ? FieldsToQueryParamsMap[ExtractTypeName<TFields>]
        : Record<string, any>;
