export type Question = {
	id: string;
	media: string;
	tags: Tag[];
	answerId: string;
	answer: Answer;
};

export type Tag = {
	id: string;
	name: string;
	category: string;
	questions: Question[];
	set: Set[];
	unlocked: boolean;
};

export type Answer = {
	id: string;
	value: string;
	answerTypeId: string;
	answerType: AnswerType;
	questions: Question[];
};

export type AnswerType = {
	id: string;
	name: string;
	answer: Answer[];
};

export type Set = {
	id: string;
	name: string;
	option: Option;
	tags: Tag[];
	done: boolean;
	unlocked: boolean;
	selected: boolean;
};

export type Option = {
	id: string;
	numberOfQuestions: number;
	scoreNeeded: number;
	setId: string;
	set: Set;
};

export type Category = {
	id: string;
	name: string;
	lvl: number;
	lvlMax: number;
	expNeeded: number;
	expAdded: number;
};

export type Player = {
	id: string;
	exp: number;
};
