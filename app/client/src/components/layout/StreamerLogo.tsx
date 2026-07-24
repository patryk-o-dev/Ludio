import logoPlaceholder from "../../assets/images/LogoPlaceholder.png";

const StreamerLogo = () => {
	return (
		<div className="flex items-center gap-4">
			<img
				src={logoPlaceholder}
				alt="Streamer Logo"
				className="w-14 h-14 rounded-full object-cover border-2 border-(--accent-dark)"
			/>
			<h3 className="text-(--accent) text-2xl uppercase font-light tracking-wide [text-shadow:0_0_8px_var(--accent)]">
				Ludivo
			</h3>
		</div>
	);
};

export default StreamerLogo;
