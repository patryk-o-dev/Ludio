const Popup = ({ value }: { value: string }) => {
	return (
		<div
			className={`fixed top-12 right-24 p-2 rounded-xl bg-(--accent) border border-(--accent-darker)`}
		>
			<p className="text-(--text)">{value}</p>
		</div>
	);
};

export default Popup;
