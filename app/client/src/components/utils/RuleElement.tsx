import type { Rule } from "../../types";
import useChipsStore from "../../store/chipsStore";
import useGameConfigStore from "../../store/gameConfigStore";
import {
	chipFilterNameToTranslationKey,
	chipNameToData,
} from "./chipNameToData";
import Icons from "./Icons/Icons";
import { useTranslation } from "react-i18next";

interface RuleElementProps {
	rule: Rule;
	ruleNumber: number;
}

const RuleElement = ({ rule, ruleNumber }: RuleElementProps) => {
	const { t } = useTranslation();

	const { allChips, chipSelectionStep, updateChipSelectionStep } =
		useChipsStore();
	const removeRule = useGameConfigStore((state) => state.removeRule);
	const updateRuleGuessChip = useGameConfigStore(
		(state) => state.updateRuleGuessChip,
	);
	const updateRuleByChip = useGameConfigStore(
		(state) => state.updateRuleByChip,
	);
	const updateRuleFilterChips = useGameConfigStore(
		(state) => state.updateRuleFilterChips,
	);
	const guessChip = allChips.chipsGuess.find(
		(chip) => chip.id === rule.guessId,
	);

	const byChip = allChips.chipsBy.find((chip) => chip.id === rule.byId);

	const chipGuessData = chipNameToData(
		guessChip?.id ?? "",
		guessChip?.name ?? "...",
	);
	const chipByData = chipNameToData(byChip?.id ?? "", byChip?.name ?? "...");

	return (
		<div className="bg-(--bgc-tertiary) p-4 rounded-lg mb-4 flex flex-col gap-3 overflow-hidden">
			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-row gap-4 items-center">
					<div className="bg-(--accent-darker) rounded-md h-10 w-10 flex items-center justify-center">
						<p className="text-(--accent-lighter) text-sm align-middle">
							{ruleNumber}
						</p>
					</div>

					<p className="hidden min-[1050px]:block">{t("rule.recognize")}</p>
					<div
						className={`flex flex-row items-center align-middle p-2 bg-(--bgc-quaternary) rounded-md gap-2 hover:opacity-80 hover:cursor-pointer border-2 ${
							chipSelectionStep.type === "guess" &&
							chipSelectionStep.ruleIndex === rule.index
								? "border-(--accent)"
								: "border-transparent"
						}`}
						onClick={() =>
							updateChipSelectionStep({ type: "guess", ruleIndex: rule.index })
						}
					>
						{chipGuessData.icon.map((chipIcon, index) => (
							<Icons
								key={index}
								name={chipIcon}
								color={chipGuessData.color}
								size={24}
								isAddon={index > 0}
							/>
						))}

						<p className="hidden min-[1250px]:block">
							{t(chipGuessData.label)}
						</p>
						{allChips.chipsGuess.find((chip) => chip.id === rule.guessId) && (
							<button onClick={() => updateRuleGuessChip(rule.index, null)}>
								<Icons name="cancel" color="text" size={12} isAddon={false} />
							</button>
						)}
					</div>
					<p>{t("rule.by")}</p>
					<div
						className={`flex flex-row items-center align-middle p-2 bg-(--bgc-quaternary) rounded-md gap-2 border-2 transition-opacity hover:opacity-80 hover:cursor-pointer ${
							chipSelectionStep.type === "by" &&
							chipSelectionStep.ruleIndex === rule.index
								? "border-(--accent)"
								: "border-transparent"
						}`}
						onClick={() =>
							updateChipSelectionStep({
								type: "by",
								ruleIndex: rule.index,
								guessId: rule.guessId ?? undefined,
							})
						}
					>
						{chipByData.icon.map((chipIcon, index) => (
							<Icons
								key={index}
								name={chipIcon}
								color={chipByData.color}
								size={24}
								isAddon={index > 0}
							/>
						))}
						<p className="hidden min-[1250px]:block">{t(chipByData.label)}</p>
						{allChips.chipsGuess.find((chip) => chip.id === rule.guessId) && (
							<button onClick={() => updateRuleByChip(rule.index, null)}>
								<Icons name="cancel" color="text" size={12} isAddon={false} />
							</button>
						)}
					</div>
				</div>
				<div className={`items-center border-l border-(--text-secondary) pl-4`}>
					<button
						onClick={() => removeRule(rule)}
						className="h-full flex hover:text-(--negative) hover:cursor-pointer"
					>
						<Icons
							name="delete"
							color="currentColor"
							size={24}
							isAddon={false}
						/>
					</button>
				</div>
			</div>

			{rule.byId &&
				(allChips.chipsBy.find((chip) => chip.id === rule.byId)
					?.compatibleFilterIds?.length ?? 0) > 0 && (
					<div className="flex flex-row items-center gap-2 pl-14">
						<p className="text-(--text-secondary) text-sm">
							{t("rule.filters")}:
						</p>
						{allChips.chipsFilter
							.filter((filter) => {
								const selectedBy = allChips.chipsBy.find(
									(chip) => chip.id === rule.byId,
								);

								return selectedBy?.compatibleFilterIds.includes(filter.id);
							})
							.map((filter) => (
								<button
									key={filter.id}
									onClick={() => updateRuleFilterChips(rule.index, filter.id)}
									className={`px-3 py-1 rounded-full text-sm border-2 transition-colors hover:cursor-pointer ${
										rule.filterIds.some((f) => f === filter.id)
											? "border-(--accent) bg-(--accent-darker) text-(--accent-lighter)"
											: "border-transparent bg-(--bgc-quaternary) text-(--text-secondary) hover:opacity-80"
									}`}
								>
									{t(chipFilterNameToTranslationKey(filter.name))}
								</button>
							))}
					</div>
				)}
		</div>
	);
};

export default RuleElement;
