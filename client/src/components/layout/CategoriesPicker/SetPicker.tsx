import { useEffect, useState } from "react";
import styles from "./SetPicker.module.scss";
import { getData } from "../../../api/getDataApi";
import { type Set } from "../../../types";

const SetPicker = ({
	variant,
	onSelectSet,
}: {
	variant: string;
	onSelectSet?: (set: Set) => void;
}) => {
	const [unlockedSets, setUnlockedSets] = useState<Set[]>([]);
	const [lockedSets, setLockedSets] = useState<Set[]>([]);

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
			await fetch(`http://localhost:3000/api/set/select/${set.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error("Error selecting set:", error);
		}
	};

	return (
		<div className={styles.setDisplayWrapper}>
			{variant === "unlocked" && (
				<div className={styles.setsDisplay}>
					<ul className={styles.setsList}>
						{unlockedSets.map((set) => (
							<li key={set.id} className={styles.set}>
								<h4>{set.name}</h4>
								<p>{set.tags.map((tag) => tag.name).join(", ")}</p>
								<button
									className={styles.addSetButton}
									onClick={() => {
										handleSelectSet(set);
										if (onSelectSet) {
											onSelectSet(set);
										}
									}}
								></button>
							</li>
						))}
					</ul>
				</div>
			)}
			{variant === "locked" && (
				<div className={styles.setsDisplay}>
					<ul className={styles.setsList}>
						{lockedSets.map((set) => (
							<li key={set.id} className={styles.set}>
								<h4>{set.name}</h4>
								<p>{set.tags.map((tag) => tag.name).join(", ")}</p>
							</li>
						))}
					</ul>
				</div>
			)}
			<div className={styles.bottomGradient}>
				<div className={styles.imgWrapper}>
					<img src="#" alt="arrow" />
				</div>
			</div>
		</div>
	);
};

export default SetPicker;
