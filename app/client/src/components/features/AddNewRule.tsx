import addIcon from "../../assets/icons/add.png";

const AddNewRule = () => {
	return (
		<div className="flex flex-col items-center align-middle gap-4 p-12 border-dashed border-2 border-(--text-secondary) rounded-lg hover:border-(--info) hover:cursor-pointer">
			<img className="w-10 h-10" src={addIcon} alt="Add" />
			<p className="text-(--text-secondary) uppercase text-sm">Dodaj nową regułę</p>
		</div>
	);
};

export default AddNewRule;
