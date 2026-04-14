import { useState } from "react";
import styles from "./SetCard.module.scss";
import checkmarkPlaceholder from "../../../assets/icons/checkmarkPlaceholder.png";
import lockPlaceholder from "../../../assets/icons/lockPlaceholder.png";
import type { Tag } from "../../../types";

type SetCardProps = {
	name: string;
	unlocked: boolean;
	special?: "horror";
	done?: boolean;
	lockedTags?: Tag[];
};
const SetCard = ({
	name,
	unlocked,
	special,
	done,
	lockedTags,
}: SetCardProps) => {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	return (
		<div
			className={`${styles.setCard} ${special === "horror" ? styles.horror : ""}`}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
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
			{!unlocked && isHovered && lockedTags && lockedTags.length > 0 && (
				<div
					className={styles.tooltip}
					style={{
						position: "fixed",
						left: mousePos.x + 12,
						top: mousePos.y + 12,
					}}
				>
					<p>Zbyt niski poziom:</p>
					<ul>
						{[
							...new Map(
								lockedTags.map((tag) => [tag.category.id, tag.category]),
							).values(),
						].map((category) => (
							<li key={category.id}>{category.name}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default SetCard;
