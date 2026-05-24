import binIcon from "../../assets/icons/bin.png";
import categoryIcon from "../../assets/icons/category.png";
import chipByIcon from "../../assets/icons/chipBy.png";
import cancelIcon from "../../assets/icons/cancel.png";
import type { ChipSelectorMode, SelectedChip } from "../layout/MainContent";

interface RuleElementProps {
	selectorMode: ChipSelectorMode;
	onSelectChipType: (type: ChipSelectorMode) => void;
	selectedGuess: SelectedChip | null;
	selectedBy: SelectedChip | null;
	availableFilters: SelectedChip[];
	selectedFilters: SelectedChip[];
	onToggleFilter: (filter: SelectedChip) => void;
}

const RuleElement = ({
	selectorMode,
	onSelectChipType,
	selectedGuess,
	selectedBy,
	availableFilters,
	selectedFilters,
	onToggleFilter,
}: RuleElementProps) => {
	return (
		<div className="bg-(--bgc-tertiary) p-4 rounded-lg mb-4 flex flex-col gap-3">
			<div className="flex flex-row items-center justify-between gap-4">
				<div className="flex flex-row gap-4 items-center">
					<div className="bg-(--accent-darker) rounded-md h-10 w-10 flex items-center justify-center">
						<p className="text-(--accent-lighter) text-sm align-middle">01</p>
					</div>
					<p>Rozpoznaj</p>
					<div
						className={`flex flex-row items-center align-middle p-2 bg-(--bgc-quaternary) rounded-md gap-2 hover:cursor-pointer hover:opacity-80 border-2 ${
							selectorMode === "guess"
								? "border-(--accent)"
								: "border-transparent"
						}`}
						onClick={() => onSelectChipType("guess")}
					>
						<img className="w-6 h-6" src={categoryIcon} alt="Category" />
						<p>{selectedGuess?.name ?? "Chip Guess"}</p>
						<img
							className="w-4 h-4 hover:cursor-pointer"
							src={cancelIcon}
							alt="Cancel"
						/>
					</div>
					<p>Po</p>
					<div
						className={`flex flex-row items-center align-middle p-2 bg-(--bgc-quaternary) rounded-md gap-2 border-2 transition-opacity ${
							selectedGuess
								? "hover:cursor-pointer hover:opacity-80"
								: "opacity-40 pointer-events-none"
						} ${selectorMode === "by" ? "border-(--accent)" : "border-transparent"}`}
						onClick={() => selectedGuess && onSelectChipType("by")}
					>
						<img className="w-6 h-6" src={chipByIcon} alt="Chip By" />
						<p>{selectedBy?.name ?? "Chip By"}</p>
						<img
							className="w-4 h-4 hover:cursor-pointer"
							src={cancelIcon}
							alt="Cancel"
						/>
					</div>
				</div>
				<div className="items-center border-l border-(--text-secondary) pl-4">
					<img
						className="w-6 hover:cursor-pointer"
						src={binIcon}
						alt="Delete"
					/>
				</div>
			</div>

			{selectedBy && availableFilters.length > 0 && (
				<div className="flex flex-row items-center gap-2 pl-14">
					<p className="text-(--text-secondary) text-sm">Filtry:</p>
					{availableFilters.map((filter) => (
						<button
							key={filter.id}
							onClick={() => onToggleFilter(filter)}
							className={`px-3 py-1 rounded-full text-sm border-2 transition-colors hover:cursor-pointer ${
								selectedFilters.some((f) => f.id === filter.id)
									? "border-(--accent) bg-(--accent-darker) text-(--accent-lighter)"
									: "border-transparent bg-(--bgc-quaternary) text-(--text-secondary) hover:opacity-80"
							}`}
						>
							{filter.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default RuleElement;
