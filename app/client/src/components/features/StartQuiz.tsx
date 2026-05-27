import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000/api";


const StartQuiz = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleStart = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`${API}/quiz/start`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					guessId: selectedGuess.id,
					byId: selectedBy.id,
					filterIds: selectedFilters.map((f) => f.id),
					options: gameOptions,
				}),
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to start quiz session");
			}
			const data = await response.json();
			navigate(`/quiz/${data.sessionId}`);
		} catch (err) {
			setError(
				"Something went wrong while creating the quiz session. Please try again. " +
					(err instanceof Error ? err.message : ""),
			);
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-end mt-auto gap-2">
			{error && (
				<p className="text-(--negative) text-xs text-right max-w-64">{error}</p>
			)}
			<button
				onClick={handleStart}
				disabled={!canStart}
				className="p-4 bg-(--accent) text-(--text) uppercase text-xl rounded-lg hover:bg-(--accent-light) disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-(--accent) transition-opacity"
			>
				{loading ? "Tworzenie sesji..." : "Rozpocznij QUIZ"}
			</button>
		</div>
	);
};

export default StartQuiz;
