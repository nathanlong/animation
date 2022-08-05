import { gsap } from './vendor/gsap/index.js'
import { Flip } from './vendor/gsap/Flip.js'
import { ScrollTrigger } from './vendor/gsap/ScrollTrigger.js'
gsap.registerPlugin(Flip, ScrollTrigger)

// GRID Flip
// STILL WIP DONT @ ME YO
// STILL NEEDS LOTS OF WORK
//
// Couple things going on here:
// - Testing the FLIP plugin as it relates to CSS grid reclarations
// - Using ScrollTrigger as a replacement for IntersectionObserver
//
// FLIP records the beginning state, then measures the distance between it
// and the end state and animates the in-between automatically -- pretty cool!
// Record state -> change stuff -> Let flip animate!
// All the values in the grid changes are in the css
//
// ScrollTrigger usually sits on top of a timeline or tween (to, from, etc) but
// also allows using it as a standalone.

const grid = document.querySelectorAll('.grid-el')
const target = document.querySelector('.grid-image')

ScrollTrigger.create({
	trigger: '.grid-image',
	start: 'top center', // when the top of the trigger hits the middle of the viewport
	markers: true,
	onEnter: (self) => flipper(target),
})

function flipper(el) {
	console.log('flip!')
	const state = Flip.getState(grid)
	el.classList.add('swap')
	Flip.from(state, {
		duration: 1.2,
		ease: 'power1.inOut',
		scale: true,
	})
}
