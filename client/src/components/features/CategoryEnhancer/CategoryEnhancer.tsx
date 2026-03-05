import { useEffect, useState } from "react";
import type { Category, Player } from "../../../types";
import { getData } from "../../../api/getDataApi";
import styles from "./CategoryEnhancer.module.scss";
import addIcon from "../../../assets/icons/addPlaceholder.png";
import categoriesPlaceholder from "../../../assets/icons/categoriesPlaceholder.png";

const CategoryEnhancer = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [player, setPlayer] = useState<Player>({
		id: "",
		exp: 0,
	});

	useEffect(() => {
		getData("category").then((data) => setCategories(data));
		getData("player").then((data) => setPlayer(data[0]));
	}, [categories]);

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
							<h5>{category.name}</h5>
						</div>
						<div className={styles.categoryLevel}>
							<img src={categoriesPlaceholder} alt="Category" />
							<span className={styles.categoryLevelText}>
								Level {category.lvl}
							</span>
						</div>
						<div className={styles.categoryProgress}>
							{Array.from({ length: category.expNeeded }).map((_, idx) => (
								<div
									key={idx}
									className={
										idx < category.expAdded
											? `${styles.progressSquare} ${styles.active}`
											: `${styles.progressSquare} ${styles.inactive}`
									}
								/>
							))}
						</div>
						<div className={styles.enhanceButtonContainer}>
							<button
								onClick={() => enhanceCategory(category.id)}
								className={styles.enhanceButton}
							>
								<img src={addIcon} alt="Add" />
								<p>Ulepsz</p>
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryEnhancer;
