import { create } from "zustand";
import type { AllChips, ChipSelectionStep } from "../types";

type ChipsStore = {
	allChips: AllChips;
	chipSelectionStep: ChipSelectionStep;
	setAllChips: (allChips: AllChips) => void;
	updateChipSelectionStep: (step: ChipSelectionStep) => void;
};

const useChipsStore = create<ChipsStore>((set) => ({
	allChips: { chipsGuess: [], chipsBy: [], chipsFilter: [] },
	chipSelectionStep: {
		type: "guess",
		ruleIndex: 0,
	},
	setAllChips: (allChips) => set({ allChips }),
	updateChipSelectionStep: (step) => set({ chipSelectionStep: step }),
}));

export default useChipsStore;
