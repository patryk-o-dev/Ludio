import { useState } from "react";
import ChipSelector from "./ChipSelector";
import LeftAside from "./LeftAside";
import QuizCreator from "./QuizCreator";

export type ChipSelectorMode = "guess" | "by";
export interface SelectedChip {
	id: string;
	name: string;
}

const MainContent = () => {
	const [selectorMode, setSelectorMode] = useState<ChipSelectorMode>("guess");
	const [selectedGuess, setSelectedGuess] = useState<SelectedChip | null>(null);
	const [selectedBy, setSelectedBy] = useState<SelectedChip | null>(null);

	const handleChipSelect = (chip: SelectedChip) => {
		if (selectorMode === "guess") {
			setSelectedGuess(chip);
			setSelectorMode("by");
		} else {
			setSelectedBy(chip);
		}
	};

	return (
		<main className="flex flex-row flex-1 gap-1 p-4">
			<LeftAside />
			<QuizCreator
				selectorMode={selectorMode}
				onSelectChipType={setSelectorMode}
				selectedGuess={selectedGuess}
				selectedBy={selectedBy}
			/>
			<ChipSelector
				mode={selectorMode}
				selectedChipGuessId={selectedGuess?.id}
				onChipSelect={handleChipSelect}
			/>
		</main>
	);
};

export default MainContent;
