import type { SelectFields } from "../../types/others.js";
import QueryBuilder from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { NationFields, NationQueryParams, NationRelations } from "../../types/queries/nation.js";
import type { paginatorInfo } from "../../types/others.js";

class NationsQuery<
    F extends readonly (keyof NationFields)[] = [],
    I extends Record<string, any> = {}
> extends QueryBuilder
{
    private selectedFields: (keyof NationFields)[] = [];
    private filters: NationQueryParams = {};

    constructor(apiKey: string) {
        super(apiKey);
    }

    select<const Fields extends readonly (keyof NationFields)[]>
    (
        ...fields: Fields
    ): NationsQuery<Fields> 
    {
        if(fields.length === 0)
            throw new Error("At least one field must be selected.");

        this.selectedFields = [...new Set(fields)] as any;
        return this as any;
    }


    where(filters: NationQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
    K extends keyof NationRelations, 
    R extends readonly (keyof NationRelations[K])[]
    >(
        relation: K,
        fields: R
    ): NationsQuery<
    F, 
    I & Record<K, Pick<NationRelations[K], R[number]>[]>>
    {
        this.subqueries.set(relation as string, fields as readonly string[]);
        return this as any;
    }

    private buildQuery(includePaginator: boolean): string
    {
        // Build the fields string including subqueries
        const mainFields = this.selectedFields
        .filter(f => !this.subqueries.has(f as string))
        .join('\n                        ');

        // Build subquery strings
        const subqueryStrings: string[] = [];

        this.subqueries
        .forEach((fields, relation) => {
            const fieldList = fields.join('\n                            ');
            subqueryStrings.push(`
                ${relation} {
                    ${fieldList}
                }`);
        });


        // Combine main fields and subqueries
        const allFields = [mainFields, ...subqueryStrings]
        .filter(s => s.length > 0).join('\n                        ');

        const variables: string[] = [];

        if (this.limit)
            variables.push(`first: ${this.limit}`);

        if (this.pageNum)
            variables.push(`page: ${this.pageNum}`);

        Object.entries(this.filters)
        .forEach(([key, value]) => 
        {
            if (Array.isArray(value))
            {
                const formatted = value.map(v => 
                typeof v === 'string' ? `"${v.replace(/"/g, '\\"')}"` : v)
                .join(', ');

                variables.push(`${key}: [${formatted}]`);
            }

            else if (typeof value === 'string')
                variables.push(`${key}: "${value.replace(/"/g, '\\"')}"`);

            else
                variables.push(`${key}: ${value}`);
        });

        const varString = variables.length > 0 ? `(${variables.join(', ')})` : '';

        const paginatorFields = includePaginator ? `
            paginatorInfo {
                count
                currentPage
                firstItem
                hasMorePages
                lastItem
                lastPage
                perPage
                total
            }
        ` : '';


        return `
            query {
                nations${varString} {
                    data {
                        ${allFields}
                    }${paginatorFields}
                }
            }
        `.trim();
    }

    async execute(): Promise<SelectFields<NationFields, F, I>[]>;
    async execute(withPaginator: false): Promise<SelectFields<NationFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<NationFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<NationFields, F, I>[] | 
    { data: SelectFields<NationFields, F, I>[], paginatorInfo: paginatorInfo }
    >
    {
        try
        {
            const query = this.buildQuery(withPaginator);
            const result = await graphQLService.queryCall(this.apiKey, query);

            if(!result.nations.data)
                throw new Error("No data returned from nations query.");

            if(withPaginator)
                return {
                    data: result.nations.data,
                    paginatorInfo: result.nations.paginatorInfo
                };
            
            return result.nations.data;
        }
        catch(error: unknown)
        {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to execute nations query: ${message}`);
        }
    }
}

export default NationsQuery;