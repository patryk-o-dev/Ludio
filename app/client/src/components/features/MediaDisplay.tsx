import useQuizSessionStore from "../../store/quizSessionStore";
import type { QuestionAchievement, SessionPlayer } from "../../types";
import { useEffect, useRef, useState } from "react";
import AnswerResults from "./AnswerResults";
import Icons from "../utils/Icons/Icons";
import { useTranslation } from "react-i18next";
import { withAuth } from "../utils/api";
import Achievement from "../utils/Achievement";

interface MediaDisplayProps {
	sessionId: string;
	hostId: string;
	currentUserId: string | null;
	mediaUrl: string | null;
	credits?: string | null;
	achievement?: QuestionAchievement;
	emoji?: string | null;
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
	achievement,
	emoji,
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
		return `${API_ORIGIN}${mediaUrl.startsWith("/") ? "" : "/"}${mediaUrl}`;
	};

	const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);

	const togglePlayback = () => {
		const media = mediaRef.current;

		if (!media) return;

		if (media.paused) {
			media.play().catch(() => {});
		} else {
			media.pause();
		}
	};

	const handleTimeUpdate = () => {
		const media = mediaRef.current;

		if (!media) return;

		setCurrentTime(media.currentTime);
	};

	const handleLoadedMetadata = () => {
		const media = mediaRef.current;

		if (!media) return;

		setDuration(media.duration);
	};

	const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
		const media = mediaRef.current;

		if (!media) return;

		const time = Number(event.target.value);
		media.currentTime = time;
		setCurrentTime(time);
	};

	const handleVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
		const media = mediaRef.current;

		if (!media) return;

		const nextVolume = Number(event.target.value);

		media.volume = nextVolume;
		media.muted = nextVolume === 0;

		setVolume(nextVolume);
		setIsMuted(nextVolume === 0);
	};

	const toggleMute = () => {
		const media = mediaRef.current;

		if (!media) return;

		if (media.muted || media.volume === 0) {
			media.muted = false;
			media.volume = volume || 1;
			setVolume(volume || 1);
			setIsMuted(false);
		} else {
			media.muted = true;
			setIsMuted(true);
		}
	};

	const formatTime = (time: number) => {
		if (!Number.isFinite(time)) return "0:00";

		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);

		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	useEffect(() => {
		const media = mediaRef.current;

		if (!media) return;

		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);
		const handleEnded = () => setIsPlaying(false);

		media.addEventListener("play", handlePlay);
		media.addEventListener("pause", handlePause);
		media.addEventListener("ended", handleEnded);

		return () => {
			media.removeEventListener("play", handlePlay);
			media.removeEventListener("pause", handlePause);
			media.removeEventListener("ended", handleEnded);
		};
	}, [mediaUrl, mediaType]);

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
			{mediaType === "image" && !achievement && !emoji && (
				<>
					<img
						src={resolvedImageUrl}
						aria-hidden
						draggable={false}
						onContextMenu={(e) => e.preventDefault()}
						className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-2xl opacity-60"
					/>
					<img
						src={resolvedImageUrl}
						alt="media display"
						draggable={false}
						onContextMenu={(e) => e.preventDefault()}
						className="absolute inset-0 w-full h-full object-contain object-center"
					/>
				</>
			)}
			{mediaType === "image" && achievement && (
				<Achievement achievement={achievement} media={resolvedImageUrl} />
			)}
			{mediaType === "image" && emoji && (
				<div className="absolute inset-0 flex items-center justify-center bg-radial-[circle_at_center] from-(--accent)/12 via-transparent to-transparent p-6">
					<div className="flex max-w-4xl flex-wrap items-center justify-center gap-3 rounded-4xl border border-(--accent)/20 bg-(--bgc-primary)/55 px-6 py-5 shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_18%,transparent)] backdrop-blur-md sm:gap-4 sm:px-8 sm:py-6">
						{emoji
							.split(" ")
							.filter(Boolean)
							.map((emojiItem, index) => (
								<span
									key={`${emojiItem}-${index}`}
									className="flex items-center justify-center rounded-2xl bg-white/6 text-4xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:text-5xl lg:text-6xl p-6"
								>
									{emojiItem}
								</span>
							))}
					</div>
				</div>
			)}
			{mediaType === "video" && (
				<div className="absolute inset-0 group bg-black">
					<video
						ref={mediaRef as React.RefObject<HTMLVideoElement>}
						src={resolvedImageUrl}
						muted={!audioUnlocked}
						autoPlay
						onClick={togglePlayback}
						onTimeUpdate={handleTimeUpdate}
						onLoadedMetadata={handleLoadedMetadata}
						className="absolute inset-0 h-full w-full object-contain cursor-pointer"
					/>

					<div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/55 to-transparent px-5 pb-4 pt-14 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
						<input
							type="range"
							min="0"
							max={duration || 0}
							step="0.01"
							value={currentTime}
							onChange={handleSeek}
							className="media-slider mb-4 h-3 w-full cursor-pointer"
						/>

						<div className="flex items-center gap-3 text-(--text)">
							<button
								type="button"
								onClick={togglePlayback}
								className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition duration-200 hover:scale-105 hover:bg-white/20 hover:border-white/20 cursor-pointer"
							>
								<Icons
									name={isPlaying ? "pause" : "play"}
									color="text"
									size={18}
									isAddon={false}
								/>
							</button>

							<button
								type="button"
								onClick={toggleMute}
								className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition duration-200 hover:bg-white/16 hover:border-white/20 cursor-pointer"
							>
								<Icons
									name={isMuted || volume === 0 ? "volumeOff" : "volume"}
									color="text"
									size={18}
									isAddon={false}
								/>
							</button>

							<input
								type="range"
								min="0"
								max="1"
								step="0.01"
								value={isMuted ? 0 : volume}
								onChange={handleVolume}
								className="media-slider h-3 w-24 cursor-pointer"
							/>

							<span className="ml-auto rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-white/75 backdrop-blur-sm">
								{formatTime(currentTime)} / {formatTime(duration)}
							</span>
						</div>
					</div>
				</div>
			)}
			{mediaType === "sound" && (
				<div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-(--bgc-tertiary) to-(--bgc-primary) p-6">
					<div
						className="group w-full max-w-2xl rounded-2xl border border-(--accent)/30 bg-black/20 p-5 shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_15%,transparent)] backdrop-blur-md"
						onClick={(event) => {
							if (event.target === event.currentTarget) {
								togglePlayback();
							}
						}}
					>
						<div className="mb-4 flex items-center gap-4">
							<button
								type="button"
								onClick={togglePlayback}
								className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--accent) text-(--text) transition hover:scale-105 cursor-pointer"
							>
								<Icons
									name={isPlaying ? "pause" : "play"}
									color="text"
									size={22}
									isAddon={false}
								/>
							</button>

							<div className="min-w-0 flex-1">
								<p className="text-sm font-medium text-(--text)">
									{isPlaying ? "Playing" : "Paused"}
								</p>
								<p className="text-xs text-(--text-secondary)">
									{formatTime(currentTime)} / {formatTime(duration)}
								</p>
							</div>

							<button
								type="button"
								onClick={toggleMute}
								className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10 cursor-pointer"
							>
								<Icons
									name={isMuted || volume === 0 ? "volumeOff" : "volume"}
									color="text"
									size={18}
									isAddon={false}
								/>
							</button>

							<input
								type="range"
								min="0"
								max="1"
								step="0.01"
								value={isMuted ? 0 : volume}
								onChange={handleVolume}
								className="media-slider h-1 w-18 cursor-pointer"
							/>
						</div>

						<input
							type="range"
							min="0"
							max={duration || 0}
							step="0.01"
							value={currentTime}
							onChange={handleSeek}
							className="media-slider h-3 w-full cursor-pointer"
						/>

						<audio
							ref={mediaRef as React.RefObject<HTMLAudioElement>}
							src={resolvedImageUrl}
							autoPlay
							onTimeUpdate={handleTimeUpdate}
							onLoadedMetadata={handleLoadedMetadata}
							className="hidden"
						/>
					</div>
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
