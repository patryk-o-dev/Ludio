import styles from "./ButtonMain.module.scss";

type ButtonMainProps = {
	action?: () => void;
};

const ButtonMain = ({ action }: ButtonMainProps) => {
	return (
		<div className={styles.buttonMain} onClick={action}>
			Start
		</div>
	);
};

export default ButtonMain;
