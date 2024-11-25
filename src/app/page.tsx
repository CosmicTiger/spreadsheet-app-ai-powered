"use client";
import type { FC } from "react";
import "@copilotkit/react-ui/styles.css";
import { useState } from "react";
import { SpreadsheetData } from "./types";
import Sidebar from "./components/Sidebar";
import SingleSpreadsheet from "./components/SingleSpreadsheet";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import INSTRUCTIONS from "./instructions";

const Main: FC = () => {
	const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData[]>([
		{
			title: "Spreadsheet 1",
			data: [
				[{ value: "" }, { value: "" }, { value: "" }],
				[{ value: "" }, { value: "" }, { value: "" }],
				[{ value: "" }, { value: "" }, { value: "" }],
			],
		},
	]);

	const [selectedSpreadsheetIndex, setSelectedSpreadsheetIndex] =
		useState<number>(0);

	return (
		<main>
			<div className="flex">
				<Sidebar
					spreadsheets={spreadsheetData}
					setSpreadsheet={setSpreadsheetData}
					selectedSpreadsheetIndex={selectedSpreadsheetIndex}
					setSelectedSpreadsheet={setSelectedSpreadsheetIndex}
				/>
				<SingleSpreadsheet
					spreadsheet={spreadsheetData[selectedSpreadsheetIndex]}
					setSpreadsheet={(spreadsheets: any) =>
						setSpreadsheetData((prev) => {
							console.debug("spreadsheets", spreadsheets);
							const newSpreadsheets = [...prev];
							newSpreadsheets[selectedSpreadsheetIndex] = spreadsheets;
							return newSpreadsheets;
						})
					}
				/>
			</div>
		</main>
	);
};

export default function Home() {
	return (
		<CopilotKit runtimeUrl="/api/copilotkit">
			<CopilotSidebar
				Header={() => (
					<div className="bg-gray-800 text-white p-5">
						Spreadsheet App Copilot
					</div>
				)}
				instructions={INSTRUCTIONS}
				labels={{
					initial:
						"Welcome to the Spreadsheet App. I'm your spreadsheet copilot. How can I help you with?",
				}}
				defaultOpen
				clickOutsideToClose
			>
				<Main />
			</CopilotSidebar>
		</CopilotKit>
	);
}
