import { Route, Routes } from "react-router-dom";
import Index from "./components/pages/Index";
import QuizSession from "./components/pages/QuizSession";
import AuthTwitchCallback from "./components/pages/AuthTwitchCallback";
import QuizOverlay from "./components/pages/QuizOverlay";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/community/join" element={<Index />} />
				<Route path="/auth/twitch/callback" element={<AuthTwitchCallback />} />
				<Route path="/session/:id" element={<QuizSession />} />
				<Route path="/overlay/:twitchId" element={<QuizOverlay />} />
			</Routes>
		</>
	);
}

export default App;
