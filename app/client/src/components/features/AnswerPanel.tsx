import { useEffect, useState } from "react";
import searchIcon from "../../assets/icons/magnifying-glass.png";

interface AnswerOption {
	id: string;
	value: string;
}

interface AnswerPanelProps {
	answers: AnswerOption[];
	phase: "waiting" | "question" | "summary" | "completed";
	expiresAt: number | null;
	timeLimitSeconds: number | null;
}

const AnswerPanel = ({
	answers,
	phase,
	expiresAt,
	timeLimitSeconds,
}: AnswerPanelProps) => {
	const [selected, setSelected] = useState<number | null>(null);
	const [inputValue, setInputValue] = useState("");
	const [remainingMs, setRemainingMs] = useState<number | null>(null);

	useEffect(() => {
		if (expiresAt === null) {
			setRemainingMs(null);
			return;
		}

		const updateRemaining = () => {
			setRemainingMs(Math.max(0, expiresAt - Date.now()));
		};

		updateRemaining();
		const intervalId = window.setInterval(updateRemaining, 200);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [expiresAt]);

	useEffect(() => {
		setSelected(null);
		setInputValue("");
	}, [answers, phase]);

	const filteredAnswers = answers.filter((answer) =>
		answer.value.toLowerCase().includes(inputValue.toLowerCase()),
	);

	const timerLabel =
		timeLimitSeconds === null
			? "Bez limitu czasu"
			: remainingMs === null
				? `${timeLimitSeconds}s`
				: `${Math.ceil(remainingMs / 1000)}s`;

	return (
		<div className="flex flex-1 flex-col gap-4 min-h-0">
			<div className="flex items-center justify-between text-sm uppercase tracking-wide text-(--text-secondary)">
				<span>
					{phase === "question"
						? "Wybierz odpowiedź"
						: phase === "summary"
							? "Podsumowanie pytania"
							: phase === "completed"
								? "Sesja zakończona"
								: "Oczekiwanie na start"}
				</span>
				<span>{timerLabel}</span>
			</div>
			<div className="flex items-center gap-2 border border-(--accent)/40 rounded px-4 py-2 bg-(--bgc-basic) transition-shadow duration-300 focus-within:border-(--accent)/80 focus-within:shadow-[0_0_20px_2px_color-mix(in_srgb,var(--accent)_22%,transparent)]">
				<img className="w-6 h-6" src={searchIcon} alt="question icon" />
				<input
					type="text"
					placeholder="Wyszukaj odpowiedź..."
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)}
					disabled={phase !== "question"}
					className="flex-1 bg-transparent outline-none text-(--text) caret-(--accent)"
				/>
			</div>
			<div className="flex-1 min-h-0 relative">
				<ul className="absolute inset-0 flex flex-col gap-2 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-(--accent)/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-(--accent)/70">
					{filteredAnswers.map((answer, i) => (
						<li key={i}>
							<button
								onClick={() => setSelected(i)}
								disabled={phase !== "question"}
								aria-selected={selected === i}
								className="w-full text-left px-4 py-2 rounded border border-(--accent)/50 bg-(--bgc-secondary) text-(--text) cursor-pointer transition-colors duration-200 hover:bg-(--accent)/15 aria-selected:bg-(--accent) aria-selected:border-(--accent)"
							>
								{answer.value}
							</button>
						</li>
					))}
					{filteredAnswers.length === 0 && (
						<li className="text-(--text-secondary) text-sm px-2 py-4">
							{phase === "question"
								? "Brak dopasowanych odpowiedzi"
								: "Oczekiwanie na listę odpowiedzi"}
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default AnswerPanel;
