import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavBar from "../layout/NavBar";
import MainContent from "../layout/MainContent";

const API = "http://localhost:3000/api";

interface Player {
	id: string;
	lvl: number;
	exp: number;
	expNextLvl: number;
	kp: number;
}

interface Category {
	id: string;
	name: string;
	lvl: number;
	lvlMax: number;
}

interface Chip {
	id: string;
	name: string;
	lvl: number;
	unlocked: boolean;
	compatibleGuess?: { id: string }[];
	compatibleChips?: { id: string }[];
}

interface ChipPairForm {
	chipGuessId: string;
	chipById: string;
}

interface Question {
	id: string;
	answerType: string;
	media: { url: string | null; text: string | null };
}

interface CheckResult {
	correct: boolean;
	score: number;
	lives: number;
	status: "win" | "lose" | "ongoing";
}

interface Answer {
	id: string;
	value: string;
	answerType: string;
}

const Index = () => {
	const [player, setPlayer] = useState<Player | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [chipGuesses, setChipGuesses] = useState<Chip[]>([]);
	const [chipBys, setChipBys] = useState<Chip[]>([]);
	const [submitStatus, setSubmitStatus] = useState<string | null>(null);
	const [gameId, setGameId] = useState<string | null>(null);
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
	const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
	const [answerFilter, setAnswerFilter] = useState("");
	const [checkResult, setCheckResult] = useState<CheckResult | null>(null);
	const [score, setScore] = useState(0);
	const [lives, setLives] = useState(3);
	const [selectedChipByLevel, setSelectedChipByLevel] = useState(0);

	const {
		watch,
		setValue,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<ChipPairForm>({
		defaultValues: { chipGuessId: "", chipById: "" },
	});

	const selectedGuessId = watch("chipGuessId");
	const selectedByIdValue = watch("chipById");

	const fetchAll = useCallback(async () => {
		const [p, cats, cg, cb] = await Promise.all([
			fetch(`${API}/player`).then((r) => r.json()),
			fetch(`${API}/category`).then((r) => r.json()),
			fetch(`${API}/chips/guess`).then((r) => r.json()),
			fetch(`${API}/chips/by`).then((r) => r.json()),
		]);
		setPlayer(p);
		setCategories(cats);
		setChipGuesses(cg);
		setChipBys(cb);
	}, []);

	useEffect(() => {
		// eslint-disable-next-line
		fetchAll();
	}, [fetchAll]);

	const handleAddExp = async () => {
		const updated = await fetch(`${API}/player/add-exp`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ exp: 1 }),
		}).then((r) => r.json());
		setPlayer(updated);
	};

	const handleUpgrade = async (id: string) => {
		await fetch(`${API}/category/${id}/upgrade`, { method: "PATCH" });
		await fetchAll();
	};

	const onSubmit = async (data: ChipPairForm) => {
		setSubmitStatus(null);
		setGameId(null);
		setCurrentQuestion(null);
		setAnswers([]);
		const res = await fetch(`${API}/game`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chips: [{ chipGuessId: data.chipGuessId, chipById: data.chipById }],
			}),
		});
		if (res.ok) {
			const game = await res.json();
			setGameId(game.id);
			setSubmitStatus("Gra utworzona!");
		} else {
			setSubmitStatus("Błąd podczas tworzenia gry.");
		}
	};

	const handleSelectAnswer = async (answerId: string, answerValue: string) => {
		if (!gameId || selectedAnswerId) return;
		setSelectedAnswerId(answerId);
		const res = await fetch(`${API}/game/${gameId}/check-answer`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ value: answerValue }),
		});
		if (res.ok) {
			const result: CheckResult = await res.json();
			setCheckResult(result);
			setScore(result.score);
			setLives(result.lives);
		}
	};

	const handleNextQuestion = async () => {
		if (!gameId) return;
		setIsLoadingQuestion(true);
		setSelectedAnswerId(null);
		setCheckResult(null);
		setAnswerFilter("");
		try {
			const gameRes = await fetch(`${API}/game/${gameId}/next-question`, {
				method: "PATCH",
			});
			if (!gameRes.ok) {
				setSubmitStatus("Brak dostępnych pytań.");
				return;
			}
			const game = await gameRes.json();
			setCurrentQuestion(game.currentQuestion);

			const answersRes = await fetch(`${API}/game/${gameId}/answers`);
			if (answersRes.ok) {
				const data: Answer[] = await answersRes.json();
				setAnswers(data.sort(() => Math.random() - 0.5));
			}
		} finally {
			setIsLoadingQuestion(false);
		}
	};

	const unlockedGuesses = chipGuesses.filter((c) => c.unlocked);
	const lockedGuesses = chipGuesses.filter((c) => !c.unlocked);

	const compatibleBys = selectedGuessId
		? chipBys.filter(
				(cb) =>
					!cb.compatibleGuess ||
					cb.compatibleGuess.some((cg) => cg.id === selectedGuessId),
			)
		: chipBys;
	const unlockedBys = compatibleBys.filter((c) => c.unlocked);
	const lockedBys = compatibleBys.filter((c) => !c.unlocked);

	return (
		<div className="p-4 space-y-8 bg-gray-900 text-white min-h-screen">
			<div className="p-4 bg-gray-900 min-h-screen">
				<NavBar />
				<MainContent />
			</div>
			{/* Player */}
			<section>
				<h2 className="text-xl font-bold mb-2">Player</h2>
				{player ? (
					<div className="space-y-1">
						<p>Level: {player.lvl}</p>
						<p>
							EXP: {player.exp} / {player.expNextLvl}
						</p>
						<p>KP: {player.kp}</p>
						<button
							className="mt-2 px-3 py-1 bg-blue-500 text-white"
							onClick={handleAddExp}
						>
							+1 EXP
						</button>
					</div>
				) : (
					<p>Loading...</p>
				)}
			</section>

			{/* Categories */}
			<section>
				<h2 className="text-xl font-bold mb-2">Categories</h2>
				<ul className="space-y-1">
					{categories.map((cat) => (
						<li key={cat.id} className="flex items-center gap-3">
							<span>{cat.name}</span>
							<span>
								Lvl: {cat.lvl} / {cat.lvlMax}
							</span>
							<button
								className="px-2 py-0.5 bg-green-500 text-white disabled:opacity-40"
								disabled={cat.lvl >= cat.lvlMax}
								onClick={() => handleUpgrade(cat.id)}
							>
								Upgrade (1 KP)
							</button>
						</li>
					))}
				</ul>
			</section>

			{/* Chips — formularz */}
			{!gameId && (
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="flex gap-8">
						{/* ChipGuess */}
						<section className="flex-1">
							<h2 className="text-xl font-bold mb-2">Chip Guess</h2>
							<div className="mb-3">
								<h3 className="font-semibold mb-1">Odblokowane</h3>
								<ul className="space-y-0.5">
									{unlockedGuesses.length === 0 && (
										<li className="text-gray-400">—</li>
									)}
									{unlockedGuesses.map((c) => (
										<li key={c.id}>
											<button
												type="button"
												onClick={() => {
													const newVal = selectedGuessId === c.id ? "" : c.id;
													setValue("chipGuessId", newVal);
													setValue("chipById", "");
													setSelectedChipByLevel(0);
												}}
												className={`px-2 py-0.5 border ${selectedGuessId === c.id ? "bg-blue-500 text-white border-blue-600" : "bg-white text-black border-gray-300"}`}
											>
												{c.name}
											</button>
										</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="font-semibold mb-1 text-gray-400">
									Zablokowane
								</h3>
								<ul className="space-y-0.5 text-gray-400">
									{lockedGuesses.length === 0 && <li>—</li>}
									{lockedGuesses.map((c) => (
										<li
											key={c.id}
											className="px-2 py-0.5 opacity-50 cursor-not-allowed"
										>
											{c.name}
										</li>
									))}
								</ul>
							</div>
						</section>

						{/* ChipBy */}
						<section className="flex-1">
							<h2 className="text-xl font-bold mb-2">Chip By</h2>
							<div className="mb-3">
								<h3 className="font-semibold mb-1">Odblokowane</h3>
								<ul className="space-y-0.5">
									{unlockedBys.length === 0 && (
										<li className="text-gray-400">—</li>
									)}
									{unlockedBys.map((c) => {
										const isSelected = selectedByIdValue === c.id;
										const levelLabel =
											isSelected && selectedChipByLevel > 0
												? ` (${selectedChipByLevel})`
												: "";
										return (
											<li key={c.id}>
												<button
													type="button"
													onClick={() => {
														if (!isSelected) {
															setValue("chipById", c.id);
															setSelectedChipByLevel(0);
														} else if (selectedChipByLevel < c.lvl) {
															setSelectedChipByLevel(selectedChipByLevel + 1);
														} else {
															setValue("chipById", "");
															setSelectedChipByLevel(0);
														}
													}}
													className={`px-2 py-0.5 border ${
														isSelected
															? "bg-green-500 text-white border-green-600"
															: "bg-white text-black border-gray-300"
													}`}
												>
													{c.name}
													{levelLabel}
												</button>
											</li>
										);
									})}
								</ul>
							</div>
							<div>
								<h3 className="font-semibold mb-1 text-gray-400">
									Zablokowane
								</h3>
								<ul className="space-y-0.5 text-gray-400">
									{lockedBys.length === 0 && <li>—</li>}
									{lockedBys.map((c) => (
										<li
											key={c.id}
											className="px-2 py-0.5 opacity-50 cursor-not-allowed"
										>
											{c.name}
										</li>
									))}
								</ul>
							</div>
						</section>
					</div>

					<div className="flex items-center gap-4">
						<button
							type="submit"
							disabled={!selectedGuessId || !selectedByIdValue || isSubmitting}
							className="px-4 py-2 bg-purple-600 text-white disabled:opacity-40"
						>
							Stwórz grę
						</button>
						{selectedGuessId && selectedByIdValue && (
							<span className="text-sm text-gray-500">
								Para:{" "}
								<strong>
									{chipGuesses.find((c) => c.id === selectedGuessId)?.name}
								</strong>{" "}
								+{" "}
								<strong>
									{chipBys.find((c) => c.id === selectedByIdValue)?.name}
								</strong>
							</span>
						)}
						{submitStatus && <span className="text-sm">{submitStatus}</span>}
					</div>
				</form>
			)}

			{/* Game */}
			{gameId && (
				<section className="space-y-4">
					<div className="flex items-center gap-6 text-sm">
						<span>
							Score: <strong>{score}</strong>
						</span>
						<span>
							Lives: <strong>{lives}</strong>
						</span>
					</div>

					{checkResult?.status === "win" && (
						<p className="text-green-400 font-bold text-lg">Wygrałeś! 🎉</p>
					)}
					{checkResult?.status === "lose" && (
						<p className="text-red-400 font-bold text-lg">Przegrałeś! 💀</p>
					)}

					{checkResult?.status !== "win" && checkResult?.status !== "lose" && (
						<button
							onClick={handleNextQuestion}
							disabled={isLoadingQuestion}
							className="px-4 py-2 bg-yellow-500 text-black font-bold disabled:opacity-40"
						>
							{currentQuestion ? "Następne pytanie" : "Start"}
						</button>
					)}

					{currentQuestion &&
						checkResult?.status !== "win" &&
						checkResult?.status !== "lose" && (
							<div className="space-y-4">
								<div className="border border-gray-600 p-4 rounded">
									<p className="text-xs text-gray-400 mb-1">
										{currentQuestion.answerType}
									</p>
									{currentQuestion.media.url && (
										<img
											src={currentQuestion.media.url}
											alt="question media"
											className="max-w-xs mb-2"
										/>
									)}
									{currentQuestion.media.text && (
										<p className="text-lg">{currentQuestion.media.text}</p>
									)}
								</div>

								<input
									type="text"
									value={answerFilter}
									onChange={(e) => setAnswerFilter(e.target.value)}
									placeholder="Filtruj odpowiedzi..."
									disabled={!!selectedAnswerId}
									className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 disabled:opacity-40"
								/>

								<ul className="grid grid-cols-2 gap-2">
									{answers
										.filter((a) =>
											a.value
												.toLowerCase()
												.includes(answerFilter.toLowerCase()),
										)
										.map((a) => {
											const isSelected = a.id === selectedAnswerId;
											const wasAnswered = !!selectedAnswerId;
											let cls = "w-full px-3 py-2 border text-left ";
											if (wasAnswered) {
												if (isSelected && checkResult?.correct)
													cls += "bg-green-600 border-green-500 text-white";
												else if (isSelected && !checkResult?.correct)
													cls += "bg-red-600 border-red-500 text-white";
												else cls += "border-gray-600 opacity-50";
											} else {
												cls += "border-gray-600 hover:bg-gray-700";
											}
											return (
												<li key={a.id}>
													<button
														type="button"
														disabled={wasAnswered}
														onClick={() => handleSelectAnswer(a.id, a.value)}
														className={cls}
													>
														{a.value}
													</button>
												</li>
											);
										})}
								</ul>
							</div>
						)}
				</section>
			)}
		</div>
	);
};

export default Index;
