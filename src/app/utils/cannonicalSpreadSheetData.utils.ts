import { SpreadsheetRow, RowLike } from "../types";

/**
 * Converts data from RowLike[] to SpreadsheetRow[]
 * in order to process results between the info and all.
 *
 * @export
 * @param {(RowLike[] | undefined)} rows
 * @return {*}  {SpreadsheetRow[]}
 */
export function cannonicalSpreadSheetData(
	rows: RowLike[] | undefined
): SpreadsheetRow[] {
	const cannonicalRows: SpreadsheetRow[] = [];

	for (const row of rows || []) {
		const cannonicalRow: SpreadsheetRow = [];
		for (const cell of row.cells || []) {
			cannonicalRow.push({ value: cell.value });
		}
		cannonicalRows.push(cannonicalRow);
	}
	return cannonicalRows;
}
