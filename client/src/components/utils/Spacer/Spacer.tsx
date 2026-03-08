import { useGSAP } from "@gsap/react";
import styles from "./Spacer.module.scss";
import { useRef } from "react";
import gsap from "gsap";

const Spacer = () => {
	const spacerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		gsap.fromTo(
			spacerRef.current,
			{
				background:
					"linear-gradient(90deg, transparent 0%, #8b5072 15%, #f7b9c6 45%, #fbdaf5 50%, #f7b9c6 55%, #8b5072 85%, transparent 100%)",
			},
			{
				duration: 4,
				ease: "power1.inOut",
				repeat: -1,
				yoyo: true,
				background:
					"linear-gradient(90deg, transparent 0%, #8b5072 17%, #f7b9c6 50%, #fbdaf5 60%, #f7b9c6 62%, #8b5072 83%, transparent 100%)",
			},
		);
	}, []);
	return (
		<div className={styles.spacer} ref={spacerRef}>
			<div className={styles.decorGem}></div>
		</div>
	);
};

export default Spacer;
