import logo from "../../assets/images/logoBig.png";

const Logo = () => {
	return (
		<div className="flex items-center gap-4">
			<img
				src={logo}
				alt="Streamer Logo"
				className="w-20 h-20 rounded-full object-cover border-(--accent-dark)"
			/>
		</div>
	);
};

export default Logo;
