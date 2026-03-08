import { useGSAP } from "@gsap/react";
import styles from "./Spacer.module.scss";
import { useRef } from "react";
import gsap from "gsap";

const Spacer = () => {
	const spacerRefLeft = useRef<HTMLDivElement>(null);
	const spacerRefRight = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		gsap.fromTo(
			spacerRefLeft.current,
			{
				background:
					"linear-gradient(90deg, transparent 0%, #8b5072 20%, #f7b9c6 60%, #fbdaf5 90%)",
			},
			{
				duration: 4,
				ease: "power1.inOut",
				repeat: -1,
				yoyo: true,
				background:
					"linear-gradient(90deg, transparent 0%, #8b5072 35%, #f7b9c6 90%, #fbdaf5 100%)",
			},
		);
		gsap.fromTo(
			spacerRefRight.current,
			{
				background:
					"linear-gradient(270deg, transparent 0%, #8b5072 20%, #f7b9c6 70%, #fbdaf5 100%)",
			},
			{
				duration: 4,
				ease: "power1.inOut",
				repeat: -1,
				yoyo: true,
				background:
					"linear-gradient(270deg, transparent 0%, #8b5072 25%, #f7b9c6 60%, #fbdaf5 80%)",
			},
		);
	}, []);
	return (
		<div className={styles.spacerWrapper}>
			<div className={styles.spacerLeft} ref={spacerRefLeft}></div>
			<div className={styles.decorGem}></div>
			<div className={styles.spacerRight} ref={spacerRefRight}></div>
		</div>
	);
};

export default Spacer;
