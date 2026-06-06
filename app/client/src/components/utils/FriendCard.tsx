import { useState } from "react";
import battleIcon from "../../assets/icons/battle.png";
import cancelIcon from "../../assets/icons/cancel.png";
import useGameConfigStore from "../../store/gameConfigStore";
import type { SessionInvite } from "../../types";

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
	request?: boolean;
	userId?: string;
	friendId?: string;
	avatarUrl?: string;
	sessionInvite?: SessionInvite;
	onSessionInviteResponse?: (accept: boolean) => Promise<void>;
}

const FriendCard = ({
	name = "FriendName",
	status = "offline",
	request = false,
	userId,
	friendId,
	avatarUrl,
	sessionInvite,
	onSessionInviteResponse,
}: FriendCardProps) => {
	const API = import.meta.env.VITE_API_URL;
	const addPlayer = useGameConfigStore((state) => state.addPlayer);
	const removePlayer = useGameConfigStore((state) => state.removePlayer);
	const [playerAdded, setPlayerAdded] = useState(false);
	const [actionPending, setActionPending] = useState(false);
	const [actionError, setActionError] = useState<string | null>(null);
	const hasSessionInvite = !request && Boolean(sessionInvite);

	const handleFriendRequestResponse = async (accept: boolean) => {
		await fetch(`${API}/user/${userId}/friendship/${friendId}/respond`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ accept }),
		});
	};

	const handleAction = async (accept: boolean) => {
		setActionPending(true);
		setActionError(null);

		try {
			if (request) {
				await handleFriendRequestResponse(accept);
				return;
			}

			if (hasSessionInvite && onSessionInviteResponse) {
				await onSessionInviteResponse(accept);
			}
		} catch {
			setActionError("Akcja nie powiodła się. Spróbuj ponownie.");
		} finally {
			setActionPending(false);
		}
	};

	const handleAddPlayer = () => {
		if (!playerAdded) {
			addPlayer({ id: friendId || "", displayName: name, status, avatarUrl });
		} else {
			removePlayer({
				id: friendId || "",
				displayName: name,
				status,
				avatarUrl,
			});
		}
		setPlayerAdded(!playerAdded);
	};

	return (
		<div
			className="flex items-center justify-between gap-3 p-4 bg-(--bgc-tertiary) rounded-lg border border-transparent transition-colors data-[invite=true]:border-(--accent)/60 data-[invite=true]:bg-(--bgc-secondary)"
			data-invite={hasSessionInvite}
		>
			<div className="flex items-center min-w-0 flex-1">
				<img
					className="w-12 h-12 rounded-full shrink-0"
					src={avatarUrl}
					alt="Friend Profile"
				/>
				<div className="flex-1 mx-4 min-w-0">
					<div className="flex items-center gap-2 min-w-0">
						<p className="text-(--text) font-medium truncate">{name}</p>
						{hasSessionInvite && (
							<span className="px-2 py-1 rounded-full bg-(--accent)/15 text-(--accent) text-[10px] font-bold uppercase tracking-[0.18em] shrink-0">
								Quiz invite
							</span>
						)}
					</div>
					<div className="flex items-center gap-2 flex-wrap">
						<span className={`text-sm ${STATUS_COLOR[status]}`}>
							{STATUS_LABEL[status]}
						</span>
						{hasSessionInvite && (
							<span className="text-xs text-(--text-secondary)">
								Czeka zaproszenie do wspólnej sesji.
							</span>
						)}
					</div>
					{actionError && (
						<p className="text-(--negative) text-xs mt-1">{actionError}</p>
					)}
				</div>
			</div>
			{request && (
				<div className="flex space-x-2 shrink-0">
					<button
						className="p-2 bg-(--positive) rounded-lg hover:cursor-pointer disabled:opacity-50"
						disabled={actionPending}
						onClick={() => void handleAction(true)}
					>
						<img className="w-6 h-6" src={battleIcon} alt="Accept Icon" />
					</button>
					<button
						className="p-2 bg-(--negative) rounded-lg disabled:opacity-50"
						disabled={actionPending}
						onClick={() => void handleAction(false)}
					>
						<img className="w-6 h-6" src={cancelIcon} alt="Decline Icon" />
					</button>
				</div>
			)}
			{hasSessionInvite && (
				<div className="flex items-center gap-2 shrink-0">
					<button
						className="px-3 py-2 bg-(--accent) text-(--text) text-xs font-semibold uppercase tracking-[0.16em] rounded-lg hover:bg-(--accent-light) disabled:opacity-50"
						disabled={actionPending}
						onClick={() => void handleAction(true)}
					>
						Dołącz
					</button>
					<button
						className="p-2 bg-(--negative) rounded-lg disabled:opacity-50"
						disabled={actionPending}
						onClick={() => void handleAction(false)}
					>
						<img className="w-6 h-6" src={cancelIcon} alt="Cancel Icon" />
					</button>
				</div>
			)}
			{!request && !hasSessionInvite && (
				<button
					className="p-2 bg-(--accent-dark) rounded-lg"
					onClick={handleAddPlayer}
				>
					{!playerAdded && (
						<img className="w-6 h-6" src={battleIcon} alt="Battle Icon" />
					)}
					{playerAdded && (
						<img className="w-6 h-6" src={cancelIcon} alt="Cancel Icon" />
					)}
				</button>
			)}
		</div>
	);
};

export default FriendCard;
