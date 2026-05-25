import { Route, Routes } from "react-router-dom";
import Index from "./components/pages/Index";
import QuizSession from "./components/pages/QuizSession";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/session/:id" element={<QuizSession />} />
			</Routes>
		</>
	);
}

export default App;
