import type { QuestionAchievement } from "../../types";

type AchievementProps = {
	achievement: QuestionAchievement;
	media: string;
};

const Achievement = ({ achievement, media }: AchievementProps) => {
	return (
		<div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#101b26]">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(26,91,135,0.35),transparent_55%)]" />

			<div className="relative flex w-[90%] max-w-3xl items-center gap-6 rounded-lg border border-[#2d4d63] bg-[#172534]/95 p-5 shadow-[0_0_40px_rgba(23,103,150,0.25)]">
				<div className="relative shrink-0 rounded-md border border-[#52758c] bg-[#0c141c] p-1 shadow-[0_0_18px_rgba(102,178,220,0.2)]">
					<div className="absolute inset-0 rounded-md border border-white/10" />

					<img
						src={media}
						alt=""
						className="h-28 w-28 rounded-sm object-cover"
					/>
				</div>

				<div className="min-w-0">
					<p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-[#66c0f4]">
						Achievement unlocked
					</p>

					<h2 className="text-xl font-semibold text-white">
						{achievement.achievementTitle}
					</h2>

					<p className="mt-2 text-sm leading-relaxed text-[#a7b6c5]">
						{achievement.achievementDesc}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Achievement;
