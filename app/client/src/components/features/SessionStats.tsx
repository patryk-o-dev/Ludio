import clockIcon from "../../assets/icons/clock.png";
import scoreIcon from "../../assets/icons/score.png";
import type { SessionData } from "../pages/QuizSession";

const SessionStats = ({ session }: { session: SessionData }) => {
	const totalQuestions = session.rulePools.reduce(
		(total, pool) => total + pool.questionCount,
		0,
	);
	const currentPlayer = session.players.find((player) => player.userId === "1");
	const playerScore = currentPlayer?.score ?? 0;
	const timerLabel = session.live.timeLimitSeconds
		? `${session.live.timeLimitSeconds}s`
		: "-";

	return (
		<div className="flex items-center gap-12">
			<div className="flex flex-1 flex-col items-center">
				<p className="text-sm uppercase text-(--text-secondary) leading-tight">
					Pytanie
				</p>
				<p className="text-lg font-semibold leading-tight">
					{session.live.qIndex} /{" "}
					<span className="text-(--accent)">{totalQuestions}</span>
				</p>
			</div>
			<span className="w-px h-8 bg-(--text-secondary)/70" />
			<div className="flex flex-1 items-center gap-3">
				<img className="w-6 h-6" src={clockIcon} alt="clock icon" />
				<p className="text-lg font-semibold">{timerLabel}</p>
			</div>
			<span className="w-px h-8 bg-(--text-secondary)/70" />
			<div className="flex flex-1 items-center gap-3">
				<img className="w-6 h-6" src={scoreIcon} alt="score icon" />
				<div className="flex flex-col">
					<p className="text-lg font-semibold leading-tight">
						{playerScore} /{" "}
						<span className="text-(--accent)">{totalQuestions}</span>
					</p>
					<p className="uppercase text-(--accent) leading-tight">punkty</p>
				</div>
			</div>
		</div>
	);
};

export default SessionStats;
