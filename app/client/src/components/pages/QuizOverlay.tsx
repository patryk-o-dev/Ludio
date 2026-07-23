import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { SessionCompletedPayload } from "../../types";
import {
	acquireSharedSocket,
	releaseSharedSocket,
} from "../utils/socketClient";

const QuizOverlay = () => {
	const { twitchId } = useParams();
	const [completedSession, setCompletedSession] =
		useState<SessionCompletedPayload | null>(null);

	useEffect(() => {
		if (!twitchId) return;

		const socket = acquireSharedSocket();

		const subscribe = () => {
			socket.emit("overlay:subscribe", { twitchId });
		};

		const unsubscribe = () => {
			socket.emit("overlay:unsubscribe", { twitchId });
		};

		socket.on("connect", subscribe);

		if (socket.connected) {
			subscribe();
		}

		const handleCompleted = (data: SessionCompletedPayload) => {
			setCompletedSession(data);
		};

		socket.on("session:completed", handleCompleted);

		return () => {
			unsubscribe();
			socket.off("connect", subscribe);
			socket.off("session:completed", handleCompleted);
			releaseSharedSocket();
		};
	}, [twitchId]);

	return (
		<div className="flex h-screen w-screen items-end justify-center bg-transparent p-6 text-white">
			{completedSession ? (
				<div className="w-full max-w-2xl rounded-3xl border border-white/15 bg-black/70 p-6 backdrop-blur-md">
					<h1 className="text-2xl font-black uppercase tracking-[0.2em]">
						Quiz Results
					</h1>
					<div className="mt-4 space-y-3">
						{completedSession.rankings.map((ranking) => (
							<div
								key={ranking.userId}
								className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3"
							>
								<div>
									<p className="text-xs uppercase tracking-[0.25em] text-white/60">
										#{ranking.rank}
									</p>
									<p className="text-lg font-bold">
										{ranking.displayName ?? ranking.userId}
									</p>
								</div>
								<div className="text-right">
									<p className="text-xl font-black">{ranking.score} pts</p>
									<p className="text-sm text-white/70">{ranking.timeMs} ms</p>
								</div>
							</div>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default QuizOverlay;
