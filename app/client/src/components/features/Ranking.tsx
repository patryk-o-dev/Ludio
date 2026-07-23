import { useMemo } from "react";
import type { SessionPlayer } from "../../types";
import { useTranslation } from "react-i18next";

const Ranking = ({
	players,
	totalQuestions,
	timeLimitSeconds,
}: {
	players: SessionPlayer[];
	totalQuestions: number;
	timeLimitSeconds: number | null;
}) => {
	const { t } = useTranslation();

	const averagePerQuestion = useMemo(() => {
		if (!players.length || totalQuestions === 0) return 0;

		const totalTime = players.reduce(
			(sum, player) => sum + (player.timeMs ?? 0),
			0,
		);

		return totalTime / players.length / totalQuestions;
	}, [players, totalQuestions]);

	const sortedPlayers = useMemo(() => {
		return [...players].sort((a, b) => {
			if (b.score === a.score) {
				return a.timeMs - b.timeMs;
			}
			return b.score - a.score;
		});
	}, [players]);

	const formattedAverageTime = Math.round(averagePerQuestion);
	const showTimeDifference = players.length > 1 && timeLimitSeconds !== null;

	return (
		<div className="flex flex-col gap-2 w-full">
			{showTimeDifference && (
				<div className="text-sm text-(--text-secondary) px-2 pb-1 w-full text-right">
					{t("quiz_session.labels.average_time")}: {formattedAverageTime} ms
				</div>
			)}
			{sortedPlayers.map((player, index) => {
				const playerAveragePerQuestion =
					totalQuestions > 0 ? (player.timeMs ?? 0) / totalQuestions : 0;

				const difference = Math.round(
					playerAveragePerQuestion - averagePerQuestion,
				);

				return (
					<div
						key={player.userId}
						className="flex items-center justify-between w-full rounded-lg border border-(--accent-darker) bg-(--bgc-quaternary) px-4 py-3 shadow-sm"
					>
						<div className="flex items-center gap-3 min-w-0">
							<p className="w-6 text-(--text) font-medium">{index + 1}.</p>

							<p className="truncate font-medium text-(--text)">
								{player.user.displayName}
							</p>
						</div>

						<div className="flex items-center gap-4 shrink-0">
							<p className="text-(--text) font-semibold whitespace-nowrap">
								{player.score} {t("quiz_session.labels.points_short")}
							</p>

							{showTimeDifference && (
								<span
									className={`px-2 py-1 text-xs rounded-full bg-(--bgc-secondary) border border-(--accent-dark) whitespace-nowrap ${
										difference > 0
											? "text-(--negative)"
											: difference < 0
												? "text-(--positive)"
												: "text-(--text-secondary)"
									}`}
								>
									{difference > 0 ? "+" : ""}
									{difference} ms
								</span>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Ranking;
