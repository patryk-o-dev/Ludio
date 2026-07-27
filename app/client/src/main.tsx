import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import "./styles/tailwind.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import i18n from "./i18n";

document.documentElement.lang = i18n.language;

i18n.on("languageChanged", (lng) => {
	document.documentElement.lang = lng;
});

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<StrictMode>
			<App />
		</StrictMode>
	</BrowserRouter>,
);
