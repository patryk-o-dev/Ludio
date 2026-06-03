import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setStoredAuthUser, type AuthUser } from "../utils/authStorage";

const AuthTwitchCallback = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const status = searchParams.get("status");

	const errorMessage =
		status !== "success"
			? (searchParams.get("message") ?? "Twitch login failed.")
			: null;

	useEffect(() => {
		if (status !== "success") return;

		const id = searchParams.get("userId");
		const username = searchParams.get("username");
		const twitchId = searchParams.get("twitchId");

		if (!id || !username || !twitchId) return;

		const user: AuthUser = {
			id,
			username,
			twitchId,
			displayName: searchParams.get("displayName"),
			avatarUrl: searchParams.get("avatarUrl"),
		};

		setStoredAuthUser(user);
		navigate("/", { replace: true });
	}, [navigate, searchParams, status]);

	return (
		<main className="flex min-h-screen items-center justify-center bg-(--bgc-primary) px-6 text-(--text)">
			<div className="max-w-xl text-center">
				<h1 className="text-2xl font-semibold">Łączenie konta Twitch</h1>

				{errorMessage ? (
					<>
						<p className="mt-4 text-(--accent)">{errorMessage}</p>
						<button
							type="button"
							onClick={() => navigate("/", { replace: true })}
							className="mt-6 rounded-lg border border-(--bgc-quaternary) bg-(--bgc-secondary) px-4 py-2"
						>
							Wróć na stronę główną
						</button>
					</>
				) : (
					<p className="mt-4 text-(--text-secondary)">
						Logowanie zakończone, trwa przekierowanie...
					</p>
				)}
			</div>
		</main>
	);
};

export default AuthTwitchCallback;
