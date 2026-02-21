import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./QuizCreator.module.scss";
import { useEffect, useState } from "react";

type Inputs = {
	tagName: string;
	tagCategory: string;
	question: string;
	answer: string;
	questionTags: string[];
	questionAnswerId: string;
	tagToDelete: string;
};

const QuizCreator = () => {
	const { register, handleSubmit } = useForm<Inputs>();

	const [tagsNames, setTagsNames] = useState([]);
	const [answerData, setAnswerData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [tagsRes, answersRes] = await Promise.all([
					fetch("http://localhost:3000/api/tag"),
					fetch("http://localhost:3000/api/answer"),
				]);
				if (!tagsRes.ok || !answersRes.ok) {
					throw new Error("Failed to fetch data");
				}
				const tagsData = await tagsRes.json();
				const answersData = await answersRes.json();
				console.log("Answers:", answersData);
				setTagsNames(tagsData.map((tag: { name: string }) => tag.name));
				setAnswerData(answersData);
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};
		fetchData();
	}, []);

	const addNewTag: SubmitHandler<Inputs> = async (data, e) => {
		e?.preventDefault();
		console.log("Adding new tag with data:", data);
		const tagName = data.tagName.trim();
		const tagCategory = data.tagCategory.trim();
		if (!tagName) {
			console.error("Tag name cannot be empty");
			return;
		}
		try {
			const res = await fetch("http://localhost:3000/api/tag", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: tagName,
					category: tagCategory,
				}),
			});
			if (!res.ok) throw new Error("Failed to create tag");
		} catch (err) {
			console.error("Error creating tag:", err);
		}
	};
	const addNewQuestion: SubmitHandler<Inputs> = async (data, e) => {
		e?.preventDefault();
		console.log("Adding new question with data:", data.question);
		try {
			const res = await fetch("http://localhost:3000/api/question", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					media: data.question,
					tags: data.questionTags.map((tag) => tag.trim()),
					answerId: data.questionAnswerId,
				}),
			});
			if (!res.ok) throw new Error("Failed to create question");
		} catch (err) {
			console.error("Error creating question:", err);
		}
	};
	const addNewAnswer: SubmitHandler<Inputs> = async (data, e) => {
		e?.preventDefault();
		console.log("Adding new answer with data:", data.answer);
		try {
			const res = await fetch("http://localhost:3000/api/answer", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					value: data.answer,
				}),
			});
			if (!res.ok) throw new Error("Failed to create answer");
		} catch (err) {
			console.error("Error creating answer:", err);
		}
	};

	const handleDeleteTag: SubmitHandler<Inputs> = async (data, e) => {
		e?.preventDefault();
		try {
			const res = await fetch(
				`http://localhost:3000/api/tag/${data.tagToDelete}`,
				{
					method: "DELETE",
				},
			);
			if (!res.ok) throw new Error("Failed to delete tag");
		} catch (err) {
			console.error("Error deleting tag:", err);
		}
	};

	return (
		<div className={styles.quizCreator}>
			<div className={styles.divider}>Stwórz nowy tag</div>
			<form onSubmit={handleSubmit(addNewTag)} className={styles.creatorForm}>
				<input {...register("tagName")} placeholder="Tag Name" />
				<select {...register("tagCategory")}>
					<option value="game">game</option>
					<option value="movie">movie</option>
					<option value="tv">tv</option>
					<option value="music">music</option>
					<option value="animation">animation</option>
					<option value="twitch">twitch</option>
					<option value="heart">heart</option>
					<option value="female">female</option>
					<option value="male">male</option>
					<option value="others">others</option>
					<option value="difficulty">difficulty</option>
				</select>
				<input type="submit" />
			</form>
			<div className={styles.divider}>Stwórz nową odpowiedź</div>
			<form
				onSubmit={handleSubmit(addNewAnswer)}
				className={styles.creatorForm}
			>
				<input type="text" {...register("answer")} placeholder="Answer Value" />
				<input type="submit" />
			</form>
			<div className={styles.divider}>Stwórz nowe pytanie</div>
			<form
				onSubmit={handleSubmit(addNewQuestion)}
				className={styles.creatorForm}
			>
				<input {...register("question")} placeholder="Question Media URL" />
				<div className={styles.tagsContainer}>
					{tagsNames.map((tagName) => (
						<div className={styles.checkboxWrapper4} key={tagName}>
							<input
								className={styles.inpCbx}
								id={tagName}
								type="checkbox"
								{...register("questionTags")}
								value={tagName}
							/>
							<label className={styles.cbx} htmlFor={tagName}>
								<span>
									<svg width="12px" height="10px">
										<use xlinkHref="#check-4"></use>
									</svg>
								</span>
								<span>{tagName}</span>
							</label>
							<svg className={styles.inlineSvg}>
								<symbol id="check-4" viewBox="0 0 12 10">
									<polyline points="1.5 6 4.5 9 10.5 1"></polyline>
								</symbol>
							</svg>
						</div>
					))}
				</div>

				<select {...register("questionAnswerId")}>
					{answerData.map((answer: { id: string; value: string }) => {
						return (
							<option key={answer.id} value={answer.id}>
								{answer.value}
							</option>
						);
					})}
				</select>
				<input type="submit" />
			</form>
			<div className={styles.divider}>Usuń tag</div>
			<form
				onSubmit={handleSubmit(handleDeleteTag)}
				className={styles.creatorForm}
			>
				<select {...register("tagToDelete")}>
					{tagsNames.map((tagName) => (
						<option key={tagName} value={tagName}>
							{tagName}
						</option>
					))}
				</select>
				<input type="submit" />
			</form>
		</div>
	);
};

export default QuizCreator;
