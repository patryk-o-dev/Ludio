import settingsIcon from "../../assets/icons/settings.png";
import infoIcon from "../../assets/icons/info.png";
import infoIconHover from "../../assets/icons/info-hover.png";

const Settings = () => {
	return (
		<div className="flex items-center gap-8">
			<img
				className="w-8 h-8 cursor-pointer"
				src={settingsIcon}
				alt="Settings"
			/>
			<div className="relative group w-8 h-8 cursor-pointer">
				<img
					className="w-8 h-8 group-hover:opacity-0 transition-opacity"
					src={infoIcon}
					alt="Info"
				/>
				<img
					className="w-8 h-8 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
					src={infoIconHover}
					alt="Info"
				/>
			</div>
		</div>
	);
};

export default Settings;
