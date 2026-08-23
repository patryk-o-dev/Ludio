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
		<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
		<g
			id="SVGRepo_tracerCarrier"
			strokeLinecap="round"
			strokeLinejoin="round"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
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
			fillRule="evenodd"
			d="M20.239 3.749a.75.75 0 0 0-.75.75V15H5.549l2.47-2.47a.75.75 0 0 0-1.06-1.06l-3.75 3.75a.75.75 0 0 0 0 1.06l3.75 3.75a.75.75 0 1 0 1.06-1.06L5.55 16.5h14.69a.75.75 0 0 0 .75-.75V4.5a.75.75 0 0 0-.75-.751"
			clipRule="evenodd"
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
			fillRule="evenodd"
			d="M7.317 3.769a42.5 42.5 0 0 1 9.366 0c1.827.204 3.302 1.643 3.516 3.48c.37 3.157.37 6.346 0 9.503c-.215 1.837-1.69 3.275-3.516 3.48a42.5 42.5 0 0 1-9.366 0c-1.827-.205-3.302-1.643-3.516-3.48a41 41 0 0 1 0-9.503c.214-1.837 1.69-3.276 3.516-3.48m9.2 1.49a41 41 0 0 0-9.034 0A2.486 2.486 0 0 0 5.29 7.424a39.4 39.4 0 0 0 0 9.154a2.486 2.486 0 0 0 2.193 2.164c2.977.332 6.057.332 9.034 0a2.486 2.486 0 0 0 2.192-2.164a39.4 39.4 0 0 0 0-9.154a2.486 2.486 0 0 0-2.192-2.163"
			clipRule="evenodd"
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
				strokeLinecap="round"
				strokeWidth="1.5"
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
		className={`${styles[color]} ${isAddon ? "" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
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

const DeadByDaylight = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 -50 430 430"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
		fill="#fff"
	>
		<g id="Calque_2" data-name="Calque 2">
			<g id="Logotype">
				<path
					className="cls-1"
					d="M258.38,41.38l-2.88-3.19a.47.47,0,0,0-.29-.14l-8.7-1a.56.56,0,0,0-.22,0l-4.82,2a.44.44,0,0,0-.16.1l-2.39,2.46a.45.45,0,0,0,.31.77l1,.05a.4.4,0,0,1,.29.12l1.13,1.06a.46.46,0,0,0,.37.11l7.41-1a.45.45,0,0,0,.22-.81.46.46,0,0,1,.25-.82l4.23-.27.18,0,3.57,1.29A.46.46,0,0,0,258.38,41.38Z"
				/>
				<path
					className="cls-1"
					d="M121.91,79.54l-3.6.51a.57.57,0,0,0-.3.15l-3.16,2.91a.57.57,0,0,0,0,.87l1.07.85a.58.58,0,0,0,.44.12l2.76-.42a.48.48,0,0,0,.2-.07l2.25-1.34a.55.55,0,0,0,.26-.34l.67-2.53A.57.57,0,0,0,121.91,79.54Z"
				/>
				<path
					className="cls-1"
					d="M115.65,76.71l-.06-.12a.58.58,0,0,0-.6-.31l-3.25.54a.61.61,0,0,0-.43.33l-1.14,2.51a.56.56,0,0,1-.75.28l-6.2-2.77a.57.57,0,0,0-.76.74l.06.15a.66.66,0,0,0,.17.23L109.9,84a.59.59,0,0,0,.65,0L112.31,83a.59.59,0,0,0,.28-.46l.15-2.91a.59.59,0,0,1,.25-.44l2.48-1.73A.56.56,0,0,0,115.65,76.71Z"
				/>
				<path
					className="cls-1"
					d="M102.92,62.45l11,.17a.57.57,0,0,0,.58-.57V60.92a.57.57,0,0,1,.83-.51l2.46,1.27a.59.59,0,0,0,.41,0l.51-.14a.57.57,0,0,0,.23-1l-3.55-3.32a.56.56,0,0,0-.32-.15l-4.6-.58a.56.56,0,0,1-.5-.56.56.56,0,0,0-.54-.57l-4-.24a.54.54,0,0,0-.3.06l-5.94,3.1a.57.57,0,0,0-.29.4l-.45,2.19a.57.57,0,0,0,.61.68l1.23-.11a.56.56,0,0,0,.31-.12l.87-.7a.57.57,0,0,1,.92.43l0,.78A.56.56,0,0,0,102.92,62.45Z"
				/>
				<path
					className="cls-1"
					d="M188,33.25l-.14-.08L182,30.89a.63.63,0,0,0-.19,0l-3.9.19a.45.45,0,0,0-.44.45l0,1.59a.45.45,0,0,0,.34.45l3.08.86.08,0,1.32.64a.55.55,0,0,1,.18.16l1.23,1.82a.46.46,0,0,0,.53.17l2.56-.89a.47.47,0,0,1,.4,0l1.3.85.12.05,2.12.6a.46.46,0,0,0,.38,0l.69-.44a.47.47,0,0,0,.05-.74Z"
				/>
				<path
					className="cls-1"
					d="M322.67,88.38l.07-.93a.64.64,0,0,0-.08-.36l-2.07-3.45a.59.59,0,0,0-.32-.26l-5.12-1.78-.18,0-1,0a.6.6,0,0,0-.61.59v2.17a.56.56,0,0,0,.09.31l1.28,2.13,0,0,1,1.48a.58.58,0,0,0,.29.22l1.51.53a.71.71,0,0,0,.21,0l4.23-.12A.59.59,0,0,0,322.67,88.38Z"
				/>
				<path
					className="cls-1"
					d="M314.26,76.64a.6.6,0,0,0-.29-.08l-7-.13a.62.62,0,0,0-.45.19l-1.74,1.88a.6.6,0,0,0,.32,1l1.37.27a.61.61,0,0,0,.19,0l2.1-.3,2.59-.45a.6.6,0,0,0,.5-.59v-.07a.6.6,0,0,1,.59-.6H314A.6.6,0,0,0,314.26,76.64Z"
				/>
				<path
					className="cls-1"
					d="M427.87,223.09c-4.11-2-9,1-12-3.25s-12.23-7-12.23-7-4.69-3.08-9.3-1.68-8.11-3.54-8.11-3.54-4.62,1.32-6.94-1.73-19-6.21-19-6.21-8.49,1.32-9.25-2-2.06-5.05-3.39-4.35-.73,2.22-4.07,1.77-7.3-1-10.49-2.87a11.21,11.21,0,0,0-8.61-1.24c-1.38.34-3.86-.44-5.8-1.21l.09-5.47,2.42-6.17.25-33.54,2.85-6.47,1.77,29,2.79-64.3-2.3-4.09,2.91-5.56-1.49-1.7.33-7.07L322.9,73,316,69.35,313.59,67l-2.43-21.27-3.58,22-1.28,1.12-1-1.28-2-12.71-1.6,16.62-1.44-5.07L298,74.59l-3.09,2.62-2.26,11.56.41,2.23,1.66,5.22.05,4v8.81L292.91,115v20.1l3,17.92,1.34-12.91,1.95,5.93-2,24.39.45,13.08a24.45,24.45,0,0,1-3.34-2.11,10.06,10.06,0,0,1-6.05-1.7c-3.37-2.06-3.49.54-7.08-.76s-.8-5-4-5S270.51,175,261,172.65c0,0-1.23-.34-3.18-.91v-6.86l.77-5,.15-38.85s1.7-8.71,1.93-8.67.11,39.8.11,39.8l1.77-4L265,90.75l-3-9.89.61-20.78,3.78-11.81-2.56-12.84-3.93-1.52-3.37-8.81-1.77,4.51-6.63-3.09-1.93-9.93-2.54,12L241.26,8.08l-3.65,23.71-5.49,6.61-.49,4.65-2.31,6.4,1,7.28-1.69,6.14,2.21,4,1.27,33,0,.24.6,1.82-.12,3.15-.44,20,2.72,10.5L235,163l.16,1.5a19,19,0,0,1-3.32-1.54c-3.52-2.43-6.13-7.55-12.73-8-2.34-1.08-2.34-2.3-5.38-3.52s-9.14-4.66-11.56-4.45-5.46.81-5.46.81l-1.24-.44v-.06l.59-28.64-1.75-7.16.54-26.28,1.65-6.55L197.68,107l1.37-39.35,2.7-7.26-.61-6.68-.26-6.35-.53-8.59L199,31l-2.38-.59-2.11-17.74-2.74,15.14-.93-14-2,9.08L187.16,0l-5.82,23.54-7.53,2.77L163.18,29l-5.56,10.67.1,21.4,4.19,11-.29,19.14,5.15,14.15-3.14,6.74L164.88,139l.09,1.5-.67-.15c-3.44-1-2.84-4.32-5-5.4a17.21,17.21,0,0,1-12.45,1.36c-7.3-1.83-22.19-7-22.19-7l-1.67-.48-.06-7.65,0-7.59,2.84-7.6.31-15.35,1-2.33L126.7,82l2.24-4.27,1.73-6.33-4.11-19L125,60.19,122.1,28l-5.24,26.79-2.77-16.2L111.34,50l-8.51-.54-9.32,7.37,0,5.34-2.73,5.63.67,7.59L90.91,81,91,92.65l-3.18,11.62,4.38,18.43v.22c-8.1.49-23.85-1.31-28-3.68s-5.87-5.48-10.53-5.48-4.16-1.3-8.06-4-8.25-5.42-8.95-5.53c-1.88-.31-2.85-1.61-4.06-2.33-1.94-1.15-5-1.49-7.06-1.87a5.82,5.82,0,0,0-3.43-.06,6.09,6.09,0,0,0-2,1.61c-.78.86-1.64,1.66-2.42,2.52S5.29,108.53,4.31,114.53c-.81,5-7.16,8.28,4.86,22.72,8.54,10.25,32.67,7.77,34.28,10.84s8.3,1.24,10.12,2.45,11.52,10.07,15.18,10.2,4.27-1.35,6.09,0S84.62,164,84.62,164a19.05,19.05,0,0,0,8,2.26l.06,6.73,1,4.21L95,241.87l2.55-52.7L99,194.28l.38,44.17,3,13.15L102,266.43l1,5.46.1,14,3.52,33.55L110,285.8l-.37-17.67,2.34-7.77.15-25,2,41.07,2.94-63.54-.44-4.21,5-14.38L121.53,180l1.87-3.83-.06-7.11,2.57.33s16.66,1.11,17,4.86,6.08,8.51,17,10.33c6.6.3,7.61,4.33,7.61,4.33s.16.35.44.82l0,.62-.27,14.29,2.56,11.41-.27,13.42,1.25,7.28,1.44,53.6,1.77-24.62.37,35.64L176.78,327l4.83-57.4L181,252.7l3-9.73.79-38.6,1.82-14,.73-.1.4,50.77L192,189.61l3.29-.48s6-2.12,7.82,1.53,3.57,7.85,5.13,7.27,4.42-1.94,5.72,1.17,2.28,3.19-2.62,3.69c-.33,0-.41,1.52,2.1,2.46s3,1.22,4.86,0c7.37-4.91,11.88-3.82,11.88-3.82s6-1.54,7.69.53l.44.55.21,20.45-1.9,8.85L241,271l1.66-31.82,2.6,3.86,1.25,54.78,2.79-23.27V262.47l2.84-7.27,0-37.75,2.75-9.21a6.7,6.7,0,0,1,3.54,2c1.84,2.86,11.75-.43,14.39,0s13.41,3,13.41,3-.84,2.18,1.79,1.92,11.3-5.77,14.57-5.45c.74.07,1.46.12,2.15.17l.52,3.58.08,18-1.76,15.15,3.58,7.87,2.22,53.18,3-33.75,2.41-7.23,1-29.59,1.82,40.52,2.92-55.26-1.88-10.71c11.55,2,29.53,5.62,31.6,8.83,3.06,4.78,6.81,4.34,5.85,0-.64-2.87-3.63-5.35-6-6.77-3-1.82,12.86,1.83,12.87,1.84,6.9,2.11,17.26,4.74,19.26,4.53,2.69-.29,3.95.3,5.45,1.83s2.08,5,7.56,4.2,7.78-2.19,13.32,0,12.65,1.48,16.69,1.53S432,225.12,427.87,223.09ZM106.25,171l-1.7-63.27v0l-.56-6.48-.88-7a.84.84,0,0,0-1.62-.17.93.93,0,0,0,0,.29l1.42,55.88L98.71,91.83a.36.36,0,0,0,0-.11l-1-4.46a.84.84,0,0,1,.59-1l1.06-.3a.82.82,0,0,0,.61-.7l.29-2.34a.84.84,0,0,1,1-.72l1,.2a.83.83,0,0,1,.68.74l.47,5.09a.82.82,0,0,0,.38.63L107.08,91a.82.82,0,0,1,.39.71Zm15.17-82.44a.55.55,0,0,0-.25.27l-.73,1.61a.8.8,0,0,0,0,.21l-.65,18.88a.57.57,0,0,1-1.14,0l-2-18.47a.61.61,0,0,0,0-.18l-1.38-3a.57.57,0,0,0-.62-.32l-1.21.22a.55.55,0,0,0-.46.52l-.42,6.33a.57.57,0,0,1-1.13.06l-1-5.93a.42.42,0,0,0-.12-.26l-1.48-1.83a.23.23,0,0,0-.07-.07l-9.44-8.17a.57.57,0,0,0-.69,0l-.31.21a.58.58,0,0,0-.18.77L99,81a.57.57,0,0,1-.29.83l-.56.21a.57.57,0,0,1-.55-.08l-2.94-2.28a.63.63,0,0,1-.22-.44l-.17-6.68a.61.61,0,0,0-.15-.37l-1.68-1.83a.58.58,0,0,1-.09-.63l3.27-7.08a.51.51,0,0,0,.06-.25l-.09-3.49a.57.57,0,0,1,.28-.51l6.25-3.66.13-.05,4.43-1.36a.61.61,0,0,1,.27,0l8,1.47a.78.78,0,0,1,.21.09L122.65,60a.58.58,0,0,1,.17.18l4,6.87a.48.48,0,0,1,.07.2l.92,6a.61.61,0,0,1,0,.19l-.71,3.93a.85.85,0,0,1-.09.22l-2.58,3.84a.52.52,0,0,0-.1.27l-.27,3.71a1.23,1.23,0,0,0,0,.19l.25.89a.57.57,0,0,1-.28.66ZM162.16,44l1.65-2.07a.63.63,0,0,1,.74-.18.62.62,0,0,1,.29.83l-.59,1.25,0,.06L163.5,45a.62.62,0,0,1-.94.12l-.34-.32A.62.62,0,0,1,162.16,44Zm29.82.5a.46.46,0,0,0-.85.13l-1,4.75a.45.45,0,0,1-.9-.07l-.33-6.25a.46.46,0,0,0-.74-.34L186.5,44a.43.43,0,0,1-.22.09l-.55.07a.49.49,0,0,1-.5-.31L184,40.31l-.23.57,0,.12-.11,1a.66.66,0,0,0,0,.14l.57,3.09a.56.56,0,0,0,0,.12l.7,1.45a.39.39,0,0,1,0,.26l-.3,2.43a.56.56,0,0,1,0,.12l-1,2.25a.33.33,0,0,0,0,.17l-1.54,88.05-1.26-50.05a.46.46,0,0,0-.92,0h0a.46.46,0,0,1-.91,0l-.39-38.93a.44.44,0,0,0-.26-.41L177,50a.47.47,0,0,1-.21-.21L176,48.3a.42.42,0,0,0-.27-.22l-2.49-.83a8.94,8.94,0,0,1,.71,1.3,15.63,15.63,0,0,0,.85,1.69.48.48,0,0,1,.06.24l-.61,14.26a.46.46,0,0,1-.92,0l-.87-15a.46.46,0,0,0-.34-.41l-3.21-.91a.5.5,0,0,0-.36,0l-.78.46a.44.44,0,0,0-.22.31c-.17.85-.8,4.13-.8,4.24s-.85-1.64-1.17-2.3a.45.45,0,0,0-.41-.26l-2.21,0h0l-2.06.13h0l-1.2.16,1.13-1.71a.42.42,0,0,1,.23-.18l2.72-1a.47.47,0,0,0,.29-.32l.33-1.36a.46.46,0,0,1,.82-.16l.6.84a.45.45,0,0,0,.42.18l1.81-.15a.46.46,0,0,0,.42-.47l-.1-3.78a.47.47,0,0,0-.18-.35l-.67-.52a.46.46,0,0,1,0-.69l1.86-1.85.06-.07,1-1.58a.46.46,0,0,1,.71-.08l2.54,2.51a.45.45,0,0,1,.05.6l-1.11,1.54-.06.12-.14.4a.46.46,0,0,0,.09.45l2.43,2.77a.45.45,0,0,0,.28.16l4.2.64a.48.48,0,0,0,.4-.13l1.48-1.51a.44.44,0,0,0,.12-.38l-.58-4.26a.44.44,0,0,0-.1-.22l-3.22-4.09a.44.44,0,0,0-.33-.18L172,36H172a21.63,21.63,0,0,1-2.87-.66c0-.1.56-1.69.79-2.33a.44.44,0,0,1,.37-.3l3.62-.48a.44.44,0,0,0,.35-.24l.79-1.55a.51.51,0,0,1,.33-.24L181.77,29a.41.41,0,0,1,.22,0l5.92,1.87.08,0,4.25,2.35a.44.44,0,0,1,.17.16l4.38,6.93a.48.48,0,0,1,.07.26l-.75,18.43-.38,4.44-1.08-14.37a.36.36,0,0,0-.06-.2Zm64.46,28.27.08,4.93a.39.39,0,0,1,0,.15l-.92,2.77a.51.51,0,0,0,0,.13l-1.15,53-1.84-61.44a.43.43,0,0,1,.26-.42l3.09-1.51a.47.47,0,0,0,.25-.41V68.72a.46.46,0,0,0-.23-.4l-2.72-1.52a.44.44,0,0,1-.24-.35l-.33-3.73-.88,1.68h-.44l-.4-10.71a.46.46,0,0,0-.91,0l-.79,11.21a.45.45,0,0,1-.18.34l-1.16.84a.44.44,0,0,1-.62-.08l-1.34-1.69a.65.65,0,0,1-.09-.16L245.26,62a.47.47,0,0,0-.44-.34h-.17a.46.46,0,0,0-.45.46v1.66a.46.46,0,0,1-.51.46l-1.42-.18a.44.44,0,0,1-.3-.17l-.73-.92a.44.44,0,0,0-.33-.18l-5.55-.24a.46.46,0,0,0-.47.39l-.35,2.34a.47.47,0,0,0,.16.42l2.93,2.44a.42.42,0,0,0,.32.11l2.29-.16a.42.42,0,0,0,.15,0l3.24-1.49a.44.44,0,0,1,.25,0l1.66.22a.45.45,0,0,1,.35.25l1.81,3.7a.45.45,0,0,0,.35.25l2.35.35a.44.44,0,0,1,.39.45c-.11,5.63-1.32,69.34-1.49,87-.19-14.88-1.23-62.46-1.56-77.8a.46.46,0,0,0-.91-.06l-.46,2.74a.46.46,0,0,1-.9,0l-.82-6.23a.44.44,0,0,0-.07-.19l-1.1-1.73a.42.42,0,0,1-.07-.27l0-.83a.45.45,0,0,1,.66-.38l1.61.8a.45.45,0,0,0,.61-.22l.77-1.67a.46.46,0,0,0,0-.38l-1.76-3.67a.45.45,0,0,0-.71-.14l-1.81,1.6a.46.46,0,0,0-.15.27l-.74,4.35a.51.51,0,0,1-.14.26l-1.5,1.35a.43.43,0,0,0-.15.33l-.91,25.91a.45.45,0,0,1-.9.07l-.82-4.21s0-.06,0-.08l-.17-27.07a.45.45,0,0,0-.45-.46h-1.1a.46.46,0,0,1-.45-.39L235,68.07a.43.43,0,0,0-.13-.26l-2.74-2.65a.45.45,0,0,1-.13-.35l.4-7.42a.46.46,0,0,1,.41-.43l.8-.09a.47.47,0,0,1,.5.34l.42,1.67a.45.45,0,0,0,.52.34l2.23-.39a.46.46,0,0,0,.25-.78l-2.3-2.29a.49.49,0,0,1-.13-.4l.29-1.86a.47.47,0,0,0-.1-.36l-1.35-1.64a.48.48,0,0,1-.11-.3l.09-7.08a.44.44,0,0,1,.09-.27l4.23-5.76a.5.5,0,0,1,.22-.16l5.79-2a.47.47,0,0,0,.31-.46l0-.74a.46.46,0,0,1,.46-.49l8.52.25a.45.45,0,0,1,.27.1l3.46,2.78.06.06,4.31,4.92a.42.42,0,0,1,.09.16l2.07,6.63a.59.59,0,0,1,0,.13v2.91a.43.43,0,0,1-.14.32l-2.68,2.69-2.87,2.95a.48.48,0,0,0-.13.31l-.08,4.92a.45.45,0,0,1-.14.31l-1.34,1.35a.45.45,0,0,0,.06.69l1.44,1a.35.35,0,0,0,.14.06l1.8.56a.46.46,0,0,1,.31.55l-.72,2.74a.49.49,0,0,1-.23.28l-2.49,1.36A.46.46,0,0,0,256.44,72.78Zm43.9,112,.71-7.69,1.35-15.65,1,24.5C302.39,185.58,301.36,185.19,300.34,184.76Zm13.29-81.54a.59.59,0,0,1-.16.4l-.57.57a.58.58,0,0,0-.17.38l-.17,5.73a.56.56,0,0,1-1.12.07l-.69-4.51a.56.56,0,0,0-1.12.06l-.24,5.25a.51.51,0,0,1,0,.13l-.51,1.79a.59.59,0,0,0,0,.14l-1,67.67-1.7-73.26a.54.54,0,0,0-.37-.51l-.65-.24a.56.56,0,0,1-.38-.52l0-1.47a.55.55,0,0,0-.18-.4l-.13-.12a.58.58,0,0,1,0-.85l1.52-1.29a.48.48,0,0,0,.15-.2l.74-1.66a.56.56,0,0,1,.51-.33l3.72,0a.56.56,0,0,1,.53.36l.12.32a.58.58,0,0,0,.36.34l.78.24a.56.56,0,0,1,.36.33l.39,1a.52.52,0,0,1,0,.21Zm4.8-10.75-1.07-1a.6.6,0,0,0-.71-.08l-1.57.92a.59.59,0,0,0-.21.81l.73,1.29a.62.62,0,0,1,.08.35l-.21,2.64a.6.6,0,0,1-.62.55h-.21a.59.59,0,0,1-.55-.42l-.73-2.44a.61.61,0,0,0-.56-.43l-5-.12a.66.66,0,0,0-.33.09l-1.17.75a.58.58,0,0,0-.23.26l-.26.6a.6.6,0,0,1-.55.36h-.1a.61.61,0,0,1-.6-.63l.05-1.11a.62.62,0,0,1,.18-.4l1.79-1.79a.55.55,0,0,0,.17-.35l.23-1.79a.6.6,0,0,1,.54-.51l1-.1a.62.62,0,0,0,.49-.35l.42-1a.58.58,0,0,1,.52-.35h.19a.59.59,0,0,1,.58.38l.37.92a.59.59,0,0,0,.55.38H312a.61.61,0,0,0,.59-.7l-.18-1.09a.62.62,0,0,0-.11-.25l-1.43-2a.56.56,0,0,0-.39-.24l-.73-.12a.6.6,0,0,0-.64.35l-.48,1.06a.6.6,0,0,1-.62.35l-.43-.06a.6.6,0,0,1-.52-.59V83.32a.58.58,0,0,0-.06-.26l-.4-.83a.59.59,0,0,0-.68-.31l-2.57.66a.51.51,0,0,0-.17.07l-3,1.94a.6.6,0,0,0-.24.32L299,87.75s0,0,0,.09c0,.24-.19,1.39.05,1.39s2.61-.16,3.39-.21a.59.59,0,0,0,.4-.2l.43-.48a.58.58,0,0,1,.52-.19l.82.1a.6.6,0,0,1,.52.64l-.06.75a.64.64,0,0,1-.22.41l-1.63,1.31a.61.61,0,0,0-.22.49L303,94.1s0,.06,0,.09l-1.19,10.39a.2.2,0,0,0,0,.07l-1,4.46L300.89,94a.56.56,0,0,0-.13-.37l-.85-1.06a.6.6,0,0,0-1.05.24c-.2.88-.44,1.9-.44,1.8s-.6-2.84-.79-3.71a.58.58,0,0,0-.31-.4c-.53-.28-1.72-.92-1.72-1.13s.1-3.11.13-3.88a.59.59,0,0,1,.13-.34L298,82.45a.65.65,0,0,1,.33-.21l1.56-.4a.66.66,0,0,0,.28-.16l2.23-2.31a.59.59,0,0,0,.06-.75l-.13-.2a.59.59,0,0,1,.19-.84l3.44-2.06a.71.71,0,0,1,.28-.09l8.52-.34a.64.64,0,0,1,.35.1l3.05,2a.54.54,0,0,1,.21.26l1.23,2.84a.6.6,0,0,0,.14.21l4.9,4.42a.63.63,0,0,1,.16.24l.71,1.93a.75.75,0,0,1,0,.26l-.18,2.26a.61.61,0,0,1-.5.55l-.46.07a.6.6,0,0,0-.47.78l.34,1a.58.58,0,0,1,0,.39l-1.13,3.07-.6,1.89a.47.47,0,0,0,0,.17L322,121.71a.6.6,0,0,1-1.19,0l-1.42-21.37-.78-7.51A.56.56,0,0,0,318.43,92.47Z"
				/>
			</g>
		</g>
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
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
		<g fill="none" strokeWidth="3">
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m20.07 9.586l-4.242-4.243a2 2 0 0 0-2.828 0L7.343 11a2 2 0 0 0 0 2.829l4.243 4.242m17.343 19.343l4.242 4.243a2 2 0 0 0 2.829 0L41.657 36a2 2 0 0 0 0-2.828l-4.243-4.243"
			/>
			<rect
				width="12"
				height="42"
				x="34.606"
				y="4.908"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
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
			strokeLinecap="round"
			strokeLinejoin="round"
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
			fillRule="evenodd"
			d="M.75 2a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 1.5 0V3.5h2.75v9h-.5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-.5v-9H8.5v.75a.75.75 0 0 0 1.5 0v-1.5A.75.75 0 0 0 9.25 2zM8 7.75A.75.75 0 0 1 8.75 7h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 8 7.75m0 3.5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75"
			clipRule="evenodd"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		>
			<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
			<circle cx="12" cy="12" r="3" />
		</g>
	</svg>
);

const PolandFlag = ({ size }: IconElementProps) => (
	<svg width={size} height={size} viewBox="0 0 640 480">
		<g fillRule="evenodd">
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		>
			<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16" />
			<path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6" />
		</g>
	</svg>
);

const NoLimit = ({ size, color, isAddon }: IconElementProps) => (
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"
		/>
	</svg>
);
const AddFriend = ({ size, color, isAddon }: IconElementProps) => (
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
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		>
			<path d="M2 21a8 8 0 0 1 13.292-6" />
			<circle cx="10" cy="8" r="5" />
			<path d="M19 16v6m3-3h-6" />
		</g>
	</svg>
);

const OnlyMale = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M5 14a5 5 0 1 0 10 0a5 5 0 1 0-10 0m14-9l-5.4 5.4M19 5h-5m5 0v5"
		/>
	</svg>
);

const OnlyFemale = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M7 9a5 5 0 1 0 10 0A5 5 0 1 0 7 9m5 5v7m-3-3h6"
		/>
	</svg>
);

const OnlyHorror = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<path d="M10 9h.01M14 9h.01M12 3a7 7 0 0 1 7 7v1h1a2 2 0 1 1 0 4h-1v3l2 3H11a6 6 0 0 1-6-5.775v-.226H4a2 2 0 0 1 0-4h1v-1a7 7 0 0 1 7-7z" />
			<path d="M11 14h2a1 1 0 0 0-2 0" />
		</g>
	</svg>
);

const Play = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="currentColor"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
		/>
	</svg>
);

const Pause = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="currentColor"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1"
		>
			<rect width="5" height="18" x="14" y="3" rx="1" />
			<rect width="5" height="18" x="5" y="3" rx="1" />
		</g>
	</svg>
);

const VolumeOff = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
		/>
	</svg>
);

const Volume = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
		/>
	</svg>
);

const Time = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<path d="M10 2h4m-2 12l3-3" />
			<circle cx="12" cy="14" r="8" />
		</g>
	</svg>
);

const Score = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
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
			<path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
		</g>
	</svg>
);

const Instagram = ({ size, color, isAddon }: IconElementProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={`${styles[color]} ${isAddon ? "rounded-[27.5%] border-2 border-(--bgc-quaternary)" : ""}`}
	>
		<path
			fill="currentColor"
			d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
		/>
	</svg>
);

type IconComponent = React.ComponentType<IconElementProps>;

const iconsMap: Record<string, IconComponent> = {
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
	dbd: DeadByDaylight,
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
	noLimit: NoLimit,
	addFriend: AddFriend,
	onlyMale: OnlyMale,
	onlyFemale: OnlyFemale,
	onlyHorror: OnlyHorror,
	play: Play,
	pause: Pause,
	volumeOff: VolumeOff,
	volume: Volume,
	time: Time,
	socre: Score,
	instagram: Instagram,
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
		<div
			className={
				isAddon
					? "absolute -right-2 bottom-0 z-10 scale-50 origin-bottom-right bg-(--bgc-secondary) border-2 border-(--bgc-quaternary) rounded-[27.5%]"
					: "relative"
			}
		>
			<Icon size={size} color={color} isAddon={isAddon} />
		</div>
	);
};

export default Icons;
