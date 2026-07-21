import FriendCard from "../utils/FriendCard";
import addFriendIcon from "../../assets/icons/add-friend.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ding from "../../assets/sounds/ding.mp3";
import type { SessionInvite, User } from "../../types";
import { getStoredAuthUser } from "../utils/authStorage";
import { io } from "socket.io-client";
import Popup from "../utils/Popup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import FriendGroup from "../layout/FriendGroup";

const FriendsList = () => {
	const navigate = useNavigate();
	const API = import.meta.env.VITE_API_URL;
	const [searchFriendInput, setSearchFriend] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [inviteSent, setInviteSent] = useState(false);
	const [friends, setFriends] = useState<User[]>([]);
	const [friendRequests, setFriendRequests] = useState<User[]>([]);
	const [sessionInvites, setSessionInvites] = useState<SessionInvite[]>([]);
	// const [mySessions, setMySessions] = useState<SessionInvite[]>([]);
	const userId = getStoredAuthUser()?.id ?? null;
	const { t } = useTranslation();

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

	const unlockAudio = async () => {
		const audio = new Audio(ding);
		audio.play();
		audio.muted = false;
		localStorage.setItem("audioUnlocked", "true");
	};

	const handleSessionInviteResponse = async (
		sessionId: string,
		accept: boolean,
	) => {
		if (!userId) {
			return;
		}
		unlockAudio();

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
		// const fetchMySessions = async () => {
		// 	const response = await fetch(`${API}/user/${userId}/sessions`);
		// 	const data = await response.json();
		// 	setMySessions(data);
		// };
		fetchFriendRequests();
		fetchFriends();
		// fetchMySessions();
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

	const sessionInviteCards = invitedFriends.map(
		({ friend, sessionInvite }) => ({
			key: `invite-${friend.id}`,
			name: friend.displayName,
			avatarUrl: friend.avatarUrl ?? undefined,
			metaLabel: friend.twitchId ?? t("no_twitch_id"),
			friendId: friend.id,
			sessionInvite,
		}),
	);

	const friendRequestCards = friendRequests.map((request) => ({
		key: request.id,
		name: request.displayName,
		avatarUrl: request.avatarUrl,
		metaLabel: request.twitchId ?? t("no_twitch_id"),
		friendId: request.id,
	}));

	const communityCards: User[] = [];
	const friendCards = friends.map((friend) => ({
		key: friend.id,
		name: friend.displayName,
		avatarUrl: friend.avatarUrl ?? undefined,
		metaLabel: friend.twitchId ?? t("no_twitch_id"),
		friendId: friend.id,
	}));
	const bannedCards: User[] = [];

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
					borderBottomColor: "var(--accent-dark)",
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

	// friends - friendRequest, sessionInvites, friendInfo

	return (
		<div className="scrollbar-thin overflow-auto h-full">
			{inviteSent && <Popup value={t("invite_sent")} />}
			<div className="flex flex-wrap items-center justify-between mb-4 p-2">
				<p className="text-(--text) font-bold text-md uppercase">
					{t("friends")}
				</p>
				<button onClick={() => setSearchFriend((prev) => !prev)}>
					<img
						src={addFriendIcon}
						alt="Add friend"
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
						placeholder={t("search_friends_by_id")}
						className="py-2 rounded-md bg-(--background) text-(--text) focus:outline-none"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button type="submit" className="hidden" />
				</form>
			</div>
			{userId && (
				<div className="">
					<div>
						{sessionInviteCards.length > 0 && (
							<FriendGroup name={t("session_invites")}>
								{sessionInviteCards.map((invite) => (
									<FriendCard
										key={invite.key}
										name={invite.name}
										avatarUrl={invite.avatarUrl}
										metaLabel={invite.metaLabel}
										userId={userId ?? undefined}
										friendId={invite.friendId}
										sessionInvite={invite.sessionInvite}
										variant="sessionInvite"
										onSessionInviteResponse={(accept) =>
											handleSessionInviteResponse(
												invite.sessionInvite.sessionId,
												accept,
											)
										}
									/>
								))}
							</FriendGroup>
						)}
						{friendRequestCards.length > 0 && (
							<FriendGroup name={t("friend_requests")}>
								{friendRequestCards.map((request) => (
									<FriendCard
										key={request.key}
										userId={userId ?? undefined}
										friendId={request.friendId}
										name={request.name}
										avatarUrl={request.avatarUrl}
										metaLabel={request.metaLabel}
										request={true}
										variant="friendRequest"
									/>
								))}
							</FriendGroup>
						)}
						{communityCards.length > 0 && (
							<FriendGroup name={t("communities")}>
								{communityCards.map((member) => (
									<FriendCard
										key={member.id}
										name={member.displayName}
										avatarUrl={member.avatarUrl}
										metaLabel={member.twitchId ?? t("no_twitch_id")}
										userId={userId}
										friendId={member.id}
										variant="communityMember"
									/>
								))}
							</FriendGroup>
						)}
						{friendCards.length > 0 && (
							<FriendGroup name={t("friends")}>
								{friendCards.map((friend) => (
									<FriendCard
										key={friend.key}
										name={friend.name}
										avatarUrl={friend.avatarUrl}
										metaLabel={friend.metaLabel}
										userId={userId ?? undefined}
										friendId={friend.friendId}
										variant="friend"
									/>
								))}
							</FriendGroup>
						)}
						{bannedCards.length > 0 && (
							<FriendGroup name={t("banned")}>
								{bannedCards.map((member) => (
									<FriendCard
										key={member.id}
										name={member.displayName}
										avatarUrl={member.avatarUrl}
										metaLabel={member.twitchId ?? t("no_twitch_id")}
										userId={userId}
										friendId={member.id}
										variant="banned"
									/>
								))}
							</FriendGroup>
						)}
					</div>
				</div>
			)}
			<div className="space-y-2"></div>
			<div className="space-y-2"></div>
		</div>
	);
};

export default FriendsList;
