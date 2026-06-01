import { create } from "zustand";
import type { AllChips } from "../types";

type ChipsStore = {
	allChips: AllChips;
	chipSelectionStep: {
		type: "guess" | "by";
		ruleIndex?: number;
		guessId?: string;
	};
	setAllChips: (allChips: AllChips) => void;
	updateChipSelectionStep: (step: {
		type: "guess" | "by";
		ruleIndex?: number;
		guessId?: string;
	}) => void;
};

const useChipsStore = create<ChipsStore>((set) => ({
	allChips: { chipsGuess: [], chipsBy: [], chipsFilter: [] },
	chipSelectionStep: {
		type: "guess",
	},
	setAllChips: (allChips) => set({ allChips }),
	updateChipSelectionStep: (step) => set({ chipSelectionStep: step }),
}));

export default useChipsStore;
