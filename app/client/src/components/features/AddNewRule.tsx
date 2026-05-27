import addIcon from "../../assets/icons/add.png";
import useGameConfigStore from "../../store/gameConfigStore";

const AddNewRule = () => {
	const rules = useGameConfigStore((state) => state.rules);
	const addRule = useGameConfigStore((state) => state.addRule);

	const lastRule = rules[rules.length - 1];

	const disabled = lastRule?.guessId === null || lastRule?.byId === null;

	const onClick = () => {
		const newRule = {
			index: rules.length,
			guessId: null,
			byId: null,
			filterIds: [],
		};

		addRule(newRule);
	};

	return (
		<div
			onClick={disabled ? undefined : onClick}
			className={`flex flex-col items-center align-middle gap-4 p-12 border-dashed border-2 rounded-lg transition-opacity ${
				disabled
					? "border-(--bgc-quaternary) opacity-40 cursor-not-allowed"
					: "border-(--text-secondary) hover:border-(--info) hover:cursor-pointer"
			}`}
		>
			<img className="w-10 h-10" src={addIcon} alt="Add" />
			<p className="text-(--text-secondary) uppercase text-sm">
				Dodaj nową regułę
			</p>
		</div>
	);
};

export default AddNewRule;
