import styles from "./Logo.module.scss";
import logoImage from "../../../assets/images/logoPlaceholder.png";
import Spacer from "../../utils/Spacer/Spacer";

const Logo = () => {
	return (
		<div className={styles.logo}>
			<img src={logoImage} alt="Logo" />
			<Spacer />
		</div>
	);
};

export default Logo;
