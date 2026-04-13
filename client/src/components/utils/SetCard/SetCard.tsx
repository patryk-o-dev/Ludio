import styles from "./SetCard.module.scss";
import checkmarkPlaceholder from "../../../assets/icons/checkmarkPlaceholder.png";
import lockPlaceholder from "../../../assets/icons/lockPlaceholder.png";

type SetCardProps = {
	name: string;
	unlocked: boolean;
	special?: "horror";
	done?: boolean;
};
const SetCard = ({ name, unlocked, special, done }: SetCardProps) => {
	return (
		<div
			className={`${styles.setCard} ${special === "horror" ? styles.horror : ""}`}
		>
			<h3 className={styles.setName}>{name}</h3>
			{!unlocked && (
				<img src={lockPlaceholder} alt="Locked" className={styles.lockIcon} />
			)}
			{done && (
				<img
					src={checkmarkPlaceholder}
					alt="Done"
					className={styles.lockIcon}
				/>
			)}
		</div>
	);
};

export default SetCard;
