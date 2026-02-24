import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonMain from "../../utils/ButtonMain/ButtonMain";
import SetSelector from "../../features/SetSelector/SetSelector";
import { Link } from "react-router-dom";
import { getData } from "../../../api/getDataApi";
import type { Answer, Player, Question } from "../../../types";

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
	const quizSet = localStorage.getItem("quizSet");

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
			if (score + 1 >= 7 && currentQuestionIndex >= 9) {
				handleWin();
			}
		} else {
			alert(`Wrong! The correct answer was: ${currentQuestion.answer.value}`);
		}
		setCurrentQuestionIndex((prev) => prev + 1);
	};

	const startQuiz = async () => {
		if (!quizSet) {
			alert("First select a quiz set!");
			return;
		}
		const quizSetObj = JSON.parse(quizSet);
		const tags = quizSetObj.tags
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
		const quizSetObj = JSON.parse(quizSet!);
		addPlayerExp(player.id, 5, quizSetObj.id);
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
				currentQuestionIndex < 10 && (
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
				(currentQuestionIndex >= questions.length ||
					(currentQuestionIndex >= 10 && score < 7)) && (
					<div>
						<h2>Przegrałeś!</h2>
						<p>
							Twój wynik: {score} / {questions.length}
						</p>
						<Link to="/">Zakończ</Link>
					</div>
				)}
			{quizStarted &&
				(currentQuestionIndex >= questions.length ||
					(currentQuestionIndex >= 10 && score >= 7)) && (
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
