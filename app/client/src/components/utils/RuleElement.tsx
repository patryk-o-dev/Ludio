import binIcon from "../../assets/icons/bin.png";
import categoryIcon from "../../assets/icons/category.png";
import chipByIcon from "../../assets/icons/chipBy.png";
import cancelIcon from "../../assets/icons/cancel.png";
import type { Rule } from "../../types";
import useChipsStore from "../../store/chipsStore";
import useGameConfigStore from "../../store/gameConfigStore";

interface RuleElementProps {
	rule: Rule;
	ruleNumber: number;
}

const RuleElement = ({ rule, ruleNumber }: RuleElementProps) => {
	const chipsGuess = useChipsStore((state) => state.chipsGuess);
	const chipsBy = useChipsStore((state) => state.chipsBy);
	const chipsFilter = useChipsStore((state) => state.chipsFilter);
	const chipSelectionStep = useChipsStore((state) => state.chipSelectionStep);
	const updateChipSelectionStep = useChipsStore(
		(state) => state.updateChipSelectionStep,
	);
	const removeRule = useGameConfigStore((state) => state.removeRule);
	const updateRuleFilterChips = useGameConfigStore(
		(state) => state.updateRuleFilterChips,
	);
	const canDelete = rule.guessId === null && rule.byId === null;

	return (
		<div className="bg-(--bgc-tertiary) p-4 rounded-lg mb-4 flex flex-col gap-3">
			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-row gap-4 items-center">
					<div className="bg-(--accent-darker) rounded-md h-10 w-10 flex items-center justify-center">
						<p className="text-(--accent-lighter) text-sm align-middle">
							{ruleNumber}
						</p>
					</div>
					<p>Rozpoznaj</p>
					<div
						className={`flex flex-row items-center align-middle p-2 bg-(--bgc-quaternary) rounded-md gap-2 hover:cursor-pointer hover:opacity-80 border-2 ${
							chipSelectionStep.type === "guess"
								? "border-(--accent)"
								: "border-transparent"
						}`}
						onClick={() => updateChipSelectionStep({ type: "guess" })}
					>
						<img className="w-6 h-6" src={categoryIcon} alt="Category" />
						<p>
							{chipsGuess.find((chip) => chip.id === rule.guessId)?.name ??
								"Chip Guess"}
						</p>
						<img
							className="w-4 h-4 hover:cursor-pointer"
							src={cancelIcon}
							alt="Cancel"
						/>
					</div>
					<p>Po</p>
					<div
						className={`flex flex-row items-center align-middle p-2 bg-(--bgc-quaternary) rounded-md gap-2 border-2 transition-opacity ${
							rule.guessId && !rule.byId
								? "hover:cursor-pointer hover:opacity-80"
								: "opacity-40 pointer-events-none"
						} ${chipSelectionStep.type === "by" ? "border-(--accent)" : "border-transparent"}`}
						onClick={() => rule.byId && updateChipSelectionStep({ type: "by" })}
					>
						<img className="w-6 h-6" src={chipByIcon} alt="Chip By" />
						<p>
							{chipsBy.find((chip) => chip.id === rule.byId)?.name ?? "Chip By"}
						</p>
						<img
							className="w-4 h-4 hover:cursor-pointer"
							src={cancelIcon}
							alt="Cancel"
						/>
					</div>
				</div>
				<div
					className={`items-center border-l border-(--text-secondary) pl-4 ${canDelete ? "" : "opacity-30 pointer-events-none"}`}
				>
					<img
						className="w-6 hover:cursor-pointer"
						src={binIcon}
						alt="Delete"
						onClick={() => removeRule(rule)}
					/>
				</div>
			</div>

			{rule.byId &&
				(chipsBy.find((chip) => chip.id === rule.byId)?.compatibleFilterIds
					?.length ?? 0) > 0 && (
					<div className="flex flex-row items-center gap-2 pl-14">
						<p className="text-(--text-secondary) text-sm">Filtry:</p>
						{chipsFilter.map((filter) => (
							<button
								key={filter.id}
								onClick={() => updateRuleFilterChips(rule.index, filter.id)}
								className={`px-3 py-1 rounded-full text-sm border-2 transition-colors hover:cursor-pointer ${
									rule.filterIds.some((f) => f === filter.id)
										? "border-(--accent) bg-(--accent-darker) text-(--accent-lighter)"
										: "border-transparent bg-(--bgc-quaternary) text-(--text-secondary) hover:opacity-80"
								}`}
							>
								{filter.name}
							</button>
						))}
					</div>
				)}
		</div>
	);
};

export default RuleElement;
