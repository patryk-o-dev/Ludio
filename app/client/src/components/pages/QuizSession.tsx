import { useEffect, useState } from "react";
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
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

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

		socket.on("connect", () => {
			socket.emit("join", { sessionId: id });
		});

		socket.on("session:state", (data: SessionData) => {
			setSession(data);
		});

		socket.on("session:question", (live: LiveSessionState) => {
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

		socket.on("session:completed", (data: { live: LiveSessionState }) => {
			setSession((current) =>
				current
					? {
							...current,
							status: "FINISHED",
							live: data.live,
						}
					: current,
			);
		});

		return () => {
			socket.disconnect();
		};
	}, [id]);

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
			<TopBar />
			<QuizStage session={session} />
			<Controls />
		</main>
	);
};

export default QuizSession;
