import AnswerPanel from "../features/AnswerPanel";
import MediaDisplay from "../features/MediaDisplay";

const QuizStage = () => {
	return (
		<div className="flex flex-1 gap-8">
			<MediaDisplay />
			<AnswerPanel />
		</div>
	);
};

export default QuizStage;
