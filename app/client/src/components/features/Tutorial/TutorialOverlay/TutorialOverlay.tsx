import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type OverlayProps = {
	x: number;
	y: number;
	width: number;
	height: number;
};

const TutorialOverlay = ({ x, y, width, height }: OverlayProps) => {
	const cutoutRef = useRef<SVGRectElement>(null);

	useLayoutEffect(() => {
		const rect = cutoutRef.current;
		if (!rect) return;

		gsap.to(rect, {
			attr: {
				x,
				y,
				width,
				height,
			},
			duration: 0.7,
			ease: "power2.inOut",
			overwrite: true,
		});
	}, [x, y, width, height]);

	return (
		<div>
			<svg
				className="fixed inset-0 h-full w-full pointer-events-none"
				aria-hidden="true"
			>
				<defs>
					<mask
						id="tutorial-mask"
						maskUnits="userSpaceOnUse"
						maskContentUnits="userSpaceOnUse"
					>
						<rect x="0" y="0" width="100%" height="100%" fill="white" />
						<rect ref={cutoutRef} fill="black" />
					</mask>
				</defs>
			</svg>

			<div
				className="fixed inset-0 z-60 bg-black/30 backdrop-blur-sm"
				style={{
					mask: "url(#tutorial-mask)",
					WebkitMask: "url(#tutorial-mask)",
				}}
			/>
		</div>
	);
};

export default TutorialOverlay;
