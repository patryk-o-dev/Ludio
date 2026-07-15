import addIcon from "../../assets/icons/add.png";
import Icons from "./Icons/Icons";
import useChipsStore from "../../store/chipsStore";
import useGameConfigStore from "../../store/gameConfigStore";
import type { chipData } from "../../types";
import { useTranslation } from "react-i18next";

type ChipCardProps = {
	chipId: string;
	ruleIndex: number;
	chipData: chipData;
};

const ChipCard = ({ chipId, ruleIndex, chipData }: ChipCardProps) => {
	const { t } = useTranslation();
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
			className="border-2 border-transparent flex items-center justify-between gap-4 p-2 bg-(--bgc-tertiary) rounded-lg hover:cursor-pointer hover:border-(--accent) hover:bg-(--bgc-quaternary)"
			onClick={handleChipSelect}
		>
			<div className="flex items-center gap-4 min-w-0">
				<div className="relative w-9 h-9 shrink-0">
					{chipData.icon.map((icon, index) => (
						<Icons
							key={icon}
							name={icon}
							color={chipData.color}
							size={36}
							isAddon={index === 1}
						/>
					))}
				</div>
				<p className="text-(--text) flex-1 line-clamp-2 min-w-0">
					{t(chipData.label)}
				</p>
			</div>
			<div className="bg-(--accent-darker) opacity-90 rounded-2xl p-2">
				<img className="w-3 h-3" src={addIcon} alt="Add" />
			</div>
		</div>
	);
};

export default ChipCard;
