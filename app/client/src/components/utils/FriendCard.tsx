import friendProfilePic from "../../assets/images/friendProfilePlaceholder.png";
import battleIcon from "../../assets/icons/battle.png";

const FriendCard = () => {
	return (
		<div className="flex items-center justify-between p-4 bg-(--bgc-tertiary) rounded-lg">
			<img
				className="w-12 h-12 rounded-full"
				src={friendProfilePic}
				alt="Friend Profile"
			/>
			<div className="flex-1 mx-4">
				<p className="text-(--text) font-medium">FriendName</p>
				<span className="text-sm text-(--positive)">Online</span>
			</div>
			<button className="p-2 bg-(--accent-dark) rounded-lg">
				<img className="w-6 h-6" src={battleIcon} alt="Battle Icon" />
			</button>
		</div>
	);
};

export default FriendCard;
