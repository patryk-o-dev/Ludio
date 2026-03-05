import CategoryEnhancer from "../../features/CategoryEnhancer/CategoryEnhancer";
import styles from "./Home.module.scss";
import SetPicker from "../../layout/SetPicker/SetPicker";
import { useState } from "react";
import StartQuizButton from "../../layout/StartQuizButton/StartQuizButton";
import Logo from "../../layout/Logo/Logo";

const Home = () => {
	const [refresh, setRefresh] = useState(false);

	return (
		<div className={styles.home}>
			<div className={styles.logoWrapper}>
				<Logo />
			</div>
			<div className={styles.mainContent}>
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
			</div>
			<div className={styles.categoryEnhancerContainer}>
				<CategoryEnhancer />
			</div>
		</div>
	);
};

export default Home;
