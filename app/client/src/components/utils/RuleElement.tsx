import binIcon from "../../assets/icons/bin.png";
import categoryIcon from "../../assets/icons/category.png";
import chipByIcon from "../../assets/icons/chipBy.png";
import cancelIcon from "../../assets/icons/cancel.png";

const RuleElement = () => {
	return (
		<div className="bg-(--bgc-tertiary) p-4 rounded-lg mb-4 flex flex-row items-center justify-between gap-4">
			<div className="flex flex-row gap-4 items-center">
				<div className="bg-(--accent-darker) rounded-md h-10 w-10 flex items-center justify-center">
					<p className="text-(--accent-lighter) text-sm align-middle">01</p>
				</div>
				<p>Rozpoznaj</p>
				<div className="flex flex-row items-center align-middle p-2 bg-(--bgc-quaternary) rounded-md gap-2">
					<img className="w-6 h-6" src={categoryIcon} alt="Category" />
					<p>Chip Guess</p>
					<img
						className="w-4 h-4 hover:cursor-pointer"
						src={cancelIcon}
						alt="Cancel"
					/>
				</div>
				<p>Po</p>
				<div className="flex flex-row items-center align-middle p-2 bg-(--bgc-quaternary) rounded-md gap-2">
					<img className="w-6 h-6" src={chipByIcon} alt="Chip By" />
					<p>Chip By</p>
					<img
						className="w-4 h-4 hover:cursor-pointer"
						src={cancelIcon}
						alt="Cancel"
					/>
				</div>
			</div>
			<div className="items-center border-l border-gray-600 pl-4 ">
				<img className="w-6 hover:cursor-pointer" src={binIcon} alt="Delete" />
			</div>
		</div>
	);
};

export default RuleElement;
