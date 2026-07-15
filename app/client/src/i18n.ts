import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pl from "./locales/pl/translation.json";
import en from "./locales/en/translation.json";

i18n.use(initReactI18next).init({
	resources: {
		pl: {
			translation: pl,
		},
		en: {
			translation: en,
		},
	},
	lng: navigator.language,
	supportedLngs: ["pl", "en"],
	nonExplicitSupportedLngs: true,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
