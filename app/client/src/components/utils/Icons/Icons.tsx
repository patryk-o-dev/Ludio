import styles from "./Icons.module.scss";

type IconElementProps = {
	color: string;
	size?: number;
	isAddon: boolean;
};

const ArrowIcon = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="#aeaeae"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			<path
				d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
				fill={color}
			></path>
		</g>
	</svg>
);

const AmpersandIcon = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="#aeaeae"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M19 20L8.597 9.028a2.95 2.95 0 0 1 0-4.165a2.94 2.94 0 0 1 4.161 0a2.95 2.95 0 0 1 0 4.165l-4.68 4.687a3.685 3.685 0 0 0 0 5.207a3.675 3.675 0 0 0 5.2 0L19 13"
		/>
	</svg>
);

const CircleQuestionMark = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01" />
		</g>
	</svg>
);

const CircleCheck = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="#aeaeae"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="m9 12l2 2l4-4" />
		</g>
	</svg>
);

const CircleX = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="#aeaeae"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="m15 9l-6 6m0-6l6 6" />
		</g>
	</svg>
);

const ArrowKeyUp = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="#aeaeae"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z"
		/>
	</svg>
);

const ArrowKeyDown = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="#aeaeae"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z"
		/>
	</svg>
);

const Delete = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
			d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm2 4l6 6m0-6l-6 6"
		/>
	</svg>
);

const Cancel = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="#aeaeae"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""} hover:stroke-(--negative) hover:cursor-pointer`}
	>
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M18 6L6 18M6 6l12 12"
		/>
	</svg>
);

const Enter = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M20.239 3.749a.75.75 0 0 0-.75.75V15H5.549l2.47-2.47a.75.75 0 0 0-1.06-1.06l-3.75 3.75a.75.75 0 0 0 0 1.06l3.75 3.75a.75.75 0 1 0 1.06-1.06L5.55 16.5h14.69a.75.75 0 0 0 .75-.75V4.5a.75.75 0 0 0-.75-.751"
			clip-rule="evenodd"
		/>
	</svg>
);

const PlusCircle = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="currentColor"
			d="M7.007 12a.75.75 0 0 1 .75-.75h3.493V7.757a.75.75 0 0 1 1.5 0v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1-.75-.75"
		/>
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M7.317 3.769a42.5 42.5 0 0 1 9.366 0c1.827.204 3.302 1.643 3.516 3.48c.37 3.157.37 6.346 0 9.503c-.215 1.837-1.69 3.275-3.516 3.48a42.5 42.5 0 0 1-9.366 0c-1.827-.205-3.302-1.643-3.516-3.48a41 41 0 0 1 0-9.503c.214-1.837 1.69-3.276 3.516-3.48m9.2 1.49a41 41 0 0 0-9.034 0A2.486 2.486 0 0 0 5.29 7.424a39.4 39.4 0 0 0 0 9.154a2.486 2.486 0 0 0 2.193 2.164c2.977.332 6.057.332 9.034 0a2.486 2.486 0 0 0 2.192-2.164a39.4 39.4 0 0 0 0-9.154a2.486 2.486 0 0 0-2.192-2.163"
			clip-rule="evenodd"
		/>
	</svg>
);

const Gamepad = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-width="1.5"
				d="M21.22 8c-.689-2.184-1.792-3.365-3.13-3.84c-.38-.135-.788-.16-1.193-.16h-.612a4.24 4.24 0 0 0-2.45.78l-.502.354a2.31 2.31 0 0 1-2.666 0l-.502-.355A4.24 4.24 0 0 0 7.715 4h-.612c-.405 0-.813.025-1.194.16c-2.383.846-4.022 3.935-3.903 10.943c.024 1.412.354 2.972 1.628 3.581A3.2 3.2 0 0 0 5.027 19a2.74 2.74 0 0 0 1.53-.437c.915-.599 1.584-1.6 2.554-2.102a4.1 4.1 0 0 1 1.89-.461H13c.658 0 1.306.158 1.89.46c.97.504 1.64 1.504 2.553 2.103c.39.256.895.437 1.531.437a3.2 3.2 0 0 0 1.393-.316c1.274-.609 1.604-2.17 1.628-3.581A35 35 0 0 0 21.918 12M7.5 9v3M6 10.5h3"
			/>
			<path
				fill="currentColor"
				className="stroke-transparent"
				d="M19 10.25a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m-3 0a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0M16.75 8a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5m0 3a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5"
			/>
		</g>
	</svg>
);

const Person = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		style={{
			position: "absolute",
			transform: `translate(${size! / 2}px, ${(-size! * 2) / 3}px) scale(0.5)`,
			backgroundColor: "rgba(0,0,0,0.8)",
		}}
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<circle cx="12" cy="8" r="5" />
			<path d="M20 21a8 8 0 0 0-16 0" />
		</g>
	</svg>
);

const LeagueOfLegends = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 96 96"
		fill="none"
		strokeWidth={4}
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path d="M54.16,13.81a34.84,34.84,0,0,1,26.5,47.9,34.42,34.42,0,0,1-5.52,9H86.88A44.42,44.42,0,0,0,54.16,4.1Z" />
		<path d="M20.27,82.37v-14a34.61,34.61,0,0,1-6.48-20.23,34.61,34.61,0,0,1,6.48-20.24V14a44.4,44.4,0,0,0,0,68.41Z" />
		<polygon points="47.5 0.06 22.06 0.06 26.92 10.01 26.92 86.29 22.11 96.13 79.78 96.13 85.05 77.32 47.5 77.32 47.5 0.06" />
	</svg>
);

const Movies = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
		>
			<rect width="18" height="18" x="3" y="3" rx="2" />
			<path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" />
		</g>
	</svg>
);

const Tv = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill={color}
			d="m11.05 14.5l4.15-2.65q.45-.3.45-.85t-.45-.85L11.05 7.5q-.5-.325-1.025-.05t-.525.875v5.35q0 .6.525.875t1.025-.05M4 19q-.825 0-1.412-.587T2 17V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v12q0 .825-.587 1.413T20 19h-4v1q0 .425-.288.713T15 21H9q-.425 0-.712-.288T8 20v-1zm0-2h16V5H4zm0 0V5z"
		/>
	</svg>
);

const Animation = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="currentColor"
			d="M5.808 20q-.348 0-.578-.23T5 19.192v-1.02q0-.324.13-.629t.349-.522L18.214 4.292q.165-.165.348-.228T18.926 4q.189 0 .378.064q.19.063.33.228l1.073 1.074q.165.14.229.33q.063.189.063.377q0 .183-.063.366t-.23.348L7.98 19.52q-.218.218-.522.348T6.829 20zM6 19h1.073L17.629 8.45l-.527-.552l-.552-.527L6 17.927zM20 6.079L18.921 5zm-2.898 1.819l-.552-.527l1.079 1.079zM14.269 20q1.658 0 3.079-.79T18.769 17q0-.762-.477-1.388t-1.377-1.068q-.177-.096-.375-.038t-.3.223t-.044.372t.235.303q.638.313.988.721t.35.875q0 .844-1.037 1.422q-1.038.578-2.463.578q-.213 0-.357.143t-.143.357t.143.357t.357.143M10 6.5q0 .523-.553.945T7.262 8.592q-1.866.817-2.564 1.443T4 11.5q0 .592.339 1.025t.813.73q.171.122.36.075t.31-.218t.076-.37t-.215-.319q-.349-.221-.516-.452T5 11.5q0-.454.556-.889q.555-.434 2.102-1.098q1.969-.834 2.656-1.504Q11 7.341 11 6.5q0-1.086-.975-1.793T7.5 4q-.933 0-1.772.342q-.84.343-1.219.84q-.14.172-.119.37t.193.333q.17.12.36.1q.188-.021.328-.162q.408-.408.967-.615Q6.798 5 7.5 5q1.179 0 1.84.444Q10 5.89 10 6.5"
		/>
	</svg>
);

const Music = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g fill="none">
			<path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
			<path
				fill="currentColor"
				d="M10.975 3.002a1 1 0 0 1-.754 1.196a8 8 0 1 0 8.446 3.379a1 1 0 1 1 1.666-1.107A9.96 9.96 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-4.76 3.325-8.742 7.779-9.752a1 1 0 0 1 1.196.754M13 3.014a1.01 1.01 0 0 1 1.214-.99l.115.031l2.987.996a1 1 0 0 1-.52 1.928l-.112-.03L15 4.387V12a3 3 0 1 1-2.19-2.89l.19.06V3.015Z"
			/>
		</g>
	</svg>
);

const Achievement = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
		>
			<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16" />
			<path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6" />
		</g>
	</svg>
);

const Skull = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
		>
			<path d="m12.5 17l-.5-1l-.5 1z" />
			<path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25a8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z" />
			<circle cx="15" cy="12" r="1" />
			<circle cx="9" cy="12" r="1" />
		</g>
	</svg>
);

const Backpack = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
		>
			<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm4 0h8m-8 8h8" />
			<path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
		</g>
	</svg>
);

const Modify = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 48 48"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g fill="none" stroke-width="3">
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m20.07 9.586l-4.242-4.243a2 2 0 0 0-2.828 0L7.343 11a2 2 0 0 0 0 2.829l4.243 4.242m17.343 19.343l4.242 4.243a2 2 0 0 0 2.829 0L41.657 36a2 2 0 0 0 0-2.828l-4.243-4.243"
			/>
			<rect
				width="12"
				height="42"
				x="34.606"
				y="4.908"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				rx="2"
				transform="rotate(45 34.606 4.908)"
			/>
			<circle cx="24" cy="24" r="1" fill="currentColor" />
			<circle cx="20" cy="28" r="1" fill="currentColor" />
			<circle cx="28" cy="20" r="1" fill="currentColor" />
		</g>
	</svg>
);

const Screenshot = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 14 14"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M10.007.943q.555.06 1.102.125a2.09 2.09 0 0 1 1.833 1.836l.12 1.095m-3.055 9.058q.555-.06 1.102-.125a2.09 2.09 0 0 0 1.833-1.836l.12-1.095M3.993.943q-.555.06-1.102.125a2.09 2.09 0 0 0-1.833 1.836l-.12 1.095m3.055 9.058q-.555-.06-1.102-.125a2.09 2.09 0 0 1-1.833-1.836l-.12-1.095m7.41-6.279H5.651l-.669 1.212l-.348.03l-.047.004c-.56.049-1.02.48-1.102 1.035c-.074.503-.14 1.022-.14 1.55s.066 1.048.14 1.552c.082.555.543.986 1.102 1.035l.047.004c.764.066 1.555.134 2.366.134c.81 0 1.602-.068 2.366-.134l.046-.004c.56-.049 1.02-.48 1.102-1.035c.074-.504.141-1.022.141-1.551s-.067-1.048-.14-1.55a1.224 1.224 0 0 0-1.103-1.036l-.046-.004l-.348-.03z" />
			<path d="M7 8.44c.64 0 1-.36 1-1s-.36-1-1-1s-1 .36-1 1s.36 1 1 1" />
		</g>
	</svg>
);

const Title = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 14 14"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M.75 2a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 1.5 0V3.5h2.75v9h-.5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-.5v-9H8.5v.75a.75.75 0 0 0 1.5 0v-1.5A.75.75 0 0 0 9.25 2zM8 7.75A.75.75 0 0 1 8.75 7h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 8 7.75m0 3.5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75"
			clip-rule="evenodd"
			stroke="none"
		/>
	</svg>
);

const Twitch = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M21 2H3v16h5v4l4-4h5l4-4zm-10 9V7m5 4V7"
		/>
	</svg>
);

const Spinner = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="currentColor"
			d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
		>
			<animateTransform
				attributeName="transform"
				dur="1.5s"
				repeatCount="indefinite"
				type="rotate"
				values="0 12 12;360 12 12"
			/>
		</path>
	</svg>
);

const Settings = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
			<circle cx="12" cy="12" r="3" />
		</g>
	</svg>
);

const PolandFlag = ({ size }: IconElementProps) => (
	<svg width={size} height={size} viewBox="0 0 640 480">
		<g fill-rule="evenodd">
			<path fill="#fff" d="M0 0h640v240H0z" />
			<path fill="#dc143c" d="M0 240h640v240H0z" />
		</g>
	</svg>
);

const UKFlag = ({ size }: IconElementProps) => (
	<svg width={size} height={size} viewBox="0 0 640 480">
		<path fill="#012169" d="M0 0h640v480H0z" />
		<path
			fill="#fff"
			d="m75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301L81 480H0v-60l239-178L0 64V0z"
		/>
		<path
			fill="#c8102e"
			d="m424 281l216 159v40L369 281zm-184 20l6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"
		/>
		<path fill="#fff" d="M241 0v480h160V0zM0 160v160h640V160z" />
		<path fill="#c8102e" d="M0 193v96h640v-96zM273 0v480h96V0z" />
	</svg>
);

const Trophy = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16" />
			<path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6" />
		</g>
	</svg>
);

type IconComponent = React.ComponentType<IconElementProps>;

const iconsMap: Record<string, IconComponent> = {
	// UI
	arrow: ArrowIcon,
	ampersand: AmpersandIcon,
	circleQuestionMark: CircleQuestionMark,
	circleCheck: CircleCheck,
	circleX: CircleX,
	arrowKeyUp: ArrowKeyUp,
	arrowKeyDown: ArrowKeyDown,
	delete: Delete,
	cancel: Cancel,
	enter: Enter,
	pluscircle: PlusCircle,
	gamepad: Gamepad,
	person: Person,
	leagueoflegends: LeagueOfLegends,
	movies: Movies,
	tv: Tv,
	animation: Animation,
	music: Music,
	achievement: Achievement,
	skull: Skull,
	backpack: Backpack,
	modify: Modify,
	screenshot: Screenshot,
	title: Title,
	twitch: Twitch,
	spinner: Spinner,
	settings: Settings,
	polandFlag: PolandFlag,
	ukFlag: UKFlag,
	trophy: Trophy,
};

type IconsProps = {
	name: string;
	color: string;
	size?: number;
	isAddon: boolean;
};

const Icons = ({ name, color, size = 24, isAddon }: IconsProps) => {
	const Icon = iconsMap[name];

	if (!Icon) return null;

	return (
		<div key={name}>
			<Icon size={size} color={color} isAddon={isAddon} />
		</div>
	);
};

export default Icons;
