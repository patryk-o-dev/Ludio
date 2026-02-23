import { Link } from "react-router-dom";
import CategoryEnhancer from "../../features/CategoryEnhancer/CategoryEnhancer";

const Home = () => {
	return (
		<div>
			<Link to="/quiz">Start Quiz</Link>
			<CategoryEnhancer />
		</div>
	);
};

export default Home;
