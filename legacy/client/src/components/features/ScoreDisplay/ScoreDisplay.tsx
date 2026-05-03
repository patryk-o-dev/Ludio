import type { Player, Set } from "../../../types";
import styles from "./ScoreDisplay.module.scss";

type ScoreDisplayProps = {
	player: Player;
	set: Set;
};

const ScoreDisplay = ({ player, set }: ScoreDisplayProps) => {
	return (
		<div className={styles.scoreDisplay}>
			<div className={styles.scoreDisplayElementsWrapper}>
				<div className={styles.scoreDisplayElement}>
					<p>
						Pytanie <span>{player?.questionIndex}</span> /{" "}
						<span>{set?.option.numberOfQuestions}</span>
					</p>
				</div>
				<div className={styles.spacer}></div>
				<div className={styles.scoreDisplayElement}>
					<p>
						Wynik: <span>{player?.score}</span> /{" "}
						<span>{set?.option.scoreNeeded}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ScoreDisplay;
