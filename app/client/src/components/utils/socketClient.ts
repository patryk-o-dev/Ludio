import { io, type Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL.replace(/\/api$/, "");

type SharedSocketOptions = {
	userId?: string | null;
};

type SharedSocketEntry = {
	socket: Socket;
	refCount: number;
};

const sharedSockets = new Map<string, SharedSocketEntry>();

const getSocketKey = (userId?: string | null) =>
	userId ? `auth:${userId}` : "public";

export const acquireSharedSocket = ({ userId }: SharedSocketOptions = {}) => {
	const socketKey = getSocketKey(userId);
	const existing = sharedSockets.get(socketKey);

	if (existing) {
		existing.refCount += 1;
		if (!existing.socket.connected) {
			existing.socket.connect();
		}
		return existing.socket;
	}

	const socket = io(SOCKET_URL, {
		autoConnect: true,
		auth: userId ? { userId } : undefined,
	});

	sharedSockets.set(socketKey, {
		socket,
		refCount: 1,
	});

	return socket;
};

export const releaseSharedSocket = ({ userId }: SharedSocketOptions = {}) => {
	const socketKey = getSocketKey(userId);
	const existing = sharedSockets.get(socketKey);

	if (!existing) {
		return;
	}

	existing.refCount -= 1;

	if (existing.refCount > 0) {
		return;
	}

	existing.socket.disconnect();
	sharedSockets.delete(socketKey);
};
