import logo from "../../assets/images/logoBig.png";
import { tutorialTargets } from "../features/Tutorial/TutorialController/tutorialTargets";

const Logo = () => {
	return (
		<div
			className="flex items-center gap-4"
			ref={(element) => {
				if (element) {
					tutorialTargets.logo = element;
				}
			}}
		>
			<img
				src={logo}
				alt="Streamer Logo"
				className="w-12 h-12 lg:w-20 lg:h-20 rounded-full object-cover border-(--accent-dark)"
			/>
		</div>
	);
};

export default Logo;
