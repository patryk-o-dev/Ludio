import { useEffect, useState } from "react";
import styles from "./SetSelector.module.scss";
import { getData } from "../../../api/getDataApi";
import type { Set } from "../../../types";

const SetSelector = () => {
	const [sets, setSets] = useState<Set[]>([]);
	const [selectedSet, setSelectedSet] = useState<Set | null>(null);
	useEffect(() => {
		getData("set").then((data) => setSets(data));
	}, []);

	const handleSelectSet = (s: Set) => {
		console.log("Selected set: ", s);
		fetch(`http://localhost:3000/api/set/select/${s.id}`, {
			method: "PATCH",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to select set");
				}
				return res.json();
			})
			.then((data) => {
				setSelectedSet(data);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	return (
		<div className={styles.setSelector}>
			{!selectedSet && (
				<>
					<h4>Wybierz Zestaw</h4>
					<ul className={styles.setList}>
						{sets.map((s) => (
							<li key={s.id} className={styles.setItem}>
								<div className={styles.setDetails}>
									<h4>{s.name}</h4>
									<p>{s.done ? "Done" : "Not Done"}</p>
									<p>
										{s.tags.some((tag) => tag.unlocked === false)
											? "Locked"
											: "Unlocked"}
									</p>
									<ul>
										{s.tags.map((tag) => (
											<li key={tag.id}>{tag.name}</li>
										))}
									</ul>
									<button onClick={() => handleSelectSet(s)}>Wybierz</button>
								</div>
							</li>
						))}
					</ul>
				</>
			)}
			{selectedSet && (
				<>
					<h4>Wybrano</h4>
					<div className={styles.selectedSet}>
						<h4>{selectedSet?.name}</h4>
						<p>{selectedSet?.done ? "Done" : "Not Done"}</p>
						<p>
							{selectedSet?.tags.some((tag) => tag.unlocked === false)
								? "Locked"
								: "Unlocked"}
						</p>
						<ul>
							{selectedSet?.tags.map((tag) => (
								<li key={tag.id}>{tag.name}</li>
							))}
						</ul>
					</div>
				</>
			)}
		</div>
	);
};

export default SetSelector;
