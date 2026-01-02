import type { AllianceRelations, AllianceQueryParams } from "./queries/alliance.js";
import type { ApiKeyDetailsQueryParams, ApiKeyDetailsRelations } from "./queries/apiKeyDetails.js";
import type { NationRelations, NationQueryParams } from "./queries/nation.js";

/**
 * Unwrap array types to get the element type
 */
type UnwrapArray<T> = T extends (infer U)[] ? U : T;

/**
 * Explicit lookup table mapping Fields types to their QueryParams types
 * This uses the __typename discriminator for reliable type resolution
*/
export interface FieldsToQueryParamsMap {
    Alliance: AllianceQueryParams;
    Nation: NationQueryParams;
    ApiKeyDetails: ApiKeyDetailsQueryParams;
}

/**
 * Explicit lookup table mapping Fields types to their Relations types
*/
export interface FieldsToRelationsMap {
    Alliance: AllianceRelations;
    Nation: NationRelations;
    ApiKeyDetails: ApiKeyDetailsRelations;
}

/**
 * Extract the __typename from a Fields type
*/
type ExtractTypeName<T> = T extends { __typename?: infer U } ? U : never;

/**
 * Lookup the Relations type for a given Fields type using __typename
*/
export type GetRelationsFor<TFields> = 
    ExtractTypeName<UnwrapArray<TFields>> extends keyof FieldsToRelationsMap
        ? FieldsToRelationsMap[ExtractTypeName<UnwrapArray<TFields>>]
        : {};

/**
 * Lookup the QueryParams type for a given Fields type using __typename
*/
export type GetQueryParamsFor<TFields> = 
    ExtractTypeName<UnwrapArray<TFields>> extends keyof FieldsToQueryParamsMap
        ? FieldsToQueryParamsMap[ExtractTypeName<UnwrapArray<TFields>>]
        : Record<string, any>;
