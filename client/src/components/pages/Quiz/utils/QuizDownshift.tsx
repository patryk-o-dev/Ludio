import Downshift from "downshift";
import styles from "./QuizDownshift.module.scss";
import type { Answer } from "../../../../types";
import { useRef } from "react";

type QuizDownshiftProps = {
	possibleAnswers: Answer[];
	setUserAnswer: (answer: Answer | null) => void;
};
const QuizDownshift = ({
	possibleAnswers,
	setUserAnswer,
}: QuizDownshiftProps) => {
	const downshiftMenuRef = useRef<HTMLDivElement>(null);

	return (
		<div className={styles.downshiftWrapper}>
			<Downshift
				onChange={(selection) => {
					setUserAnswer(selection ? selection : null);
				}}
				itemToString={(item) => (item ? item.value : "")}
			>
				{({
					getInputProps,
					getItemProps,
					getMenuProps,
					isOpen,
					inputValue,
					highlightedIndex,
					selectedItem,
					getRootProps,
				}) => {
					const filteredAnswers = possibleAnswers.filter(
						(item) => !inputValue || item.value.includes(inputValue),
					);
					return (
						<div className={styles.downshiftInnerWrapper}>
							<div
								className={styles.downshiftInputWrapper}
								{...getRootProps({}, { suppressRefError: true })}
							>
								<input {...getInputProps()} placeholder="Type your answer..." />
							</div>
							<div
								ref={downshiftMenuRef}
								className={styles.downshiftMenu}
								style={
									isOpen && filteredAnswers.length > 0
										? { boxShadow: "0 0px 12px 1px #000" }
										: undefined
								}
							>
								<ul {...getMenuProps()}>
									{isOpen
										? possibleAnswers
												.filter(
													(item) =>
														!inputValue || item.value.includes(inputValue),
												)
												.map((item, index) => (
													<li
														{...getItemProps({
															key: item.value,
															index,
															item,
															style: {
																fontWeight:
																	selectedItem === item ? "bold" : "normal",
																color:
																	highlightedIndex === index
																		? "#ff7ed4"
																		: "#fbdaf5",
																borderBottom:
																	index === filteredAnswers.length - 1
																		? "none"
																		: "1px solid #000",
															},
															className: styles.downshiftItem,
															onMouseDown: () => setUserAnswer(item),
														})}
													>
														{item.value}
													</li>
												))
										: null}
								</ul>
							</div>
						</div>
					);
				}}
			</Downshift>
		</div>
	);
};

export default QuizDownshift;
