export const withAuth = (init: RequestInit = {}): RequestInit => ({
	...init,
	credentials: "include",
});
