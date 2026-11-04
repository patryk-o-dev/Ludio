import TutorialOverlay from "../TutorialOverlay/TutorialOverlay";
import { TutorialSteps } from "./TutorialStepsOrder";
import { useTutorialStore } from "../../../../store/tutorialStore";
import { tutorialTargets } from "./tutorialTargets";
import TutorialOverlayInfoCard from "../TutorialOverlay/TutorialOverlayInfoCard";
import { useEffect } from "react";
import useGameConfigStore from "../../../../store/gameConfigStore";
import useChipsStore from "../../../../store/chipsStore";
import { useTranslation } from "react-i18next";

const TutorialController = () => {
	const { t } = useTranslation();
	const step = useTutorialStore((state) => state.step);
	const setStep = useTutorialStore((state) => state.setStep);
	const currentStep = TutorialSteps[step];
	const firstRule = useGameConfigStore((state) => state.rules[0]);
	const firstRuleId = firstRule?.id;
	const firstRuleGuessId = firstRule?.guessId;

	const allChips = useChipsStore((state) => state.allChips);
	const guessChipId = allChips.chipsGuess[0]?.id;
	const byChipId = allChips.chipsBy[0]?.id;

	const updateRuleGuessChip = useGameConfigStore(
		(state) => state.updateRuleGuessChip,
	);
	const updateRuleByChip = useGameConfigStore(
		(state) => state.updateRuleByChip,
	);

	const updateChipSelectionStep = useChipsStore(
		(state) => state.updateChipSelectionStep,
	);

	useEffect(() => {
		if (!currentStep) return;

		if (currentStep.step === 7 && firstRuleId && guessChipId) {
			if (firstRuleGuessId !== guessChipId) {
				updateRuleGuessChip(firstRuleId, guessChipId);
			}

			updateChipSelectionStep({
				type: "by",
				ruleId: firstRuleId,
				guessId: guessChipId,
			});
		}

		if (currentStep.step === 9 && firstRuleId && byChipId) {
			updateRuleByChip(firstRuleId, byChipId);
		}
	}, [
		currentStep,
		firstRuleId,
		firstRuleGuessId,
		guessChipId,
		byChipId,
		updateRuleGuessChip,
		updateChipSelectionStep,
		updateRuleByChip,
	]);

	const isTutorialActive = useTutorialStore((state) => state.isTutorialActive);
	const setTutorialActive = useTutorialStore(
		(state) => state.setTutorialActive,
	);

	const handleStartTutorial = () => {
		setStep(0);
		setTutorialActive(true);
	};

	const targetElement = currentStep
		? tutorialTargets[currentStep.target]
		: null;

	const rect = targetElement?.getBoundingClientRect();

	return (
		<div>
			<TutorialOverlayInfoCard />

			{isTutorialActive === false && (
				<button
					type="button"
					onClick={() => handleStartTutorial()}
					aria-label="Otwórz przewodnik"
					title="Otwórz przewodnik"
					className="
					group fixed -right-2 bottom-8 z-[100]
					flex h-14 w-40 items-center gap-1
					translate-x-[calc(100%_-_3.5rem)]
					rounded-l-2xl border border-r-0
					border-[var(--accent)]/50
					bg-[var(--bgc-secondary)]
					text-[var(--text)]
					shadow-[-8px_0_30px_rgba(0,0,0,0.25)]
					transition-transform duration-300 ease-out
					hover:translate-x-0
					hover:border-[var(--accent)]
					hover:bg-[var(--bgc-tertiary)]
					hover:shadow-[-8px_0_35px_rgba(181,56,102,0.18)]
					focus-visible:translate-x-0
					focus-visible:outline-none
					focus-visible:ring-2
					focus-visible:ring-[var(--accent-light)]
					motion-reduce:transition-none
				"
				>
					<span className="flex h-14 w-14 shrink-0 items-center justify-center gap-0.5 text-[var(--accent-lighter)] group-hover:text-[var(--accent-light)]">
						<svg
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
							className="h-4 w-4"
						>
							<path d="M15 5L5 12L15 19V5Z" />
						</svg>
						<span className="text-lg font-extrabold">?</span>
					</span>

					<span
						className="
						whitespace-nowrap pr-5
						font-[var(--font-nunito)]
						text-sm font-bold tracking-wide
						opacity-0 transition-opacity duration-200
						delay-0
						group-hover:opacity-100
						group-hover:delay-100
						group-focus-visible:opacity-100
					"
					>
						{t("tutorial.label")}
					</span>
				</button>
			)}
			{rect && (
				<TutorialOverlay
					x={rect.x}
					y={rect.y}
					width={rect.width}
					height={rect.height}
				/>
			)}
		</div>
	);
};

export default TutorialController;
