import RulesList from "../features/RulesList";
import StartQuiz from "../features/StartQuiz";

const QuizCreator = () => {
	return (
		<div className="flex flex-col flex-3 bg-(--bgc-secondary) p-4 rounded-lg h-full">
			<div className="mb-8">
				<h4 className="text-(--text) font-semibold tracking-wide text-3xl uppercase mb-2">
					Kreator Quizu
				</h4>
				<span className="text-(--text-secondary)">
					Ustal zasady i rozpocznij swój quiz
				</span>
			</div>
			<RulesList />
			<StartQuiz />
		</div>
	);
};

export default QuizCreator;
