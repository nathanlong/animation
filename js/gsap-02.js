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

export class GridFlip {
	constructor(el) {
		this.el = el
		this.setVars()
		this.setScrollTrigger()
	}

	setVars() {
		this.flipTargets = this.el.querySelectorAll('.grid-el')
	}

	setScrollTrigger() {
		ScrollTrigger.create({
			trigger: this.el,
			start: 'center center', // when the top of the trigger hits the middle of the viewport
			markers: true, // show the trigger markers, helpful for debugging
			onEnter: (self) => this.createFlip(this.el),
		})
	}

	createFlip(el) {
		// record current state
		const state = Flip.getState(this.flipTargets)
		// alter the elements
		this.el.classList.add('swap')
		// create Flip to tween from previous state
		Flip.from(state, {
			duration: 1.2,
			ease: 'power1.inOut',
			scale: true,
		})
	}
}

// grab instances and init
document.querySelectorAll('[data-module="gridFlip"]').forEach((el) => {
	new GridFlip(el)
})
