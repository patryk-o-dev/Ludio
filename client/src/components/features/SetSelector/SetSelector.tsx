import { useEffect, useState } from "react";
import styles from "./SetSelector.module.scss";

type Set = {
	id: string;
	name: string;
	tags: { id: string; name: string }[];
};

const SetSelector = () => {
	const [sets, setSets] = useState<Set[]>([]);
	useEffect(() => {
		try {
			fetch("http://localhost:3000/api/set")
				.then((res) => {
					if (!res.ok) {
						throw new Error("Failed to fetch sets");
					}
					return res.json();
				})
				.then((data) => {
					setSets(data);
				})
				.catch((err) => {
					console.error("Error fetching sets:", err);
				});
		} catch (err) {
			console.error("Error fetching sets:", err);
		}
	}, []);

	const handleSelectSet = (set: Set) => {
		localStorage.setItem("quizSet", JSON.stringify(set));
	};

	return (
		<div className={styles.setSelector}>
			<h4>Wybierz Zestaw</h4>
			<ul className={styles.setList}>
				{sets.map((set) => (
					<li key={set.id} className={styles.setItem}>
						<div className={styles.setDetails}>
							<p>{set.name}</p>
							<ul>
								{set.tags.map((tag) => (
									<li key={tag.id}>{tag.name}</li>
								))}
							</ul>
							<button onClick={() => handleSelectSet(set)}>Wybierz</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SetSelector;
