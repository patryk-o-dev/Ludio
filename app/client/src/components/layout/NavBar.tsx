import ModeSelection from "../features/ModeSelection";
import Profile from "../features/Profile";
import Settings from "../features/Settings";
import StreamerLogo from "./StreamerLogo";

const NavBar = () => {
	return (
		<nav className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<StreamerLogo />
				<ModeSelection />
			</div>
			<div className="flex items-center gap-4">
				<Settings />
				<Profile />
			</div>
		</nav>
	);
};

export default NavBar;
