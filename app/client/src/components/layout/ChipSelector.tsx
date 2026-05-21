import type { ChipSelectorMode, SelectedChip } from "./MainContent";
import ChipList from "./ChipList";

interface ChipSelectorProps {
	mode: ChipSelectorMode;
	onChipSelect: (chip: SelectedChip) => void;
}

const ChipSelector = ({ mode, onChipSelect }: ChipSelectorProps) => {
	return (
		<aside className="flex-1 bg-(--bgc-secondary) p-4 rounded-lg">
			<ChipList mode={mode} onChipSelect={onChipSelect} />
		</aside>
	);
};

export default ChipSelector;
