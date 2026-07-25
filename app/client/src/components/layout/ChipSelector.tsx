import { useEffect, useState } from "react";
import ChipList from "./ChipList";
import GameOptions from "./GameOptions";
import useGameConfigStore from "../../store/gameConfigStore";
import useChipsStore from "../../store/chipsStore";
import { useTranslation } from "react-i18next";
import type { GameMode } from "../../types";
type Tab = "chips" | "options";

const tabBase =
	"flex-1 py-1.5 text-sm font-semibold transition-colors cursor-pointer rounded";
const tabActive = "bg-(--accent) text-white";
const tabIdle =
	"bg-(--bgc-quaternary) text-(--text-secondary) hover:text-(--text)";

const ChipSelector = () => {
	const [activeTab, setActiveTab] = useState<Tab>("chips");
	const { t } = useTranslation();
	const options = useGameConfigStore((state) => state.options);
	const players = useGameConfigStore((state) => state.players);
	const updateOption = useGameConfigStore((state) => state.updateOption);
	const setAllChips = useChipsStore((state) => state.setAllChips);

	useEffect(() => {
		fetch("http://localhost:3000/api/chips")
			.then((res) => res.json())
			.then((data) => {
				setAllChips({
					chipsGuess: data.guess.map(
						(c: {
							id: string;
							name: string;
							mode: GameMode;
							compatibleChipBy: { id: string }[];
						}) => ({
							id: c.id,
							name: c.name,
							mode: c.mode,
							compatibleByIds: c.compatibleChipBy.map((b) => b.id),
						}),
					),
					chipsBy: data.by.map(
						(c: {
							id: string;
							name: string;
							compatibleChipFilter: { id: string }[];
						}) => ({
							id: c.id,
							name: c.name,
							compatibleFilterIds: c.compatibleChipFilter.map((f) => f.id),
						}),
					),
					chipsFilter: data.filter,
				});
			});
	}, []);

	return (
		<aside className="flex-1 flex flex-col bg-(--bgc-secondary) p-4 rounded-lg gap-3 min-w-70">
			<div className="flex gap-1 p-1 bg-(--bgc-primary) rounded-lg">
				<button
					className={`${tabBase} ${activeTab === "chips" ? tabActive : tabIdle}`}
					onClick={() => setActiveTab("chips")}
				>
					{t("chip_selector.chips")}
				</button>
				<button
					className={`${tabBase} ${activeTab === "options" ? tabActive : tabIdle}`}
					onClick={() => setActiveTab("options")}
				>
					{t("chip_selector.options")}
				</button>
			</div>

			{activeTab === "chips" ? (
				<ChipList />
			) : (
				<GameOptions
					options={options}
					onChange={updateOption}
					hasPlayers={players.length > 0}
				/>
			)}
		</aside>
	);
};

export default ChipSelector;
