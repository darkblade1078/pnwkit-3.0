import Papa from "papaparse";
import { unzip, strFromU8 } from "fflate";
import type { DataDumpCategory, DataDumpRowMap } from "../types/dataDumps";
import { latestDumpDate } from "../utilities/other";

const BASE_URL = "https://politicsandwar.com/data";

/** Returns the day before an `YYYY-MM-DD` date, as `YYYY-MM-DD` (UTC). */
function previousDay(date: string): string
{
    const d = new Date(`${date}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - 1);
    return d.toISOString().slice(0, 10);
}

/**
 * Downloads a Politics & War daily data dump, unzips it, parses the CSV, and
 * returns the rows with each field cast to the types declared on its row
 * interface (see {@link DataDumpRowMap}).
 *
 * When no `date` is given, the most recent available dump is used: dumps are
 * generated at 23:55 UTC, so {@link latestDumpDate} is tried first and the
 * previous day is used as a fallback (covering the brief window while the day's
 * dump is still being generated). When an explicit `date` is given, only that day
 * is attempted.
 *
 * @param category - The dump category to fetch (`nations`, `cities`, ...)
 * @param date - An explicit dump date (`YYYY-MM-DD`); defaults to the latest available
 * @returns The parsed, type-cast rows for the category
 * @throws Error if no dump is found, or the download/unzip/parse fails
 * @example
 * ```typescript
 * const nations = await getDump("nations");             // latest available
 * const wars = await getDump("wars", "2026-08-01");     // a specific day
 * ```
 */
export async function getDump<T extends DataDumpCategory>(category: T, date?: string): Promise<DataDumpRowMap[T][]>
{
    // With no explicit date, try the latest expected dump then fall back a day.
    const latest = latestDumpDate();
    const candidates = date ? [date] : [latest, previousDay(latest)];

    let lastStatus = 0;

    for (const day of candidates)
    {
        const url = `${BASE_URL}/${category}/${category}-${day}.csv.zip`;
        const response = await fetch(url);

        // The requested day may not be generated yet — try the next candidate.
        if (response.status === 404)
        {
            lastStatus = 404;
            continue;
        }

        if (!response.ok)
            throw new Error(`Failed to download ${url}: HTTP ${response.status}`);

        const zipBytes = new Uint8Array(await response.arrayBuffer());

        const files = await new Promise<Record<string, Uint8Array>>((resolve, reject) =>
        {
            unzip(zipBytes, (error, data) => error ? reject(error) : resolve(data));
        });

        const bytes = Object.values(files)[0];

        if (!bytes)
            throw new Error(`Failed to extract CSV data from ${url}`);

        let csv = strFromU8(bytes);

        if (csv.charCodeAt(0) === 0xFEFF)
            csv = csv.slice(1); // remove the UTF-8 BOM

        return parseDumpCSV<T>(csv, category);
    }

    const attempted = candidates.join(", ");
    throw new Error(`No ${category} dump found for ${attempted}${lastStatus === 404 ? " (HTTP 404)" : ""}.`);
}

/**
 * Parses a dump's CSV text into typed rows.
 *
 * PapaParse's `dynamicTyping` converts numeric strings to `number` (including the
 * `0`/`1` flag columns, which are typed `number` on the row interfaces) and leaves
 * other text as `string`. Note this keys off the value, not the column, so a
 * normally-text field holding an all-digit value is also returned as a `number`.
 *
 * @param csv - The (BOM-stripped) CSV document
 * @param category - The dump category (used only for error messages)
 * @returns The parsed, type-cast rows
 * @throws Error if the CSV cannot be parsed at all
 */
function parseDumpCSV<T extends DataDumpCategory>(csv: string, category: T): Promise<DataDumpRowMap[T][]>
{
    return new Promise((resolve, reject) =>
    {
        Papa.parse<DataDumpRowMap[T]>(csv, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (results) =>
            {
                // Papa reports row-level issues in `results.errors`; only reject when
                // nothing parsed, so a benign single-row quirk doesn't drop the dump.
                if (results.data.length === 0 && results.errors.length > 0)
                    reject(new Error(`Failed to parse ${category} CSV: ${results.errors[0]?.message}`));
                else
                    resolve(results.data);
            },
        });
    });
}
