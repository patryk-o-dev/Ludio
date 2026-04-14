import { useGSAP } from "@gsap/react";
import styles from "./AnimatedBorder.module.scss";
import { useRef } from "react";
import gsap from "gsap";

interface AnimatedBorderProps {
	children: React.ReactNode;
	flex?: string;
	inset?: string;
	dominantColor?: string;
	borderRadius?: string;
}

const AnimatedBorder = ({
	children,
	flex,
	inset,
	dominantColor,
	borderRadius,
}: AnimatedBorderProps) => {
	const borderRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		gsap.fromTo(
			borderRef.current,
			{ filter: "brightness(0.6)" },
			{
				filter: "brightness(1.1)",
				duration: 2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			},
		);
	}, []);

	return (
		<div
			className={styles.animatedBorderWrapper}
			style={{
				flex,
				width: `calc(100% - 2 * ${inset})`,
				height: `calc(100% - 2 * ${inset})`,
			}}
		>
			<div
				ref={borderRef}
				className={styles.animatedBorder}
				style={{
					inset: `-${inset}`,
					backgroundColor: dominantColor,
					borderRadius,
					width: `calc(100% + 2 * ${inset})`,
					height: `calc(100% + 2 * ${inset})`,
				}}
			/>
			{children}
		</div>
	);
};

export default AnimatedBorder;
