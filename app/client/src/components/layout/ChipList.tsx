import ChipCard from "../utils/ChipCard";
import useChipsStore from "../../store/chipsStore";
import { chipNameToData } from "../utils/chipNameToData";
import { useTranslation } from "react-i18next";

const ChipList = () => {
	const chipSelectionStep = useChipsStore((state) => state.chipSelectionStep);
	const { allChips } = useChipsStore();
	const { t } = useTranslation();
	const selectedMode = useChipsStore((state) => state.mode);

	const mode = chipSelectionStep.type;
	const guessId = chipSelectionStep.guessId;
	const ruleIndex = chipSelectionStep.ruleIndex;
	const chips =
		mode === "guess"
			? allChips.chipsGuess.filter((chip) => chip.mode === selectedMode)
			: allChips.chipsBy.filter((by) =>
					allChips.chipsGuess
						.find((g) => g.id === guessId)
						?.compatibleByIds.includes(by.id),
				);

	const modeLabel = {
		guess: "chip_selector.mode_label.guess",
		by: "chip_selector.mode_label.by",
	};

	const chipsData = chips.map((chip) => chipNameToData(chip.id, chip.name));
	const colorOrder: Record<string, number> = {
		gaming: 1,
		watching: 2,
		league: 3,
	};
	return (
		<div className="flex flex-col p-4 overflow-auto custom-scrollbar">
			<p className="text-(--text) font-bold text-md uppercase">
				{t("chip_selector.quiz_rules")}
			</p>
			<p className="text-(--accent) text-sm font-semibold mt-4">
				{t(modeLabel[mode])}
			</p>
			<div className="flex flex-col gap-4 mt-4">
				{[...chipsData]
					.sort((a, b) => {
						const colorDiff =
							(colorOrder[a.color] ?? 999) - (colorOrder[b.color] ?? 999);

						if (colorDiff !== 0) return colorDiff;

						return t(a.label).localeCompare(t(b.label));
					})
					.map((chip) => (
						<ChipCard
							key={chip.id}
							ruleIndex={ruleIndex!}
							chipId={chip.id}
							chipData={chip}
						/>
					))}
			</div>
		</div>
	);
};

export default ChipList;
