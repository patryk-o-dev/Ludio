import { useEffect, useState } from "react";
import type { Category, Player } from "../../../types";
import { getData } from "../../../api/getDataApi";
import styles from "./CategoryEnhancer.module.scss";

const CategoryEnhancer = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [player, setPlayer] = useState<Player>();

	useEffect(() => {
		getData("category").then((data) => setCategories(data));
		getData("player").then((data) => setPlayer(data));
	}, []);

	const enhanceCategory = (categoryId: string) => {
		if (
			categories.some(
				(category) =>
					category.id === categoryId && category.lvl >= category.lvlMax,
			)
		) {
			alert("Category has reached maximum level!");
		} else if (player && player.exp > 0) {
			fetch(`http://localhost:3000/api/category/${categoryId}/enhance`, {
				method: "PATCH",
			})
				.then((res) => res.json())
				.then(() => {
					getData("player").then((data) => setPlayer(data));
					getData("category").then((data) => setCategories(data));
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
			<h2 className={styles.title}>
				Kategorie {player ? player.exp : "Loading..."}
			</h2>
			<ul className={styles.categoryList}>
				{categories.map((category) => (
					<li key={category.id} className={styles.categoryItem}>
						<div className={styles.cardHeading}>
							<p>{category.name}</p>
							<div className={styles.spacer}></div>
						</div>
						<div className={styles.cardProgress}>
							<div className={styles.progressBar}>
								<div
									className={styles.progressFill}
									style={{
										width: `${category.expNeeded > 0 ? (category.expAdded / category.expNeeded) * 100 : 0}%`,
									}}
								/>
								<span className={styles.progressLabel}>
									{category.expAdded} / {category.expNeeded}
								</span>
							</div>
							<button
								className={styles.enhanceButton}
								onClick={() => enhanceCategory(category.id)}
								disabled={
									category.lvl >= category.lvlMax ||
									(player ? player.exp <= 0 : true)
								}
							>
								+
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryEnhancer;
