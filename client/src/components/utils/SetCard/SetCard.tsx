import styles from "./SetCard.module.scss";

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
			<h3 className={styles.setName}>{name}</h3>
			{/* <img
				src={unlocked ? "#" : "#"}
				alt={unlocked ? "Unlocked" : "Locked"}
				className={styles.lockIcon}
			/> */}
		</div>
	);
};

export default SetCard;
