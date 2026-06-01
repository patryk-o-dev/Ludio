export type Player = {
	name: string;
	status: "online" | "offline";
};
export type Rule = {
	index: number;
	guessId: string | null;
	byId: string | null;
	filterIds: string[];
};
export type GameOptionsState = {
	difficulty: 1;
	questionsPerRule: 3 | 5;
	timeLimitSeconds: null | 10 | 20 | 30 | 50;
};

export type AllChips = {
	chipsGuess: ChipGuess[];
	chipsBy: ChipBy[];
	chipsFilter: ChipFilter[];
};

export type ChipGuess = {
	id: string;
	name: string;
	compatibleByIds: string[];
};

export type ChipBy = {
	id: string;
	name: string;
	compatibleFilterIds: string[];
};

export type ChipFilter = {
	id: string;
	name: string;
};
