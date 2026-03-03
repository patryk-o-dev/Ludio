import CategoryEnhancer from "../../features/CategoryEnhancer/CategoryEnhancer";
import styles from "./Home.module.scss";
import SetPicker from "../../layout/CategoriesPicker/SetPicker";
import { useState } from "react";
import StartQuizButton from "../../layout/StartQuizButton/StartQuizButton";

const Home = () => {
	const [refresh, setRefresh] = useState(false);

	return (
		<div className={styles.home}>
			<div className={styles.categoriesUnlocked}>
				<SetPicker
					variant="unlocked"
					onSelectSet={() => setRefresh(!refresh)}
				/>
			</div>
			<div className={styles.startButton}>
				<StartQuizButton refresh={refresh} />
			</div>
			<div className={styles.categoriesLocked}>
				<SetPicker variant="locked" />
			</div>
			<div className={styles.categoryEnhancerContainer}>
				<CategoryEnhancer />
			</div>
		</div>
	);
};

export default Home;
