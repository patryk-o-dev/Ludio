import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Socket } from "socket.io-client";
import type {
	LiveSessionState,
	SessionData,
	SessionCompletedPayload,
} from "../../types";
import Controls from "../layout/Controls";
import QuizStage from "../layout/QuizStage";
import TopBar from "../layout/TopBar";
import { getStoredAuthUser } from "../utils/authStorage";
import useQuizSessionStore from "../../store/quizSessionStore";
import { useTranslation } from "react-i18next";
import {
	acquireSharedSocket,
	releaseSharedSocket,
} from "../utils/socketClient";
import { API_URL } from "../utils/api";
import chooseAnswerSound from "../../assets/sounds/choose_answer.mp3";
import correctAnswerSound from "../../assets/sounds/correct_answer.mp3";
import { playUiSound } from "../utils/audio";

const API = API_URL;

const QuizSession = () => {
	const { id } = useParams<{ id: string }>();
	const currentUserId = getStoredAuthUser()?.id ?? null;
	const [session, setSession] = useState<SessionData | null>(null);
	const [summaryPoints, setSummaryPoints] = useState<number | null>(null);
	const [hasAnsweredCurrentQuestion, setHasAnsweredCurrentQuestion] =
		useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const socketRef = useRef<Socket | null>(null);
	const [correctAnswer, setCorrectAnswer] = useState("");
	const lastCorrectSoundQuestionIdRef = useRef<string | null>(null);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const setQuizSessionData = useQuizSessionStore(
		(state) => state.setQuizSessionData,
	);

	useEffect(() => {
		if (!id) return;
		fetch(`${API}/game-session/${id}/state`)
			.then((res) => {
				if (!res.ok) throw new Error(`${res.status}`);
				return res.json();
			})
			.then((data: SessionData) => setSession(data))
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	}, [id]);

	useEffect(() => {
		if (!id || !currentUserId) return;

		const newSocket: Socket = acquireSharedSocket({ userId: currentUserId });
		socketRef.current = newSocket;

		const joinSession = () => {
			newSocket.emit("join", { sessionId: id });
		};

		newSocket.on("connect", joinSession);

		if (newSocket.connected) {
			joinSession();
		}

		newSocket.on("session:state", (data: SessionData) => {
			setSession(data);
		});

		newSocket.on("session:question", (live: LiveSessionState) => {
			setSummaryPoints(null);
			setHasAnsweredCurrentQuestion(false);
			setQuizSessionData({ answerValue: "" });
			lastCorrectSoundQuestionIdRef.current = null;
			setSession((current) =>
				current
					? {
							...current,
							status: "ACTIVE",
							currentRuleIndex: live.currentRuleIndex,
							live,
						}
					: current,
			);
		});

		newSocket.on("session:summary", (data) => {
			setCorrectAnswer(data.question.correctAnswer.value);

			const selectedAnswerValue =
				useQuizSessionStore.getState().quizSessionData.answerValue;
			if (
				selectedAnswerValue &&
				selectedAnswerValue === data.question.correctAnswer.value &&
				lastCorrectSoundQuestionIdRef.current !== data.questionId
			) {
				playUiSound(correctAnswerSound);
				lastCorrectSoundQuestionIdRef.current = data.questionId;
			}

			setSession((current) =>
				current
					? {
							...current,
							players: data.players,
							currentRuleIndex: data.currentRuleIndex,
							live: data,
						}
					: current,
			);
		});

		newSocket.on(
			"session:player-answered",
			(data: { userId: string; points: number }) => {
				if (data.userId === currentUserId) {
					setSummaryPoints(data.points);
					setHasAnsweredCurrentQuestion(true);
					setSession((current) =>
						current
							? {
									...current,
									players: current.players.map((player) =>
										player.userId === data.userId
											? {
													...player,
													score: player.score + data.points,
												}
											: player,
									),
									live: {
										...current.live,
										answeredUserIds: [
											...new Set([
												...current.live.answeredUserIds,
												data.userId,
											]),
										],
									},
								}
							: current,
					);
				}
			},
		);

		newSocket.on("session:player-surrendered", async () => {
			try {
				const res = await fetch(`${API}/game-session/${id}/state`);
				if (res.ok) {
					const updated: SessionData = await res.json();
					setSession(updated);
				}
			} catch (error) {
				console.error(
					"Failed to refetch session state after surrender:",
					error,
				);
			}
		});

		newSocket.on("session:completed", (data: SessionCompletedPayload) => {
			setSession((current) =>
				current
					? {
							...current,
							status: "FINISHED",
							players: current.players.map((player) => {
								const ranking = data.rankings.find(
									(entry) => entry.userId === player.userId,
								);

								return ranking ? { ...player, ...ranking } : player;
							}),
							live: data.live,
						}
					: current,
			);
		});

		return () => {
			newSocket.off("connect", joinSession);
			releaseSharedSocket({ userId: currentUserId });
		};
	}, [id, currentUserId]);

	const handleSelectAnswer = (answerId: string, _answerValue: string) => {
		if (!id || !socketRef.current || !currentUserId) {
			return;
		}

		if (!socketRef.current.connected) {
			return;
		}

		setHasAnsweredCurrentQuestion(true);

		setQuizSessionData({ answerValue: _answerValue });
		playUiSound(chooseAnswerSound);

		socketRef.current.emit("session:answer", {
			sessionId: id,
			userId: currentUserId,
			answerId,
		});
	};

	const handleSurrender = () => {
		if (!id || !socketRef.current || !currentUserId) return;

		if (!socketRef.current.connected) {
			alert(t("quiz_session.no_server_connection"));
			return;
		}

		socketRef.current.emit("session:surrender", {
			sessionId: id,
			userId: currentUserId,
		});

		navigate("/");
	};

	if (loading) {
		return (
			<main className="flex items-center justify-center h-screen bg-(--bgc-primary) text-(--text)">
				<p className="text-(--text-secondary) text-xl animate-pulse">
					{t("quiz_session.loading")}
				</p>
			</main>
		);
	}

	if (error || !session) {
		return (
			<main className="flex items-center justify-center h-screen bg-(--bgc-primary) text-(--text)">
				<p className="text-(--negative) text-xl">
					{t("quiz_session.not_found", { error })}
				</p>
			</main>
		);
	}

	return (
		<main className="flex flex-col h-screen bg-(--bgc-primary) text-(--text) px-8 lg:px-16 py-4 lg:py-8 gap-2 lg:gap-8 lg:min-w-240 lg:min-h-120">
			<TopBar session={session} sessionId={id} onSurrender={handleSurrender} />
			<QuizStage
				session={session}
				currentUserId={currentUserId}
				summaryPoints={summaryPoints}
				hasAnsweredCurrentQuestion={hasAnsweredCurrentQuestion}
				onSelectAnswer={handleSelectAnswer}
				correctAnswerValue={correctAnswer}
			/>
			<Controls />
		</main>
	);
};

export default QuizSession;
