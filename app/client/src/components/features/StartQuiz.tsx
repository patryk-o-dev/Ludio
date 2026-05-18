const StartQuiz = () => {
	return (
		<div className="flex flex-col items-end mt-auto">
			<button className="p-4 bg-(--accent) text-(--text) uppercase text-xl rounded-lg hover:bg-(--accent-light)">
				Rozpocznij QUIZ
			</button>
			<p className="text-(--text-secondary) text-xs mt-2">
				przeciwnik: <span className="text-(--info)">FriendName</span>
			</p>
		</div>
	);
};

export default StartQuiz;
