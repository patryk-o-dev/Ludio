import { useState } from "react";
import SessionStats from "../features/SessionStats";
import StreamerLogo from "../layout/StreamerLogo";
import surrenderIcon from "../../assets/icons/ff.png";
import type { SessionData } from "../../types";
import { useTranslation } from "react-i18next";

const TopBar = ({
	session,
	sessionId,
	onSurrender,
}: {
	session: SessionData;
	sessionId: string | undefined;
	onSurrender: () => void;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();

	const handleSurrender = () => {
		if (isLoading || !sessionId) return;

		setIsLoading(true);
		onSurrender();

		setTimeout(() => setIsLoading(false), 500);
	};

	return (
		<header className="flex items-center justify-between px-6 py-4">
			<StreamerLogo />
			<SessionStats session={session} />
			<button
				onClick={handleSurrender}
				disabled={isLoading}
				className="px-4 py-2 bg-(--bgc-basic) border border-(--bgc-tertiary) text-(--text-primary) rounded hover:bg-(--accent) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<img
					src={surrenderIcon}
					alt="surrender icon"
					className="inline-block w-6 h-6 mr-2"
				/>
				{isLoading
					? t("quiz_session.actions.surrendering")
					: t("quiz_session.actions.surrender")}
			</button>
		</header>
	);
};

export default TopBar;
