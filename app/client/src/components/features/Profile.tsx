import { useState } from "react";
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/userProfilePlaceholder.png";
import { getStoredAuthUser } from "../utils/authStorage";
import Icons from "../utils/Icons/Icons";
import { useTranslation } from "react-i18next";
import useQuizSessionStore from "../../store/quizSessionStore";
import { API_URL } from "../utils/api";

const API = API_URL;

const Profile = () => {
	const authUser = getStoredAuthUser();
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
			{(!authUser || userSessionStatus !== "VALID") && (
				<button
					type="button"
					onClick={handleConnectWithTwitch}
					disabled={isConnecting}
					className="text-(--text) disabled:text-(--text-secondary) flex gap-2"
				>
					{isConnecting
						? t("profile.connecting")
						: t("profile.connect_with_twitch")}
					<Icons name="twitch" color="text" size={24} isAddon={false} />
				</button>
			)}
			{authUser && userSessionStatus !== "INVALID" && (
				<div className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:border-(--accent)/80">
					<div className="relative">
						<img
							className="h-12 w-12 rounded-full object-cover ring-2 ring-(--primary)/40 min-w-12"
							src={authUser.avatarUrl || profileImg}
							alt="Avatar"
						/>
					</div>

					<div className="flex flex-col">
						<div className="flex items-center gap-2">
							<p className="font-semibold text-(--text)">
								{authUser.displayName}
							</p>
						</div>

						<p className="text-xs text-(--text-secondary)">
							{t("profile.id_label")}: {authUser.twitchId}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
