import { useEffect, useState } from "react";
import type { Category, Player } from "../../utils/types/types";

const CategoryEnhancer = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [player, setPlayer] = useState<Player>({
		id: "",
		exp: 0,
	});

	useEffect(() => {
		fetch("http://localhost:3000/api/category")
			.then((res) => res.json())
			.then((data) => {
				setCategories(data);
			})
			.catch((err) => {
				console.error("Error fetching categories:", err);
			});
		fetch("http://localhost:3000/api/player")
			.then((res) => res.json())
			.then((data) => {
				setPlayer(data[0]);
			})
			.catch((err) => {
				console.error("Error fetching player data:", err);
			});
	}, []);

	const addPlayerExp = (playerId: string, exp: number) => {
		fetch(`http://localhost:3000/api/player/${playerId}/earn-exp`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ exp }),
		})
			.then((res) => res.json())
			.then((data) => {
				setPlayer(data);
			})
			.catch((err) => {
				console.error("Error adding player EXP:", err);
			});
	};

	const enhanceCategory = (categoryId: string) => {
		if (
			categories.some(
				(category) =>
					category.id === categoryId && category.lvl >= category.lvlMax,
			)
		) {
			alert("Category has reached maximum level!");
		} else if (player.exp > 0) {
			addPlayerExp(player.id, -1);
			fetch(`http://localhost:3000/api/category/${categoryId}/enhance`, {
				method: "PATCH",
			})
				.then((res) => res.json())
				.then((data) => {
					setCategories((prevCategories) =>
						prevCategories.map((category) =>
							category.id === categoryId ? data : category,
						),
					);
				})
				.catch((err) => {
					console.error("Error enhancing category:", err);
				});
		} else {
			alert("Not enough EXP to enhance category!");
		}
	};

	return (
		<div>
			<p>CategoryEnhancer</p>
			<p>Player EXP: {player.exp}</p>
			<button onClick={() => addPlayerExp(player.id, 5)}>Dodaj EXP:</button>
			<ul>
				{categories.map((category) => (
					<li key={category.id}>
						<p>{category.name}</p>
						<p>
							{category.lvl} / {category.lvlMax}
						</p>
						<p>
							{category.expAdded} / {category.expNeeded}
						</p>
						<button onClick={() => enhanceCategory(category.id)}>Plus</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryEnhancer;
