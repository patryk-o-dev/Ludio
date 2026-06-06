import { useEffect, useMemo, useState } from "react";
import type { SessionData } from "../../types";

type RankingPlayer = {
	userId: string;
	score: number;
	timeMs: number;
	user: {
		displayName: string;
	};
};

const Ranking = ({ session }: { session: SessionData }) => {
	const [players, setPlayers] = useState<RankingPlayer[]>([]);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/game-session/${session.id}/players`)
			.then((res) => res.json())
			.then((data: RankingPlayer[]) => setPlayers(data));
	}, [session.id, session.live.qIndex]);

	const sortedPlayers = useMemo(() => {
		return [...players].sort((a, b) => {
			if (b.score === a.score) {
				return a.timeMs - b.timeMs;
			}
			return b.score - a.score;
		});
	}, [players]);

	return (
		<div className="flex flex-col gap-2 w-full">
			{sortedPlayers.map((player, index) => (
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
							{player.score} pkt
						</p>

						<span className="px-2 py-1 text-xs rounded-full bg-(--bgc-secondary) text-(--text-secondary) border border-(--accent-dark) whitespace-nowrap">
							{player.timeMs} ms
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default Ranking;
