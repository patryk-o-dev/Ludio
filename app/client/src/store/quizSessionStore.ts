import { create } from "zustand";
import { type quizSessionData, type UserSessionStatus } from "../types";

type QuizSessionStore = {
	quizSessionData: quizSessionData;
	userSessionStatus: UserSessionStatus;
	setQuizSessionData: (data: quizSessionData) => void;
	setUserSessionStatus: (data: UserSessionStatus) => void;
};

const useQuizSessionStore = create<QuizSessionStore>((set) => ({
	quizSessionData: { answerValue: "" },
	userSessionStatus: "CHECKING",
	setQuizSessionData: (data) => set({ quizSessionData: data }),
	setUserSessionStatus: (data) => set({ userSessionStatus: data }),
}));

export default useQuizSessionStore;
