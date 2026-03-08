import styles from "./SetCard.module.scss";
import categoryGameIcon from "../../../assets/icons/gameIcon.png";

type SetCardProps = {
	name: string;
	unlocked: boolean;
	special?: "horror";
};
const SetCard = ({ name, unlocked, special }: SetCardProps) => {
	return (
		<div
			className={`${styles.setCard} ${special === "horror" ? styles.horror : ""}`}
		>
			<img
				src={categoryGameIcon}
				alt={`categoryIcon`}
				className={styles.categoryIcon}
			/>
			<h3 className={styles.setName}>{name}</h3>
			<img
				src={unlocked ? "#" : "#"}
				alt={unlocked ? "Unlocked" : "Locked"}
				className={styles.lockIcon}
			/>
		</div>
	);
};

export default SetCard;
