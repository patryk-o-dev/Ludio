import { create } from "zustand";
import type { Player, Rule, GameOptionsState } from "../types";

type GameConfigStore = {
	players: Player[];
	rules: Rule[];
	options: GameOptionsState;
	addPlayer: (player: Player) => void;
	removePlayer: (player: Player) => void;
	clearPlayers: () => void;
	addRule: (rule: Rule) => void;
	removeRule: (rule: Rule) => void;
	updateOption: (option: Partial<GameOptionsState>) => void;
	updateRuleGuessChip: (ruleIndex: number, chipGuessId: string | null) => void;
	updateRuleByChip: (ruleIndex: number, chipById: string | null) => void;
	updateRuleFilterChips: (ruleIndex: number, filterChipId: string) => void;
};

const useGameConfigStore = create<GameConfigStore>((set) => ({
	players: [],
	rules: [
		{
			index: 0,
			guessId: null,
			byId: null,
			filterIds: [],
		},
	],
	options: {
		difficulty: 1,
		questionsPerRule: 3,
		timeLimitSeconds: null,
	},
	addPlayer: (player) =>
		set((state) => ({ players: [...state.players, player] })),
	removePlayer: (player) =>
		set((state) => ({
			players: state.players.filter((p) => p.id !== player.id),
		})),
	clearPlayers: () => set({ players: [] }),
	addRule: (rule) => set((state) => ({ rules: [...state.rules, rule] })),
	removeRule: (rule) =>
		set((state) => ({ rules: state.rules.filter((r) => r !== rule) })),
	updateOption: (option) =>
		set((state) => ({ options: { ...state.options, ...option } })),
	updateRuleGuessChip: (ruleIndex: number, chipGuessId: string | null) =>
		set((state) => ({
			rules: state.rules.map((rule) =>
				rule.index === ruleIndex ? { ...rule, guessId: chipGuessId } : rule,
			),
		})),
	updateRuleByChip: (ruleIndex: number, chipById: string | null) =>
		set((state) => ({
			rules: state.rules.map((rule) =>
				rule.index === ruleIndex ? { ...rule, byId: chipById } : rule,
			),
		})),
	updateRuleFilterChips: (ruleIndex: number, filterChipId: string) =>
		set((state) => ({
			rules: state.rules.map((rule) => {
				if (rule.index === ruleIndex) {
					const hasFilter = rule.filterIds.includes(filterChipId);
					const newFilterIds = hasFilter
						? rule.filterIds.filter((id) => id !== filterChipId)
						: [...rule.filterIds, filterChipId];
					return { ...rule, filterIds: newFilterIds };
				}
				return rule;
			}),
		})),
}));

export default useGameConfigStore;
