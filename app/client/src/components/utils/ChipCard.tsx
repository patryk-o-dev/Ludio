import categoryIcon from "../../assets/icons/category.png";
import addIcon from "../../assets/icons/add.png";

interface ChipCardProps {
	name: string;
	onSelect: () => void;
}

const ChipCard = ({ name, onSelect }: ChipCardProps) => {
	return (
		<div
			className="border-2 border-transparent flex items-center justify-between gap-4 p-4 bg-(--bgc-tertiary) rounded-lg hover:cursor-pointer hover:border-(--accent)"
			onClick={onSelect}
		>
			<div className="flex items-center gap-4">
				<img className="w-8 h-8" src={categoryIcon} alt="Category" />
				<p className="text-(--text)">{name}</p>
			</div>
			<div className="bg-(--accent-darker) opacity-90 rounded-2xl p-2">
				<img className="w-3 h-3" src={addIcon} alt="Add" />
			</div>
		</div>
	);
};

export default ChipCard;
