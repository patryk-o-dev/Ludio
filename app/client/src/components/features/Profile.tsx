import profileImg from "../../assets/images/userProfilePlaceholder.png";
import downArrow from "../../assets/icons/down-arrow.png";

const Profile = () => {
	return (
		<div className="border-l border-gray-600 pl-12 flex items-center gap-4 flex-row">
			<img className="w-12 h-12 rounded-full" src={profileImg} alt="Profile" />
			<p className="text-(--text) font-bold text-lg">TechnicznaKapibara</p>
			<img className="w-6 h-6" src={downArrow} alt="Dropdown" />
		</div>
	);
};

export default Profile;
