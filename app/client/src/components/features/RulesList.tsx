import type { ChipSelectorMode, SelectedChip } from "../layout/MainContent";
import RuleElement from "../utils/RuleElement";
import AddNewRule from "./AddNewRule";

interface RulesListProps {
	selectorMode: ChipSelectorMode;
	onSelectChipType: (type: ChipSelectorMode) => void;
	selectedGuess: SelectedChip | null;
	selectedBy: SelectedChip | null;
}

const RulesList = ({
	selectorMode,
	onSelectChipType,
	selectedGuess,
	selectedBy,
}: RulesListProps) => {
	return (
		<div>
			<RuleElement
				selectorMode={selectorMode}
				onSelectChipType={onSelectChipType}
				selectedGuess={selectedGuess}
				selectedBy={selectedBy}
			/>
			<AddNewRule />
		</div>
	);
};

export default RulesList;
