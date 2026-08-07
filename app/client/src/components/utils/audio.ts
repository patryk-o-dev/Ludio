export const playUiSound = (soundSrc: string) => {
	const audio = new Audio(soundSrc);
	audio.muted = false;

	void audio.play().catch(() => undefined);
};

export const unlockAudio = (soundSrc?: string) => {
	localStorage.setItem("audioUnlocked", "true");

	if (soundSrc) {
		playUiSound(soundSrc);
	}
};
