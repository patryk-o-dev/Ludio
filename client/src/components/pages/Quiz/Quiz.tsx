import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getData } from "../../../api/getDataApi";
import type { Answer, Player, Question, Set } from "../../../types";
import styles from "./Quiz.module.scss";

type Inputs = {
	answer: string;
	search: string;
};

const Quiz = () => {
	const { register, handleSubmit, watch } = useForm<Inputs>();
	const [set, setSet] = useState<Set>();
	const [question, setQuestion] = useState<Question>();
	const [player, setPlayer] = useState<Player>();
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [showResults, setShowResults] = useState(false);
	const [winInfo, setWinInfo] = useState<{ done: boolean; perfect: boolean }>();

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

	const onSubmit = async (data: Inputs) => {
		await fetch(`http://localhost:3000/api/player/advance-question`, {
			method: "PATCH",
		});
		const isAnswerCorrect = await fetch(
			`http://localhost:3000/api/question/answer/${question!.id}/${data.answer}`,
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

	// eslint-disable-next-line react-hooks/incompatible-library
	const search = watch("search") || "";
	const [filteredAnswers, setFilteredAnswers] = useState<Answer[]>([]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const answersForType = answers.filter(
				(a) => a.answerTypeId === question?.answerTypeId,
			);
			if (!search.trim()) {
				setFilteredAnswers(answersForType);
			} else {
				setFilteredAnswers(
					answersForType.filter((a) =>
						a.value.toLowerCase().includes(search.toLowerCase()),
					),
				);
			}
		}, 300);

		return () => clearTimeout(timeout);
	}, [search, answers, question]);

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
				<>
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
					<div className={styles.mediaWrapper}>
						<img src={question?.media} alt="" />
					</div>
					<div className={styles.answerWrapper}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input defaultValue="" {...register("search")} />
							<select {...register("answer")}>
								<option value="">Wybierz z listy</option>
								{filteredAnswers.map((a) => (
									<option key={a.id} value={a.value}>
										{a.value}
									</option>
								))}
							</select>
							<input type="submit" />
						</form>
					</div>
				</>
			)}
		</div>
	);
};

export default Quiz;
