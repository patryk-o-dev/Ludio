import FriendCard from "../utils/FriendCard";
import addFriendIcon from "../../assets/icons/add-friend.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SessionInvite, User } from "../../types";
import { getStoredAuthUser } from "../utils/authStorage";
import { io } from "socket.io-client";

const FriendsList = () => {
	const navigate = useNavigate();
	const API = import.meta.env.VITE_API_URL;
	const [searchFriendInput, setSearchFriend] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [friends, setFriends] = useState<User[]>([]);
	const [friendRequests, setFriendRequests] = useState<User[]>([]);
	const [sessionInvites, setSessionInvites] = useState<SessionInvite[]>([]);
	const userId = getStoredAuthUser()?.id ?? null;

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

	const handleSessionInviteResponse = async (
		sessionId: string,
		accept: boolean,
	) => {
		if (!userId) {
			return;
		}

		const response = await fetch(`${API}/game-session/${sessionId}/respond`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId, accept }),
		});

		if (!response.ok) {
			throw new Error("Nie udało się odpowiedzieć na zaproszenie.");
		}

		setSessionInvites((current) =>
			current.filter((invite) => invite.sessionId !== sessionId),
		);

		if (accept) {
			navigate(`/session/${sessionId}`);
		}
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

	useEffect(() => {
		if (!userId) {
			return;
		}

		const socket = io("http://localhost:3000", {
			auth: { userId },
		});

		socket.on("session:invited", (invite: SessionInvite) => {
			setSessionInvites((current) => {
				if (current.some((entry) => entry.sessionId === invite.sessionId)) {
					return current;
				}

				return [invite, ...current];
			});
		});

		socket.onAny((event, ...args) => {
			console.log("SOCKET:", event, args);
		});

		return () => {
			socket.disconnect();
		};
	}, [userId, API]);

	const invitedFriends = friends
		.map((friend) => ({
			friend,
			sessionInvite: sessionInvites.find(
				(invite) => invite.hostId === friend.id,
			),
		}))
		.filter((entry): entry is { friend: User; sessionInvite: SessionInvite } =>
			Boolean(entry.sessionInvite),
		);

	const regularFriends = friends.filter(
		(friend) => !sessionInvites.some((invite) => invite.hostId === friend.id),
	);

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
						userId={userId ?? undefined}
						friendId={request.id}
						name={request.displayName}
						avatarUrl={request.avatarUrl}
						request={true}
						status={"offline"}
					/>
				))}
			</div>
			{invitedFriends.length > 0 && (
				<div className="mb-4">
					<div className="flex items-center justify-between mb-2">
						<p className="text-(--accent) font-bold text-xs uppercase tracking-[0.18em]">
							Zaproszenia do sesji
						</p>
						<span className="px-2 py-1 rounded-full bg-(--accent)/15 text-(--accent) text-[10px] font-bold">
							{invitedFriends.length}
						</span>
					</div>
					<div className="space-y-2">
						{invitedFriends.map(({ friend, sessionInvite }) => (
							<FriendCard
								key={`invite-${friend.id}`}
								name={friend.displayName}
								avatarUrl={friend.avatarUrl ?? undefined}
								status={friend.status ?? "offline"}
								userId={userId ?? undefined}
								friendId={friend.id}
								sessionInvite={sessionInvite}
								onSessionInviteResponse={(accept) =>
									handleSessionInviteResponse(sessionInvite.sessionId, accept)
								}
							/>
						))}
					</div>
				</div>
			)}
			<div className="space-y-2">
				{regularFriends.map((friend) => (
					<FriendCard
						key={friend.id}
						name={friend.displayName}
						avatarUrl={friend.avatarUrl ?? undefined}
						status={friend.status ?? "offline"}
						userId={userId ?? undefined}
						friendId={friend.id}
					/>
				))}
			</div>
		</div>
	);
};

export default FriendsList;
