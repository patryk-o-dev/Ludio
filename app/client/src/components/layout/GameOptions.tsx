import type { GameOptionsState } from "../../types";
import { useTranslation } from "react-i18next";
import Icons from "../utils/Icons/Icons";

const questionsPerRule = [3, 5, 7, 10] as const;
const timeLimitSeconds = [null, 10, 20, 30, 50] as const;

const btnBase =
	"px-3 py-1.5 rounded text-sm font-semibold transition-colors cursor-pointer";
const btnSelected = "bg-(--accent) text-white";
const btnIdle = "bg-(--bgc-quaternary) text-(--text) hover:bg-(--bgc-tertiary)";

type GameOptionsProps = {
	options: GameOptionsState;
	onChange: (options: GameOptionsState) => void;
	hasPlayers: boolean;
};

const GameOptions = ({ options, onChange, hasPlayers }: GameOptionsProps) => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col p-4 gap-6 overflow-auto custom-scrollbar">
			<p className="text-(--text) font-bold text-md uppercase">
				{t("game_options.title")}
			</p>

			<div className="flex flex-col gap-2">
				<p className="text-(--accent) text-sm font-semibold">
					{t("game_options.questions_per_rule")}:
				</p>
				<div className="flex gap-2 flex-wrap">
					{questionsPerRule.map((q) => (
						<button
							key={q}
							onClick={() => onChange({ ...options, questionsPerRule: q })}
							className={`${btnBase} ${options.questionsPerRule === q ? btnSelected : btnIdle}`}
						>
							{q}
						</button>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<p className="text-(--accent) text-sm font-semibold">
					{t("game_options.time_to_answer")}:
				</p>
				<div className="flex gap-2 flex-wrap">
					{timeLimitSeconds.map((t) => (
						<button
							key={t ?? "inf"}
							disabled={options.isCommunityQuiz && t === null}
							onClick={() => onChange({ ...options, timeLimitSeconds: t })}
							className={`${btnBase} ${
								options.timeLimitSeconds === t ? btnSelected : btnIdle
							} ${
								options.isCommunityQuiz && t === null
									? "opacity-50 cursor-not-allowed"
									: ""
							}`}
						>
							{t === null ? (
								<Icons name="noLimit" size={20} color="text" isAddon={false} />
							) : (
								`${t}s`
							)}
						</button>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex gap-2">
					<Icons name="twitch" size={18} color="twitch" isAddon={false} />
					<div className="flex flex-row gap-2">
						<p className="text-(--accent) text-sm font-semibold">
							{t("game_options.community_quiz")}:
						</p>
						{hasPlayers && options.isCommunityQuiz && (
							<p className="text-(--negative) font-light text-xs">
								{t("game_options.community_friends_err")}
							</p>
						)}
					</div>
				</div>

				<div className="flex flex-row">
					<label className="inline-flex cursor-pointer relative">
						<input
							type="checkbox"
							checked={options.isCommunityQuiz}
							onChange={(e) => {
								const isCommunityQuiz = e.target.checked;

								onChange({
									...options,
									isCommunityQuiz,
									timeLimitSeconds:
										isCommunityQuiz && options.timeLimitSeconds === null
											? 10
											: options.timeLimitSeconds,
								});
							}}
							disabled={hasPlayers}
							className="sr-only peer"
							value=""
						/>
						<div
							className={`group peer bg-(--bgc-quaternary) rounded-full duration-300 w-12 h-5 ring-2 ring-(--text) after:duration-300 after:bg-(--text) peer-checked:after:bg-(--accent) peer-checked:ring-(--accent) after:rounded-full after:absolute after:h-3 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95 ${hasPlayers ? "opacity-50 cursor-not-allowed" : ""}`}
						></div>
					</label>
				</div>
			</div>
		</div>
	);
};

export default GameOptions;
