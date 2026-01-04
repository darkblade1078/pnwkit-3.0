/**
 * Infer the subquery result type from a SubqueryBuilder's type parameters
 */
export type InferSubqueryType<TBuilder> = 
    TBuilder extends SubqueryBuilder<infer TFields, infer TSelected, any, infer TIncluded, any>
        ? TSelected extends readonly (keyof TFields)[]
            ? TSelected extends readonly []
                ? TFields & TIncluded
                : SelectFields<TFields, TSelected, TIncluded>
            : TFields
        : any;

// Import the actual class type
import type { SubqueryBuilder } from "../builders/queryBuilder.js";

export type SelectFields<
T, 
F extends readonly (keyof T)[],
I extends Record<string, any> = {}
> = Required<Pick<T, F[number]>> & I;

export type paginatorInfo = {
    count: number;
    currentPage: number;
    firstItem?: number | null;
    hasMorePages: boolean;
    lastItem?: number | null;
    lastPage: number;
    perPage: number;
    total: number;
}

export type SortOrder = 'ASC' | 'DESC';

export interface DefaultParams {
    page?: number;
    first?: number;
}