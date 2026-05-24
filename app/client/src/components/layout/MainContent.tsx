import { useEffect, useState } from "react";
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
	const [availableFilters, setAvailableFilters] = useState<SelectedChip[]>([]);
	const [selectedFilters, setSelectedFilters] = useState<SelectedChip[]>([]);

	useEffect(() => {
		if (!selectedBy) return;
		fetch(`http://localhost:3000/api/chips/filter/${selectedBy.id}`)
			.then((res) => res.json())
			.then((data: SelectedChip[]) => setAvailableFilters(data))
			.catch(() => setAvailableFilters([]));
	}, [selectedBy]);

	const handleChipSelect = (chip: SelectedChip) => {
		if (selectorMode === "guess") {
			setSelectedGuess(chip);
			setSelectedBy(null);
			setAvailableFilters([]);
			setSelectedFilters([]);
			setSelectorMode("by");
		} else {
			setSelectedBy(chip);
			setSelectedFilters([]);
		}
	};

	const handleToggleFilter = (filter: SelectedChip) => {
		setSelectedFilters((prev) =>
			prev.some((f) => f.id === filter.id)
				? prev.filter((f) => f.id !== filter.id)
				: [...prev, filter],
		);
	};

	return (
		<main className="flex flex-row flex-1 gap-1 p-4">
			<LeftAside />
			<QuizCreator
				selectorMode={selectorMode}
				onSelectChipType={setSelectorMode}
				selectedGuess={selectedGuess}
				selectedBy={selectedBy}
				availableFilters={availableFilters}
				selectedFilters={selectedFilters}
				onToggleFilter={handleToggleFilter}
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
