import { Link } from "react-router-dom";
import styles from "./StartQuiz.module.scss";
import type { Set } from "../../../types";
import { useEffect, useRef, useState } from "react";
import { getData } from "../../../api/getDataApi";
import Spacer from "../../utils/Spacer/Spacer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const StartQuiz = ({ refresh }: { refresh: boolean }) => {
	const [selectedSet, setSelectedSet] = useState<Set | null>(null);
	const pointsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		getData("set").then((data) => {
			const selected = data.find((set: Set) => set.selected);
			setSelectedSet(selected);
		});
	}, [refresh]);

	useGSAP(() => {
		const points = pointsRef.current?.querySelectorAll(`.${styles.point}`);
		if (points) {
			points.forEach((el, i) => {
				const left = `${Math.random() * 100}%`;
				gsap.fromTo(
					el,
					{
						y: 0,
						opacity: 1,
						left: left,
					},
					{
						y: -55,
						opacity: 0,
						duration: Math.random() * (12 - 8) + 8,
						delay: 0.3 * i,
						repeat: -1,
						ease: "power1.inOut",
						left: left,
						scale: 0.5 + Math.random() * (1.25 - 0.25) + 0.25,
					},
				);
			});
		}
	});

	return (
		<div className={styles.startQuizButton}>
			<div className={styles.content}>
				<div className={styles.title}>
					<h2 className={styles.titleText}>
						{selectedSet && selectedSet.name}
					</h2>
					<div className={styles.spacer}>
						<Spacer />
					</div>
				</div>
				<Link to="/quiz" className={styles.startButtonLink}>
					<div ref={pointsRef} className={styles.pointsWrapper}>
						{[...Array(40)].map((_, i) => (
							<i key={i} className={styles.point}></i>
						))}
					</div>
					<span className={styles.inner}>Credits</span>
				</Link>
			</div>
		</div>
	);
};

export default StartQuiz;
