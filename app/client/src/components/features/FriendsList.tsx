import FriendCard from "../utils/FriendCard";
import addFriendIcon from "../../assets/icons/add-friend.png";

const FriendsList = () => {
	return (
		<div className="p-4">
			<div className="flex items-center justify-between mb-4">
				<p className="text-(--text) font-bold text-md uppercase">Znajomi</p>
				<img
					src={addFriendIcon}
					alt="Add Friend"
					className="w-6 h-6 cursor-pointer"
				/>
			</div>
			<div className="space-y-2">
				<FriendCard />
				<FriendCard />
				<FriendCard />
				<FriendCard />
			</div>
		</div>
	);
};

export default FriendsList;
