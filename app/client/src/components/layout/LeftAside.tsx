import FriendsList from "../features/FriendsList";
import { tutorialTargets } from "../features/Tutorial/TutorialController/tutorialTargets";

const LeftAside = () => {
	return (
		<aside
			ref={(element) => {
				if (element) {
					tutorialTargets.friends = element;
				}
			}}
			className="flex-1 bg-(--bgc-secondary) p-4 rounded-xl min-w-70"
		>
			<FriendsList />
		</aside>
	);
};

export default LeftAside;
