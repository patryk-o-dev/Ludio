import ChipCard from "../utils/ChipCard";

const ChipList = () => {
	return (
		<div className="flex flex-col p-4">
			<p className="text-(--text) font-bold text-md uppercase">Zasady Quizu</p>
			<p className="text-(--accent) text-sm font-semibold mt-4">
				Wybierz kategorie:
			</p>
			<div className="flex flex-col gap-4">
				<ChipCard />
				<ChipCard />
				<ChipCard />
				<ChipCard />
			</div>
		</div>
	);
};

export default ChipList;
