import FriendCard from "../utils/FriendCard";
import addFriendIcon from "../../assets/icons/add-friend.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SessionInvite, User } from "../../types";
import { getStoredAuthUser } from "../utils/authStorage";
import { io } from "socket.io-client";
import Popup from "../utils/Popup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FriendsList = () => {
	const navigate = useNavigate();
	const API = import.meta.env.VITE_API_URL;
	const [searchFriendInput, setSearchFriend] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [inviteSent, setInviteSent] = useState(false);
	const [friends, setFriends] = useState<User[]>([]);
	const [friendRequests, setFriendRequests] = useState<User[]>([]);
	const [sessionInvites, setSessionInvites] = useState<SessionInvite[]>([]);
	const [mySessions, setMySessions] = useState<SessionInvite[]>([]);
	const userId = getStoredAuthUser()?.id ?? null;

	const handleSendFriendRequest = async (
		friendId: string,
		e: React.SubmitEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		try {
			await fetch(`${API}/user/${userId}/friendship/${friendId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					key: "value",
				}),
			});
		} catch (err) {
			console.error("Error sending friend request:", err);
			return;
		}
		setSearchQuery("");
		setInviteSent(true);
		setTimeout(() => {
			setInviteSent(false);
		}, 3000);
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
		const fetchMySessions = async () => {
			const response = await fetch(`${API}/user/${userId}/sessions`);
			const data = await response.json();
			console.log("data: " + data);
			setMySessions(data);
		};
		fetchFriendRequests();
		fetchFriends();
		fetchMySessions();
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

		socket.on("friend-request-created", () => {
			fetch(`${API}/user/${userId}/friend-requests`)
				.then((res) => res.json())
				.then((data) => setFriendRequests(data))
				.catch((error) => console.error("Friend request error:", error));
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

	const getFriendAvatar = (sessionId: string) => {
		const session = mySessions.find((s) => s.sessionId === sessionId);
		const sessionFriend = friends.find((f) => f.id === session?.hostId);
		return sessionFriend;
	};

	const searchFormRef = useRef<HTMLFormElement>(null);

	useGSAP(() => {
		if (!searchFormRef.current) return;

		const tl = gsap.timeline();
		if (searchFriendInput) {
			tl.fromTo(
				searchFormRef.current,
				{
					opacity: 0,
					y: -20,
					height: 0,
					border: "1px solid transparent",
					borderBottomColor: "transparent",
				},
				{
					opacity: 1,
					y: 0,
					height: "auto",
					duration: 0.5,
				},
			)
				.to(searchFormRef.current, {
					duration: 0.5,
				})
				.to(searchFormRef.current, {
					borderBottomColor: "var(--text-secondary)",
					duration: 1,
				});
		} else {
			tl.to(searchFormRef.current, {
				borderBottomColor: "transparent",
				border: "1px solid transparent",
				duration: 0.5,
			}).to(searchFormRef.current, {
				opacity: 0,
				y: -20,
				height: 0,
				duration: 0.5,
			});
		}
	}, [searchFriendInput]);

	return (
		<div className="p-2 scrollbar-thin overflow-auto h-full">
			{inviteSent && <Popup value="Invite Sent" />}
			<div className="flex flex-wrap items-center justify-between mb-4">
				<p className="text-(--text) font-bold text-md uppercase">Znajomi</p>
				<button onClick={() => setSearchFriend((prev) => !prev)}>
					<img
						src={addFriendIcon}
						alt="Add Friend"
						className="w-6 h-6 cursor-pointer"
					/>
				</button>
				<form
					onSubmit={(e) => handleSendFriendRequest(searchQuery, e)}
					ref={searchFormRef}
					className="w-full h-0 opacity-0"
				>
					<input
						type="text"
						placeholder="Szukaj znajomych po ID"
						className="py-2 rounded-md bg-(--background) text-(--text) focus:outline-none"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button type="submit" className="hidden" />
				</form>
			</div>
			<div className="space-y-2">
				{friendRequests.map((request) => (
					<FriendCard
						key={request.id}
						userId={userId ?? undefined}
						friendId={request.id}
						name={request.displayName}
						avatarUrl={request.avatarUrl}
						metaLabel={request.twitchId ?? "Brak Twitch ID"}
						request={true}
						status={request.status ?? "offline"}
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
								metaLabel={friend.twitchId ?? "Brak Twitch ID"}
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
						metaLabel={friend.twitchId ?? "Brak Twitch ID"}
						status={friend.status ?? "offline"}
						userId={userId ?? undefined}
						friendId={friend.id}
					/>
				))}
			</div>
			<div className="space-y-2">
				{mySessions.map((session) => (
					<FriendCard
						key={session.sessionId}
						status={undefined}
						metaLabel={
							getFriendAvatar(session.sessionId)?.twitchId ?? "Brak Twitch ID"
						}
						friendId={session.hostId}
						sessionInvite={session}
						onSessionInviteResponse={(accept) =>
							handleSessionInviteResponse(session.sessionId, accept)
						}
						avatarUrl={getFriendAvatar(session.sessionId)?.avatarUrl}
					/>
				))}
			</div>
		</div>
	);
};

export default FriendsList;
