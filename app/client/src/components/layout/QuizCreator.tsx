import RulesList from "../features/RulesList";
import StartQuiz from "../features/StartQuiz";

const QuizCreator = () => {
	return (
		<div className="flex-3 bg-(--bgc-secondary) p-4 rounded-lg">
			<RulesList />
			<StartQuiz />
		</div>
	);
};

export default QuizCreator;
