// 01 - Basic Web Animation functions

// setup animation

let tumbling = [
	{ transform: "rotate(0)", backgroundColor: "#8ecae6" },
	{ backgroundColor: "#219ebc", offset: 0.3 },
	{ backgroundColor: "#023047", offset: 0.6 },
	{ transform: "rotate(360deg)", backgroundColor: "#8ecae6" },
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

const windowWidth = window.innerWidth;

// optionally bind mouse X to playback rate
document
	.getElementById("mouse-bind")
	.addEventListener("mousedown", function () {
		// raw binding
		document.onmousemove = handleMouseMove;
		// measure window on load
	});

function handleMouseMove(event) {
	let eventDoc, doc, body;
	let windowP = event.pageX / windowWidth;
	// console.log(windowP);
	animation.playbackRate = windowP * 10;
}
