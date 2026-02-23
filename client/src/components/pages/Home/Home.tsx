import { useState } from "react";
import ButtonMain from "../../utils/ButtonMain/ButtonMain";
import styles from "./Home.module.scss";
import SetSelector from "../../features/SetSelector/SetSelector";
import { useForm } from "react-hook-form";

type Inputs = {
	answer: string;
};

type Question = {
	id: string;
	media: string;
	answer: Answer;
	tags: { id: string; name: string }[];
};

type Answer = {
	id: string;
	value: string;
	answerTypeId: string;
};

const Home = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [allAnswers, setAllAnswers] = useState<Answer[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [quizStarted, setQuizStarted] = useState(false);
	const quizSet = localStorage.getItem("quizSet");

	const { register, handleSubmit } = useForm<Inputs>();

	const selectAnswer = (data: Inputs) => {
		const currentQuestion = questions[currentQuestionIndex];
		if (data.answer === currentQuestion.answer.value) {
			alert("Correct!");
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
		const tags = JSON.parse(quizSet)
			.tags.map((tag: { id: string; name: string }) => tag.name)
			.join(",");
		const questionsBySet = await fetch(
			`http://localhost:3000/api/question/tags/${tags}`,
		)
			.then((res) => res.json())
			.catch((err) => {
				console.error("Error fetching questions:", err);
				return [];
			});

		const answers = await fetch("http://localhost:3000/api/answer")
			.then((res) => res.json())
			.catch((err) => {
				console.error("Error fetching answers:", err);
				return [];
			});

		setQuestions(questionsBySet);
		setAllAnswers(answers);
		setQuizStarted(true);
	};

	const filteredAnswers =
		quizStarted &&
		questions.length > 0 &&
		currentQuestionIndex < questions.length
			? allAnswers.filter(
					(a) =>
						a.answerTypeId ===
						questions[currentQuestionIndex]?.answer?.answerTypeId,
				)
			: [];

	return (
		<div>
			<SetSelector />
			<ButtonMain action={startQuiz} />
			{quizStarted &&
				questions.length > 0 &&
				currentQuestionIndex < questions.length &&
				currentQuestionIndex < 10 && (
					<div>
						<h4>
							Pytanie {currentQuestionIndex + 1} {" - "}
							{questions[currentQuestionIndex].answer.value}
						</h4>
						<img src={questions[currentQuestionIndex].media} alt="" />
						<div>
							<form onSubmit={handleSubmit(selectAnswer)}>
								<select {...register("answer")}>
									{filteredAnswers.map((answer) => (
										<option key={answer.id} value={answer.value}>
											{answer.value}
										</option>
									))}
									<option value="none">Wybierz odpowiedź</option>
								</select>
								<input type="submit" />
							</form>
						</div>
					</div>
				)}
			{quizStarted &&
				(currentQuestionIndex >= questions.length ||
					currentQuestionIndex >= 10) && (
					<div>
						<h2>Quiz zakończony!</h2>
					</div>
				)}
		</div>
	);
};

export default Home;
