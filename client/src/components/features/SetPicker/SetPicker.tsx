import { useEffect, useState } from "react";
import styles from "./SetPicker.module.scss";
import { getData } from "../../../api/getDataApi";
import { type Set } from "../../../types";
import SetCard from "../../utils/SetCard/SetCard";
import StartQuiz from "../../layout/StartQuiz/StartQuiz";

const SetPicker = () => {
	const [unlockedSets, setUnlockedSets] = useState<Set[]>([]);
	const [lockedSets, setLockedSets] = useState<Set[]>([]);
	const [selectedSet, setSelectedSet] = useState<Set | null>(null);

	useEffect(() => {
		getData("set").then((data) => {
			const unlocked = data.filter((set: Set) => set.unlocked);
			const locked = data.filter((set: Set) => !set.unlocked);
			setUnlockedSets(unlocked);
			setLockedSets(locked);
		});
	}, []);

	const handleSelectSet = async (set: Set) => {
		try {
			const res = await fetch(
				`http://localhost:3000/api/set/select/${set.id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			if (res.ok) {
				const updatedSet = await res.json();
				if (updatedSet) {
					setSelectedSet(updatedSet);
				}
			} else {
				console.error("Error selecting set:", res.statusText);
			}
		} catch (error) {
			console.error("Error selecting set:", error);
		}
	};

	return (
		<div className={styles.setPicker}>
			<section className={styles.setsSection}>
				<div>
					<h2 className={styles.sectionTitle}>Unlocked Sets</h2>
				</div>
				<ul className={styles.setList}>
					{unlockedSets.map((set) => (
						<li
							key={set.id}
							className={styles.setItem}
							onClick={() => handleSelectSet(set)}
						>
							<SetCard name={set.name} unlocked={set.unlocked} />
						</li>
					))}
				</ul>
			</section>
			<StartQuiz setTitle={selectedSet ? selectedSet.name : "Wybierz Zestaw"} />
			<section className={styles.setsSection}>
				<div>
					<h2 className={styles.sectionTitle}>Locked Sets</h2>
				</div>
				<ul className={styles.setList}>
					{lockedSets.map((set) => (
						<li key={set.id} className={styles.setItem}>
							<SetCard name={set.name} unlocked={set.unlocked} />
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default SetPicker;
