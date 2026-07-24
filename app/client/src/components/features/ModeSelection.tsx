import { useTranslation } from "react-i18next";
import useGameConfigStore from "../../store/gameConfigStore";
import type { GameMode } from "../../types";
import { useState } from "react";
import Icons from "../utils/Icons/Icons";

const ModeSelection = () => {
	const { t } = useTranslation();
	const mode = useGameConfigStore((state) => state.mode);
	const updateMode = useGameConfigStore((state) => state.updateMode);
	const [showGames, setShowGames] = useState(false);

	const modeLabels: Partial<Record<GameMode, string>> = {
		leagueOfLegends: "League Of Legends",
		DeadByDaylight: "Dead By Daylight",
	};

	const handleModeSelect = (mode: GameMode) => {
		updateMode(mode);
		setShowGames(false);
	};

	return (
		<div className="border-l border-(--text-secondary) pl-12 h-12 flex items-center">
			<ul className="flex flex-row gap-6 text-lg font-bold">
				<li
					className={`transition-all duration-200 hover:text-(--accent) ${
						mode === "classic" ? "text-(--accent)" : "text-(--text)"
					}`}
				>
					<button
						className={`w-full h-full ${
							mode === "classic" && "underline underline-offset-6 decoration-2"
						}`}
						onClick={() => handleModeSelect("classic")}
					>
						{t("modes.classic")}
					</button>
				</li>

				<li
					className={`transition-all duration-200 hover:text-(--accent) ${
						mode === "solo" ? "text-(--accent)" : "text-(--text)"
					}`}
				>
					<button
						className={`w-full h-full ${
							mode === "solo" && "underline underline-offset-6 decoration-2"
						}`}
						onClick={() => handleModeSelect("solo")}
					>
						{t("modes.solo")}
					</button>
				</li>

				<li className="relative">
					<button
						className={`${modeLabels[mode] ? "text-(--accent) underline underline-offset-6 decoration-2" : "text-(--text)"} transition-all duration-200 hover:text-(--accent)`}
						onClick={() => setShowGames((prev) => !prev)}
					>
						{modeLabels[mode] ?? t("modes.games")}
					</button>

					{showGames && (
						<ul className="flex flex-col gap-2 absolute top-0 left-full translate-x-6 border border-(--accent) px-2 py-1 z-2 bg-(--bgc-secondary) rounded-xl drop-shadow-[0_0_8px] drop-shadow-rose-900/50 whitespace-nowrap">
							<li>
								<button
									className="flex gap-2 items-center rounded-lg px-2 py-1 transition-all duration-200 hover:text-(--accent) hover:bg-(--accent)/10 hover:translate-x-1"
									onClick={() => handleModeSelect("leagueOfLegends")}
								>
									<Icons
										name="leagueoflegends"
										color="league"
										isAddon={false}
										size={24}
									/>
									<span>League Of Legends</span>
								</button>
							</li>

							<li>
								<button
									className="flex gap-2 items-center rounded-lg px-2 py-1 transition-all duration-200 hover:text-(--accent) hover:bg-(--accent)/10 hover:translate-x-1"
									onClick={() => handleModeSelect("DeadByDaylight")}
								>
									<Icons
										name="dbd"
										color="deadbydaylight"
										isAddon={false}
										size={24}
									/>

									<span>Dead By Daylight</span>
								</button>
							</li>
						</ul>
					)}
				</li>
			</ul>
		</div>
	);
};

export default ModeSelection;
