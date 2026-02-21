import { useEffect, useState } from "react";
import QuizCreator from "../../layout/QuizCreator/QuizCreator";
import ButtonMain from "../../utils/ButtonMain/ButtonMain";
import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./Home.module.scss";

type Inputs = {
	tagsForQuiz: string[];
	typeForQuiz: string;
	answerSearch: string;
	answer: string;
};

const Home = () => {
	type Tag = { id: string; name: string };
	type Question = {
		id: string;
		media: string;
		tags: Tag[];
		answerId: string;
	};
	type Type = {
		id: string;
		name: string;
		answers: { id: string; value: string; typeId: string }[];
	};

	const [tagsData, setTagsData] = useState<Tag[]>([]);
	const [tagsForQuiz, setTagsForQuiz] = useState<{ name: string }[]>([]);

	const [typesData, setTypesData] = useState<Type[]>([]);
	const [quizType, setQuizType] = useState<Type>({
		id: "",
		name: "",
		answers: [],
	});

	const [questions, setQuestions] = useState<Question[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [quizStarted, setQuizStarted] = useState(false);

	const { register, handleSubmit } = useForm<Inputs>();

	const startQuiz = async () => {
		const questions = await fetchQuestionsForQuiz(
			tagsForQuiz.map((tag) => tag.name).join(","),
		);
		console.log("Fetched questions for quiz:", questions);

		setQuestions(questions);
		setQuizStarted(true);
	};

	const fetchQuestionsForQuiz = async (tagName: string) => {
		try {
			const res = await fetch(
				`http://localhost:3000/api/question/tags/${encodeURIComponent(tagName)}`,
			);
			if (!res.ok) throw new Error("Failed to fetch questions");
			const data = await res.json();
			return data;
		} catch (err) {
			console.error("Error fetching questions for quiz:", err);
			return [];
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [tagsRes, typesRes] = await Promise.all([
					fetch("http://localhost:3000/api/tag"),
					fetch("http://localhost:3000/api/type"),
				]);
				if (!tagsRes.ok || !typesRes.ok) {
					throw new Error("Failed to fetch data");
				}
				const tagsData = await tagsRes.json();
				const typesData = await typesRes.json();
				console.log("Fetched types:", typesData);

				setTagsData(tagsData);
				setTypesData(typesData);
				console.log("Tags data:", tagsData);
				console.log("Types data:", typesData);
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};
		fetchData();
	}, []);

	const setTags: SubmitHandler<Inputs> = (data, e) => {
		e?.preventDefault();
		console.log("Setting tags with data:", data);
		setTagsForQuiz(data.tagsForQuiz.map((tagName) => ({ name: tagName })));
	};

	const setType: SubmitHandler<Inputs> = (data, e) => {
		e?.preventDefault();
		console.log("Setting type with data:", data);
		const type = typesData.find((type) => type.name === data.typeForQuiz);
		console.log("Selected type:", type);
		if (type) setQuizType(type);
	};

	const checkAnswer: SubmitHandler<Inputs> = (data, e) => {
		e?.preventDefault();
		console.log("Selected answer ID:", data.answer);
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
	};

	return (
		<div>
			<QuizCreator />
			<form onSubmit={handleSubmit(setTags)}>
				<div className={styles.tagsContainer}>
					{tagsData.map((tag) => (
						<div className={styles.checkboxWrapper4} key={tag.name}>
							<input
								className={styles.inpCbx}
								id={`tag-${tag.name}`}
								type="checkbox"
								{...register("tagsForQuiz")}
								value={tag.name}
							/>
							<label className={styles.cbx} htmlFor={`tag-${tag.name}`}>
								<span>
									<svg width="12px" height="10px">
										<use xlinkHref="#check-4"></use>
									</svg>
								</span>
								<span>{tag.name}</span>
							</label>
							<svg className={styles.inlineSvg}>
								<symbol id="check-4" viewBox="0 0 12 10">
									<polyline points="1.5 6 4.5 9 10.5 1"></polyline>
								</symbol>
							</svg>
						</div>
					))}
				</div>
				<input type="submit" />
			</form>
			<form onSubmit={handleSubmit(setType)}>
				<div className={styles.tagsContainer}>
					<select {...register("typeForQuiz")}>
						{typesData.map((type) => (
							<option key={type.id} value={type.name}>
								{type.name}
							</option>
						))}
					</select>
				</div>
				<input type="submit" />
			</form>
			<ButtonMain action={startQuiz} />
			{quizStarted && (
				<div>
					<h4>Pytanie {currentQuestionIndex}</h4>
					<div key={questions[currentQuestionIndex].id}>
						<img
							src={questions[currentQuestionIndex].media}
							alt={questions[currentQuestionIndex].media}
						/>
					</div>
					<form onSubmit={handleSubmit(checkAnswer)}>
						<select {...register("answer")}>
							{quizType.answers.map((answer) => (
								<option key={answer.id} value={answer.id}>
									{answer.value}
								</option>
							))}
						</select>
						<input type="submit" />
					</form>
				</div>
			)}
			<div>
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	);
};

export default Home;
