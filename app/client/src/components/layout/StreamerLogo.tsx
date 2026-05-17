import profileImg from "../../assets/images/streamerProfilePlaceholder.jpeg";

const StreamerLogo = () => {
	return (
		<div className="flex items-center gap-4">
			<img
				src={profileImg}
				alt="Streamer Logo"
				className="w-14 h-14 rounded-full object-cover border-2 border-(--accent)"
			/>
			<p className="text-(--text) uppercase text-lg font-bold">
				Streamer's <span className="text-(--accent)">Quiz</span>
			</p>
		</div>
	);
};

export default StreamerLogo;
