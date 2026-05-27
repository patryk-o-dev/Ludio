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
}

const FriendCard = ({
	name = "FriendName",
	status = "offline",
}: FriendCardProps) => {
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
			<button className="p-2 bg-(--accent-dark) rounded-lg">
				<img className="w-6 h-6" src={battleIcon} alt="Battle Icon" />
			</button>
		</div>
	);
};

export default FriendCard;
