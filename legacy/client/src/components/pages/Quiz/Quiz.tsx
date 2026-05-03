import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../../api/getDataApi";
import type { Answer, Player, Question, Set } from "../../../types";
import styles from "./Quiz.module.scss";
import AnimatedBorder from "../../utils/AnimatedBorder/AnimatedBorder";
import ScoreDisplay from "../../features/ScoreDisplay/ScoreDisplay";
import { FastAverageColor } from "fast-average-color";
import gsap from "gsap";

const Quiz = () => {
	const [set, setSet] = useState<Set>();
	const [question, setQuestion] = useState<Question>();
	const [player, setPlayer] = useState<Player>();
	const [showResults, setShowResults] = useState(false);
	const [winInfo, setWinInfo] = useState<{ done: boolean; perfect: boolean }>();
	const [userAnswer, setUserAnswer] = useState<Answer | null>(null);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [dominantColor, setDominantColor] = useState<string>(
		"rgba(255, 255, 255, 0.5)",
	);
	const [objectFit, setObjectFit] = useState<"cover" | "contain">("contain");

	const mediaRef = useRef<HTMLDivElement>(null);
	const animateOut = () =>
		gsap.to(mediaRef.current, { opacity: 0, scale: 0.97, duration: 0.3 });
	const animateIn = () =>
		gsap.to(mediaRef.current, { opacity: 1, scale: 1, duration: 0.3 });

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
		const guess = set!.guess.map((t) => t.name).join(",");
		const by = set!.by.map((t) => t.name).join(",");
		const only = set!.only.map((t) => t.name).join(",");
		const without = set!.without.map((t) => t.name).join(",");

		const params = new URLSearchParams();
		if (guess) params.set("guess", guess);
		if (by) params.set("by", by);
		if (only) params.set("only", only);
		if (without) params.set("without", without);

		const res = await fetch(
			`http://localhost:3000/api/question/tags?${params.toString()}`,
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

	const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const img = e.currentTarget;
		const fac = new FastAverageColor();
		const color = fac.getColor(img);
		setDominantColor(color.rgba);
		fac.destroy();

		const imageRatio = img.naturalWidth / img.naturalHeight;
		const containerRatio = img.parentElement
			? img.parentElement.clientWidth / img.parentElement.clientHeight
			: 2;

		setObjectFit(imageRatio >= containerRatio ? "cover" : "contain");
	};

	const onSubmit = async () => {
		setInputValue("");
		await animateOut();

		await fetch(`http://localhost:3000/api/player/advance-question`, {
			method: "PATCH",
		});
		const isAnswerCorrect = await fetch(
			`http://localhost:3000/api/question/answer/${question!.id}/${userAnswer!.value}`,
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
			await fetchQuestions();
			animateIn();
		}
	};

	const endGame = async () => {
		const winInfo = await fetch(`http://localhost:3000/api/set/winCondition`, {
			method: "PATCH",
		}).then((res) => res.json());
		setWinInfo(winInfo);
		setShowResults(true);
	};

	const filteredAnswers = useMemo(
		() =>
			possibleAnswers.filter(
				(item) =>
					!inputValue.toLocaleLowerCase() ||
					item.value
						.toLocaleLowerCase()
						.includes(inputValue.toLocaleLowerCase()),
			),
		[possibleAnswers, inputValue],
	);

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
					{player && set && <ScoreDisplay player={player} set={set} />}
					<div className={styles.questionWrapper}>
						<div className={styles.questionDisplay}>
							<div
								className={styles.mediaWrapper}
								style={{
									background: dominantColor,
									border: `2px solid color-mix(in srgb, ${dominantColor}, black 20%)`,
									boxShadow: `0 0 20px 3px ${dominantColor}, 0 2px 8px rgba(0, 0, 0, 0.6)`,
								}}
							>
								<div className={styles.mediaDisplay} ref={mediaRef}>
									<img
										src={`/question_images/${question?.media}`}
										alt=""
										crossOrigin="anonymous"
										onLoad={handleImageLoad}
										style={{ objectFit }}
									/>
								</div>
							</div>
						</div>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								onSubmit();
							}}
							className={styles.answerForm}
						>
							<div className={styles.answerSuggestions}>
								{question?.answerType.name === "guessCharacter" && (
									<h3>Co to za postać?</h3>
								)}
								{question?.answerType.name === "guessGame" && (
									<h3>Co to za gra?</h3>
								)}
								<ul className={styles.suggestionsList}>
									{filteredAnswers.slice(0, 8).map((a) => (
										<li
											key={a.id}
											className={styles.suggestionItem}
											onClick={() => {
												setUserAnswer(a);
											}}
										>
											<input
												type="submit"
												className={styles.submitInput}
												value={a.value}
											/>
										</li>
									))}
								</ul>
								<input
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									className={styles.searchInput}
								/>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Quiz;
