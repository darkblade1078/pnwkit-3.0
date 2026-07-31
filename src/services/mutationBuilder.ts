import { GraphQLEnum } from "../enum";
import type { GetRelationsFor } from "../types/relationMappings";
import type PnwKitApi from "../api/index";

/** Unwraps `T[]` to `T`, leaving non-arrays unchanged. */
type UnwrapArray<T> = T extends (infer U)[] ? U : T;

/**
 * A builder function that configures a nested relation on a mutation payload.
 * Receives a {@link MutationSubqueryBuilder} for the (array-unwrapped) relation.
 */
export type MutationSubqueryConfig<TFields> =
    (builder: MutationSubqueryBuilder<UnwrapArray<TFields>, [], {}>) => MutationSubqueryBuilder<UnwrapArray<TFields>, any, any>;

/**
 * Infers the result shape of a configured {@link MutationSubqueryBuilder}:
 * the selected fields (made required) intersected with any nested includes.
 */
export type InferMutationSubquery<TBuilder> =
    TBuilder extends MutationSubqueryBuilder<infer TFields, infer TSelected, infer TIncluded>
        ? TSelected extends readonly []
            ? TFields & TIncluded
            : Required<Pick<TFields, Extract<TSelected[number], keyof TFields>>> & TIncluded
        : any;

/**
 * Builder for a nested relation selection on a mutation payload.
 *
 * Standalone counterpart to the query builder's subquery layer — supports field
 * selection and unlimited recursive nesting with full type inference, but no
 * filtering (mutation payloads return concrete records, not filterable lists).
 *
 * @template TFields - Fields available on the related entity
 * @template TSelected - Currently selected fields (tracked for the return type)
 * @template TIncluded - Nested includes accumulated (tracked for the return type)
 */
export class MutationSubqueryBuilder<
    TFields,
    TSelected extends readonly (Exclude<keyof TFields, '__typename'>)[] = [],
    TIncluded extends Record<string, any> = {}
>
{
    private fields: (Exclude<keyof TFields, '__typename'>)[] = [];
    private nested: Map<string, MutationSubqueryConfig<any>> = new Map();

    /** Select scalar fields on this relation. */
    select<const F extends readonly (Exclude<keyof TFields, '__typename'>)[]>(
        ...fields: F
    ): MutationSubqueryBuilder<TFields, F, TIncluded>
    {
        this.fields = [...new Set(fields)] as (Exclude<keyof TFields, '__typename'>)[];
        return this;
    }

    /** Include a further nested relation. */
    include<
        K extends keyof GetRelationsFor<TFields>,
        TConfig extends MutationSubqueryConfig<GetRelationsFor<TFields>[K]>,
        TNested = InferMutationSubquery<ReturnType<TConfig>>,
        TWrapped = GetRelationsFor<TFields>[K] extends any[] ? TNested[] : TNested
    >(
        relation: K,
        config: TConfig
    ): MutationSubqueryBuilder<TFields, TSelected, TIncluded & Record<K, TWrapped>>
    {
        this.nested.set(relation as string, config as MutationSubqueryConfig<any>);
        return this;
    }

    /** @internal */
    getFields(): (Exclude<keyof TFields, '__typename'>)[] { return this.fields; }

    /** @internal */
    getNested(): Map<string, MutationSubqueryConfig<any>> { return this.nested; }
}

/**
 * The shape returned by a mutation: the selected scalar fields (made required)
 * intersected with any included relations.
 */
export type MutationResult<
    TFields,
    F extends keyof TFields,
    I extends Record<string, any>
> = Required<Pick<TFields, F>> & I;

/**
 * Abstract base class for building and executing type-safe GraphQL mutations.
 *
 * Standalone — it does not depend on the query builder. A mutation is
 * *"call `name(args)` and select fields off the object it returns"*, so this
 * class provides:
 *
 * - {@link set} for the mutation's input arguments;
 * - {@link select} for choosing scalar payload fields to return;
 * - {@link include} for selecting nested relations on the payload;
 * - its own GraphQL value serialization with input sanitization and size limits.
 *
 * Only the selected fields/relations are returned, exactly like the query
 * builder. Concrete mutations extend this class and are exposed as factory
 * methods on `pnwkit.mutations`.
 *
 * @example
 * ```typescript
 * await pnwkit.mutations.bankWithdraw()
 *     .set({ receiver: 738355, receiver_type: 1, money: 1_000_000 })
 *     .select("id", "date", "money")
 *     .include("receiver", n => n.select("id", "nation_name"))
 *     .execute();
 * // -> { id, date, money, receiver: { id, nation_name } }
 * ```
 *
 * @category Mutation Builders
 * @template TFields - The fields available on the mutation payload (a `*Fields` type)
 * @template TArgs - The mutation's input-argument shape
 * @template F - The union of selected scalar field keys (tracked through chaining)
 * @template I - The included relations (tracked through chaining)
 */
export abstract class MutationBuilder<
    TFields,
    TArgs,
    F extends Exclude<keyof TFields, '__typename'> = never,
    I extends Record<string, any> = {}
>
{
    /** The GraphQL mutation field name (e.g. `'bankWithdraw'`). */
    protected abstract mutationName: string;

    /** Root input arguments, set via {@link set}. */
    protected args: Partial<TArgs> = {};

    /** Selected scalar payload fields, set via {@link select}. */
    protected selectedFields: (Exclude<keyof TFields, '__typename'>)[] = [];

    /** Included relations, set via {@link include}. */
    protected includes: Map<string, MutationSubqueryConfig<any>> = new Map();

    /** Per-call API key override, set via {@link apiKey}. */
    protected apiKeyOverride?: string;

    // Security constants (mirrors the query builder's hardening).
    private static readonly MAX_FIELDS = 100;
    private static readonly MAX_NESTING_DEPTH = 10;
    private static readonly MAX_MUTATION_SIZE = 50_000;
    private static readonly MAX_STRING_LENGTH = 10_000;
    private static readonly MAX_ARRAY_SIZE = 1_000;

    private static readonly FIELD_NAME_PATTERN = /^[_A-Za-z][_0-9A-Za-z]*$/;
    private static readonly ENUM_VALUE_PATTERN = /^[_A-Z][_0-9A-Z]*$/;

    /**
     * @param kit - The PnWKit instance owning the API key and GraphQL service.
     * @internal
     */
    constructor(protected kit: PnwKitApi)
    {}

    /**
     * Set the mutation's input arguments.
     *
     * @param args - The fully-typed input arguments for this mutation.
     * @returns This builder instance for method chaining.
     */
    set(args: TArgs): this
    {
        this.args = args;
        return this;
    }

    /**
     * Use a specific API key for this call instead of the client's default key.
     * The acting nation is the one that owns the provided key.
     *
     * @param key - The Politics & War API key to authenticate this mutation with.
     * @returns This builder instance for method chaining.
     */
    apiKey(key: string): this
    {
        this.apiKeyOverride = key;
        return this;
    }

    /**
     * Select which scalar fields of the payload to return.
     *
     * @param fields - Field names to select off the returned object.
     * @returns This builder, with the selected fields tracked in the return type.
     * @throws Error if no fields are provided.
     * @example
     * .select('id', 'date', 'money')
     */
    select<const Fields extends readonly (Exclude<keyof TFields, '__typename'>)[]>(
        ...fields: Fields
    ): MutationBuilder<TFields, TArgs, Fields[number], I>
    {
        if (fields.length === 0)
            throw new Error("At least one field must be selected.");

        this.selectedFields = [...new Set(fields)] as (Exclude<keyof TFields, '__typename'>)[];
        return this as unknown as MutationBuilder<TFields, TArgs, Fields[number], I>;
    }

    /**
     * Include a nested relation on the payload, with full recursive type
     * inference (mirrors the query builder's `include`).
     *
     * @param relation - The relation name to include (a key of the payload's relations).
     * @param config - A builder function configuring the nested selection.
     * @returns This builder, with the included relation tracked in the return type.
     * @example
     * .include('receiver', n => n.select('id', 'nation_name'))
     */
    include<
        K extends keyof GetRelationsFor<TFields>,
        TConfig extends MutationSubqueryConfig<GetRelationsFor<TFields>[K]>,
        TNested = InferMutationSubquery<ReturnType<TConfig>>,
        TWrapped = GetRelationsFor<TFields>[K] extends any[] ? TNested[] : TNested
    >(
        relation: K,
        config: TConfig
    ): MutationBuilder<TFields, TArgs, F, I & Record<K, TWrapped>>
    {
        this.includes.set(relation as string, config as MutationSubqueryConfig<any>);
        return this as unknown as MutationBuilder<TFields, TArgs, F, I & Record<K, TWrapped>>;
    }

    /**
     * Execute the mutation and return the selected payload.
     *
     * The result contains only the selected fields and included relations. The
     * call bypasses the response cache (a mutation must never be served or
     * populate a cached result).
     *
     * @returns The mutation payload, typed to the selection.
     * @throws Error if nothing was selected, or the mutation fails / returns no data.
     */
    async execute(): Promise<MutationResult<TFields, F, I>>
    {
        // Whitelisted mutations require a verified-bot key; without one the API
        // would reject the request, so fail fast with a clear message.
        const botKey = this.kit['botKey'];
        if (!botKey)
            throw new Error("A bot key is required to perform mutations. Pass `botKey` when constructing PnWKit.");

        const apiKey = this.apiKeyOverride ?? this.kit['apiKey'];

        try
        {
            const mutation = this.buildMutation();

            const result = await this.kit['graphQL'].queryCall(apiKey, mutation, { skipCache: true, botKey });
            const data = result[this.mutationName];

            if (data === undefined || data === null)
                throw new Error(`No data returned from ${this.mutationName} mutation.`);

            return data;
        }
        catch (error: unknown)
        {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to execute ${this.mutationName} mutation: ${message}`);
        }
    }

    /**
     * Build the final GraphQL mutation string:
     * `mutation { name(args) { fields } }`.
     * @internal
     */
    protected buildMutation(): string
    {
        if (this.selectedFields.length === 0 && this.includes.size === 0)
            throw new Error("At least one field must be selected before executing a mutation.");

        if (this.selectedFields.length > MutationBuilder.MAX_FIELDS)
            throw new Error(`Maximum ${MutationBuilder.MAX_FIELDS} fields exceeded`);

        const selection = this.renderSelection(
            this.selectedFields.map(String),
            this.includes,
            '            ',
            0,
        );

        const argEntries: string[] = [];
        for (const key in this.args)
        {
            if (!Object.prototype.hasOwnProperty.call(this.args, key)) continue;

            const value = (this.args as Record<string, any>)[key];

            if (value !== null && value !== undefined)
                argEntries.push(`${key}: ${this.serializeValue(value)}`);
        }

        const argString = argEntries.length > 0 ? `(${argEntries.join(', ')})` : '';

        const mutation = `mutation {\n    ${this.mutationName}${argString} {\n${selection}\n    }\n}`;

        if (mutation.length > MutationBuilder.MAX_MUTATION_SIZE)
            throw new Error(`Mutation size exceeds maximum of ${MutationBuilder.MAX_MUTATION_SIZE} characters`);

        return mutation;
    }

    /**
     * Recursively render a selection set (scalar fields + nested relation blocks).
     * @internal
     */
    private renderSelection(
        fields: string[],
        nested: Map<string, MutationSubqueryConfig<any>>,
        indent: string,
        depth: number,
    ): string
    {
        if (depth > MutationBuilder.MAX_NESTING_DEPTH)
            throw new Error(`Maximum nesting depth of ${MutationBuilder.MAX_NESTING_DEPTH} exceeded`);

        const lines: string[] = [];

        for (const field of fields)
        {
            if (!MutationBuilder.FIELD_NAME_PATTERN.test(field))
                throw new Error(`Invalid field name format: ${field}`);

            lines.push(`${indent}${field}`);
        }

        nested.forEach((config, relation) => {
            if (!MutationBuilder.FIELD_NAME_PATTERN.test(relation))
                throw new Error(`Invalid relation name format: ${relation}`);

            if (typeof config !== 'function')
                throw new Error(`Invalid include config for '${relation}': expected function`);

            const builder = config(new MutationSubqueryBuilder<any>());
            const childFields = builder.getFields().map(String);
            const childNested = builder.getNested();

            if (childFields.length === 0 && childNested.size === 0)
                throw new Error(`At least one field must be selected for relation '${relation}'.`);

            lines.push(`${indent}${relation} {`);
            lines.push(this.renderSelection(childFields, childNested, `${indent}    `, depth + 1));
            lines.push(`${indent}}`);
        });

        return lines.join('\n');
    }

    /**
     * Serialize a single argument value to its GraphQL representation.
     * Handles enums (unquoted), strings (quoted/escaped), finite numbers,
     * booleans, arrays, and plain objects (nested inputs).
     * @internal
     */
    protected serializeValue(value: any): string
    {
        if (value instanceof GraphQLEnum)
        {
            if (!MutationBuilder.ENUM_VALUE_PATTERN.test(value.value))
                throw new Error(`Invalid enum value format: ${value.value}`);

            return value.value;
        }

        if (typeof value === 'string')
            return `"${this.sanitizeString(value)}"`;

        if (typeof value === 'number')
        {
            if (!Number.isFinite(value))
                throw new Error(`Invalid number value: ${value}`);

            return String(value);
        }

        if (typeof value === 'boolean')
            return String(value);

        if (Array.isArray(value))
        {
            if (value.length > MutationBuilder.MAX_ARRAY_SIZE)
                throw new Error(`Array size exceeds maximum of ${MutationBuilder.MAX_ARRAY_SIZE} elements`);

            return `[${value.map(v => this.serializeValue(v)).join(', ')}]`;
        }

        if (typeof value === 'object' && value !== null)
            return this.serializeObject(value);

        throw new Error(`Unsupported value type: ${typeof value}`);
    }

    /**
     * Serialize a plain object to a GraphQL input object `{key: value, ...}`,
     * with prototype-pollution protection.
     * @internal
     */
    protected serializeObject(obj: Record<string, any>): string
    {
        const pairs: string[] = [];

        for (const key in obj)
        {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

            const value = obj[key];
            if (value === null || value === undefined) continue;

            if (!MutationBuilder.FIELD_NAME_PATTERN.test(key))
                throw new Error(`Invalid GraphQL field name: ${key}`);

            if (key === '__proto__' || key === 'constructor' || key === 'prototype')
                throw new Error(`Forbidden field name: ${key}`);

            pairs.push(`${key}: ${this.serializeValue(value)}`);
        }

        return `{${pairs.join(', ')}}`;
    }

    /**
     * Validate and escape a string for safe inclusion in a mutation.
     * @internal
     */
    protected sanitizeString(str: string): string
    {
        if (str.length > MutationBuilder.MAX_STRING_LENGTH)
            throw new Error(`Input exceeds maximum length of ${MutationBuilder.MAX_STRING_LENGTH} characters`);

        if (str.includes('\0'))
            throw new Error('String contains null byte');

        return str
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/\f/g, '\\f')
            .replace(/[\b]/g, '\\b');
    }
}
