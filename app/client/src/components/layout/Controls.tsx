import arrowKey from "../../assets/icons/arrow-key.png";
import enterKey from "../../assets/icons/enter-key.png";

const Controls = () => {
	return (
		<div className="flex justify-center items-center gap-6">
			<div className="flex items-center gap-2">
				<div className="flex gap-1">
					<img src={arrowKey} alt="arrow up" className="w-10 h-10 opacity-60" />
					<img src={arrowKey} alt="arrow down" className="w-10 h-10 opacity-60 rotate-180" />
				</div>
				<p className="text-sm text-(--text-secondary) uppercase">Wybór</p>
			</div>
			<div className="w-px h-8 bg-(--text-secondary)/70" />
			<div className="flex items-center gap-2">
				<img src={enterKey} alt="enter" className="w-10 h-10 opacity-60" />
				<p className="text-sm text-(--text-secondary) uppercase">Potwierdź</p>
			</div>
		</div>
	);
};

export default Controls;
