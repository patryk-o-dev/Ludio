import Icons from "../utils/Icons/Icons";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Settings = () => {
	const { t } = useTranslation();
	const [showSettings, setShowSettings] = useState(false);
	const settingsContainerRef = useRef<HTMLDivElement>(null);
	const settingsIconRef = useRef<HTMLDivElement>(null);
	const spinTweenRef = useRef<gsap.core.Tween | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				settingsContainerRef.current &&
				!settingsContainerRef.current.contains(event.target as Node)
			) {
				setShowSettings(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useGSAP(() => {
		if (!settingsIconRef.current) return;

		if (showSettings) {
			spinTweenRef.current?.kill();

			spinTweenRef.current = gsap.to(settingsIconRef.current, {
				rotation: "+=360",
				duration: 7,
				ease: "none",
				repeat: -1,
			});
		} else {
			spinTweenRef.current?.kill();
			spinTweenRef.current = null;

			gsap.to(settingsIconRef.current, {
				rotation: 0,
				duration: 1,
				ease: "power2.inOut",
				overwrite: true,
			});
		}

		return () => {
			spinTweenRef.current?.kill();
		};
	}, [showSettings]);

	return (
		<div
			ref={settingsContainerRef}
			onClick={() => setShowSettings(!showSettings)}
			className="relative"
		>
			<div ref={settingsIconRef}>
				<Icons
					name="settings"
					size={32}
					color={showSettings ? "info" : "text"}
					isAddon={false}
				/>
			</div>

			{showSettings && (
				<div
					onClick={(e) => e.stopPropagation()}
					className="absolute top-10 right-0 border border-(--accent) bg-(--bgc-secondary) text-(--text) p-4 rounded-lg shadow-lg z-50"
				>
					<ul className="flex flex-col gap-2 w-0 min-w-40">
						<li className="flex flex-row flex-wrap gap-2 w-full items-center justify-center">
							<h5 className="w-full text-center uppercase font-medium drop-shadow-xs drop-shadow-zinc-800 tracking-wider">
								{t("settings.language")}
							</h5>
							<button
								onClick={() => i18n.changeLanguage("en")}
								className={`flex flex-1 gap-1 justify-center rounded-lg px-3 py-2 text-xs font-light transition-all duration-200 ${
									i18n.language === "en"
										? "border border-(--accent) bg-(--bgc-primary) text-(--text)"
										: "hover:bg-(--accent)/15"
								}`}
							>
								<Icons
									name="ukFlag"
									size={24}
									color="primary"
									isAddon={false}
								/>
								EN
							</button>

							<button
								onClick={() => i18n.changeLanguage("pl")}
								className={`flex flex-1 gap-1 justify-center rounded-lg px-3 py-2 text-xs font-light transition-all duration-200 ${
									i18n.language === "pl"
										? "border border-(--accent) bg-(--bgc-primary) text-(--text)"
										: "hover:bg-(--accent)/15"
								}`}
							>
								<Icons
									name="polandFlag"
									size={24}
									color="primary"
									isAddon={false}
								/>
								PL
							</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Settings;
