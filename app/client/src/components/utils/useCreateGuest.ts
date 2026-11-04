import { useEffect } from "react";
import useQuizSessionStore, {
	type SessionUser,
} from "../../store/quizSessionStore";
import { API_URL, withAuth } from "./api";
import { getStoredAuthUser } from "./authStorage";

const API = API_URL;

let initializationPromise: Promise<void> | null = null;

const readUser = async (response: Response): Promise<SessionUser> => {
	const data = await response.json();
	const user = data.user ?? data;

	if (!user.id || !user.username) {
		throw new Error("Invalid user data received from API");
	}

	return {
		id: user.id,
		username: user.username,
		twitchId: user.twitchId ?? null,
		displayName: user.displayName ?? null,
		avatarUrl: user.avatarUrl ?? null,
	};
};

const initializeSession = async (
	setUserSessionStatus: (status: "VALID" | "INVALID") => void,
	setCurrentUser: (user: SessionUser | null) => void,
) => {
	const storedTwitchUser = getStoredAuthUser();

	try {
		const response = await fetch(`${API}/user/me`, withAuth({ method: "GET" }));

		if (response.ok) {
			const user = await readUser(response);
			setCurrentUser(user);
			setUserSessionStatus("VALID");
			return;
		}

		if (response.status !== 401 && response.status !== 403) {
			throw new Error(`Session check failed (${response.status})`);
		}

		if (storedTwitchUser?.twitchId) {
			setCurrentUser(null);
			setUserSessionStatus("INVALID");
			return;
		}

		const guestResponse = await fetch(
			`${API}/auth/create-guest`,
			withAuth({ method: "POST" }),
		);

		if (!guestResponse.ok) {
			throw new Error(
				`Failed to create guest session (${guestResponse.status})`,
			);
		}

		const guest = await readUser(guestResponse);

		setCurrentUser(guest);
		setUserSessionStatus("VALID");
	} catch (error) {
		console.error("Unable to initialize user session", error);
		setCurrentUser(null);
		setUserSessionStatus("INVALID");
	}
};

export const useCreateGuest = () => {
	const setUserSessionStatus = useQuizSessionStore(
		(state) => state.setUserSessionStatus,
	);
	const setCurrentUser = useQuizSessionStore((state) => state.setCurrentUser);

	useEffect(() => {
		if (!initializationPromise) {
			initializationPromise = initializeSession(
				setUserSessionStatus,
				setCurrentUser,
			).finally(() => {
				initializationPromise = null;
			});
		}

		void initializationPromise;
	}, [setUserSessionStatus, setCurrentUser]);
};
