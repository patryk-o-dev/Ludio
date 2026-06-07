import type { SessionData } from "../../types";
import AnswerPanel from "../features/AnswerPanel";
import MediaDisplay from "../features/MediaDisplay";

interface QuizStageProps {
	session: SessionData;
	currentUserId: string | null;
	summaryWasCorrect: boolean | null;
	summaryPoints: number | null;
	hasAnsweredCurrentQuestion: boolean;
	onSelectAnswer: (
		answerId: string,
		answerValue: string,
		timeMs: number,
	) => void;
}

const QuizStage = ({
	session,
	currentUserId,
	summaryWasCorrect,
	summaryPoints,
	hasAnsweredCurrentQuestion,
	onSelectAnswer,
}: QuizStageProps) => {
	const API = import.meta.env.VITE_API_URL;
	const currentQuestion = session.live.question;
	const currentPlayer = session.players.find(
		(player) => player.userId === currentUserId,
	);
	const canAcceptInvitation = currentPlayer?.status === "Invited";

	const acceptInvitation = () => {
		if (!currentUserId) {
			return;
		}

		fetch(`${API}/game-session/${session.id}/respond`, {
			method: "PATCH",
			body: JSON.stringify({ userId: currentUserId, accept: true }),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	return (
		<div className="flex flex-col flex-1 gap-4 min-h-0">
			{canAcceptInvitation && (
				<div className="flex items-center gap-6 px-4 py-2 bg-(--bgc-secondary) rounded-lg border border-(--bgc-tertiary) text-sm">
					<button
						onClick={acceptInvitation}
						className="ml-4 px-2 py-1 bg-(--accent) text-(--text) text-xs rounded hover:bg-(--accent-light) transition-colors"
					>
						Dołącz jako gracz
					</button>
				</div>
			)}

			{/* Main stage */}
			<div className="flex flex-1 gap-8 min-h-0">
				<MediaDisplay
					mediaUrl={currentQuestion?.url ?? null}
					players={session.players}
					phase={session.live.phase}
					summaryLabel={currentQuestion?.correctAnswer.value ?? null}
					summaryWasCorrect={summaryWasCorrect}
					summaryPoints={summaryPoints}
					showAnswerOverlay={hasAnsweredCurrentQuestion}
				/>
				<AnswerPanel
					key={`${session.live.questionId ?? "none"}:${session.live.phase}`}
					session={session}
					answers={currentQuestion?.answers ?? []}
					phase={session.live.phase}
					expiresAt={session.live.expiresAt}
					timeLimitSeconds={session.live.timeLimitSeconds}
					onSelectAnswer={onSelectAnswer}
				/>
			</div>
		</div>
	);
};

export default QuizStage;
