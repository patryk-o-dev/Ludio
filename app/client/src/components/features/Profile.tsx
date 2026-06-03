import { useState } from "react";
import profileImg from "../../assets/images/userProfilePlaceholder.png";
import downArrow from "../../assets/icons/down-arrow.png";
import { getStoredAuthUser } from "../utils/authStorage";

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
	const authUser = getStoredAuthUser();
	const [isConnecting, setIsConnecting] = useState(false);

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
			<img
				className="w-12 h-12 rounded-full object-cover"
				src={authUser?.avatarUrl || profileImg}
				alt="Profile"
			/>
			<div className="flex flex-col leading-tight">
				<p className="text-(--text) font-bold text-lg">
					{authUser?.displayName || authUser?.username || "TechnicznaKapibara"}
				</p>
				<p className="text-sm text-(--text-secondary)">
					{authUser ? "Polaczono z Twitch" : "Niepolaczone konto"}
				</p>
			</div>
			{!authUser && (
				<button
					type="button"
					onClick={handleConnectWithTwitch}
					disabled={isConnecting}
					className="text-(--text) disabled:text-(--text-secondary)"
				>
					{isConnecting ? "Connecting..." : "Connect with Twitch"}
				</button>
			)}
			<img className="w-6 h-6" src={downArrow} alt="Dropdown" />
		</div>
	);
};

export default Profile;
