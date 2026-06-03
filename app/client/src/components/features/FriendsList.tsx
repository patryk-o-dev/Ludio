import FriendCard from "../utils/FriendCard";
import addFriendIcon from "../../assets/icons/add-friend.png";
import { useEffect, useState } from "react";
import type { User } from "../../types";

const FriendsList = () => {
	const API = import.meta.env.VITE_API_URL;
	const [searchFriendInput, setSearchFriend] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [friends, setFriends] = useState<User[]>([]);
	const [friendRequests, setFriendRequests] = useState<User[]>([]);
	const userIdRaw = window.localStorage.getItem("quizapp.auth.user");
	const userId = userIdRaw ? JSON.parse(userIdRaw).id : null;
	const handleSendFriendRequest = async (
		friendId: string,
		e: React.SubmitEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		await fetch(`${API}/user/${userId}/friendship/${friendId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				key: "value",
			}),
		});
	};
	useEffect(() => {
		const fetchFriends = async () => {
			if (userId) {
				const response = await fetch(`${API}/user/${userId}`);
				const data = await response.json();
				setFriends(data);
			}
		};
		const fetchFriendRequests = async () => {
			if (userId) {
				const response = await fetch(`${API}/user/${userId}/friend-requests`);
				const data = await response.json();
				setFriendRequests(data);
			}
		};
		fetchFriendRequests();
		fetchFriends();
	}, [userId, API]);
	return (
		<div className="p-2 scrollbar-thin overflow-auto h-full">
			<div className="flex items-center justify-between mb-4">
				{!searchFriendInput && (
					<p className="text-(--text) font-bold text-md uppercase">Znajomi</p>
				)}
				{searchFriendInput && (
					<form
						onSubmit={(e) => handleSendFriendRequest(searchQuery, e)}
						className="w-full"
					>
						<input
							type="text"
							placeholder="Szukaj znajomych..."
							className="w-full px-3 py-2 rounded-md bg-(--background) text-(--text) focus:outline-none focus:ring-2 focus:ring-(--primary)"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button type="submit" className="hidden" />
					</form>
				)}
				<button onClick={() => setSearchFriend((prev) => !prev)}>
					<img
						src={addFriendIcon}
						alt="Add Friend"
						className="w-6 h-6 cursor-pointer"
					/>
				</button>
			</div>
			<div className="space-y-2">
				{friendRequests.map((request) => (
					<FriendCard
						key={request.id}
						userId={userId}
						friendId={request.id}
						name={request.displayName}
						request={true}
						status={"offline"}
					/>
				))}
			</div>
			<div className="space-y-2">
				{friends.map((friend) => (
					<FriendCard
						key={friend.id}
						name={friend.displayName}
						status={"online"}
						userId={userId}
						friendId={friend.id}
					/>
				))}
			</div>
		</div>
	);
};

export default FriendsList;
