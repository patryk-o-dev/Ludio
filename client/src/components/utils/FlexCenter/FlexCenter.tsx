import React from "react";
import styles from "./FlexCenter.module.scss";

interface FlexCenterProps {
	children: React.ReactNode;
	className?: string;
}

const FlexCenter = ({ children, className = "" }: FlexCenterProps) => (
	<div className={`${styles.viewportCenter} ${className}`}>
		<div className={styles.contentBox}>{children}</div>
	</div>
);

export default FlexCenter;
