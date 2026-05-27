import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Controls from "../layout/Controls";
import QuizStage from "../layout/QuizStage";
import TopBar from "../layout/TopBar";

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
	players: { userId: string; status: string }[];
}

const QuizSession = () => {
	const { id } = useParams<{ id: string }>();
	const [session, setSession] = useState<SessionData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;
		fetch(`http://localhost:3000/api/game-session/${id}`)
			.then((res) => {
				if (!res.ok) throw new Error(`${res.status}`);
				return res.json();
			})
			.then(setSession)
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
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
