import ChipCard from "../utils/ChipCard";
import useChipsStore from "../../store/chipsStore";
import { chipNameToData } from "../utils/chipNameToData";

const ChipList = () => {
	const chipSelectionStep = useChipsStore((state) => state.chipSelectionStep);
	const { allChips } = useChipsStore();

	const mode = chipSelectionStep.type;
	const guessId = chipSelectionStep.guessId;
	const ruleIndex = chipSelectionStep.ruleIndex;
	const chips =
		mode === "guess"
			? allChips.chipsGuess
			: allChips.chipsBy.filter((by) =>
					allChips.chipsGuess
						.find((g) => g.id === guessId)
						?.compatibleByIds.includes(by.id),
				);

	const modeLabel = {
		guess: "Co odgadujesz?",
		by: "Po czym chcesz to odgadnąć?",
	};

	const chipsData = chips.map((chip) => chipNameToData(chip.id, chip.name));
	const colorOrder: Record<string, number> = {
		gaming: 1,
		watching: 2,
		league: 3,
	};
	return (
		<div className="flex flex-col p-4 overflow-auto scrollbar-thin">
			<p className="text-(--text) font-bold text-md uppercase">Zasady Quizu</p>
			<p className="text-(--accent) text-sm font-semibold mt-4">
				{modeLabel[mode]}
			</p>
			<div className="flex flex-col gap-4 mt-4">
				{[...chipsData]
					.sort((a, b) => {
						const colorDiff =
							(colorOrder[a.color] ?? 999) - (colorOrder[b.color] ?? 999);

						if (colorDiff !== 0) return colorDiff;

						return a.label.localeCompare(b.label);
					})
					.map((chip) => (
						<ChipCard
							key={chip.label}
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
