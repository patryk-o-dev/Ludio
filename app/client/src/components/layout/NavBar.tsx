import ModeSelection from "../features/ModeSelection";
import Profile from "../features/Profile";
import Settings from "../features/Settings";
import StreamerLogo from "./StreamerLogo";

const NavBar = () => {
	return (
		<nav>
			<StreamerLogo />
			<ModeSelection />
			<Settings />
			<Profile />
		</nav>
	);
};

export default NavBar;
