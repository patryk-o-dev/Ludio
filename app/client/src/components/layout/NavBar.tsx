import ModeSelection from "../features/ModeSelection";
import Profile from "../features/Profile";
import Settings from "../features/Settings";
import Logo from "./Logo";

const NavBar = () => {
	return (
		<nav className="flex flex-col lg:flex-row items-center justify-between bg-(--bgc-primary) p-8 gap-2">
			<div className="flex w-full lg:w-auto items-start lg:items-center gap-1 lg:gap-12">
				<Logo />
				<ModeSelection />
			</div>
			<div className="flex w-full lg:w-auto items-center gap-1 lg:gap-12">
				<Settings />
				<Profile />
			</div>
		</nav>
	);
};

export default NavBar;
