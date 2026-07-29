import { useRef, useState } from "react";
import useGameConfigStore from "../../store/gameConfigStore";
import type { SessionInvite } from "../../types";
import Icons from "./Icons/Icons";
import style from "./FriendCard.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { withAuth } from "./api";

interface FriendCardProps {
	name?: string;
	metaLabel?: string;
	points?: number;
	rank?: number;
	variant?:
		| "friendRequest"
		| "sessionInvite"
		| "friend"
		| "communityMember"
		| "banned";
	request?: boolean;
	userId?: string;
	friendId?: string;
	avatarUrl?: string;
	sessionInvite?: SessionInvite;
	onSessionInviteResponse?: (accept: boolean) => Promise<void>;
	onActiveSessionOpen?: () => void;
}

const FriendCard = ({
	name = "FriendName",
	metaLabel,
	points = 0,
	rank,
	friendId,
	avatarUrl,
	onSessionInviteResponse,
	variant,
}: FriendCardProps) => {
	const API = import.meta.env.VITE_API_URL;
	const { t } = useTranslation();
	const addPlayer = useGameConfigStore((state) => state.addPlayer);
	const removePlayer = useGameConfigStore((state) => state.removePlayer);
	const [playerAdded, setPlayerAdded] = useState(false);
	const [iconName, setIconName] = useState<"pluscircle" | "cancel">(
		"pluscircle",
	);
	const secondaryLabel = metaLabel;
	const secondaryLabelClass = metaLabel ? "text-(--text-secondary)" : "";
	const variantClassName = variant ? style[variant] : "";
	const infoPlateLabel =
		variant === "sessionInvite"
			? t("session_invite")
			: variant === "friendRequest"
				? t("friend_request")
				: null;

	const buttonRef = useRef<HTMLButtonElement>(null);
	const [animateButton, setAnimateButton] = useState(false);
	const isCommunityQuiz = useGameConfigStore(
		(state) => state.options.isCommunityQuiz,
	);

	useGSAP(() => {
		if (!animateButton || !buttonRef.current) return;
		if (!buttonRef.current) return;

		const tl = gsap.timeline();

		tl.to(buttonRef.current, {
			x: "100%",
			pointerEvents: "none",
			duration: 0.5,
			ease: "power2.in",
		})
			.to(buttonRef.current, {
				x: "100%",
				backgroundColor: playerAdded ? "var(--negative)" : "var(--info)",
				duration: 0.5,
			})
			.to(buttonRef.current, {
				x: "100%",
				duration: 0,
			})
			.to(buttonRef.current, {
				x: "0%",
				pointerEvents: "auto",
				duration: 0.5,
				ease: "power2.out",
			});
	}, [playerAdded]);

	const handleAddPlayer = () => {
		const nextState = !playerAdded;

		if (!playerAdded) {
			addPlayer({ id: friendId || "", displayName: name, avatarUrl });
		} else {
			removePlayer({
				id: friendId || "",
				displayName: name,
				avatarUrl,
			});
		}

		setPlayerAdded(nextState);
		setAnimateButton(true);

		setTimeout(() => {
			setIconName(nextState ? "cancel" : "pluscircle");
		}, 600);
	};

	const handleFriendRequestResponse = async (accept: boolean) => {
		await fetch(
			`${API}/user/friendship/${friendId}/respond`,
			withAuth({
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ accept }),
			}),
		);
	};

	const rankClass =
		variant === "communityMember"
			? rank === 1
				? style.gold
				: rank === 2
					? style.silver
					: rank === 3
						? style.bronze
						: style.normal
			: "";

	const rankColor =
		rank === 1
			? "gold"
			: rank === 2
				? "silver"
				: rank === 3
					? "bronze"
					: "text";

	const formatPoints = (points: number) => {
		if (points >= 1_000_000) {
			return `${(points / 1_000_000).toFixed(1)}M`;
		}

		if (points >= 1_000) {
			return `${(points / 1_000).toFixed(1)}k`;
		}

		return points.toString();
	};

	return (
		<div
			className={`${variantClassName} ${rankClass} flex items-center relative overflow-hidden justify-between gap-3 bg-(--bgc-tertiary) rounded-lg transition-colors`}
		>
			{infoPlateLabel && (
				<div className="absolute top-1 left-4 z-10 rounded-full border border-(--accent) bg-(--bgc-secondary) px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-(--accent) shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-sm">
					{infoPlateLabel}
				</div>
			)}
			<div className="flex items-center min-w-0 flex-1">
				<img
					className="w-12 h-12 rounded-full shrink-0"
					src={avatarUrl}
					alt="Friend Profile"
				/>
				<div className="flex-1 mx-4 min-w-0">
					<div className="flex items-center gap-2 min-w-0">
						<p className="text-(--text) font-medium truncate">{name}</p>
					</div>
					<div className="flex items-center gap-2 flex-wrap">
						<span className={`text-sm ${secondaryLabelClass}`}>
							{t("profile.id_label")}: {secondaryLabel}
						</span>
					</div>
				</div>
				{variant === "friend" && (
					<>
						<button
							ref={buttonRef}
							disabled={isCommunityQuiz}
							className="absolute -right-px top-0 h-full flex items-center align-middle p-1 rounded-lg bg-(--info) hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							onClick={handleAddPlayer}
						>
							<Icons name={iconName} color="text" size={32} isAddon={false} />
						</button>
						<button
							className="absolute top-0 left-0 h-6 flex items-center p-1 transition-all duration-300 hover:filter-[drop-shadow(0_0_3px_var(--negative))_drop-shadow(0_0_6px_var(--negative))]"
							onClick={async () => {
								await fetch(
									`${API}/user/friendship/${friendId}/remove`,
									withAuth({
										method: "DELETE",
									}),
								);
							}}
						>
							<Icons name="cancel" color="negative" size={12} isAddon={false} />
						</button>
					</>
				)}
				{variant === "sessionInvite" && (
					<div className={`absolute flex -right-px top-0 h-full w-full`}>
						<button
							className="absolute right-0 top-0 h-[50%] flex items-center align-middle p-1 rounded-lg rounded-b-none bg-(--positive-dark) hover:cursor-pointer transition-colors disabled:opacity-50"
							onClick={() => onSessionInviteResponse?.(true)}
						>
							<Icons name="pluscircle" color="text" size={32} isAddon={false} />
						</button>
						<button
							className="absolute right-0 top-[50%] h-[50%] flex items-center align-middle p-1 rounded-lg rounded-t-none bg-(--negative-dark) hover:cursor-pointer transition-colors disabled:opacity-50"
							onClick={() => onSessionInviteResponse?.(false)}
						>
							<Icons name="cancel" color="text" size={32} isAddon={false} />
						</button>
					</div>
				)}
				{variant === "friendRequest" && (
					<div className={`absolute flex -right-px top-0 h-full w-full`}>
						<button
							className="absolute right-0 top-0 h-[50%] flex items-center align-middle p-1 rounded-lg rounded-b-none bg-(--positive-dark) hover:cursor-pointer transition-colors disabled:opacity-50"
							onClick={() => handleFriendRequestResponse(true)}
						>
							<Icons name="pluscircle" color="text" size={32} isAddon={false} />
						</button>
						<button
							className="absolute right-0 top-[50%] h-[50%] flex items-center align-middle p-1 rounded-lg rounded-t-none bg-(--negative-dark) hover:cursor-pointer transition-colors disabled:opacity-50"
							onClick={() => handleFriendRequestResponse(false)}
						>
							<Icons name="cancel" color="text" size={32} isAddon={false} />
						</button>
					</div>
				)}
				{variant === "communityMember" && (
					<div className="flex flex-col items-center gap-1 pr-1">
						<Icons name="trophy" color={rankColor} size={24} isAddon={false} />
						<span className="font-light text-(--text) text-xs">
							{formatPoints(points)} pkt
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default FriendCard;
