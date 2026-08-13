const DEV_API_ORIGIN = "http://localhost:3000";
const DEV_API_URL = `${DEV_API_ORIGIN}/api`;

const getRequiredEnvValue = (
	value: string | undefined,
	name: string,
): string => {
	if (!value) {
		throw new Error(`Missing ${name} in production`);
	}

	return value;
};

export const API_URL = import.meta.env.PROD
	? getRequiredEnvValue(import.meta.env.VITE_API_URL, "VITE_API_URL")
	: DEV_API_URL;

export const API_ORIGIN = import.meta.env.PROD
	? import.meta.env.VITE_API_ORIGIN?.trim() || API_URL.replace(/\/api\/?$/, "")
	: DEV_API_ORIGIN;

export const SOCKET_URL = API_URL.replace(/\/api\/?$/, "");

export const withAuth = (init: RequestInit = {}): RequestInit => ({
	...init,
	credentials: "include",
});
