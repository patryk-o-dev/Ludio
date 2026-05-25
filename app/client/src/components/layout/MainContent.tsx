import { useEffect, useState } from "react";
import ChipSelector from "./ChipSelector";
import LeftAside from "./LeftAside";
import QuizCreator from "./QuizCreator";

export type ChipSelectorMode = "guess" | "by";
export interface SelectedChip {
	id: string;
	name: string;
}

export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type QuestionsPerRule = 3 | 5 | 7 | 10;
export type TimeLimitSeconds = null | 10 | 20 | 30 | 50;

export interface GameOptionsState {
	difficulty: Difficulty;
	questionLimit: QuestionsPerRule;
	timeLimitSeconds: TimeLimitSeconds;
}

const defaultGameOptions: GameOptionsState = {
	difficulty: 3,
	questionLimit: 5,
	timeLimitSeconds: null,
};

const MainContent = () => {
	const [selectorMode, setSelectorMode] = useState<ChipSelectorMode>("guess");
	const [selectedGuess, setSelectedGuess] = useState<SelectedChip | null>(null);
	const [selectedBy, setSelectedBy] = useState<SelectedChip | null>(null);
	const [availableFilters, setAvailableFilters] = useState<SelectedChip[]>([]);
	const [selectedFilters, setSelectedFilters] = useState<SelectedChip[]>([]);
	const [gameOptions, setGameOptions] =
		useState<GameOptionsState>(defaultGameOptions);

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
				gameOptions={gameOptions}
			/>
			<ChipSelector
				mode={selectorMode}
				selectedChipGuessId={selectedGuess?.id}
				selectedBy={selectedBy}
				onChipSelect={handleChipSelect}
				gameOptions={gameOptions}
				onOptionsChange={setGameOptions}
			/>
		</main>
	);
};

export default MainContent;
