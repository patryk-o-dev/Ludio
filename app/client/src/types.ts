export type User = {
	id: string;
	twitchId?: string;
	displayName?: string;
	status?: "online" | "offline";
	avatarUrl?: string;
};

export type SessionInvite = {
	sessionId: string;
	hostId: string;
	hostName: string;
	hostAvatar?: string;
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
	isCommunityQuiz: boolean;
};

export type AllChips = {
	chipsGuess: ChipGuess[];
	chipsBy: ChipBy[];
	chipsFilter: ChipFilter[];
};

export type ChipGuess = {
	id: string;
	name: string;
	mode: GameMode;
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
	correctAnswer?: QuestionAnswer;
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
	displayName?: string | null;
	avatarUrl?: string | null;
};

export type SessionCompletedPayload = {
	sessionId: string;
	live: LiveSessionState;
	rankings: SessionRanking[];
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
	hostId: string;
	status: "WAITING" | "ACTIVE" | "FINISHED";
	currentRuleIndex: number;
	rulePools: RulePool[];
	players: SessionPlayer[];
	live: LiveSessionState;
};

export type quizSessionData = {
	answerValue: string;
};

export type chipData = {
	icon: string[];
	label: string;
	color: string;
};

export type Community = {
	id: string;
	ownerId: string;
	owner: {
		displayName: string | null;
		avatarUrl: string | null;
	};
	members: {
		id: string;
		displayName: string | null;
		avatarUrl: string | null;
		twitchId: string | null;
		points: number;
	}[];
};

export type CommunityMember = {
	user: User;
	points: number;
};

export type GameMode =
	| "CLASSIC"
	| "SOLO"
	| "LEAGUE_OF_LEGENDS"
	| "DEAD_BY_DAYLIGHT";
