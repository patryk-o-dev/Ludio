import { create } from "zustand";
import { type quizSessionData } from "../types";

type QuizSessionStore = {
	quizSessionData: quizSessionData;
	setQuizSessionData: (data: quizSessionData) => void;
};

const useQuizSessionStore = create<QuizSessionStore>((set) => ({
	quizSessionData: { answerValue: "" },
	setQuizSessionData: (data) => set({ quizSessionData: data }),
}));

export default useQuizSessionStore;
