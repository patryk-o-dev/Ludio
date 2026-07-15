import { useState } from "react";
import profileImg from "../../assets/images/userProfilePlaceholder.png";
import { getStoredAuthUser } from "../utils/authStorage";
import Icons from "../utils/Icons/Icons";
import { useTranslation } from "react-i18next";

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
	const authUser = getStoredAuthUser();
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
		<div className="border-l border-(--text-secondary) pl-12 flex items-center gap-4 flex-row">
			{!authUser && (
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
			{authUser && (
				<div className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:border-(--accent)/80">
					<div className="relative">
						<img
							className="h-12 w-12 rounded-full object-cover ring-2 ring-(--primary)/40 min-w-12"
							src={authUser.avatarUrl || profileImg}
							alt="Avatar"
						/>

						<div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#171717] bg-green-500" />
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
