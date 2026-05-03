import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Quiz from "./components/pages/Quiz/Quiz";
import FlexCenter from "./components/utils/FlexCenter/FlexCenter";

function App() {
	return (
		<>
			<FlexCenter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/quiz" element={<Quiz />} />
				</Routes>
			</FlexCenter>
		</>
	);
}

export default App;
