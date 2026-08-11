import { create } from "zustand";
import {
	INITIAL_RULE_ID,
	type Player,
	type Rule,
	type GameOptionsState,
} from "../types";

type GameConfigStore = {
	players: Player[];
	rules: Rule[];
	options: GameOptionsState;
	addPlayer: (player: Player) => void;
	removePlayer: (player: Player) => void;
	clearPlayers: () => void;
	addRule: (rule: Rule) => void;
	removeRule: (ruleId: string) => void;
	updateOption: (option: Partial<GameOptionsState>) => void;
	updateRuleGuessChip: (ruleId: string, chipGuessId: string | null) => void;
	updateRuleByChip: (ruleId: string, chipById: string | null) => void;
	updateRuleFilterChips: (ruleId: string, filterChipId: string) => void;
};

const useGameConfigStore = create<GameConfigStore>((set) => ({
	players: [],
	rules: [
		{
			id: INITIAL_RULE_ID,
			guessId: null,
			byId: null,
			filterIds: [],
		},
	],
	options: {
		difficulty: 1,
		questionsPerRule: 3,
		timeLimitSeconds: null,
		isCommunityQuiz: false,
	},
	mode: "classic",
	addPlayer: (player) =>
		set((state) => ({ players: [...state.players, player] })),
	removePlayer: (player) =>
		set((state) => ({
			players: state.players.filter((p) => p.id !== player.id),
		})),
	clearPlayers: () => set({ players: [] }),
	addRule: (rule) => set((state) => ({ rules: [...state.rules, rule] })),
	removeRule: (ruleId) =>
		set((state) => ({
			rules: state.rules.filter((rule) => rule.id !== ruleId),
		})),
	updateOption: (option) =>
		set((state) => ({ options: { ...state.options, ...option } })),
	updateRuleGuessChip: (ruleId: string, chipGuessId: string | null) =>
		set((state) => ({
			rules: state.rules.map((rule) =>
				rule.id === ruleId
					? { ...rule, guessId: chipGuessId, byId: null, filterIds: [] }
					: rule,
			),
		})),
	updateRuleByChip: (ruleId: string, chipById: string | null) =>
		set((state) => ({
			rules: state.rules.map((rule) =>
				rule.id === ruleId ? { ...rule, byId: chipById, filterIds: [] } : rule,
			),
		})),
	updateRuleFilterChips: (ruleId: string, filterChipId: string) =>
		set((state) => ({
			rules: state.rules.map((rule) => {
				if (rule.id === ruleId) {
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
