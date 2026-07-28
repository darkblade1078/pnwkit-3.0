/**
 * Marks a value as a GraphQL enum so the query builder emits it **unquoted**
 * (e.g. `DESC`, not `"DESC"`).
 *
 * Plain strings are always quoted and escaped; wrap a value with {@link Enum}
 * whenever the API expects a GraphQL enum rather than a string literal.
 *
 * @category Query Builders
 */
export class GraphQLEnum<T extends string = string>
{
    constructor(public readonly value: T) {}
}

/**
 * Wrap a value as a GraphQL enum so it is emitted unquoted in the query.
 *
 * @param value - The enum member (e.g. `"DESC"`, `"DATE"`)
 * @returns A marker the query builder serializes without quotes
 *
 * @example
 * ```typescript
 * await pnwkit.queries.bulletins()
 *   .select("id", "title")
 *   .where({ orderBy: { column: Enum("DATE"), order: Enum("DESC") } })
 *   .execute();
 * ```
 *
 * @category Query Builders
 */
export function Enum<const T extends string>(value: T): GraphQLEnum<T>
{
    return new GraphQLEnum(value);
}
