type TutorialSteps = {
	step: number;
	target: string | null;
	interactElement: string | null;
	infoCardTitle: string;
	infoCardText: string;
	infoCardPosition?: "left" | "right";
};

export const TutorialSteps = [
	{
		step: 1,
		target: "main",
		infoCardTitle: "tutorial.step1.title",
		infoCardText: "tutorial.step1.description",
	},
	{
		step: 2,
		target: "modeSelection",
		infoCardTitle: "tutorial.step2.title",
		infoCardText: "tutorial.step2.description",
	},
	{
		step: 3,
		target: "quizCreator",
		infoCardTitle: "tutorial.step3.title",
		infoCardText: "tutorial.step3.description",
	},
	{
		step: 4,
		target: "ruleElement",
		infoCardTitle: "tutorial.step4.title",
		infoCardText: "tutorial.step4.description",
	},
	{
		step: 5,
		target: "chipGuess",
		infoCardTitle: "tutorial.step5.title",
		infoCardText: "tutorial.step5.description",
	},
	{
		step: 6,
		target: "chipList",
		infoCardTitle: "tutorial.step6.title",
		infoCardText: "tutorial.step6.description",
		infoCardPosition: "left",
	},
	{
		step: 7,
		target: "ruleElement",
		infoCardTitle: "tutorial.step7.title",
		infoCardText: "tutorial.step7.description",
	},
	{
		step: 8,
		target: "chipList",
		infoCardTitle: "tutorial.step8.title",
		infoCardText: "tutorial.step8.description",
		infoCardPosition: "left",
	},
	{
		step: 9,
		target: "friends",
		infoCardTitle: "tutorial.step9.title",
		infoCardText: "tutorial.step9.description",
	},
	{
		step: 10,
		target: "friendsSearch",
		infoCardTitle: "tutorial.step10.title",
		infoCardText: "tutorial.step10.description",
	},
	{
		step: 11,
		target: "id",
		infoCardTitle: "tutorial.step11.title",
		infoCardText: "tutorial.step11.description",
		infoCardPosition: "left",
	},
	{
		step: 12,
		target: "friends",
		infoCardTitle: "tutorial.step12.title",
		infoCardText: "tutorial.step12.description",
	},
	{
		step: 13,
		target: "options",
		infoCardTitle: "tutorial.step13.title",
		infoCardText: "tutorial.step13.description",
		infoCardPosition: "left",
	},
	{
		step: 14,
		target: "main",
		infoCardTitle: "tutorial.step14.title",
		infoCardText: "tutorial.step14.description",
	},
];
