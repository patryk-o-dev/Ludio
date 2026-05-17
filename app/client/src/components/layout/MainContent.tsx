import ChipSelector from "./ChipSelector";
import LeftAside from "./LeftAside";
import QuizCreator from "./QuizCreator";

const MainContent = () => {
	return (
		<main className="flex flex-row gap-4 bg-(--bgc-secondary) p-4">
			<LeftAside />
			<QuizCreator />
			<ChipSelector />
		</main>
	);
};

export default MainContent;
