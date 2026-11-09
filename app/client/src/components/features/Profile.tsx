import { useState } from "react";
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/logoBig.png";
import Icons from "../utils/Icons/Icons";
import { useTranslation } from "react-i18next";
import useQuizSessionStore from "../../store/quizSessionStore";
import { API_URL } from "../utils/api";
import { tutorialTargets } from "./Tutorial/TutorialController/tutorialTargets";

const API = API_URL;

const Profile = () => {
	const currentUser = useQuizSessionStore((state) => state.currentUser);
	const userSessionStatus = useQuizSessionStore(
		(state) => state.userSessionStatus,
	);
	const [isConnecting, setIsConnecting] = useState(false);
	const { t } = useTranslation();

	const handleConnectWithTwitch = async () => {
		if (isConnecting) {
			return;
		}

		setIsConnecting(true);

		try {
			const response = await fetch(`${API}/auth/twitch/url`);

			if (!response.ok) {
				throw new Error(`Failed to get Twitch auth URL (${response.status})`);
			}

			const data: { url: string } = await response.json();
			window.location.href = data.url;
		} catch (error) {
			console.error("Unable to start Twitch auth", error);
			setIsConnecting(false);
		}
	};

	return (
		<div className="border-l border-(--text-secondary) pl-0 lg:pl-12 flex items-center flex-row">
			<div className="fixed top-2 right-2">
				<Link to="/privacy-policy">
					<span className="text-xs text-(--text-secondary)">
						Privacy Policy
					</span>
				</Link>
			</div>

			{userSessionStatus === "VALID" && currentUser && (
				<div className="flex items-center gap-4 rounded-xl px-4 py-3">
					<div className="flex flex-col min-w-0 text-right">
						<p className="font-semibold text-(--text)">
							{currentUser.displayName ||
								(currentUser.twitchId ? currentUser.username : "Guest")}
						</p>

						{currentUser.twitchId ? (
							<p className="text-xs text-(--text-secondary)">
								{t("profile.id_label")}: {currentUser.twitchId}
							</p>
						) : (
							<>
								<p className="text-xs text-(--text-secondary)">Guest mode</p>

								<button
									type="button"
									onClick={() =>
										void navigator.clipboard.writeText(currentUser.id)
									}
									ref={(element) => {
										if (element) {
											tutorialTargets.id = element;
										}
									}}
									className="text-xs text-(--accent) hover:underline text-left break-all"
									title="Copy your user ID"
								>
									COPY ID
								</button>
							</>
						)}
					</div>
					<img
						className="h-12 w-12 rounded-full object-cover ring-2 ring-(--primary)/40 min-w-12"
						src={currentUser.avatarUrl || profileImg}
						alt="Avatar"
					/>
				</div>
			)}

			{userSessionStatus !== "VALID" || !currentUser?.twitchId ? (
				<button
					type="button"
					onClick={handleConnectWithTwitch}
					disabled={isConnecting}
					className="text-(--text) disabled:text-(--text-secondary) flex gap-2 items-center"
				>
					{isConnecting
						? t("profile.connecting")
						: t("profile.connect_with_twitch")}
					<Icons name="twitch" color="text" size={24} isAddon={false} />
				</button>
			) : null}
		</div>
	);
};

export default Profile;
