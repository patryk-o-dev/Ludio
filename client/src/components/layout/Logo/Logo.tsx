import styles from "./Logo.module.scss";
import logoImage from "../../../assets/images/logoPlaceholder.png";

const Logo = () => {
	return (
		<div className={styles.logo}>
			<img src={logoImage} alt="Logo" />
			<div className={styles.spacer}></div>
		</div>
	);
};

export default Logo;
