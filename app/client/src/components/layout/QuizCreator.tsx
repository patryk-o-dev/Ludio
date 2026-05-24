import RulesList from "../features/RulesList";
import StartQuiz from "../features/StartQuiz";
import type { ChipSelectorMode, SelectedChip } from "./MainContent";

interface QuizCreatorProps {
	selectorMode: ChipSelectorMode;
	onSelectChipType: (type: ChipSelectorMode) => void;
	selectedGuess: SelectedChip | null;
	selectedBy: SelectedChip | null;
	availableFilters: SelectedChip[];
	selectedFilters: SelectedChip[];
	onToggleFilter: (filter: SelectedChip) => void;
}

const QuizCreator = ({
	selectorMode,
	onSelectChipType,
	selectedGuess,
	selectedBy,
	availableFilters,
	selectedFilters,
	onToggleFilter,
}: QuizCreatorProps) => {
	return (
		<div className="flex flex-col flex-3 bg-(--bgc-secondary) p-4 rounded-lg h-full">
			<div className="mb-8">
				<h4 className="text-(--text) font-semibold tracking-wide text-3xl uppercase mb-2">
					Kreator Quizu
				</h4>
				<span className="text-(--text-secondary)">
					Ustal zasady i rozpocznij swój quiz
				</span>
			</div>
			<RulesList
				selectorMode={selectorMode}
				onSelectChipType={onSelectChipType}
				selectedGuess={selectedGuess}
				selectedBy={selectedBy}
				availableFilters={availableFilters}
				selectedFilters={selectedFilters}
				onToggleFilter={onToggleFilter}
			/>
			<StartQuiz />
		</div>
	);
};

export default QuizCreator;
