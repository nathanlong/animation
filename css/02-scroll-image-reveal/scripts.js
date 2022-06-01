const videoScrubEl = document.querySelector('.video-scrub-cover');
let vidLength

videoScrubEl.addEventListener("loadedmetadata", function () {
	vidLength = Math.floor(videoScrubEl.duration);
});

const trackAnimationProgress = (animation, cb, precision = 10) => {
	let progress = 0;
	const updateValue = () => {
		if (animation && animation.currentTime) {
			let newProgress = animation.effect.getComputedTiming().progress * 1;
			if (animation.playState === "finished") newProgress = 1;
			newProgress = Math.max(0.0, Math.min(1.0, newProgress)).toFixed(precision);

			if (newProgress != progress) {
				progress = newProgress;
				cb(progress);
			}
		}
		requestAnimationFrame(updateValue);
	};
	requestAnimationFrame(updateValue);
}

document.querySelectorAll('.video-scrub-track').forEach($scrub => {
	const model = $scrub.querySelector('.video-scrub-cover');
  console.log($scrub.getAnimations()[0])

	trackAnimationProgress($scrub.getAnimations()[0], (progress) => {
    videoScrubEl.currentTime = progress * vidLength || 0;
	});
});
