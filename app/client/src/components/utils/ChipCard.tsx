import categoryIcon from "../../assets/icons/category.png";
import addIcon from "../../assets/icons/add.png";

const ChipCard = () => {
	return (
		<div className="nth-[1]:border-(--accent) border-2 border-transparent flex items-center justify-between gap-4 p-4 bg-(--bgc-tertiary) rounded-lg">
			<div className="flex items-center gap-4">
				<img className="w-8 h-8" src={categoryIcon} alt="Category" />
				<p className="text-(--text)">Nazwa Chip'u</p>
			</div>
			<div className="bg-(--accent-darker) opacity-90 rounded-2xl p-2">
				<img className="w-3 h-3" src={addIcon} alt="Add" />
			</div>
		</div>
	);
};

export default ChipCard;
