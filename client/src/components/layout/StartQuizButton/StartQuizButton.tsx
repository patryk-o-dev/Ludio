import { Link } from "react-router-dom";
import styles from "./StartQuizButton.module.scss";
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
			<Link to="/quiz" className={styles.startButtonLink}>
				Start Quiz
			</Link>
			<div className={styles.selectedSet}>
				{selectedSet && selectedSet.name}
			</div>
		</div>
	);
};

export default StartQuizButton;
