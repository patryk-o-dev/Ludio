import Icons from "../utils/Icons/Icons";

type AnswerResultsProps = {
	answerValue: string;
	phase: string;
	summaryLabel: string;
	showAnswerOverlay?: boolean;
};

const AnswerResults = ({
	answerValue,
	phase,
	summaryLabel,
	showAnswerOverlay = false,
}: AnswerResultsProps) => {
	const isQuestionPhase = phase === "question";
	const isSummaryPhase = phase === "summary";
	const isCorrect = summaryLabel === answerValue;

	if (isQuestionPhase && (!showAnswerOverlay || !answerValue)) {
		return null;
	}

	if (!isQuestionPhase && !isSummaryPhase) {
		return null;
	}

	const iconName = isSummaryPhase
		? isCorrect
			? "circleCheck"
			: "circleX"
		: "circleQuestionMark";
	const iconColor = isSummaryPhase
		? isCorrect
			? "positive"
			: "negative"
		: "text";
	const textClass = isSummaryPhase
		? isCorrect
			? "text-(--positive)"
			: "text-(--negative)"
		: "text-(--text)";
	const label = isSummaryPhase ? summaryLabel : answerValue;

	return (
		<div className="absolute top-4 right-4 z-50 flex max-w-[45%] items-center gap-3 rounded-2xl border border-(--accent)/40 bg-(--bgc-primary)/90 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
			<Icons name={iconName} color={iconColor} size={36} isAddon={false} />
			<p
				className={`text-lg font-semibold leading-tight wrap-break-word ${textClass}`}
			>
				{label}
			</p>
		</div>
	);
};

export default AnswerResults;
