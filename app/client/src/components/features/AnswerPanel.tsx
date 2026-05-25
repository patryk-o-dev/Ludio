import { useState } from "react";
import searchIcon from "../../assets/icons/magnifying-glass.png";

const AnswerPanel = () => {
	const [selected, setSelected] = useState<number | null>(null);

	return (
		<div className="flex flex-1 flex-col gap-4 min-h-0">
			<div className="flex items-center gap-2 border border-(--accent)/40 rounded px-4 py-2 bg-(--bgc-basic) transition-shadow duration-300 focus-within:border-(--accent)/80 focus-within:shadow-[0_0_20px_2px_color-mix(in_srgb,var(--accent)_22%,transparent)]">
				<img className="w-6 h-6" src={searchIcon} alt="question icon" />
				<input
					type="text"
					placeholder="Your answer..."
					className="flex-1 bg-transparent outline-none text-(--text) caret-(--accent)"
				/>
			</div>
			<div className="flex-1 min-h-0 relative">
				<ul className="absolute inset-0 flex flex-col gap-2 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-(--accent)/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-(--accent)/70">
					{[
						"Answer 1",
						"Answer 2",
						"Answer 3",
						"Answer 4",
						"Answer 5",
						"Answer 6",
						"Answer 7",
						"Answer 8",
						"Answer 1",
						"Answer 2",
						"Answer 3",
						"Answer 4",
						"Answer 5",
						"Answer 6",
						"Answer 7",
						"Answer 8",
					].map((answer, i) => (
						<li key={i}>
							<button
								onClick={() => setSelected(i)}
								aria-selected={selected === i}
								className="w-full text-left px-4 py-2 rounded border border-(--accent)/50 bg-(--bgc-secondary) text-(--text) cursor-pointer transition-colors duration-200 hover:bg-(--accent)/15 aria-selected:bg-(--accent) aria-selected:border-(--accent)"
							>
								{answer}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default AnswerPanel;
