import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameConfigStore from "../../store/gameConfigStore";

const API = import.meta.env.VITE_API_URL;

type CreateGameConfigResponse = {
	id: string;
};

type CreateGameSessionResponse = {
	id: string;
};

const StartQuiz = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const rules = useGameConfigStore((state) => state.rules);
	const options = useGameConfigStore((state) => state.options);

	const handleStartQuiz = async () => {
		setError(null);
		setLoading(true);

		const completeRules = rules.filter(
			(rule) => rule.guessId !== null && rule.byId !== null,
		);

		if (completeRules.length === 0) {
			setError("Dodaj przynajmniej jedną kompletną regułę.");
			setLoading(false);
			return;
		}

		const configPayload = {
			rules: completeRules.map((rule) => ({
				chipGuessId: rule.guessId!,
				chipById: rule.byId!,
				chipFilterIds: rule.filterIds,
			})),
			options: {
				difficulty: options.difficulty,
				questionLimit: options.questionsPerRule,
				timeLimitSeconds: options.timeLimitSeconds,
			},
			playerIds: [],
		};

		try {
			const configResponse = await fetch(`${API}/game-config/session`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(configPayload),
			});

			if (!configResponse.ok) {
				throw new Error("Nie udało się zapisać konfiguracji quizu.");
			}

			const gameConfig =
				(await configResponse.json()) as CreateGameConfigResponse;

			const sessionResponse = await fetch(`${API}/game-session`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					gameConfigId: gameConfig.id,
					playerIds: ["1"],
				}),
			});

			if (!sessionResponse.ok) {
				throw new Error("Nie udało się utworzyć sesji quizu.");
			}

			const session =
				(await sessionResponse.json()) as CreateGameSessionResponse;
			navigate(`/session/${session.id}`);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Wystąpił nieoczekiwany błąd.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-end mt-auto gap-2">
			{error && (
				<p className="text-(--negative) text-xs text-right max-w-64">{error}</p>
			)}
			<button
				onClick={handleStartQuiz}
				className="p-4 bg-(--accent) text-(--text) uppercase text-xl rounded-lg hover:bg-(--accent-light) disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-(--accent) transition-opacity"
			>
				{loading ? "Tworzenie sesji..." : "Rozpocznij QUIZ"}
			</button>
		</div>
	);
};

export default StartQuiz;
