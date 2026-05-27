import { create } from "zustand";
import type { ChipBy, ChipFilter, ChipGuess } from "../types";

type ChipsStore = {
	chipsGuess: ChipGuess[];
	chipsBy: ChipBy[];
	chipsFilter: ChipFilter[];
	chipSelectionStep: {
		type: "guess" | "by";
	};
	setChipGuess: (chipGuess: ChipGuess) => void;
	setChipBy: (chipBy: ChipBy) => void;
	setChipFilter: (chipFilter: ChipFilter) => void;
	updateChipSelectionStep: (step: { type: "guess" | "by" }) => void;
};

const useChipsStore = create<ChipsStore>((set) => ({
	chipsGuess: [],
	chipsBy: [],
	chipsFilter: [],
	chipSelectionStep: {
		type: "guess",
	},
	setChipGuess: (chipGuess) =>
		set((state) => ({ chipsGuess: [...state.chipsGuess, chipGuess] })),
	setChipBy: (chipBy) =>
		set((state) => ({ chipsBy: [...state.chipsBy, chipBy] })),
	setChipFilter: (chipFilter) =>
		set((state) => ({ chipsFilter: [...state.chipsFilter, chipFilter] })),
	updateChipSelectionStep: (step) => set({ chipSelectionStep: step }),
}));

export default useChipsStore;
