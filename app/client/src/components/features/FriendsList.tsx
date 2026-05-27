import FriendCard from "../utils/FriendCard";
import addFriendIcon from "../../assets/icons/add-friend.png";

const MOCK_FRIENDS = [
	{ name: "mikson", status: "online" as const },
	{ name: "wodzu1233", status: "online" as const },
	{ name: "akela", status: "online" as const },
	{ name: "aski", status: "online" as const },
	{ name: "Nikanoo", status: "offline" as const },
	{ name: "MVPRamzes", status: "offline" as const },
	{ name: "Silvup_Le", status: "online" as const },
	{ name: "DarkViper99", status: "offline" as const },
	{ name: "xX_Slayer_Xx", status: "offline" as const },
	{ name: "ProGamer420", status: "offline" as const },
];

const FriendsList = () => {
	return (
		<div className="p-2 scrollbar-thin overflow-auto h-full">
			<div className="flex items-center justify-between mb-4">
				<p className="text-(--text) font-bold text-md uppercase">Znajomi</p>
				<img
					src={addFriendIcon}
					alt="Add Friend"
					className="w-6 h-6 cursor-pointer"
				/>
			</div>
			<div className="space-y-2">
				{MOCK_FRIENDS.map((friend) => (
					<FriendCard
						key={friend.name}
						name={friend.name}
						status={friend.status}
					/>
				))}
			</div>
		</div>
	);
};

export default FriendsList;
