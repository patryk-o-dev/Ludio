export type AuthUser = {
	id: string;
	username: string;
	twitchId: string;
	displayName: string | null;
	avatarUrl: string | null;
};

const AUTH_USER_STORAGE_KEY = "quizapp.auth.user";
const POST_LOGIN_REDIRECT_STORAGE_KEY = "quizapp.auth.post_login_redirect";

export const getStoredAuthUser = (): AuthUser | null => {
	const storedValue = window.localStorage.getItem(AUTH_USER_STORAGE_KEY);

	if (!storedValue) {
		return null;
	}

	try {
		return JSON.parse(storedValue) as AuthUser;
	} catch {
		window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
		return null;
	}
};

export const setStoredAuthUser = (user: AuthUser) => {
	window.localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearStoredAuthUser = () => {
	window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
};

export const getPostLoginRedirectPath = (): string | null => {
	return window.localStorage.getItem(POST_LOGIN_REDIRECT_STORAGE_KEY);
};

export const setPostLoginRedirectPath = (path: string) => {
	window.localStorage.setItem(POST_LOGIN_REDIRECT_STORAGE_KEY, path);
};

export const clearPostLoginRedirectPath = () => {
	window.localStorage.removeItem(POST_LOGIN_REDIRECT_STORAGE_KEY);
};
