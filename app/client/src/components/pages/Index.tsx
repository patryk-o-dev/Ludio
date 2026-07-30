import CommunityJoinResolver from "../features/CommunityJoinResolver";
import NavBar from "../layout/NavBar";
import MainContent from "../layout/MainContent";
import Popup from "../utils/Popup";
import { useEffect, useState } from "react";
import { withAuth } from "../utils/api";
import useQuizSessionStore from "../../store/quizSessionStore";
const Index = () => {
	const failedJoinCommunity = localStorage.getItem("failedJoinCommunity");
	const [showPopup, setShowPopup] = useState(!!failedJoinCommunity);
	const setUserSessionStatus = useQuizSessionStore(
		(state) => state.setUserSessionStatus,
	);
	const API = import.meta.env.VITE_API_URL;

	useEffect(() => {
		if (failedJoinCommunity) {
			const timer = setTimeout(() => {
				setShowPopup(false);
				localStorage.removeItem("failedJoinCommunity");
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [failedJoinCommunity]);

	useEffect(() => {
		const checkSession = async () => {
			try {
				const response = await fetch(
					`${API}/user/me`,
					withAuth({
						method: "GET",
					}),
				);

				if (!response.ok) {
					setUserSessionStatus("INVALID");
					return;
				}

				setUserSessionStatus("VALID");
			} catch {
				setUserSessionStatus("INVALID");
			}
		};

		checkSession();
	}, [API, setUserSessionStatus]);
	return (
		<div className="relative bg-(--bgc-primary) text-(--text) max-h-screen flex flex-col items-center font-nunito">
			<CommunityJoinResolver />
			<div className="bg-(--bgc-primary) w-screen max-w-450 h-screen flex flex-col">
				<NavBar />
				<MainContent />
			</div>
			{showPopup && <Popup value="Login before joining a community" />}
		</div>
	);
};

export default Index;
