import { Link } from "react-router-dom";
import styles from "./StartQuiz.module.scss";
import Logo from "../Logo/Logo";

const StartQuiz = ({ setTitle }: { setTitle: string }) => {
	return (
		<div className={styles.startQuizButton}>
			<Logo />
			<h2 className={styles.titleText}>{setTitle}</h2>
			<Link to={`/quiz`} className={styles.startButtonLink}>
				<span className={styles.inner}>Start</span>
			</Link>
		</div>
	);
};

export default StartQuiz;
