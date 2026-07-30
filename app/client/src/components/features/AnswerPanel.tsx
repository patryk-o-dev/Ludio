import { useCallback, useEffect, useRef, useState } from "react";
import searchIcon from "../../assets/icons/magnifying-glass.png";
import Ranking from "./Ranking";
import type { SessionData } from "../../types";
import { useTranslation } from "react-i18next";

interface AnswerOption {
	id: string;
	value: string;
}

interface AnswerPanelProps {
	answers: AnswerOption[];
	phase: "waiting" | "question" | "summary" | "completed";
	expiresAt: number | null;
	timeLimitSeconds: number | null;
	session: SessionData;
	onSelectAnswer: (answerId: string, answerValue: string) => void;
	hasAnsweredCurrentQuestion: boolean;
}

const AnswerPanel = ({
	answers,
	phase,
	expiresAt,
	timeLimitSeconds,
	session,
	onSelectAnswer,
	hasAnsweredCurrentQuestion,
}: AnswerPanelProps) => {
	const { t } = useTranslation();
	const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState("");
	const [remainingMs, setRemainingMs] = useState<number | null>(null);
	useEffect(() => {
		if (expiresAt === null) {
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

	const timerLabel =
		timeLimitSeconds === null
			? t("quiz_session.status.no_time_limit")
			: remainingMs === null
				? `${timeLimitSeconds}s`
				: `${Math.ceil(remainingMs / 1000)}s`;

	const itemRefs = useRef<HTMLButtonElement[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	const filteredAnswers = answers
		.filter((answer) =>
			answer.value.toLowerCase().includes(inputValue.toLowerCase()),
		)
		.sort((a, b) => a.value.localeCompare(b.value));

	const handleSelectAnswer = useCallback(
		(answerId: string, answerValue: string) => {
			if (phase !== "question") return;

			const index = filteredAnswers.findIndex((a) => a.id === answerId);
			if (index !== -1) setActiveIndex(index);

			setSelectedAnswerId(answerId);
			onSelectAnswer(answerId, answerValue);
		},
		[phase, filteredAnswers, onSelectAnswer],
	);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (phase !== "question") return;

			if (e.key === "ArrowDown") {
				e.preventDefault();
				setActiveIndex((i) => Math.min(i + 1, filteredAnswers.length - 1));
			}

			if (e.key === "ArrowUp") {
				e.preventDefault();
				setActiveIndex((i) => Math.max(i - 1, 0));
			}

			if (e.key === "Enter") {
				e.preventDefault();
				const item = filteredAnswers[activeIndex];
				if (item) handleSelectAnswer(item.id, item.value);
			}
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [filteredAnswers, activeIndex, phase, handleSelectAnswer]);

	useEffect(() => {
		const el = itemRefs.current[activeIndex];
		el?.scrollIntoView({ block: "nearest" });
	}, [activeIndex]);

	// Input auto-focus
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (phase === "question") {
			inputRef.current?.focus();
		}
	}, [phase]);

	return (
		<div className="flex flex-3 lg:flex-1 flex-col gap-4 min-h-0">
			{phase === "question" && (
				<>
					<div className="flex items-center justify-between text-sm uppercase tracking-wide text-(--text-secondary)">
						<span>{t("quiz_session.status.question")}</span>
						<span>{timerLabel}</span>
					</div>
					<div className="flex items-center gap-2 border border-(--accent)/40 rounded px-4 py-2 bg-(--bgc-basic) transition-shadow duration-300 focus-within:border-(--accent)/80 focus-within:shadow-[0_0_20px_2px_color-mix(in_srgb,var(--accent)_22%,transparent)]">
						<img className="w-6 h-6" src={searchIcon} alt="question icon" />
						<input
							type="text"
							placeholder={t("quiz_session.labels.search_answer_placeholder")}
							value={inputValue}
							ref={inputRef}
							onChange={(event) => setInputValue(event.target.value)}
							disabled={phase !== "question"}
							className="flex-1 bg-transparent outline-none text-(--text) caret-(--accent)"
						/>
					</div>
					<div
						className={`flex-1 min-h-0 relative ${hasAnsweredCurrentQuestion && `hidden`}`}
					>
						<ul className="absolute inset-0 flex flex-col gap-2 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-(--accent)/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-(--accent)/70">
							{filteredAnswers.map((answer, index) => {
								const isActive = index === activeIndex;
								const isSelected = selectedAnswerId === answer.id;

								return (
									<li key={answer.id}>
										<button
											ref={(el) => {
												if (el) itemRefs.current[index] = el;
											}}
											onClick={() =>
												handleSelectAnswer(answer.id, answer.value)
											}
											aria-selected={isSelected}
											className={`w-full text-left px-4 py-2 rounded border transition-all duration-200 ${isActive ? "bg-(--accent)/22 border-(--accent)" : "border-(--accent)/50"} ${isSelected ? "bg-(--accent) border-(--accent)" : ""} hover:bg-(--accent)/15`}
										>
											{answer.value}
										</button>
									</li>
								);
							})}
							{filteredAnswers.length === 0 && (
								<li className="text-(--text-secondary) text-sm px-2 py-4">
									{phase === "question"
										? t("quiz_session.status.no_matching_answers")
										: t("quiz_session.status.waiting_for_answers")}
								</li>
							)}
						</ul>
					</div>
				</>
			)}
			{(phase === "summary" || phase === "completed") && (
				<Ranking
					players={session.players}
					totalQuestions={session.live.qIndex}
					timeLimitSeconds={session.live.timeLimitSeconds}
				/>
			)}
		</div>
	);
};

export default AnswerPanel;
