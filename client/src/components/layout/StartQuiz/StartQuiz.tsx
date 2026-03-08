import { Link } from "react-router-dom";
import styles from "./StartQuiz.module.scss";
import type { Set } from "../../../types";
import { useEffect, useState } from "react";
import { getData } from "../../../api/getDataApi";

const StartQuizButton = ({ refresh }: { refresh: boolean }) => {
	const [selectedSet, setSelectedSet] = useState<Set | null>(null);

	useEffect(() => {
		getData("set").then((data) => {
			const selected = data.find((set: Set) => set.selected);
			setSelectedSet(selected);
		});
	}, [refresh]);

	return (
		<div className={styles.startQuizButton}>
			<div className={styles.content}>
				<div className={styles.title}>
					<h2 className={styles.titleText}>
						{selectedSet && selectedSet.name}
					</h2>
					<div className={styles.spacer}></div>
				</div>
				<Link to="/quiz" className={styles.startButtonLink}>
					Wybierz
				</Link>
			</div>
		</div>
	);
};

export default StartQuizButton;
