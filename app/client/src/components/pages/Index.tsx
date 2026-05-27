import NavBar from "../layout/NavBar";
import MainContent from "../layout/MainContent";

const Index = () => {
	return (
		<div className="bg-(--bgc-primary) text-(--text) max-h-screen flex flex-col items-center font-nunito">
			<div className="bg-(--bgc-primary) w-screen max-w-450 h-screen flex flex-col">
				<NavBar />
				<MainContent />
			</div>
		</div>
	);
};

export default Index;
