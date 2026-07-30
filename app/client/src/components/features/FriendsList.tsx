import FriendCard from "../utils/FriendCard";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ding from "../../assets/sounds/ding.mp3";
import type { Community, SessionInvite, User } from "../../types";
import { getStoredAuthUser } from "../utils/authStorage";
import Popup from "../utils/Popup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import FriendGroup from "../layout/FriendGroup";
import fpp from "../../assets/images/friendProfilePlaceholder.png";
import {
	acquireSharedSocket,
	releaseSharedSocket,
} from "../utils/socketClient";
import { withAuth } from "../utils/api";
import Icons from "../utils/Icons/Icons";
import useQuizSessionStore from "../../store/quizSessionStore";

const FriendsList = () => {
	const navigate = useNavigate();
	const API = import.meta.env.VITE_API_URL;
	const [searchFriendInput, setSearchFriend] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [inviteSent, setInviteSent] = useState(false);
	const [friends, setFriends] = useState<User[]>([]);
	const [friendRequests, setFriendRequests] = useState<User[]>([]);
	const [sessionInvites, setSessionInvites] = useState<SessionInvite[]>([]);
	const userId = getStoredAuthUser()?.id ?? null;
	const { t } = useTranslation();
	const userSessionStatus = useQuizSessionStore(
		(state) => state.userSessionStatus,
	);

	const [communities, setCommunities] = useState<Community[]>([]);

	useEffect(() => {
		const fetchCommunities = async () => {
			const response = await fetch(`${API}/community`, withAuth());
			const data = await response.json();

			setCommunities(data);
		};

		fetchCommunities();
	}, [API]);

	const handleSendFriendRequest = async (
		friendId: string,
		e: React.SubmitEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		try {
			await fetch(
				`${API}/user/friendship/${friendId}`,
				withAuth({
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}),
			);
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

		const response = await fetch(
			`${API}/game-session/${sessionId}/respond`,
			withAuth({
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ accept }),
			}),
		);

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
				const response = await fetch(`${API}/user/friends`, withAuth());
				const data = await response.json();
				setFriends(data);
			}
		};
		const fetchFriendRequests = async () => {
			if (userId) {
				const response = await fetch(`${API}/user/friend-requests`, withAuth());
				const data = await response.json();
				setFriendRequests(data);
			}
		};
		const fetchSessionInvites = async () => {
			const response = await fetch(`${API}/game-session/invites`, withAuth());
			const data = await response.json();

			setSessionInvites(data);
		};

		fetchFriendRequests();
		fetchFriends();
		fetchSessionInvites();
	}, [userId, API]);

	useEffect(() => {
		if (!userId) {
			return;
		}

		const socket = acquireSharedSocket({ userId });

		socket.on("session:invited", (invite: SessionInvite) => {
			setSessionInvites((current) => {
				if (current.some((entry) => entry.sessionId === invite.sessionId)) {
					return current;
				}

				return [invite, ...current];
			});
		});

		socket.on("friendship-updated", async () => {
			try {
				const [friendRequests, friends] = await Promise.all([
					fetch(`${API}/user/friend-requests`, withAuth()).then((res) =>
						res.json(),
					),
					fetch(`${API}/user/friends`, withAuth()).then((res) => res.json()),
				]);

				setFriendRequests(friendRequests);
				setFriends(friends);
			} catch (error) {
				console.error(error);
			}
		});

		return () => {
			releaseSharedSocket({ userId });
		};
	}, [userId, API]);

	const sessionInviteCards = sessionInvites.map((invite) => ({
		key: `invite-${invite.sessionId}`,
		name: invite.hostName,
		avatarUrl: invite.hostAvatar,
		metaLabel: t("session_invite"),
		friendId: invite.hostId,
		sessionInvite: invite,
	}));

	const friendRequestCards = friendRequests.map((request) => ({
		key: request.id,
		name: request.displayName,
		avatarUrl: request.avatarUrl,
		metaLabel: request.twitchId ?? t("no_twitch_id"),
		friendId: request.id,
	}));

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

	const getRankedMembers = (members: Community["members"]) => {
		const sorted = [...members].sort((a, b) => b.points - a.points);

		let previousPoints: number | null = null;
		let currentRank = 0;

		return sorted.map((member, index) => {
			if (member.points !== previousPoints) {
				currentRank = index + 1;
			}

			previousPoints = member.points;

			return {
				...member,
				rank: currentRank,
			};
		});
	};

	const inviteCards = [
		...sessionInviteCards.map((invite) => ({
			...invite,
			type: "sessionInvite" as const,
		})),
		...friendRequestCards.map((request) => ({
			...request,
			type: "friendRequest" as const,
		})),
	];

	return (
		<div className="scrollbar-thin custom-scrollbar overflow-auto h-full">
			{inviteSent && <Popup value={t("invite_sent")} />}
			<div className="flex flex-wrap items-center justify-between mb-4 p-2">
				<p className="text-(--text) font-bold text-md uppercase">
					{t("friends")}
				</p>
				<button
					className="hover:cursor-pointer"
					onClick={() => setSearchFriend((prev) => !prev)}
				>
					<Icons
						name={searchFriendInput ? "cancel" : "addFriend"}
						size={24}
						color="text"
						isAddon={false}
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
			{userId && userSessionStatus !== "INVALID" && (
				<div className="">
					<div>
						{inviteCards.length > 0 && (
							<FriendGroup name={t("invites")}>
								{inviteCards.map((invite) => (
									<FriendCard
										key={invite.key}
										userId={userId ?? undefined}
										friendId={invite.friendId}
										name={invite.name}
										avatarUrl={invite.avatarUrl}
										metaLabel={invite.metaLabel}
										variant={invite.type}
										{...(invite.type === "sessionInvite"
											? {
													sessionInvite: invite.sessionInvite,
													onSessionInviteResponse: (accept: boolean) =>
														handleSessionInviteResponse(
															invite.sessionInvite.sessionId,
															accept,
														),
												}
											: {
													request: true,
												})}
									/>
								))}
							</FriendGroup>
						)}
						{communities.map((community) => {
							const rankedMembers = getRankedMembers(community.members);

							return (
								<FriendGroup
									key={community.id}
									name={community.owner.displayName ?? "Community"}
									communityId={community.id}
								>
									{rankedMembers.map((member) => (
										<FriendCard
											key={member.id}
											name={member.displayName ?? "?"}
											avatarUrl={member.avatarUrl ?? fpp}
											metaLabel={member.twitchId ?? t("no_twitch_id")}
											userId={userId}
											friendId={member.id}
											points={member.points}
											rank={member.rank}
											variant="communityMember"
										/>
									))}
								</FriendGroup>
							);
						})}
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
