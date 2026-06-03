import friendProfilePic from "../../assets/images/friendProfilePlaceholder.png";
import battleIcon from "../../assets/icons/battle.png";

type FriendStatus = "online" | "offline";

const STATUS_LABEL: Record<FriendStatus, string> = {
	online: "Online",
	offline: "Offline",
};

const STATUS_COLOR: Record<FriendStatus, string> = {
	online: "text-(--positive)",
	offline: "text-(--text-secondary)",
};

interface FriendCardProps {
	name?: string;
	status?: FriendStatus;
	request?: boolean;
	userId?: string;
	friendId?: string;
}

const FriendCard = ({
	name = "FriendName",
	status = "offline",
	request = false,
	userId,
	friendId,
}: FriendCardProps) => {
	const API = import.meta.env.VITE_API_URL;
	const handleAcceptRequest = (accept: boolean) => {
		fetch(`${API}/user/${userId}/friendship/${friendId}/respond`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ accept }),
		});
	};
	return (
		<div className="flex items-center justify-between p-4 bg-(--bgc-tertiary) rounded-lg">
			<img
				className="w-12 h-12 rounded-full"
				src={friendProfilePic}
				alt="Friend Profile"
			/>
			<div className="flex-1 mx-4">
				<p className="text-(--text) font-medium">{name}</p>
				<span className={`text-sm ${STATUS_COLOR[status]}`}>
					{STATUS_LABEL[status]}
				</span>
			</div>
			{request && (
				<div className="flex space-x-2">
					<button
						className="p-2 bg-(--positive) rounded-lg hover:cursor-pointer"
						onClick={() => handleAcceptRequest(true)}
					>
						<img className="w-6 h-6" src={battleIcon} alt="Accept Icon" />
					</button>
					<button
						className="p-2 bg-(--negative) rounded-lg"
						onClick={() => handleAcceptRequest(false)}
					>
						<img className="w-6 h-6" src={battleIcon} alt="Decline Icon" />
					</button>
				</div>
			)}
			{!request && (
				<button className="p-2 bg-(--accent-dark) rounded-lg">
					<img className="w-6 h-6" src={battleIcon} alt="Battle Icon" />
				</button>
			)}
		</div>
	);
};

export default FriendCard;
