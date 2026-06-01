interface MediaDisplayProps {
	imageUrl: string | null;
	phase: "waiting" | "question" | "summary" | "completed";
}

const MediaDisplay = ({ imageUrl, phase }: MediaDisplayProps) => {
	if (!imageUrl) {
		return (
			<div className="relative flex-4 min-h-0 overflow-hidden rounded-3xl border border-(--accent)/40 bg-(--bgc-secondary) shadow-[0_0_24px_2px_color-mix(in_srgb,var(--accent)_20%,transparent)] flex items-center justify-center">
				<p className="text-(--text-secondary) text-xl uppercase tracking-wide">
					{phase === "waiting"
						? "Oczekiwanie na pytanie"
						: phase === "summary"
							? "Podsumowanie rundy"
							: phase === "completed"
								? "Koniec sesji"
								: "Ładowanie pytania"}
				</p>
			</div>
		);
	}

	return (
		<div className="relative flex-4 min-h-0 overflow-hidden rounded-3xl border border-(--accent)/40 bg-(--bgc-secondary) shadow-[0_0_24px_2px_color-mix(in_srgb,var(--accent)_20%,transparent)]">
			<img
				src={imageUrl}
				aria-hidden
				className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-2xl opacity-60"
			/>
			<img
				src={imageUrl}
				alt="media display"
				className="absolute inset-0 w-full h-full object-contain object-center"
			/>
		</div>
	);
};

export default MediaDisplay;
