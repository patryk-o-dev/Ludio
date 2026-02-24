import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonMain from "../../utils/ButtonMain/ButtonMain";
import SetSelector from "../../features/SetSelector/SetSelector";
import { Link } from "react-router-dom";
import { getData } from "../../../api/getDataApi";
import type { Answer, Player, Question, Set } from "../../../types";

type Inputs = {
	answer: string;
	search: string;
};

const Quiz = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [allAnswers, setAllAnswers] = useState<Answer[]>([]);
	const [player, setPlayer] = useState<Player>({
		id: "",
		exp: 0,
	});
	const [filteredAnswers, setFilteredAnswers] = useState<Answer[]>([]);
	const [score, setScore] = useState(0);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [quizStarted, setQuizStarted] = useState(false);
	const [quizSet, setQuizSet] = useState<Set | null>(null);

	const { register, handleSubmit } = useForm<Inputs>();

	useEffect(() => {
		getData("player").then((data) => setPlayer(data[0]));
	}, []);

	const addPlayerExp = (playerId: string, exp: number, setId: string) => {
		fetch(`http://localhost:3000/api/player/${playerId}/earn-exp`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ exp, setId }),
		})
			.then((res) => res.json())
			.then((data) => {
				setPlayer(data);
			})
			.catch((err) => {
				console.error("Error adding player EXP:", err);
			});
	};

	const selectAnswer = (data: Inputs) => {
		const currentQuestion = questions[currentQuestionIndex];
		if (data.answer === currentQuestion.answer.value) {
			console.log("Correct! Score: ", score + 1);
			setScore((prev) => prev + 1);
			if (quizSet) {
				console.log("qiuzset: ", quizSet);
				console.log("score needed: ", quizSet.option.scoreNeeded);
				console.log("max score: ", quizSet.option.numberOfQuestions - 1);
				if (
					score + 1 >= quizSet.option.scoreNeeded &&
					currentQuestionIndex >= quizSet.option.numberOfQuestions - 1
				) {
					handleWin();
				}
			}
		} else {
			alert(`Wrong! The correct answer was: ${currentQuestion.answer.value}`);
		}
		setCurrentQuestionIndex((prev) => prev + 1);
	};

	const startQuiz = async () => {
		const selectedSet = await fetch(`http://localhost:3000/api/set/selected`)
			.then((res) => res.json())
			.then((data) => {
				setQuizSet(data);
				console.log("Selected quiz set:", data);
				return data;
			})
			.catch((err) => {
				console.error("Error fetching selected quiz set:", err);
				return null;
			});

		if (!selectedSet) return;

		const tags = selectedSet.tags
			.map((tag: { id: string; name: string }) => tag.name)
			.join(",");
		const questionsBySet = await fetch(
			`http://localhost:3000/api/question/tags/${tags}`,
		)
			.then((res) => res.json())
			.catch((err) => {
				console.error("Error fetching questions:", err);
				return [];
			});

		const answers = await getData("answer");

		setQuestions(questionsBySet);
		setAllAnswers(answers);
		setQuizStarted(true);
	};

	const handleAddFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		const filtered = allAnswers.filter(
			(answer) =>
				answer.value.toLowerCase().includes(value) &&
				answer.answerTypeId ===
					questions[currentQuestionIndex]?.answer?.answerTypeId,
		);
		setFilteredAnswers(filtered);
	};

	const handleWin = () => {
		if (quizSet) {
			addPlayerExp(player.id, 5, quizSet.id);
		}
	};

	return (
		<div>
			{!quizStarted && (
				<div>
					<h2>Ready to start the quiz?</h2>
					<SetSelector />
					<ButtonMain action={startQuiz} />
				</div>
			)}
			{quizStarted &&
				questions.length > 0 &&
				currentQuestionIndex < questions.length &&
				quizSet &&
				currentQuestionIndex < quizSet.option.numberOfQuestions && (
					<div>
						<h4>
							Pytanie {currentQuestionIndex + 1} {" - "}
							{questions[currentQuestionIndex].answer.value} {" - "}
							Wynik: {score} / 10
						</h4>
						<img src={questions[currentQuestionIndex].media} alt="" />
						<div>
							<form onSubmit={handleSubmit(selectAnswer)}>
								<input
									type="text"
									{...register("search")}
									onChange={handleAddFilter}
									placeholder=""
								/>
								<select {...register("answer")}>
									{filteredAnswers.map((answer) => (
										<option key={answer.id} value={answer.value}>
											{answer.value}
										</option>
									))}
								</select>
								<input type="submit" />
							</form>
						</div>
					</div>
				)}
			{quizStarted &&
				quizSet &&
				currentQuestionIndex >= quizSet.option.numberOfQuestions &&
				score < quizSet.option.scoreNeeded && (
					<div>
						<h2>Przegrałeś!</h2>
						<p>
							Twój wynik: {score} / {questions.length}
						</p>
						<Link to="/">Zakończ</Link>
					</div>
				)}
			{quizStarted &&
				quizSet &&
				currentQuestionIndex >= quizSet.option.numberOfQuestions &&
				score >= quizSet.option.scoreNeeded && (
					<div>
						<h2>Wygrałeś!</h2>
						<p>
							Twój wynik: {score} / {questions.length}
						</p>
						<Link to="/">Zakończ</Link>
					</div>
				)}
		</div>
	);
};

export default Quiz;
