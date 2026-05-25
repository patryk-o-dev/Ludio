import { useState } from "react";
import type {
	ChipSelectorMode,
	GameOptionsState,
	SelectedChip,
} from "./MainContent";
import ChipList from "./ChipList";
import GameOptions from "./GameOptions";

type Tab = "chips" | "options";

interface ChipSelectorProps {
	mode: ChipSelectorMode;
	selectedChipGuessId?: string;
	selectedBy: SelectedChip | null;
	onChipSelect: (chip: SelectedChip) => void;
	gameOptions: GameOptionsState;
	onOptionsChange: (options: GameOptionsState) => void;
}

const tabBase =
	"flex-1 py-1.5 text-sm font-semibold transition-colors cursor-pointer rounded";
const tabActive = "bg-(--accent) text-white";
const tabIdle =
	"bg-(--bgc-quaternary) text-(--text-secondary) hover:text-(--text)";

const ChipSelector = ({
	mode,
	selectedChipGuessId,
	selectedBy,
	onChipSelect,
	gameOptions,
	onOptionsChange,
}: ChipSelectorProps) => {
	const [manualTab, setManualTab] = useState<Tab | null>(null);
	const [prevSelectedBy, setPrevSelectedBy] = useState(selectedBy);

	if (selectedBy !== prevSelectedBy) {
		setPrevSelectedBy(selectedBy);
		if (selectedBy && !prevSelectedBy) setManualTab(null);
	}

	const activeTab = manualTab ?? (selectedBy ? "options" : "chips");

	return (
		<aside className="flex-1 flex flex-col bg-(--bgc-secondary) p-4 rounded-lg gap-3">
			<div className="flex gap-1 p-1 bg-(--bgc-primary) rounded-lg">
				<button
					className={`${tabBase} ${activeTab === "chips" ? tabActive : tabIdle}`}
					onClick={() => setManualTab("chips")}
				>
					Chipy
				</button>
				<button
					className={`${tabBase} ${activeTab === "options" ? tabActive : tabIdle}`}
					onClick={() => setManualTab("options")}
				>
					Opcje
				</button>
			</div>

			{activeTab === "chips" ? (
				<ChipList
					mode={mode}
					selectedChipGuessId={selectedChipGuessId}
					onChipSelect={onChipSelect}
				/>
			) : (
				<GameOptions options={gameOptions} onChange={onOptionsChange} />
			)}
		</aside>
	);
};

export default ChipSelector;
