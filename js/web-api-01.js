// 01 - Basic Web Animation functions

let tumbling = [
	{ transform: "rotate(0)", backgroundColor: "green" },
	{ backgroundColor: "blue", offset: 0.3 },
	{ backgroundColor: "purple", offset: 0.6 },
	{ transform: "rotate(360deg)", backgroundColor: "green" },
];

let tumblingTiming = {
	duration: 3000,
	iterations: Infinity,
};

const el = document.getElementById("animation-target");

// binding it will autoplay the animation
// but we need to access it later
const animation = el.animate(tumbling, tumblingTiming);

// so pause it right away
animation.pause();

// This handler will be executed only once when the cursor
// moves over the unordered list
el.addEventListener(
	"mouseenter",
	function () {
		// animation.play();
	},
	false
);

el.addEventListener(
	"mouseleave",
	function () {
		// animation.pause();
	},
	false
);

document.getElementById("spin").addEventListener("mousedown", function () {
	animation.play();
});

document.getElementById("stop").addEventListener("mousedown", function () {
	animation.pause();
});

document
	.getElementById("speed-up")
	.addEventListener("mousedown", function () {
		animation.playbackRate = animation.playbackRate * 1.2;
	});

document.getElementById("reset").addEventListener("mousedown", function () {
	animation.playbackRate = animation.playbackRate * 0.8;
});
