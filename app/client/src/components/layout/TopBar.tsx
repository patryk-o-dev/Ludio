import SessionStats from "../features/SessionStats";
import StreamerLogo from "../layout/StreamerLogo";
import surrenderIcon from "../../assets/icons/ff.png";

const TopBar = () => {
	return (
		<header className="flex items-center justify-between px-6 py-4">
			<StreamerLogo />
			<SessionStats />
			<button className="px-4 py-2 bg-(--bgc-basic) border border-(--bgc-tertiary) text-(--text-primary) rounded hover:bg-(--accent) transition-colors">
				<img
					src={surrenderIcon}
					alt="surrender icon"
					className="inline-block w-6 h-6 mr-2"
				/>
				Poddaj się
			</button>
		</header>
	);
};

export default TopBar;
