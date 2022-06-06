// set up animation
const appear = [
	{ opacity: 0, transform: "translateY(10px)" },
	{ opacity: 1, transform: "translateY(0)" },
];

const appearOptions = {
	duration: 850,
	fill: "forwards", // preserves end state for elements after animation
	easing: "cubic-bezier(0.33, 1, 0.68, 1)", //easeOutCubic
};

// ideally we'll be much more specific in our targeted elements
const observerElements = document.querySelectorAll(".appear-wrapper *");

// begin as soon as the element becomes visible at all in the document
const observerOptions = { root: null, rootMargin: "0px 0px", threshold: 0 };

// observer function
const Observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		// set up but pause animation, freezing elements in faded out state
		let animation = entry.target.animate(appear, appearOptions);
		animation.pause();

		if (entry.isIntersecting) {
			// animate the elements unless we're at the top of the window
			if (window.scrollY > 0) {
				animation.play();
			} else {
				animation.cancel(); // remove animation
			}

			// remove the observer when done
			Observer.unobserve(entry.target);
		}
	});
}, observerOptions);

// attach observers
observerElements.forEach((el) => {
	Observer.observe(el);
});

// Features
//
// - Does not prevent visibility with JS disabled
// - Elements should fade in smoothly regardless of scroll speed (no
//   scroll flash)
// - No classlist manipulation, all contained in this script
//
// Wishlist
//
// - Stagger elements as they appear? (Avoid batching)
