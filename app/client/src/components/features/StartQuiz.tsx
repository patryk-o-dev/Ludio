import { useNavigate } from "react-router-dom";
import type { GameOptionsState, SelectedChip } from "../layout/MainContent";

interface StartQuizProps {
	selectedGuess: SelectedChip | null;
	selectedBy: SelectedChip | null;
	selectedFilters: SelectedChip[];
	gameOptions: GameOptionsState;
}

const StartQuiz = ({
	selectedGuess,
	selectedBy,
	selectedFilters,
	gameOptions,
}: StartQuizProps) => {
	const navigate = useNavigate();
	const canStart = !!selectedGuess && !!selectedBy;

	const handleStart = async () => {
		if (!selectedGuess || !selectedBy) return;

		const rules =
			selectedFilters.length > 0
				? selectedFilters.map((f) => ({
						chipGuessId: selectedGuess.id,
						chipById: selectedBy.id,
						chipFilterId: f.id,
					}))
				: [{ chipGuessId: selectedGuess.id, chipById: selectedBy.id }];

		const res = await fetch("http://localhost:3000/api/game-config/session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				rules,
				options: {
					difficulty: gameOptions.difficulty,
					questionLimit: gameOptions.questionLimit,
					timeLimitSeconds: gameOptions.timeLimitSeconds,
				},
			}),
		});

		const data = await res.json();
		navigate(`/session/${data.gameSession.id}`);
	};

	return (
		<div className="flex flex-col items-end mt-auto">
			<button
				onClick={handleStart}
				disabled={!canStart}
				className="p-4 bg-(--accent) text-(--text) uppercase text-xl rounded-lg hover:bg-(--accent-light) disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-(--accent) transition-opacity"
			>
				Rozpocznij QUIZ
			</button>
			<p className="text-(--text-secondary) text-xs mt-2">
				przeciwnik: <span className="text-(--info)">FriendName</span>
			</p>
		</div>
	);
};

export default StartQuiz;
