import ChipSelector from "./ChipSelector";
import LeftAside from "./LeftAside";
import QuizCreator from "./QuizCreator";

const MainContent = () => {
	return (
		<main className="flex flex-col lg:flex-row flex-1 gap-1 p-4 h-full scrollbar-hide lg:overflow-hidden">
			<LeftAside />
			<QuizCreator />
			<ChipSelector />
		</main>
	);
};

export default MainContent;
