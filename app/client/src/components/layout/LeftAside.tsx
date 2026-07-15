import FriendsList from "../features/FriendsList";

const LeftAside = () => {
	return (
		<aside className="flex-1 bg-(--bgc-secondary) p-4 rounded-xl min-w-70">
			<FriendsList />
		</aside>
	);
};

export default LeftAside;
