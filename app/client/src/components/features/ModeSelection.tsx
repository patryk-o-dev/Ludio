const ModeSelection = () => {
	return (
		<div className="border-l border-gray-600 pl-12 h-12 flex items-center">
			<ul className="flex flex-row gap-8 uppercase text-lg font-bold">
				<li className="text-(--text)">Solo</li>
				<li className="text-(--accent) underline underline-offset-4">Multi</li>
			</ul>
		</div>
	);
};

export default ModeSelection;
