import { useEffect, useState } from "react";
import type { Category, Player } from "../../../types";
import { getData } from "../../../api/getDataApi";
import styles from "./CategoryEnhancer.module.scss";

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
		<div className={styles.categoryEnhancer}>
			<ul className={styles.categoryList}>
				{categories.map((category) => (
					<li key={category.id} className={styles.categoryItem}>
						<div className={styles.categoryName}>
							<p>{category.name}</p>
						</div>
						<div className={styles.categoryProgress}>
							<p>Progress Bar</p>{" "}
						</div>

						<button
							onClick={() => enhanceCategory(category.id)}
							className={styles.enhanceButton}
						>
							Ulepsz
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryEnhancer;
