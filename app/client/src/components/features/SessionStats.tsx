import { useEffect, useRef, useState } from "react";
import scoreIcon from "../../assets/icons/score.png";
import type { SessionData } from "../../types";
import { getStoredAuthUser } from "../utils/authStorage";
import { useTranslation } from "react-i18next";

const SessionStats = ({ session }: { session: SessionData }) => {
	const currentUserId = getStoredAuthUser()?.id ?? null;
	const { t } = useTranslation();

	const [displayedScores, setDisplayedScores] = useState<
		Record<string, number>
	>(() => {
		const map: Record<string, number> = {};
		session.players.forEach((p) => {
			map[p.userId] = p.score;
		});
		return map;
	});

	const prevPhaseRef = useRef(session.live.phase);

	useEffect(() => {
		const prev = prevPhaseRef.current;
		const phase = session.live.phase;
		if (phase === "summary" && prev !== "summary") {
			const map: Record<string, number> = {};
			session.players.forEach((p) => {
				map[p.userId] = p.score;
			});
			setDisplayedScores(map);
		}
		prevPhaseRef.current = phase;
	}, [session.live.phase, session.players]);

	const totalQuestions = session.rulePools.reduce(
		(total, pool) => total + pool.questionCount,
		0,
	);

	const currentPlayer = session.players.find(
		(player) => player.userId === currentUserId,
	);
	const playerScore =
		currentUserId && displayedScores[currentUserId] !== undefined
			? displayedScores[currentUserId]
			: (currentPlayer?.score ?? 0);

	return (
		<div className="flex items-center gap-2 lg:gap-12">
			<div className="flex flex-1 flex-col items-center">
				<p className="text-sm uppercase text-(--text-secondary) leading-tight">
					{t("quiz_session.labels.question")}
				</p>
				<p className="text-lg font-semibold leading-tight">
					{session.live.qIndex} /{" "}
					<span className="text-(--accent)">{totalQuestions}</span>
				</p>
			</div>
			<span className="w-px h-8 bg-(--text-secondary)/70" />
			<div className="flex flex-1 items-center gap-3">
				<img className="w-6 h-6" src={scoreIcon} alt="score icon" />
				<div className="flex flex-col">
					<p className="text-lg font-semibold leading-tight">
						{playerScore} /{" "}
						<span className="text-(--accent)">{totalQuestions}</span>
					</p>
					<p className="uppercase text-(--accent) leading-tight">
						{t("quiz_session.labels.points")}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SessionStats;
