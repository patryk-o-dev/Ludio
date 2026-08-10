import type { SessionData } from "../../types";
import AnswerPanel from "../features/AnswerPanel";
import MediaDisplay from "../features/MediaDisplay";
import { useTranslation } from "react-i18next";
import { withAuth } from "../utils/api";

interface QuizStageProps {
	session: SessionData;
	currentUserId: string | null;
	summaryPoints: number | null;
	hasAnsweredCurrentQuestion: boolean;
	correctAnswerValue: string;
	onSelectAnswer: (answerId: string, answerValue: string) => void;
}

const QuizStage = ({
	session,
	currentUserId,
	summaryPoints,
	hasAnsweredCurrentQuestion,
	correctAnswerValue,
	onSelectAnswer,
}: QuizStageProps) => {
	const { t } = useTranslation();
	const API = import.meta.env.VITE_API_URL;
	const currentQuestion = session.live.question;
	const currentPlayer = session.players.find(
		(player) => player.userId === currentUserId,
	);
	const canAcceptInvitation = currentPlayer?.status === "Invited";


	const acceptInvitation = () => {
		fetch(
			`${API}/game-session/${session.id}/respond`,
			withAuth({
				method: "PATCH",
				body: JSON.stringify({ accept: true }),
				headers: {
					"Content-Type": "application/json",
				},
			}),
		);
	};

	return (
		<div className="flex flex-col flex-1 gap-4 min-h-0">
			{canAcceptInvitation && (
				<div className="flex items-center gap-6 px-4 py-2 bg-(--bgc-secondary) rounded-lg border border-(--bgc-tertiary) text-sm">
					<button
						onClick={acceptInvitation}
						className="ml-4 px-2 py-1 bg-(--accent) text-(--text) text-xs rounded hover:bg-(--accent-light) transition-colors"
					>
						{t("quiz_session.actions.join_as_player")}
					</button>
				</div>
			)}

			{/* Main stage */}
			<div className="flex flex-1 flex-col lg:flex-row gap-2 lg:gap-8 min-h-0">
				<MediaDisplay
					sessionId={session.id}
					hostId={session.hostId}
					currentUserId={currentUserId}
					mediaUrl={currentQuestion?.url ?? null}
					credits={currentQuestion?.credits ?? null}
					achievement={currentQuestion?.achievement ?? undefined}
					emoji={currentQuestion?.emoji ?? undefined}
					players={session.players}
					phase={session.live.phase}
					summaryPoints={summaryPoints}
					showAnswerOverlay={hasAnsweredCurrentQuestion}
					summaryLabel={correctAnswerValue}
				/>
				<AnswerPanel
					key={`${session.live.questionId ?? "none"}:${session.live.phase}`}
					session={session}
					answers={currentQuestion?.answers ?? []}
					phase={session.live.phase}
					expiresAt={session.live.expiresAt}
					timeLimitSeconds={session.live.timeLimitSeconds}
					onSelectAnswer={onSelectAnswer}
					hasAnsweredCurrentQuestion={hasAnsweredCurrentQuestion}
				/>
			</div>
		</div>
	);
};

export default QuizStage;
