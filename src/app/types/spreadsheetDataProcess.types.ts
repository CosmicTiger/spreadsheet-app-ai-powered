export interface CellLike {
	value: string;
}

export interface RowLike {
	cells: CellLike[] | undefined;
}
