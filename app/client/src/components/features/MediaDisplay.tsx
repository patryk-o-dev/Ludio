import useQuizSessionStore from "../../store/quizSessionStore";
import type { SessionPlayer } from "../../types";
import { useEffect, useRef, useState } from "react";
import AnswerResults from "./AnswerResults";
import Icons from "../utils/Icons/Icons";
import { useTranslation } from "react-i18next";
import { withAuth } from "../utils/api";

interface MediaDisplayProps {
	sessionId: string;
	hostId: string;
	currentUserId: string | null;
	mediaUrl: string | null;
	credits?: string | null;
	players?: SessionPlayer[];
	phase: "waiting" | "question" | "summary" | "completed";
	summaryLabel: string;
	summaryWasCorrect?: boolean | null;
	summaryPoints?: number | null;
	showAnswerOverlay?: boolean;
}

const API_ORIGIN = "http://localhost:3000";

const MediaDisplay = ({
	sessionId,
	hostId,
	currentUserId,
	mediaUrl,
	credits,
	players = [],
	phase,
	summaryLabel,
	showAnswerOverlay = false,
}: MediaDisplayProps) => {
	const { t } = useTranslation();
	const API = import.meta.env.VITE_API_URL;
	const [isStarting, setIsStarting] = useState(false);
	const [startError, setStartError] = useState<string | null>(null);
	const mediaType =
		(mediaUrl && mediaUrl.endsWith(".MP4")) ||
		(mediaUrl && mediaUrl.endsWith(".mp4"))
			? "video"
			: mediaUrl && (mediaUrl.endsWith(".mp3") || mediaUrl.endsWith(".ogg"))
				? "sound"
				: "image";

	const resolveMediaUrl = (mediaUrl: string) => {
		console.log(credits);
		return `${API_ORIGIN}${mediaUrl.startsWith("/") ? "" : "/"}${mediaUrl}`;
	};

	const statusColorClass: Record<string, string> = {
		Accepted: "text-(--positive)",
		Invited: "text-(--negative)",
		Declined: "text-(--text-secondary)",
	};
	const videoRef = useRef<HTMLVideoElement>(null);
	const audioUnlocked = localStorage.getItem("audioUnlocked") === "true";

	useEffect(() => {
		if (mediaType !== "video") return;
		if (!audioUnlocked) return;

		const video = videoRef.current;
		if (!video) return;

		video.muted = false;
		video.play().catch(() => {});
	}, [mediaUrl, audioUnlocked, mediaType]);

	const winningPlayer = players.find((p) => p.rank === 1);

	const handleReturn = () => {
		window.location.href = "/";
	};

	const canStartSession =
		phase === "waiting" && Boolean(currentUserId) && currentUserId === hostId;

	const answerValue = useQuizSessionStore(
		(state) => state.quizSessionData.answerValue,
	);

	const handleSessionStart = async () => {
		if (!canStartSession || !currentUserId || isStarting) {
			return;
		}

		setIsStarting(true);
		setStartError(null);

		try {
			const response = await fetch(
				`${API}/game-session/${sessionId}/start`,
				withAuth({
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
				}),
			);

			if (!response.ok) {
				throw new Error(`${response.status}`);
			}
		} catch {
			setStartError(t("quiz_session.errors.start"));
		} finally {
			setIsStarting(false);
		}
	};

	if (!mediaUrl) {
		return (
			<div className="relative flex-2 lg:flex-4 min-h-0 overflow-hidden rounded-3xl border border-(--accent)/40 bg-(--bgc-secondary) shadow-[0_0_24px_2px_color-mix(in_srgb,var(--accent)_20%,transparent)] flex items-center justify-center p-8">
				{phase === "waiting" && (
					<div className="flex w-full max-w-3xl flex-col items-center gap-4 text-center">
						<p className="text-(--text-secondary) text-sm uppercase tracking-[0.35em]">
							{t("quiz_session.status.waiting_for_players")}
						</p>
						{players.length > 0 ? (
							<div className="flex flex-wrap justify-center gap-3">
								{players.map((player) => {
									const colorClass =
										statusColorClass[player.status ?? "thinking"] ??
										"text-(--text)";

									return (
										<div
											key={player.user.displayName}
											className={`flex gap-2 items-center rounded-full border border-(--accent)/30 bg-(--bgc-primary) px-4 py-2 text-lg font-medium ${colorClass}`}
										>
											{player.user.displayName}
											{player.status === "Invited" && (
												<Icons
													name="spinner"
													size={24}
													color="text"
													isAddon={false}
												/>
											)}
										</div>
									);
								})}
							</div>
						) : (
							<p className="text-(--text-secondary) text-xl uppercase tracking-wide">
								{t("quiz_session.status.all_players_ready")}
							</p>
						)}
						{canStartSession && (
							<div className="flex flex-col items-center gap-3 pt-3">
								<button
									type="button"
									onClick={handleSessionStart}
									disabled={isStarting}
									className="min-w-44 rounded-full border border-(--accent-light) bg-linear-to-r from-(--accent) to-(--accent-dark) px-6 py-3 text-sm font-black uppercase tracking-[0.22em] text-(--text) shadow-[0_0_24px_0_color-mix(in_srgb,var(--accent)_35%,transparent)] transition-all hover:border-(--accent-lighter) hover:from-(--accent-light) hover:to-(--accent) hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
								>
									{isStarting
										? t("quiz_session.actions.starting")
										: t("quiz_session.actions.start")}
								</button>
								{startError && (
									<p className="text-sm text-(--negative)">{startError}</p>
								)}
							</div>
						)}
					</div>
				)}
				{phase === "completed" && (
					<div className="flex w-full h-full lg:max-w-3xl flex-col items-center justify-center gap-1 lg:gap-4 text-center">
						<p>{t("quiz_session.labels.winner")}</p>
						<div className="h-32 min-h-8 aspect-ratio lg:h-60 overflow-hidden rounded-full">
							<img
								className="h-full w-full object-cover object-center"
								src={winningPlayer?.user.avatarUrl}
								alt={t("quiz_session.labels.winner_avatar")}
							/>
						</div>

						<p>{winningPlayer?.user.displayName}</p>
						<button
							className="lg:mt-4 rounded-full bg-(--accent) px-4 py-2 text-(--text)"
							onClick={handleReturn}
						>
							{t("quiz_session.actions.return")}
						</button>
					</div>
				)}
			</div>
		);
	}

	const resolvedImageUrl = resolveMediaUrl(mediaUrl);

	return (
		<div className="relative flex-4 min-h-0 overflow-hidden rounded-3xl border border-(--accent)/40 bg-(--bgc-secondary) shadow-[0_0_24px_2px_color-mix(in_srgb,var(--accent)_20%,transparent)]">
			{mediaType === "image" && (
				<>
					<img
						src={resolvedImageUrl}
						aria-hidden
						className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-2xl opacity-60"
					/>
					<img
						src={resolvedImageUrl}
						alt="media display"
						className="absolute inset-0 w-full h-full object-contain object-center"
					/>
				</>
			)}
			{mediaType === "video" && (
				<video
					ref={videoRef}
					src={resolvedImageUrl}
					controls
					muted={!audioUnlocked}
					autoPlay
					className="absolute inset-0 w-full h-full object-cover object-center"
				/>
			)}
			{mediaType === "sound" && (
				<div className="absolute inset-0 flex items-center justify-center">
					<audio src={resolvedImageUrl} controls autoPlay className="w-full" />
				</div>
			)}
			{credits && showAnswerOverlay && (
				<div className="absolute bottom-4 right-6">
					<a
						className="group flex items-center gap-2 rounded-full border border-(--accent)/40 bg-(--bgc-primary)/80 px-4 py-2 text-sm text-(--text-secondary) backdrop-blur-md transition-all hover:border-(--accent-light) hover:bg-(--bgc-tertiary) hover:text-(--text)"
						href={credits}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="text-xs uppercase tracking-wider">Follow</span>
					</a>
				</div>
			)}

			<AnswerResults
				answerValue={answerValue}
				phase={phase}
				summaryLabel={summaryLabel}
				showAnswerOverlay={showAnswerOverlay}
			/>
		</div>
	);
};

export default MediaDisplay;
