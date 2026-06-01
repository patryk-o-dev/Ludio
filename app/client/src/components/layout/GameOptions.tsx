import type { GameOptionsState } from "../../types";

const difficulty = [1] as const;
const questionsPerRule = [3, 5] as const;
const timeLimitSeconds = [null, 10, 20, 30, 50] as const;

const btnBase =
	"px-3 py-1.5 rounded text-sm font-semibold transition-colors cursor-pointer";
const btnSelected = "bg-(--accent) text-white";
const btnIdle = "bg-(--bgc-quaternary) text-(--text) hover:bg-(--bgc-tertiary)";

interface GameOptionsProps {
	options: GameOptionsState;
	onChange: (options: GameOptionsState) => void;
}

const GameOptions = ({ options, onChange }: GameOptionsProps) => {
	return (
		<div className="flex flex-col p-4 gap-6">
			<p className="text-(--text) font-bold text-md uppercase">Opcje Gry</p>

			<div className="flex flex-col gap-2">
				<p className="text-(--accent) text-sm font-semibold">
					Poziom trudności:
				</p>
				<div className="flex gap-2 flex-wrap">
					{difficulty.map((d) => (
						<button
							key={d}
							onClick={() => onChange({ ...options, difficulty: d })}
							className={`${btnBase} ${options.difficulty === d ? btnSelected : btnIdle}`}
						>
							{d}
						</button>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<p className="text-(--accent) text-sm font-semibold">
					Ilość pytań per reguła:
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
					Czas na odpowiedź:
				</p>
				<div className="flex gap-2 flex-wrap">
					{timeLimitSeconds.map((t) => (
						<button
							key={t ?? "inf"}
							onClick={() => onChange({ ...options, timeLimitSeconds: t })}
							className={`${btnBase} ${options.timeLimitSeconds === t ? btnSelected : btnIdle}`}
						>
							{t === null ? "∞" : `${t}s`}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default GameOptions;
