import { useGSAP } from "@gsap/react";
import styles from "./AnimatedBorder.module.scss";
import { useRef } from "react";
import gsap from "gsap";

interface AnimatedBorderProps {
	children: React.ReactNode;
	flex?: string;
	inset?: string;
	borderColor?: string;
	borderRadius?: string;
}

const AnimatedBorder = ({
	children,
	flex,
	inset,
	borderColor,
	borderRadius,
}: AnimatedBorderProps) => {
	const orbRefTL = useRef<HTMLDivElement>(null);
	const orbRefTM = useRef<HTMLDivElement>(null);
	const orbRefTR = useRef<HTMLDivElement>(null);
	const orbRefBL = useRef<HTMLDivElement>(null);
	const orbRefBM = useRef<HTMLDivElement>(null);
	const orbRefBR = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const tlTL = gsap.timeline({
			repeat: -1,
			defaults: { ease: "power1.inOut" },
			yoyo: true,
		});
		tlTL
			.set(orbRefTL.current, { left: "0%", top: "7%" })
			.to(orbRefTL.current, {
				left: "2%",
				top: "0%",
				duration: 8,
				ease: "back.inOut(1)",
			})
			.to(orbRefTL.current, {
				left: "6%",
				top: "1%",
				duration: 10,
				ease: "back.inOut(1)",
			})
			.to(orbRefTL.current, {
				left: "9%",
				top: "0%",
				duration: 10,
				ease: "back.inOut(1)",
			});

		const tlTM = gsap.timeline({
			repeat: -1,
			defaults: { ease: "power1.inOut" },
			yoyo: true,
		});
		tlTM
			.set(orbRefTM.current, { left: "35%", top: "0%" })
			.to(orbRefTM.current, {
				left: "42%",
				top: "2%",
				duration: 9,
				ease: "back.inOut(1)",
			})
			.to(orbRefTM.current, {
				left: "50%",
				top: "0%",
				duration: 11,
				ease: "back.inOut(1)",
			})
			.to(orbRefTM.current, {
				left: "58%",
				top: "1%",
				duration: 10,
				ease: "back.inOut(1)",
			});

		const tlTR = gsap.timeline({
			repeat: -1,
			defaults: { ease: "power1.inOut" },
			yoyo: true,
		});
		tlTR
			.set(orbRefTR.current, { left: "91%", top: "0%" })
			.to(orbRefTR.current, {
				left: "94%",
				top: "3%",
				duration: 8,
				ease: "back.inOut(1)",
			})
			.to(orbRefTR.current, {
				left: "97%",
				top: "1%",
				duration: 10,
				ease: "back.inOut(1)",
			})
			.to(orbRefTR.current, {
				left: "100%",
				top: "7%",
				duration: 10,
				ease: "back.inOut(1)",
			});

		const tlBL = gsap.timeline({
			repeat: -1,
			defaults: { ease: "power1.inOut" },
			yoyo: true,
		});
		tlBL
			.set(orbRefBL.current, { left: "0%", top: "93%" })
			.to(orbRefBL.current, {
				left: "3%",
				top: "100%",
				duration: 9,
				ease: "back.inOut(1)",
			})
			.to(orbRefBL.current, {
				left: "6%",
				top: "99%",
				duration: 10,
				ease: "back.inOut(1)",
			})
			.to(orbRefBL.current, {
				left: "9%",
				top: "100%",
				duration: 11,
				ease: "back.inOut(1)",
			});

		const tlBM = gsap.timeline({
			repeat: -1,
			defaults: { ease: "power1.inOut" },
			yoyo: true,
		});
		tlBM
			.set(orbRefBM.current, { left: "42%", top: "100%" })
			.to(orbRefBM.current, {
				left: "50%",
				top: "97%",
				duration: 10,
				ease: "back.inOut(1)",
			})
			.to(orbRefBM.current, {
				left: "55%",
				top: "100%",
				duration: 9,
				ease: "back.inOut(1)",
			})
			.to(orbRefBM.current, {
				left: "62%",
				top: "98%",
				duration: 11,
				ease: "back.inOut(1)",
			});

		const tlBR = gsap.timeline({
			repeat: -1,
			defaults: { ease: "power1.inOut" },
			yoyo: true,
		});
		tlBR
			.set(orbRefBR.current, { left: "91%", top: "100%" })
			.to(orbRefBR.current, {
				left: "94%",
				top: "97%",
				duration: 8,
				ease: "back.inOut(1)",
			})
			.to(orbRefBR.current, {
				left: "97%",
				top: "99%",
				duration: 10,
				ease: "back.inOut(1)",
			})
			.to(orbRefBR.current, {
				left: "100%",
				top: "93%",
				duration: 10,
				ease: "back.inOut(1)",
			});
	}, []);

	return (
		<div
			className={styles.animatedBorderWrapper}
			style={{
				flex: flex,
				width: `calc(100% - 2 * ${inset})`,
				height: `calc(100% - 2 * ${inset})`,
			}}
		>
			<div
				className={styles.animatedBorder}
				style={{
					inset: `-${inset}`,
					backgroundColor: `${borderColor}`,
					borderRadius: `${borderRadius}`,
					width: `calc(100% + 2 * ${inset})`,
					height: `calc(100% + 2 * ${inset})`,
				}}
			>
				<div className={styles.lightOrb} ref={orbRefTL}></div>
				<div className={styles.lightOrb} ref={orbRefTM}></div>
				<div className={styles.lightOrb} ref={orbRefTR}></div>
				<div className={styles.lightOrb} ref={orbRefBL}></div>
				<div className={styles.lightOrb} ref={orbRefBM}></div>
				<div className={styles.lightOrb} ref={orbRefBR}></div>
			</div>
			{children}
		</div>
	);
};

export default AnimatedBorder;
