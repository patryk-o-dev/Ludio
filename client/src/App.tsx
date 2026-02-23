import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Quiz from "./components/pages/Quiz/Quiz";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/quiz" element={<Quiz />} />
			</Routes>
		</>
	);
}

export default App;
