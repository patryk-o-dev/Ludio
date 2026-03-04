import { useEffect, useState } from "react";
import styles from "./SetPicker.module.scss";
import { getData } from "../../../api/getDataApi";
import { type Set } from "../../../types";
import categoriesPlaceholder from "../../../assets/icons/categoriesPlaceholder.png";
import lockPlaceholder from "../../../assets/icons/lockPlaceholder.png";
import unlockPlaceholder from "../../../assets/icons/unlockPlaceholder.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const SetPicker = ({
	variant,
	onSelectSet,
}: {
	variant: string;
	onSelectSet?: (set: Set) => void;
}) => {
	const [unlockedSets, setUnlockedSets] = useState<Set[]>([]);
	const [lockedSets, setLockedSets] = useState<Set[]>([]);

	gsap.registerPlugin(useGSAP);

	useEffect(() => {
		getData("set").then((data) => {
			const unlocked = data.filter((set: Set) => set.unlocked);
			const locked = data.filter((set: Set) => !set.unlocked);
			setUnlockedSets(unlocked);
			setLockedSets(locked);
		});
	}, []);

	useGSAP(() => {
		const items = gsap.utils.toArray(`.${styles.lockedSet}`);

		(items as HTMLLIElement[]).forEach((item) => {
			const tooltip = item.querySelector(`.${styles.tooltip}`);

			let firstEnter = true;

			const setX = gsap.quickTo(tooltip, "x", {
				duration: 0.1,
				ease: "power1",
			});
			const setY = gsap.quickTo(tooltip, "y", {
				duration: 0.1,
				ease: "power1",
			});

			const align = (e: MouseEvent) => {
				if (firstEnter) {
					setX(e.clientX, e.clientX);
					setY(e.clientY, e.clientY);
					firstEnter = false;
				} else {
					setX(e.clientX);
					setY(e.clientY);
				}
			};
			const startFollow = () => document.addEventListener("mousemove", align);
			const stopFollow = () => document.removeEventListener("mousemove", align);

			const fade = gsap.to(tooltip, {
				opacity: 1,
				paused: true,
				duration: 0.3,
				onReverseComplete: stopFollow,
			});

			item.addEventListener("mousemove", (e: MouseEvent) => {
				firstEnter = true;
				fade.play();
				startFollow();
				align(e);
			});

			item.addEventListener("mouseleave", () => fade.reverse());
		});
	}, [lockedSets]);

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
				if (onSelectSet) {
					onSelectSet(updatedSet);
				}
			} else {
				console.error("Error selecting set:", res.statusText);
			}
		} catch (error) {
			console.error("Error selecting set:", error);
		}
	};

	return (
		<div className={styles.setDisplayWrapper}>
			<div className={styles.card}></div>
			{variant === "unlocked" && (
				<div className={styles.setsDisplay}>
					<div className={styles.setsDisplayHeader}>
						<h3>Odblokowane Zestawy</h3>
					</div>
					<ul className={styles.setsList}>
						{unlockedSets.map((set) => (
							<li
								key={set.id}
								className={`${styles.set} ${styles.unlockedSet}`}
							>
								<img src={categoriesPlaceholder} alt="setIcon" />
								<h4>{set.name}</h4>
								<img src={unlockPlaceholder} alt="decorIcon" />
								<button
									className={styles.addSetButton}
									onClick={() => {
										handleSelectSet(set);
									}}
								></button>
							</li>
						))}
					</ul>
				</div>
			)}
			{variant === "locked" && (
				<div className={styles.setsDisplay}>
					<div className={styles.setsDisplayHeader}>
						<h3>Zablokowane Zestawy</h3>
					</div>
					<ul className={styles.setsList}>
						{lockedSets.map((set) => (
							<li key={set.id} className={`${styles.set} ${styles.lockedSet}`}>
								<div className={styles.tooltip}>
									<h5>Zwiększ poziom:</h5>
									<ul>
										{Array.from(
											new Set(
												set.tags
													.filter((t) => t.category.lvl < t.lvl)
													.map((t) => t.category.name),
											),
										).map((name) => (
											<li key={name}>{name}</li>
										))}
									</ul>
								</div>
								<img src={categoriesPlaceholder} alt="setIcon" />
								<h4>{set.name}</h4>
								<img src={lockPlaceholder} alt="lockIcon" />
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default SetPicker;
