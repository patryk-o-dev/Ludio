import Icons from "../utils/Icons/Icons";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { withAuth } from "../utils/api";

const API = import.meta.env.VITE_API_URL;

const Settings = () => {
	const { t } = useTranslation();
	const [showSettings, setShowSettings] = useState(false);
	const [showStreamerLink, setShowStreamerLink] = useState(false);
	const [copiedStreamerLink, setCopiedStreamerLink] = useState(false);
	const [communityLink, setCommunityLink] = useState<string>("");
	const [allowFriendRequests, setAllowFriendRequests] = useState(true);
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
				duration: 9,
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

	const handleStreamerLinkClick = async () => {
		const response = await fetch(
			`${API}/community`,
			withAuth({
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}),
		);
		const link = await response.text();
		setShowStreamerLink(!showStreamerLink);
		setCommunityLink(link);
	};

	const handleCopyLink = () => {
		navigator.clipboard.writeText(communityLink);
		setCopiedStreamerLink(true);
		setTimeout(() => setCopiedStreamerLink(false), 2000);
	};

	const handleFriendRequestsChange = async () => {
		const newValue = !allowFriendRequests;
		setAllowFriendRequests(newValue);

		await fetch(
			`${API}/user/settings/friend-requests`,
			withAuth({
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					allowFriendRequests: newValue,
				}),
			}),
		);
	};

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
					<ul className="flex flex-col gap-2 w-0 min-w-60">
						<li className="flex flex-row flex-wrap gap-2 w-full items-center justify-center">
							<h5 className="w-full text-center uppercase font-medium text-sm drop-shadow-xs drop-shadow-zinc-800 tracking-wider">
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
						<li className="flex flex-row flex-wrap gap-2 w-full items-center justify-center">
							<h5 className="w-full text-center uppercase font-medium text-sm drop-shadow-xs drop-shadow-zinc-800 tracking-wider">
								{t("settings.friendRequests")}
							</h5>
							<div className="flex flex-row items-center justify-around gap-2 w-full">
								<label className="inline-flex items-center justify-center cursor-pointer relative">
									<input
										type="checkbox"
										checked={!allowFriendRequests}
										onChange={handleFriendRequestsChange}
										className="sr-only peer"
										value=""
									/>
									<div className="group peer bg-(--bgc-quaternary) rounded-full duration-300 w-12 h-5 ring-2 ring-(--text) after:duration-300 after:bg-(--text) peer-checked:after:bg-(--accent) peer-checked:ring-(--accent) after:rounded-full after:absolute after:h-3 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"></div>
								</label>
							</div>
						</li>
						<li className="flex flex-row flex-wrap gap-2 w-full items-center justify-center">
							<h5 className="flex gap-2 justify-center w-full text-center uppercase font-medium text-sm drop-shadow-xs drop-shadow-zinc-800 tracking-wider">
								{t("settings.streamerMode")}
								<Icons
									name="twitch"
									size={20}
									color={showStreamerLink ? "twitch" : "text"}
									isAddon={false}
								/>
							</h5>
							<div className="flex flex-row items-center justify-around gap-2 w-full">
								<label className="inline-flex items-center justify-center cursor-pointer relative">
									<input
										type="checkbox"
										checked={showStreamerLink}
										onChange={handleStreamerLinkClick}
										className="sr-only peer"
										value=""
									/>
									<div className="group peer bg-(--bgc-quaternary) rounded-full duration-300 w-12 h-5 ring-2 ring-(--text) after:duration-300 after:bg-(--text) peer-checked:after:bg-(--accent) peer-checked:ring-(--accent) after:rounded-full after:absolute after:h-3 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"></div>
								</label>
							</div>

							{showStreamerLink && (
								<button
									onClick={handleCopyLink}
									className="flex w-full mt-2 text-center border border-(--accent) bg-(--bgc-primary) p-2 rounded-lg hover:bg-(--accent-darker)/25 hover:cursor-pointer transform transition-all duration-200"
								>
									<span className="min-w-0 truncate text-(--text-secondary) text-sm font-light">
										{copiedStreamerLink ? (
											<div className="flex items-center justify-center gap-1 text-(--positive)">
												{t("copied")}
												<Icons
													name="circleCheck"
													size={16}
													color="positive"
													isAddon={false}
												/>
											</div>
										) : (
											communityLink
										)}
									</span>
								</button>
							)}
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Settings;
