import { create } from "zustand";
import { type quizSessionData, type UserSessionStatus } from "../types";

export type SessionUser = {
	id: string;
	username: string;
	twitchId: string | null;
	displayName: string | null;
	avatarUrl: string | null;
};

type QuizSessionStore = {
	quizSessionData: quizSessionData;
	userSessionStatus: UserSessionStatus;
	currentUser: SessionUser | null;
	setQuizSessionData: (data: quizSessionData) => void;
	setUserSessionStatus: (data: UserSessionStatus) => void;
	setCurrentUser: (user: SessionUser | null) => void;
};

const useQuizSessionStore = create<QuizSessionStore>((set) => ({
	quizSessionData: { answerValue: "" },
	userSessionStatus: "CHECKING",
	currentUser: null,
	setQuizSessionData: (data) => set({ quizSessionData: data }),
	setUserSessionStatus: (data) => set({ userSessionStatus: data }),
	setCurrentUser: (user) => set({ currentUser: user }),
}));

export default useQuizSessionStore;
