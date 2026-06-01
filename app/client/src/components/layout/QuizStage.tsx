import type { SessionData } from "../pages/QuizSession";
import AnswerPanel from "../features/AnswerPanel";
import MediaDisplay from "../features/MediaDisplay";

const STATUS_LABEL: Record<SessionData["status"], string> = {
	WAITING: "Oczekiwanie",
	ACTIVE: "W toku",
	FINISHED: "Zakończono",
};

const STATUS_COLOR: Record<SessionData["status"], string> = {
	WAITING: "text-(--info)",
	ACTIVE: "text-(--positive)",
	FINISHED: "text-(--text-secondary)",
};

interface QuizStageProps {
	session: SessionData;
}

const QuizStage = ({ session }: QuizStageProps) => {
	const API = "http://localhost:3000/api";
	const currentPool = session.rulePools[session.currentRuleIndex];
	const currentQuestion = session.live.question;
	const acceptInvitation = () => {
		fetch(`${API}/game-session/${session.id}/accept`, {
			method: "PATCH",
			body: JSON.stringify({ userId: "1" }), // Temporary hardcoded user ID
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	return (
		<div className="flex flex-col flex-1 gap-4 min-h-0">
			{/* Session info bar */}
			<div className="flex items-center gap-6 px-4 py-2 bg-(--bgc-secondary) rounded-lg border border-(--bgc-tertiary) text-sm">
				<span className="text-(--text-secondary)">
					Sesja:{" "}
					<span className="text-(--text) font-mono text-xs">{session.id}</span>
				</span>
				<span className="text-(--text-secondary)">
					Status:{" "}
					<span className={`font-semibold ${STATUS_COLOR[session.status]}`}>
						{STATUS_LABEL[session.status]}
					</span>
				</span>
				{currentPool && (
					<span className="text-(--text-secondary)">
						Runda {session.currentRuleIndex + 1}/{session.rulePools.length}:{" "}
						<span className="text-(--text)">
							{currentPool.drawnCount}/{currentPool.questionCount} pytań
						</span>{" "}
						<span className="text-(--text-secondary)">
							({currentPool._count.candidates} kandydatów)
						</span>
						<button
							onClick={acceptInvitation}
							className="ml-4 px-2 py-1 bg-(--accent) text-(--text) text-xs rounded hover:bg-(--accent-light) transition-colors"
						>
							Dołącz jako gracz
						</button>
					</span>
				)}
				<div className="ml-auto flex gap-2">
					{session.rulePools.map((pool) => (
						<span
							key={pool.id}
							className={`px-2 py-0.5 rounded text-xs font-medium ${
								pool.ruleIndex === session.currentRuleIndex
									? "bg-(--accent) text-(--text)"
									: "bg-(--bgc-tertiary) text-(--text-secondary)"
							}`}
						>
							Rule {pool.ruleIndex + 1} — {pool._count.candidates} q
						</span>
					))}
				</div>
			</div>

			{/* Main stage */}
			<div className="flex flex-1 gap-8 min-h-0">
				<MediaDisplay
					imageUrl={currentQuestion?.url ?? null}
					phase={session.live.phase}
				/>
				<AnswerPanel
					answers={currentQuestion?.answers ?? []}
					phase={session.live.phase}
					expiresAt={session.live.expiresAt}
					timeLimitSeconds={session.live.timeLimitSeconds}
				/>
			</div>
		</div>
	);
};

export default QuizStage;
