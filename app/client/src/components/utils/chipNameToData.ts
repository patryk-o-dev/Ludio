export const chipNameToData = (
	chipId: string,
	chipName: string,
): { icon: string[]; label: string; color: string; id: string } => {
	const chipMap: Record<
		string,
		{ icon: string[]; label: string; color: string; id: string }
	> = {
		// GUESS
		guessGame: {
			id: chipId,
			icon: ["gamepad"],
			label: "Grę",
			color: "gaming",
		},
		guessGameCharacter: {
			id: chipId,
			icon: ["gamepad", "person"],
			label: "Postać z gry",
			color: "gaming",
		},
		guessMovie: {
			id: chipId,
			icon: ["movies"],
			label: "Film",
			color: "watching",
		},
		guessLeagueChampion: {
			id: chipId,
			icon: ["league-of-legends"],
			label: "Postać z lola",
			color: "league",
		},

		//BY
		byAchievement: {
			id: chipId,
			icon: ["achievement"],
			label: "Osiągnięciu",
			color: "gaming",
		},
		byGameOver: {
			id: chipId,
			icon: ["skull"],
			label: "Ekranie porażki",
			color: "gaming",
		},
		byInventory: {
			id: chipId,
			icon: ["backpack"],
			label: "Ekwipunku",
			color: "gaming",
		},
		byMod: {
			id: chipId,
			icon: ["modify"],
			label: "Modzie",
			color: "gaming",
		},
		byScreenshot: {
			id: chipId,
			icon: ["screenshot"],
			label: "Zrzucie ekranu",
			color: "gaming",
		},
		byTitleScreen: {
			id: chipId,
			icon: ["title"],
			label: "Ekranie tytułowym",
			color: "gaming",
		},
	};

	return (
		chipMap[chipName] ?? {
			id: "0",
			icon: ["defaultCategory"],
			label: chipName,
			color: "text",
		}
	);
};
