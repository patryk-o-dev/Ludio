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
	const canStart = !!selectedGuess && !!selectedBy;

	const handleStart = () => {
		if (!selectedGuess || !selectedBy) return;

		const rules =
			selectedFilters.length > 0
				? selectedFilters.map((f) => ({
						chipGuessId: selectedGuess.id,
						chipById: selectedBy.id,
						chipFilterId: f.id,
					}))
				: [{ chipGuessId: selectedGuess.id, chipById: selectedBy.id }];

		const gameConfig = {
			rules,
			options: {
				difficulty: gameOptions.difficulty,
				questionLimit: gameOptions.questionLimit,
				timeLimitSeconds: gameOptions.timeLimitSeconds,
			},
		};

		console.log("GameConfig:", gameConfig);
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
