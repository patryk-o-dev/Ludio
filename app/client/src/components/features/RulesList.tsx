import type { ChipSelectorMode, SelectedChip } from "../layout/MainContent";
import RuleElement from "../utils/RuleElement";
import AddNewRule from "./AddNewRule";

interface RulesListProps {
	selectorMode: ChipSelectorMode;
	onSelectChipType: (type: ChipSelectorMode) => void;
	selectedGuess: SelectedChip | null;
	selectedBy: SelectedChip | null;
	availableFilters: SelectedChip[];
	selectedFilters: SelectedChip[];
	onToggleFilter: (filter: SelectedChip) => void;
}

const RulesList = ({
	selectorMode,
	onSelectChipType,
	selectedGuess,
	selectedBy,
	availableFilters,
	selectedFilters,
	onToggleFilter,
}: RulesListProps) => {
	return (
		<div>
			<RuleElement
				selectorMode={selectorMode}
				onSelectChipType={onSelectChipType}
				selectedGuess={selectedGuess}
				selectedBy={selectedBy}
				availableFilters={availableFilters}
				selectedFilters={selectedFilters}
				onToggleFilter={onToggleFilter}
			/>
			<AddNewRule />
		</div>
	);
};

export default RulesList;
