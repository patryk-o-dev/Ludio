import Controls from "../layout/Controls";
import QuizStage from "../layout/QuizStage";
import TopBar from "../layout/TopBar";

const QuizSession = () => {
	return (
		<main className="flex flex-col h-screen bg-(--bgc-primary) text-(--text) px-16 py-8 gap-8">
			<TopBar />
			<QuizStage />
			<Controls />
		</main>
	);
};

export default QuizSession;
