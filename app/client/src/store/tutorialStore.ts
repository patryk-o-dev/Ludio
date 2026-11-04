import { create } from "zustand";

type TutorialStore = {
	step: number;
	isTutorialActive: boolean;
	setTutorialActive: (isActive: boolean) => void;
	setStep: (step: number) => void;
	nextStep: () => void;
};

export const useTutorialStore = create<TutorialStore>((set) => ({
	step: -1,
	isTutorialActive: false,
	setTutorialActive: (isActive) => set({ isTutorialActive: isActive }),
	setStep: (step) => set({ step }),
	nextStep: () => set((state) => ({ step: state.step + 1 })),
}));
