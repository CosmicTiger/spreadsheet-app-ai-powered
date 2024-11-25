import { useState, type FC } from "react";
import Spreadsheet from "react-spreadsheet";
import { SpreadsheetData, SpreadsheetRow } from "../types";
import { cannonicalSpreadSheetData } from "../utils/cannonicalSpreadSheetData.utils";
// import { PreviewSpreadSheetChanges } from "./PreviewSpreadSheetChanges";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

interface SingleSpreadsheetProps {
	spreadsheet: SpreadsheetData;
	setSpreadsheet: (spreadsheet: SpreadsheetData) => void;
}

const SingleSpreadsheet: FC<SingleSpreadsheetProps> = ({
	spreadsheet,
	setSpreadsheet,
}) => {
	const [selectedCells, setSelectedCells] = useState<Selection>([]);
	useCopilotReadable({
		description: "This is the current spreadsheet",
		value: spreadsheet,
	});

	//👇🏻 adds a new row to the spreadsheet
	const addRow = () => {
		const numberOfColumns = spreadsheet.data[0].length;
		const newRow: SpreadsheetRow = [];
		for (let i = 0; i < numberOfColumns; i++) {
			newRow.push({ value: "" });
		}

		setSpreadsheet({
			...spreadsheet,
			data: [...spreadsheet.data, newRow],
		});
	};

	//👇🏻 adds a new column to the spreadsheet
	const addColumn = () => {
		const spreadsheetData = [...spreadsheet.data];
		for (let i = 0; i < spreadsheet.data.length; i++) {
			spreadsheet.data[i].push({ value: "" });
		}
		setSpreadsheet({
			...spreadsheet,
			data: spreadsheetData,
		});
	};

	return (
		<div className="flex-1 overflow-auto p-5">
			{/** -- Spreadsheet title ---*/}
			<input
				type="text"
				value={spreadsheet?.title}
				className="w-full p-2 mb-5 text-center text-2xl font-bold outline-none bg-transparent"
				onChange={(e) =>
					setSpreadsheet({ ...spreadsheet, title: e.target.value })
				}
				placeholder="Spreadsheet Title"
			/>
			{/** -- Spreadsheet rows and columns---*/}
			<div className="flex items-start">
				<Spreadsheet
					data={spreadsheet.data}
					onChange={(data) => {
						setSpreadsheet({ ...spreadsheet, data: data as any });
					}}
				/>
				{/** -- Add column button ---*/}
				<button
					className="bg-blue-500 text-white rounded-lg ml-6 w-8 h-8 mt-0.5"
					onClick={addColumn}
				>
					+
				</button>
			</div>
			{/** -- Add row button ---*/}
			<button
				className="bg-blue-500 text-white rounded-lg w-8 h-8 mt-5 "
				onClick={addRow}
			>
				+
			</button>
		</div>
	);
};

export default SingleSpreadsheet;
