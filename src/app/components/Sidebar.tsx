import type { FC, Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { SpreadsheetData } from "../types";

export interface SidebarProps {
	spreadsheets: SpreadsheetData[];
	setSpreadsheet: Dispatch<SetStateAction<SpreadsheetData[]>>;
	selectedSpreadsheetIndex: number;
	setSelectedSpreadsheet: (index: number) => void;
}

const Sidebar: FC<SidebarProps> = ({
	spreadsheets,
	setSpreadsheet,
	selectedSpreadsheetIndex,
	setSelectedSpreadsheet,
}) => {
	const [title, setTitle] = useState("");
	const [visibleTitleInput, setVisibleTitleInput] = useState(false);
	const [changeToNewSpreadsheet, setChangeToNewSpreadsheet] = useState(false);
	const addNewSpreadsheet = (newTitle: string) => {
		const newSpreadsheet: SpreadsheetData = {
			title: newTitle,
			data: [
				[{ value: "" }, { value: "" }, { value: "" }],
				[{ value: "" }, { value: "" }, { value: "" }],
				[{ value: "" }, { value: "" }, { value: "" }],
			],
		};
		setSpreadsheet((prev) => [...prev, newSpreadsheet]);
		setVisibleTitleInput(false);
		setTitle("");
		setChangeToNewSpreadsheet(true);
	};

	useEffect(() => {
		if (changeToNewSpreadsheet) {
			setSelectedSpreadsheet(spreadsheets.length - 1);
			setChangeToNewSpreadsheet(false);
		}
	}, [changeToNewSpreadsheet, setSelectedSpreadsheet, spreadsheets.length]);

	return (
		<div className="w-64 h-screen bg-gray-800 text-white overflow-auto p-5">
			<ul>
				{spreadsheets.map((spreadsheets, index) => (
					<li
						key={index}
						className={`p-2 cursor-pointer ${
							index === selectedSpreadsheetIndex ? "bg-gray-700" : ""
						}`}
						onClick={() => setSelectedSpreadsheet(index)}
					>
						{spreadsheets.title}
					</li>
				))}
			</ul>
			<div className="flex-1">
				<button
					className="bg-blue-500 text-white rounded-lg w-8 h-8 mt-5 "
					type="button"
					onClick={(e) => {
						e.preventDefault();
						setVisibleTitleInput(true);
					}}
				>
					+
				</button>

				{visibleTitleInput && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							addNewSpreadsheet(title);
						}}
					>
						<input
							type="text"
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full p-2 mt-5 text-black"
							placeholder="New Spreadsheet Title"
						/>
					</form>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
