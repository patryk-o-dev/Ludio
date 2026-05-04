import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
	unlocked: boolean;
}

interface ChipPairForm {
	chipGuessId: string;
	chipById: string;
}

const Index = () => {
	const [player, setPlayer] = useState<Player | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [chipGuesses, setChipGuesses] = useState<Chip[]>([]);
	const [chipBys, setChipBys] = useState<Chip[]>([]);
	const [submitStatus, setSubmitStatus] = useState<string | null>(null);

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
		const res = await fetch(`${API}/game`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chips: [{ chipGuessId: data.chipGuessId, chipById: data.chipById }],
			}),
		});
		if (res.ok) {
			setSubmitStatus("Gra utworzona!");
		} else {
			setSubmitStatus("Błąd podczas tworzenia gry.");
		}
	};

	const unlockedGuesses = chipGuesses.filter((c) => c.unlocked);
	const lockedGuesses = chipGuesses.filter((c) => !c.unlocked);
	const unlockedBys = chipBys.filter((c) => c.unlocked);
	const lockedBys = chipBys.filter((c) => !c.unlocked);

	return (
		<div className="p-4 space-y-8 bg-gray-900 text-white min-h-screen">
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
											onClick={() =>
												setValue(
													"chipGuessId",
													selectedGuessId === c.id ? "" : c.id,
												)
											}
											className={`px-2 py-0.5 border ${selectedGuessId === c.id ? "bg-blue-500 text-white border-blue-600" : "bg-white text-black border-gray-300"}`}
										>
											{c.name}
										</button>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h3 className="font-semibold mb-1 text-gray-400">Zablokowane</h3>
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
								{unlockedBys.map((c) => (
									<li key={c.id}>
										<button
											type="button"
											onClick={() =>
												setValue(
													"chipById",
													selectedByIdValue === c.id ? "" : c.id,
												)
											}
											className={`px-2 py-0.5 border ${selectedByIdValue === c.id ? "bg-green-500 text-white border-green-600" : "bg-white text-black border-gray-300"}`}
										>
											{c.name}
										</button>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h3 className="font-semibold mb-1 text-gray-400">Zablokowane</h3>
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
		</div>
	);
};

export default Index;
