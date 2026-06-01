import categoryIcon from "../../assets/icons/category.png";
import addIcon from "../../assets/icons/add.png";
import useChipsStore from "../../store/chipsStore";
import useGameConfigStore from "../../store/gameConfigStore";

interface ChipCardProps {
	name: string;
	chipId: string;
	ruleIndex: number;
}

const ChipCard = ({ name, chipId, ruleIndex }: ChipCardProps) => {
	const chipSelectionStep = useChipsStore((state) => state.chipSelectionStep);
	const updateChipSelectionStep = useChipsStore(
		(state) => state.updateChipSelectionStep,
	);
	const updateRuleGuessChip = useGameConfigStore(
		(state) => state.updateRuleGuessChip,
	);
	const updateRuleByChip = useGameConfigStore(
		(state) => state.updateRuleByChip,
	);

	const handleChipSelect = () => {
		if (ruleIndex === undefined) return;
		if (chipSelectionStep.type === "guess") {
			updateRuleGuessChip(ruleIndex, chipId);
			updateChipSelectionStep({ type: "by", ruleIndex, guessId: chipId });
		} else {
			updateRuleByChip(ruleIndex, chipId);
		}
	};

	return (
		<div
			className="border-2 border-transparent flex items-center justify-between gap-4 p-4 bg-(--bgc-tertiary) rounded-lg hover:cursor-pointer hover:border-(--accent)"
			onClick={handleChipSelect}
		>
			<div className="flex items-center gap-4">
				<img className="w-8 h-8" src={categoryIcon} alt="Category" />
				<p className="text-(--text)">{name}</p>
			</div>
			<div className="bg-(--accent-darker) opacity-90 rounded-2xl p-2">
				<img className="w-3 h-3" src={addIcon} alt="Add" />
			</div>
		</div>
	);
};

export default ChipCard;
