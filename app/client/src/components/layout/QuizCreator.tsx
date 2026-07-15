import RulesList from "../features/RulesList";
import StartQuiz from "../features/StartQuiz";
import { useTranslation } from "react-i18next";

const QuizCreator = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col flex-3 gap-2 bg-(--bgc-secondary) p-4 rounded-lg h-full overflow-hidden min-w-90">
			<div className="mb-6">
				<h4 className="text-(--text) font-semibold tracking-wide text-3xl uppercase mb-2">
					{t("quiz_creator.title")}
				</h4>
				<span className="text-(--text-secondary)">
					{t("quiz_creator.subtitle")}
				</span>
			</div>
			<RulesList />
			<StartQuiz />
		</div>
	);
};

export default QuizCreator;
