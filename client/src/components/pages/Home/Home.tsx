import CategoryEnhancer from "../../features/CategoryEnhancer/CategoryEnhancer";
import styles from "./Home.module.scss";
import SetPicker from "../../features/SetPicker/SetPicker";
import { useState } from "react";

const Home = () => {
	const [refreshKey, setRefreshKey] = useState(0);

	const handleSetsChange = () => setRefreshKey((k) => k + 1);

	return (
		<div className={styles.home}>
			<SetPicker refreshKey={refreshKey} />
			<CategoryEnhancer onEnhance={handleSetsChange} />
		</div>
	);
};

export default Home;
