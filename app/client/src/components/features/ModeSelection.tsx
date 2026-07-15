import { useTranslation } from "react-i18next";

const ModeSelection = () => {
	const { t } = useTranslation();

	return (
		<div className="border-l border-(--text-secondary) pl-12 h-12 flex items-center">
			<ul className="flex flex-row gap-8 uppercase text-lg font-bold">
				<li className="text-(--text)">{t("modes.solo")}</li>
				<li className="text-(--accent) underline underline-offset-4">
					{t("modes.multi")}
				</li>
			</ul>
		</div>
	);
};

export default ModeSelection;
