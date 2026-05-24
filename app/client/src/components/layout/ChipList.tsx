import { useEffect, useState } from "react";
import ChipCard from "../utils/ChipCard";
import type { ChipSelectorMode, SelectedChip } from "./MainContent";

interface Chip {
	id: string;
	name: string;
}

interface ChipListProps {
	mode: ChipSelectorMode;
	selectedChipGuessId?: string;
	onChipSelect: (chip: SelectedChip) => void;
}

const modeLabel: Record<ChipSelectorMode, string> = {
	guess: "Wybierz Chip Guess:",
	by: "Wybierz Chip By:",
};

const ChipList = ({ mode, selectedChipGuessId, onChipSelect }: ChipListProps) => {
	const [chips, setChips] = useState<Chip[]>([]);

	useEffect(() => {
		const url =
			mode === "by" && selectedChipGuessId
				? `http://localhost:3000/api/chips/by/${selectedChipGuessId}`
				: `http://localhost:3000/api/chips/${mode}`;

		fetch(url)
			.then((res) => res.json())
			.then((data: Chip[]) => setChips(data))
			.catch(() => setChips([]));
	}, [mode, selectedChipGuessId]);

	return (
		<div className="flex flex-col p-4">
			<p className="text-(--text) font-bold text-md uppercase">Zasady Quizu</p>
			<p className="text-(--accent) text-sm font-semibold mt-4">
				{modeLabel[mode]}
			</p>
			<div className="flex flex-col gap-4 mt-4">
				{chips.map((chip) => (
					<ChipCard
						key={chip.id}
						name={chip.name}
						onSelect={() => onChipSelect({ id: chip.id, name: chip.name })}
					/>
				))}
			</div>
		</div>
	);
};

export default ChipList;
