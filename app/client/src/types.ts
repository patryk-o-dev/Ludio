export type User = {
	id: string;
	displayName?: string;
	status?: "online" | "offline";
	avatarUrl?: string;
};

export type SessionInvite = {
	sessionId: string;
	hostId: string;
	status?: string;
};

export type Player = User;

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

export type ChipSelectionStep = {
	type: "guess" | "by";
	ruleIndex?: number;
	guessId?: string;
};

export type QuestionAnswer = {
	id: string;
	value: string;
};

export type CurrentQuestion = {
	id: string;
	url: string;
	answers: QuestionAnswer[];
	correctAnswer: QuestionAnswer;
};

export type LiveSessionState = {
	phase: "waiting" | "question" | "summary" | "completed";
	question: CurrentQuestion | null;
	questionId: string | null;
	qIndex: number;
	currentRuleIndex: number;
	startedAt: number | null;
	expiresAt: number | null;
	summaryEndsAt: number | null;
	timeLimitSeconds: number | null;
	answeredUserIds: string[];
};

export type SessionPlayer = {
	userId: string;
	status: string;
	score: number;
	timeMs: number;
	rank: number;
	user: {
		displayName?: string;
		avatarUrl?: string;
	};
};

export type SessionRanking = {
	userId: string;
	rank: number;
	score: number;
	timeMs: number;
};

export type RulePool = {
	id: string;
	ruleIndex: number;
	ruleId: string;
	questionCount: number;
	drawnCount: number;
	_count: { candidates: number };
};

export type SessionData = {
	id: string;
	status: "WAITING" | "ACTIVE" | "FINISHED";
	currentRuleIndex: number;
	rulePools: RulePool[];
	players: SessionPlayer[];
	live: LiveSessionState;
};
