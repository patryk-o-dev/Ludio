import { create } from "zustand";
import {
	INITIAL_RULE_ID,
	type AllChips,
	type ChipSelectionStep,
	type GameMode,
} from "../types";

type ChipsStore = {
	allChips: AllChips;
	chipSelectionStep: ChipSelectionStep;
	mode: GameMode;
	setAllChips: (allChips: AllChips) => void;
	updateChipSelectionStep: (step: ChipSelectionStep) => void;
	updateMode: (mode: GameMode) => void;
};

const useChipsStore = create<ChipsStore>((set) => ({
	allChips: { chipsGuess: [], chipsBy: [], chipsFilter: [] },
	chipSelectionStep: {
		type: "guess",
		ruleId: INITIAL_RULE_ID,
	},
	mode: "CLASSIC",
	setAllChips: (allChips) => set({ allChips }),
	updateChipSelectionStep: (step) => set({ chipSelectionStep: step }),
	updateMode: (mode) => set({ mode }),
}));

export default useChipsStore;
