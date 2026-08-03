import { getDump } from "../services/fetchCSV";
import type { DataDumpCategory, DataDumpRowMap } from "../types/dataDumps";

/**
 * Access to the Politics & War daily data dumps
 * (https://politicsandwar.com/data).
 *
 * Each method downloads a category's dump, unzips and parses it, and returns the
 * rows fully typed and cast (see the row interfaces in {@link DataDumpRowMap}).
 * With no `date` the most recent available dump is used; pass a `YYYY-MM-DD` date
 * to fetch a specific day.
 *
 * @example
 * ```typescript
 * const pnwkit = new PnWKit("your-api-key");
 *
 * const nations = await pnwkit.dataDumps.nations();          // NationRow[]
 * const wars = await pnwkit.dataDumps.wars("2026-08-01");     // WarRow[]
 * const cities = await pnwkit.dataDumps.get("cities");        // CityRow[]
 * ```
 */
export default class DataDumps
{
    /**
     * Fetch a dump by category name.
     *
     * @param category - The dump category (see {@link DataDumpCategory})
     * @param date - Optional dump date (`YYYY-MM-DD`); defaults to the latest available
     * @returns The parsed, type-cast rows for the category
     */
    public get<C extends DataDumpCategory>(category: C, date?: string): Promise<DataDumpRowMap[C][]>
    {
        return date === undefined ? getDump(category) : getDump(category, date);
    }

    /**
     * Fetch the `alliances` dump.
     * @param date - Optional dump date (`YYYY-MM-DD`); defaults to the latest available
     */
    public alliances(date?: string): Promise<DataDumpRowMap["alliances"][]>
    {
        return this.get("alliances", date);
    }

    /**
     * Fetch the `cities` dump.
     * @param date - Optional dump date (`YYYY-MM-DD`); defaults to the latest available
     */
    public cities(date?: string): Promise<DataDumpRowMap["cities"][]>
    {
        return this.get("cities", date);
    }

    /**
     * Fetch the `nations` dump.
     * @param date - Optional dump date (`YYYY-MM-DD`); defaults to the latest available
     */
    public nations(date?: string): Promise<DataDumpRowMap["nations"][]>
    {
        return this.get("nations", date);
    }

    /**
     * Fetch the `trades` dump.
     * @param date - Optional dump date (`YYYY-MM-DD`); defaults to the latest available
     */
    public trades(date?: string): Promise<DataDumpRowMap["trades"][]>
    {
        return this.get("trades", date);
    }

    /**
     * Fetch the `wars` dump.
     * @param date - Optional dump date (`YYYY-MM-DD`); defaults to the latest available
     */
    public wars(date?: string): Promise<DataDumpRowMap["wars"][]>
    {
        return this.get("wars", date);
    }
}
