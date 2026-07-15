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
			label: "chips.guess_game",
			color: "gaming",
		},
		guessGameCharacter: {
			id: chipId,
			icon: ["gamepad", "person"],
			label: "chips.guess_game_character",
			color: "gaming",
		},
		guessMovie: {
			id: chipId,
			icon: ["movies"],
			label: "chips.guess_movie",
			color: "watching",
		},
		guessLeagueChampion: {
			id: chipId,
			icon: ["leagueoflegends"],
			label: "chips.guess_league_champion",
			color: "league",
		},

		//BY
		byAchievement: {
			id: chipId,
			icon: ["achievement"],
			label: "chips.by_achievement",
			color: "gaming",
		},
		byGameOver: {
			id: chipId,
			icon: ["skull"],
			label: "chips.by_game_over",
			color: "gaming",
		},
		byInventory: {
			id: chipId,
			icon: ["backpack"],
			label: "chips.by_inventory",
			color: "gaming",
		},
		byMod: {
			id: chipId,
			icon: ["modify"],
			label: "chips.by_mod",
			color: "gaming",
		},
		byScreenshot: {
			id: chipId,
			icon: ["screenshot"],
			label: "chips.by_screenshot",
			color: "gaming",
		},
		byTitleScreen: {
			id: chipId,
			icon: ["title"],
			label: "chips.by_title_screen",
			color: "gaming",
		},
		byCosplay: {
			id: chipId,
			icon: ["person"],
			label: "chips.by_cosplay",
			color: "gaming",
		},
		byImage: {
			id: chipId,
			icon: ["screenshot"],
			label: "chips.by_image",
			color: "gaming",
		},
		byDeath: {
			id: chipId,
			icon: ["skull"],
			label: "chips.by_death",
			color: "league",
		},
		byPick: {
			id: chipId,
			icon: ["leagueoflegends"],
			label: "chips.by_pick",
			color: "league",
		},
		byFrame: {
			id: chipId,
			icon: ["movies"],
			label: "chips.by_frame",
			color: "watching",
		},
		byTrailer: {
			id: chipId,
			icon: ["movies"],
			label: "chips.by_trailer",
			color: "watching",
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

export const chipFilterNameToTranslationKey = (filterName: string) => {
	const filterMap: Record<string, string> = {
		onlyHorror: "filters.only_horror",
		onlyMale: "filters.only_male",
		onlyFemale: "filters.only_female",
		onlyDeath: "filters.only_death",
		onlyPick: "filters.only_pick",
	};

	return filterMap[filterName] ?? filterName;
};
