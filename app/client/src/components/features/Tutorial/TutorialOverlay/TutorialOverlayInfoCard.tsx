import { useTutorialStore } from "../../../../store/tutorialStore";
import useGameConfigStore from "../../../../store/gameConfigStore";
import { TutorialSteps } from "../TutorialController/TutorialStepsOrder";
import { useTranslation } from "react-i18next";

const TutorialOverlayInfoCard = () => {
	const { t } = useTranslation();

	const step = useTutorialStore((state) => state.step);
	const nextStep = useTutorialStore((state) => state.nextStep);
	const setStep = useTutorialStore((state) => state.setStep);
	const setTutorialActive = useTutorialStore(
		(state) => state.setTutorialActive,
	);

	const updateRuleGuessChip = useGameConfigStore(
		(state) => state.updateRuleGuessChip,
	);
	const updateRuleByChip = useGameConfigStore(
		(state) => state.updateRuleByChip,
	);
	const firstRuleId = useGameConfigStore((state) => state.rules[0]?.id);

	const tutorialStep = TutorialSteps[step];

	const handleEndTutorial = () => {
		if (firstRuleId) {
			updateRuleGuessChip(firstRuleId, null);
			updateRuleByChip(firstRuleId, null);
		}

		setStep(-1);
		setTutorialActive(false);
	};

	return (
		<>
			{step >= 0 && (
				<div
					className={`fixed top-6 ${
						tutorialStep.infoCardPosition === "left" ? "left-6" : "right-6"
					} z-[90] w-[min(24rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#111318]/95 p-6 text-white shadow-2xl shadow-black/30 backdrop-blur-xl`}
				>
					<div className="mb-5 flex items-center justify-between">
						<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
							{t("tutorial.label")}
						</span>

						<span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/60">
							{t("tutorial.stepCounter", { step: step + 1 })}
						</span>
					</div>

					<div className="space-y-2">
						<h5 className="text-lg font-semibold tracking-tight text-white">
							{t(tutorialStep.infoCardTitle)}
						</h5>

						<p className="text-sm leading-6 text-white/60">
							{t(tutorialStep.infoCardText)}
						</p>
					</div>

					<div className="my-5 h-px bg-white/[0.08]" />

					<div className="flex justify-between gap-2">
						{step < TutorialSteps.length - 1 && (
							<button
								onClick={nextStep}
								className="shrink-0 flex-4 p-2 items-center justify-center rounded-lg border border-(--accent)/50 bg-(--accent)/70"
							>
								{t("tutorial.next")}
							</button>
						)}

						<button
							onClick={handleEndTutorial}
							className="min-h-8 min-w-8 shrink-0 flex-1 p-2 items-center justify-center rounded-lg border border-(--negative)/50 bg-(--negative)/70"
						>
							{t("tutorial.end")}
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default TutorialOverlayInfoCard;
