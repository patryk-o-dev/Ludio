import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io, type Socket } from "socket.io-client";
import Controls from "../layout/Controls";
import QuizStage from "../layout/QuizStage";
import TopBar from "../layout/TopBar";

type QuestionAnswer = {
	id: string;
	value: string;
};

export interface CurrentQuestion {
	id: string;
	url: string;
	answers: QuestionAnswer[];
	correctAnswer: QuestionAnswer;
}

export interface LiveSessionState {
	phase: "waiting" | "question" | "summary" | "completed";
	question: CurrentQuestion | null;
	questionId: string | null;
	qIndex: number;
	currentRuleIndex: number;
	startedAt: number | null;
	expiresAt: number | null;
	summaryEndsAt: number | null;
	timeLimitSeconds: number | null;
	answeredUserIds: string[];
}

type SessionPlayer = {
	userId: string;
	status: string;
	score: number;
	timeMs: number;
	rank: number;
};

type SessionRanking = {
	userId: string;
	rank: number;
	score: number;
	timeMs: number;
};

export interface RulePool {
	id: string;
	ruleIndex: number;
	ruleId: string;
	questionCount: number;
	drawnCount: number;
	_count: { candidates: number };
}

export interface SessionData {
	id: string;
	status: "WAITING" | "ACTIVE" | "FINISHED";
	currentRuleIndex: number;
	rulePools: RulePool[];
	players: SessionPlayer[];
	live: LiveSessionState;
}

const API = "http://localhost:3000/api";

const QuizSession = () => {
	const { id } = useParams<{ id: string }>();
	const [session, setSession] = useState<SessionData | null>(null);
	const [summaryWasCorrect, setSummaryWasCorrect] = useState<boolean | null>(
		null,
	);
	const [summaryPoints, setSummaryPoints] = useState<number | null>(null);
	const [hasAnsweredCurrentQuestion, setHasAnsweredCurrentQuestion] =
		useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const socketRef = useRef<Socket | null>(null);

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
		if (!id) return;

		const socket: Socket = io(API.replace(/\/api$/, ""));
		socketRef.current = socket;

		socket.on("connect", () => {
			socket.emit("join", { sessionId: id });
		});

		socket.on("session:state", (data: SessionData) => {
			setSession(data);
		});

		socket.on("session:question", (live: LiveSessionState) => {
			setSummaryWasCorrect(null);
			setSummaryPoints(null);
			setHasAnsweredCurrentQuestion(false);
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

		socket.on("session:summary", (live: LiveSessionState) => {
			setSession((current) =>
				current
					? {
							...current,
							currentRuleIndex: live.currentRuleIndex,
							live,
						}
					: current,
			);
		});

		socket.on(
			"session:player-answered",
			(data: { userId: string; correct: boolean; points: number }) => {
				if (data.userId === "1") {
					setSummaryWasCorrect(data.correct);
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

		socket.on(
			"session:completed",
			(data: { live: LiveSessionState; rankings: SessionRanking[] }) => {
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
			},
		);

		return () => {
			socketRef.current = null;
			socket.disconnect();
		};
	}, [id]);

	const handleSelectAnswer = (
		answerId: string,
		_answerValue: string,
		timeMs: number,
	) => {
		if (!id || !socketRef.current) {
			return;
		}

		if (!socketRef.current.connected) {
			return;
		}

		setHasAnsweredCurrentQuestion(true);

		socketRef.current.emit("session:answer", {
			sessionId: id,
			userId: "1",
			answerId,
			timeMs,
		});
	};

	if (loading) {
		return (
			<main className="flex items-center justify-center h-screen bg-(--bgc-primary) text-(--text)">
				<p className="text-(--text-secondary) text-xl animate-pulse">
					Ładowanie sesji...
				</p>
			</main>
		);
	}

	if (error || !session) {
		return (
			<main className="flex items-center justify-center h-screen bg-(--bgc-primary) text-(--text)">
				<p className="text-(--negative) text-xl">
					Nie znaleziono sesji ({error})
				</p>
			</main>
		);
	}

	return (
		<main className="flex flex-col h-screen bg-(--bgc-primary) text-(--text) px-16 py-8 gap-8">
			<TopBar session={session} />
			<QuizStage
				session={session}
				summaryWasCorrect={summaryWasCorrect}
				summaryPoints={summaryPoints}
				hasAnsweredCurrentQuestion={hasAnsweredCurrentQuestion}
				onSelectAnswer={handleSelectAnswer}
			/>
			<Controls />
		</main>
	);
};

export default QuizSession;
