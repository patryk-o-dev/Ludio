import profileImg from "../../assets/images/streamerProfilePlaceholder.jpeg";
import { getStoredAuthUser } from "../utils/authStorage";

const StreamerLogo = () => {
	const authUser = getStoredAuthUser();
	return (
		<div className="flex items-center gap-4">
			<img
				src={authUser?.avatarUrl || profileImg}
				alt="Streamer Logo"
				className="w-14 h-14 rounded-full object-cover border-2 border-(--accent)"
			/>
		</div>
	);
};

export default StreamerLogo;
