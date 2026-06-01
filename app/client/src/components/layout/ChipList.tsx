import ChipCard from "../utils/ChipCard";
import useChipsStore from "../../store/chipsStore";

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

	return (
		<div className="flex flex-col p-4">
			<p className="text-(--text) font-bold text-md uppercase">Zasady Quizu</p>
			<p className="text-(--accent) text-sm font-semibold mt-4">
				{modeLabel[mode]}
			</p>
			<div className="flex flex-col gap-4 mt-4">
				{chips.map((chip) => (
					<ChipCard
						key={chip.id}
						name={chip.name}
						ruleIndex={ruleIndex!}
						chipId={chip.id}
					/>
				))}
			</div>
		</div>
	);
};

export default ChipList;
