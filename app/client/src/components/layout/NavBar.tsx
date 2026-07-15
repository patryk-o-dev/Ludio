import ModeSelection from "../features/ModeSelection";
import Profile from "../features/Profile";
import Settings from "../features/Settings";
import StreamerLogo from "./StreamerLogo";

const NavBar = () => {
	return (
		<nav className="flex items-center justify-between bg-(--bgc-primary) p-8 gap-2 min-w-240">
			<div className="flex items-center gap-12">
				<StreamerLogo />
				<ModeSelection />
			</div>
			<div className="flex items-center gap-12">
				<Settings />
				<Profile />
			</div>
		</nav>
	);
};

export default NavBar;
