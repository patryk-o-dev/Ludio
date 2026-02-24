import { useEffect, useState } from "react";
import type { Category, Player } from "../../../types";
import { getData } from "../../../api/getDataApi";

const CategoryEnhancer = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [player, setPlayer] = useState<Player>({
		id: "",
		exp: 0,
	});

	useEffect(() => {
		getData("category").then((data) => setCategories(data));
		getData("player").then((data) => setPlayer(data[0]));
	}, []);

	const enhanceCategory = (categoryId: string) => {
		if (
			categories.some(
				(category) =>
					category.id === categoryId && category.lvl >= category.lvlMax,
			)
		) {
			alert("Category has reached maximum level!");
		} else if (player.exp > 0) {
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
			<ul>
				{categories.map((category) => (
					<li key={category.id}>
						<p>{category.name}</p>
						<p>
							Poziom: {category.lvl} / {category.lvlMax}
						</p>
						<p>
							EXP: {category.expAdded} / {category.expNeeded}
						</p>
						<button onClick={() => enhanceCategory(category.id)}>Plus</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryEnhancer;
