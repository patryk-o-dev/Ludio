import profileImg from "../../assets/images/streamerProfilePlaceholder.jpeg";

const StreamerLogo = () => {
	return (
		<div className="flex items-center gap-3">
			<img
				src={profileImg}
				alt="Streamer Logo"
				className="w-10 h-10 rounded-full object-cover border-2 border-[#dc6690]"
			/>
			<p className="text-[#dedede]">
				Streamer's <span className="text-[#dc6690]">Quiz</span>
			</p>
		</div>
	);
};

export default StreamerLogo;
