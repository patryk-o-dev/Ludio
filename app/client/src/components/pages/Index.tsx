import CommunityJoinResolver from "../features/CommunityJoinResolver";
import NavBar from "../layout/NavBar";
import MainContent from "../layout/MainContent";
import Popup from "../utils/Popup";
import { useEffect, useState } from "react";
import TutorialController from "../features/Tutorial/TutorialController/TutorialController";
import { tutorialTargets } from "../features/Tutorial/TutorialController/tutorialTargets";
import { useCreateGuest } from "../utils/useCreateGuest";

const Index = () => {
	const failedJoinCommunity = localStorage.getItem("failedJoinCommunity");
	const [showPopup, setShowPopup] = useState(!!failedJoinCommunity);

	useEffect(() => {
		if (failedJoinCommunity) {
			const timer = setTimeout(() => {
				setShowPopup(false);
				localStorage.removeItem("failedJoinCommunity");
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [failedJoinCommunity]);
	useCreateGuest();

	return (
		<div
			ref={(element) => {
				if (element) {
					tutorialTargets.main = element;
				}
			}}
			className="relative bg-(--bgc-primary) text-(--text) lg:max-h-screen flex flex-col items-center font-nunito"
		>
			<CommunityJoinResolver />
			<TutorialController />
			<div className="bg-(--bgc-primary) w-full max-w-450 lg:h-screen flex flex-col">
				<NavBar />
				<MainContent />
			</div>
			{showPopup && <Popup value="Login before joining a community" />}
		</div>
	);
};

export default Index;
