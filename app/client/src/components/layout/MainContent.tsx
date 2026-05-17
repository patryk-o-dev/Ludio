import ChipSelector from "./ChipSelector";
import LeftAside from "./LeftAside";
import QuizCreator from "./QuizCreator";

const MainContent = () => {
	return (
		<main className="flex flex-row flex-1 gap-1 p-4">
			<LeftAside />
			<QuizCreator />
			<ChipSelector />
		</main>
	);
};

export default MainContent;
