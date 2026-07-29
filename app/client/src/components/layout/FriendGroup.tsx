import { Children, useState } from "react";
import Icons from "../utils/Icons/Icons";
import { withAuth } from "../utils/api";

const FriendGroup = ({
	children,
	name,
	communityId,
}: {
	children: React.ReactNode;
	name: string;
	communityId?: string;
}) => {
	const API = import.meta.env.VITE_API_URL;
	const [isExpanded, setIsExpanded] = useState(true);
	const itemCount = Children.count(children);
	const handleLeaveCommunity = async () => {
		if (!communityId) return;

		await fetch(
			`${API}/community/${communityId}/leave`,
			withAuth({
				method: "DELETE",
			}),
		);
	};
	return (
		<div className="relative overflow-hidden rounded-3xl border border-(--bgc-secondary) bg-(--bgc-tertiary)/60 shadow-[0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-sm">
			<div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-(--accent)/45" />
			<div className="px-3 py-3">
				<button
					type="button"
					aria-expanded={isExpanded}
					onClick={() => setIsExpanded((prev) => !prev)}
					className="group flex w-full items-center gap-3 rounded-[1.15rem] border border-white/8 bg-white/5 px-3 py-3 text-left transition duration-300 hover:border-(--accent)/45 hover:bg-white/7"
				>
					<span className="h-2.5 w-2.5 shrink-0 rounded-full bg-(--accent) shadow-[0_0_18px_var(--accent)]" />
					<div className="min-w-0 flex-1">
						<div className="flex items-center gap-3">
							<h5 className="truncate text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-(--text)">
								{name}
							</h5>
							<span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-semibold tracking-[0.18em] text-(--text-secondary)">
								{itemCount}
							</span>

							{communityId && (
								<span
									onClick={(e) => {
										e.stopPropagation();
										handleLeaveCommunity();
									}}
									className="flex rounded-full -ml-2 transition-all duration-300 hover:filter-[drop-shadow(0_0_3px_var(--negative))_drop-shadow(0_0_6px_var(--negative))]"
								>
									<Icons
										name={"cancel"}
										color="negative"
										size={16}
										isAddon={false}
									/>
								</span>
							)}
						</div>
					</div>
					<span
						className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-black/15 transition duration-300 ${
							isExpanded ? "rotate-0" : "-rotate-90"
						}`}
					>
						<Icons name="arrow" color="text" size={16} isAddon={false} />
					</span>
				</button>
			</div>

			<div
				className={`grid transition-all duration-300 ease-out ${
					isExpanded
						? "grid-rows-[1fr] opacity-100"
						: "grid-rows-[0fr] opacity-0"
				}`}
			>
				<div className="overflow-hidden">
					<div className="flex flex-col gap-2 px-3 pb-3 pt-1">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default FriendGroup;
