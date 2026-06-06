import type { SessionPlayer } from "../../types";

interface MediaDisplayProps {
	imageUrl: string | null;
	players?: SessionPlayer[];
	phase: "waiting" | "question" | "summary" | "completed";
	summaryLabel?: string | null;
	summaryWasCorrect?: boolean | null;
	summaryPoints?: number | null;
	showAnswerOverlay?: boolean;
}

const API_ORIGIN = "http://localhost:3000";

const resolveImageUrl = (imageUrl: string) => {
	if (/^https?:\/\//.test(imageUrl)) {
		return imageUrl;
	}

	if (imageUrl.startsWith("/")) {
		return `${API_ORIGIN}${imageUrl}`;
	}

	return imageUrl;
};

const MediaDisplay = ({
	imageUrl,
	players = [],
	phase,
	summaryLabel,
	summaryWasCorrect,
	showAnswerOverlay = false,
}: MediaDisplayProps) => {
	const statusColorClass: Record<string, string> = {
		Accepted: "text-(--positive)",
		Invited: "text-(--negative)",
		Declined: "text-(--text-secondary)",
	};
	if (!imageUrl) {
		return (
			<div className="relative flex-4 min-h-0 overflow-hidden rounded-3xl border border-(--accent)/40 bg-(--bgc-secondary) shadow-[0_0_24px_2px_color-mix(in_srgb,var(--accent)_20%,transparent)] flex items-center justify-center p-8">
				{phase === "waiting" ? (
					<div className="flex w-full max-w-3xl flex-col items-center gap-4 text-center">
						<p className="text-(--text-secondary) text-sm uppercase tracking-[0.35em]">
							Oczekiwanie na graczy
						</p>
						{players.length > 0 ? (
							<div className="flex flex-wrap justify-center gap-3">
								{players.map((player) => {
									const colorClass =
										statusColorClass[player.status ?? "thinking"] ??
										"text-(--text)";

									return (
										<span
											key={player.user.displayName || player.userId}
											className={`rounded-full border border-(--accent)/30 bg-(--bgc-primary) px-4 py-2 text-lg font-medium ${colorClass}`}
										>
											{player.user.displayName || player.userId}
										</span>
									);
								})}
							</div>
						) : (
							<p className="text-(--text-secondary) text-xl uppercase tracking-wide">
								Wszyscy gracze są gotowi
							</p>
						)}
					</div>
				) : (
					<p className="text-(--text-secondary) text-xl uppercase tracking-wide">
						{phase === "summary"
							? "Podsumowanie rundy"
							: phase === "completed"
								? "Koniec sesji"
								: "Ładowanie pytania"}
					</p>
				)}
			</div>
		);
	}

	const resolvedImageUrl = resolveImageUrl(imageUrl);
	const summaryTextColorClass =
		summaryWasCorrect === true
			? "text-(--positive)"
			: summaryWasCorrect === false
				? "text-(--negative)"
				: "text-(--text)";

	return (
		<div className="relative flex-4 min-h-0 overflow-hidden rounded-3xl border border-(--accent)/40 bg-(--bgc-secondary) shadow-[0_0_24px_2px_color-mix(in_srgb,var(--accent)_20%,transparent)]">
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
			{showAnswerOverlay && summaryLabel && (
				<div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-8 pb-2 text-center md:px-12 md:pb-4">
					<div className="w-full max-w-4xl rounded-4xl bg-[radial-gradient(ellipse_82%_60%_at_center,color-mix(in_srgb,var(--bgc-primary)_88%,transparent)_0%,color-mix(in_srgb,var(--bgc-primary)_72%,transparent)_18%,color-mix(in_srgb,var(--bgc-primary)_48%,transparent)_34%,color-mix(in_srgb,var(--bgc-primary)_20%,transparent)_48%,transparent_64%)] px-8 py-14 md:py-16">
						<p
							className={`text-3xl font-semibold text-balance leading-tight [text-shadow:0_4px_18px_color-mix(in_srgb,var(--bgc-primary)_95%,transparent)] md:text-5xl ${summaryTextColorClass}`}
						>
							{summaryLabel}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default MediaDisplay;
