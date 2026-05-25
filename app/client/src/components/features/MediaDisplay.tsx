const MediaDisplay = () => {
	return (
		<div className="relative flex-4 min-h-0 overflow-hidden rounded-3xl border border-(--accent)/40 bg-(--bgc-secondary) shadow-[0_0_24px_2px_color-mix(in_srgb,var(--accent)_20%,transparent)]">
			<img
				src="https://placehold.co/600x400/5E1D35/eaeaea"
				aria-hidden
				className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-2xl opacity-60"
			/>
			<img
				src="https://placehold.co/600x400/5E1D35/eaeaea"
				alt="media display"
				className="absolute inset-0 w-full h-full object-contain object-center"
			/>
		</div>
	);
};

export default MediaDisplay;
