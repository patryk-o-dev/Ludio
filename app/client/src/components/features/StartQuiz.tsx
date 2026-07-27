import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameConfigStore from "../../store/gameConfigStore";
import ding from "../../assets/sounds/ding.mp3";
import { useTranslation } from "react-i18next";
import { withAuth } from "../utils/api";

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
	const { t } = useTranslation();
	const rules = useGameConfigStore((state) => state.rules);
	const options = useGameConfigStore((state) => state.options);
	const players = useGameConfigStore((state) => state.players);

	const handleStartQuiz = async () => {
		setError(null);
		setLoading(true);

		const audio = new Audio(ding);
		audio.play();
		audio.muted = false;
		localStorage.setItem("audioUnlocked", "true");

		const completeRules = rules.filter(
			(rule) => rule.guessId !== null && rule.byId !== null,
		);

		if (completeRules.length === 0) {
			setError(t("quiz_creator.errors.add_complete_rule"));
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
			playerIds: [...players.map((p) => p.id)],
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
				throw new Error(t("quiz_creator.errors.save_config"));
			}

			const gameConfig =
				(await configResponse.json()) as CreateGameConfigResponse;

			const sessionResponse = await fetch(
				`${API}/game-session`,
				withAuth({
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						gameConfigId: gameConfig.id,
						playerIds: [...players.map((p) => p.id)],
						type: options.isCommunityQuiz ? "COMMUNITY" : "PRIVATE",
					}),
				}),
			);

			if (!sessionResponse.ok) {
				throw new Error(t("quiz_creator.errors.create_session"));
			}

			const session =
				(await sessionResponse.json()) as CreateGameSessionResponse;

			await fetch(
				`${API}/game-session/${session.id}/respond`,
				withAuth({
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ accept: true }),
				}),
			);

			useGameConfigStore.getState().clearPlayers();

			navigate(`/session/${session.id}`);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : t("common.unexpected_error"),
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
				{loading
					? t("quiz_creator.creating_session")
					: t("quiz_creator.start_quiz")}
			</button>
			<p className="text-xs text-(--text-secondary) text-left w-full">
				{t("quiz_creator.invited_players")}:{" "}
				<span className="text-(--info)">
					{players.map((p) => p.displayName).join(", ")}
				</span>
			</p>
		</div>
	);
};

export default StartQuiz;
