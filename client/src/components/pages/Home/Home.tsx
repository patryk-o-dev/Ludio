import CategoryEnhancer from "../../features/CategoryEnhancer/CategoryEnhancer";
import styles from "./Home.module.scss";
import SetPicker from "../../features/SetPicker/SetPicker";

const Home = () => {
	return (
		<div className={styles.home}>
			<SetPicker />
			<CategoryEnhancer />
		</div>
	);
};

export default Home;
