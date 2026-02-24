import { useEffect, useState } from "react";
import styles from "./SetSelector.module.scss";
import { getData } from "../../../api/getDataApi";

type Set = {
	id: string;
	name: string;
	tags: { id: string; name: string }[];
	done: boolean;
};

const SetSelector = () => {
	const [sets, setSets] = useState<Set[]>([]);
	useEffect(() => {
		getData("set").then((data) => setSets(data));
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
							<p>
								{set.name} - {set.done ? "Done" : "Not Done"}
							</p>
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
