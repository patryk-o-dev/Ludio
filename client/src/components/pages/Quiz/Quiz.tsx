import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getData } from "../../../api/getDataApi";
import type { Answer, Player, Question, Set } from "../../../types";
import styles from "./Quiz.module.scss";
import QuizDownshift from "./utils/QuizDownshift";
import AnimatedBorder from "../../utils/AnimatedBorder/AnimatedBorder";

type Inputs = {
	answer: string;
	search: string;
};

const Quiz = () => {
	const { handleSubmit } = useForm<Inputs>();
	const [set, setSet] = useState<Set>();
	const [question, setQuestion] = useState<Question>();
	const [player, setPlayer] = useState<Player>();
	const [showResults, setShowResults] = useState(false);
	const [winInfo, setWinInfo] = useState<{ done: boolean; perfect: boolean }>();
	const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
	const [answers, setAnswers] = useState<Answer[]>([]);

	useEffect(() => {
		const fetchSet = async () => {
			const res = await fetch(`http://localhost:3000/api/set/selected`);
			const data = await res.json();
			setSet(data);
		};
		fetchSet();
		getData("player").then((data) => {
			setPlayer(data);
		});
		getData("answer").then((data) => {
			setAnswers(data);
		});
	}, []);

	const fetchQuestions = useCallback(async () => {
		const res = await fetch(
			`http://localhost:3000/api/question/tags/${set!.tags.map((t) => t.name).join(",")}`,
		);
		const data = await res.json();
		setQuestion(data);
	}, [set]);

	useEffect(() => {
		if (!set) return;
		const fetch = async () => {
			await fetchQuestions();
		};
		fetch();
	}, [set, fetchQuestions]);

	const possibleAnswers = useMemo(
		() => answers.filter((a) => a.answerTypeId === question?.answerTypeId),
		[answers, question],
	);

	const onSubmit = async () => {
		await fetch(`http://localhost:3000/api/player/advance-question`, {
			method: "PATCH",
		});
		const isAnswerCorrect = await fetch(
			`http://localhost:3000/api/question/answer/${question!.id}/${userAnswer!.id}`,
		).then((res) => res.json());
		if (isAnswerCorrect) {
			await fetch(`http://localhost:3000/api/player/advance-score`, {
				method: "PATCH",
			}).then((res) => res.json());
		}

		const updatedPlayer = await fetch(`http://localhost:3000/api/player`).then(
			(res) => res.json(),
		);
		setPlayer(updatedPlayer);
		if (updatedPlayer.questionIndex >= set!.option.numberOfQuestions) {
			await endGame();
		} else {
			fetchQuestions();
		}
	};

	const endGame = async () => {
		const winInfo = await fetch(`http://localhost:3000/api/set/winCondition`, {
			method: "PATCH",
		}).then((res) => res.json());
		setWinInfo(winInfo);
		setShowResults(true);
	};

	return (
		<div className={styles.quiz}>
			{showResults && (
				<div>
					{!winInfo?.done && (
						<p>
							Twój wynik:{" "}
							<span>
								{player?.questionIndex} / {set?.option.numberOfQuestions}
							</span>
						</p>
					)}
					{winInfo?.done && <h1>You won!</h1>}
					{winInfo?.perfect && <h1>Perfect score!</h1>}
					<Link to="/">Powrót</Link>
				</div>
			)}
			{!showResults && (
				<div className={styles.mainContentWrapper}>
					<div className={styles.quizHeader}>
						<div className={styles.scoreDisplay}>
							<span>
								{player?.questionIndex} / {set?.option.numberOfQuestions}
							</span>
						</div>
						<div className={styles.scoreDisplay}>
							<span>
								{player?.score} / {set?.option.scoreNeeded}
							</span>
						</div>
					</div>
					<div className={styles.questionWrapper}>
						<div className={styles.questionDisplay}>
							<AnimatedBorder
								flex="4"
								inset="2px"
								borderColor="#ff7ed4"
								borderRadius="48px"
							>
								<div className={styles.mediaWrapper}>
									<div className={styles.mediaDisplay}>
										<img src={`/question_images/${question?.media}`} alt="" />
									</div>
								</div>
							</AnimatedBorder>
							<div className={styles.answerWrapper}>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className={styles.answerForm}
								>
									<QuizDownshift
										possibleAnswers={possibleAnswers}
										setUserAnswer={setUserAnswer}
									/>
									<input
										type="submit"
										value=">"
										className={styles.submitInput}
									/>
								</form>
							</div>
						</div>
						<div className={styles.answerSuggestions}></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Quiz;
