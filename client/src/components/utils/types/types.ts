export type Question = {
	id: string;
	media: string;
	answer: Answer;
	tags: Tag[];
};

export type Tag = {
	id: string;
	name: string;
	category: Category;
	questions: Question[];
	set: Set[];
};

export type Answer = {
	id: string;
	value: string;
	answerTypeId: string;
	answerType: AnswerType;
	question: Question;
};

export type AnswerType = {
	id: string;
	name: string;
	answers: Answer[];
};

export type Set = {
	id: string;
	name: string;
	option: Option;
	tags: Tag[];
	done: boolean;
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
	expAdded: number;
	expNeeded: number;
};

export type Player = {
	id: string;
	exp: number;
};
