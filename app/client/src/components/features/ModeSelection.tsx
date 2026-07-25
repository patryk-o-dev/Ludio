import { useTranslation } from "react-i18next";
import type { GameMode } from "../../types";
import { useState } from "react";
import Icons from "../utils/Icons/Icons";
import useChipsStore from "../../store/chipsStore";

const ModeSelection = () => {
	const { t } = useTranslation();
	const mode = useChipsStore((state) => state.mode);
	const updateMode = useChipsStore((state) => state.updateMode);
	const [showGames, setShowGames] = useState(false);

	const modeLabels: Partial<Record<GameMode, string>> = {
		LEAGUE_OF_LEGENDS: "League Of Legends",
		DEAD_BY_DAYLIGHT: "Dead By Daylight",
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
						mode === "CLASSIC" ? "text-(--accent)" : "text-(--text)"
					}`}
				>
					<button
						className={`w-full h-full ${
							mode === "CLASSIC" && "underline underline-offset-6 decoration-2"
						}`}
						onClick={() => handleModeSelect("CLASSIC")}
					>
						{t("modes.classic")}
					</button>
				</li>

				<li
					className={`transition-all duration-200 hover:text-(--accent) ${
						mode === "SOLO" ? "text-(--accent)" : "text-(--text)"
					}`}
				>
					<button
						className={`w-full h-full ${
							mode === "SOLO" && "underline underline-offset-6 decoration-2"
						}`}
						onClick={() => handleModeSelect("SOLO")}
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
									onClick={() => handleModeSelect("LEAGUE_OF_LEGENDS")}
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
									onClick={() => handleModeSelect("DEAD_BY_DAYLIGHT")}
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
