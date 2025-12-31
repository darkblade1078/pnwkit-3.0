export type SelectFields<
T, 
F extends readonly (keyof T)[],
I extends Record<string, any> = {}
> = Pick<T, F[number]> & I;

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