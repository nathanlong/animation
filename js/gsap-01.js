import { gsap } from './vendor/gsap/index.js'

// REPEATTEXT EFFECT
//
// For each element this class:
// - Creates a bunch of span copies of the text
// - Generates staggered values for translate-y and animation delay values
// - Builds a gsap timeline that feeds the custom values intersectionRatio
// - Creates an IntersectionObserver that scrubs the timeline based on position
//
// The layering effects are created in CSS
//
// Credit:
// https://tympanus.net/Development/TextRepetitionEffect/
// Original effect:
// https://experience.drdabber.com/product/stella


// in the viget module style... sort of
// https://www.viget.com/articles/how-does-viget-javascript/
export class RepeatText {
	constructor(el) {
		this.el = el
		this.setVars()
		this.layout()
		this.setBoundaries()
		this.createScrollTimeline()
		this.createObserver()
	}

	// setup our class fields
	setVars() {
		this.totalWords = 9 // total amount of duplicates
		this.tyIncrement = 12 // translate-y increment
		this.delayIncrement = 0.1 // animation speed for spread stagger
		// empty fields for later population
		this.scrollTimeline
		this.observer
		this.words
	}

	// set staggered translate-y and delay values per text clone
	// shove all the text clones back into the original el
	layout() {
		const halfWordCount = Math.floor(this.totalWords / 2)
		let innerHTML = ''

		for (let i = 0; i < this.totalWords; i++) {
			let ty
			let delay

			// TODO: I feel like this could be optimized more...
			if (i === this.totalWords - 1) {
				// set the last child as centered
				ty = 0
				delay = 0
			} else if (i < halfWordCount) {
				// top half (moves up)
				ty = halfWordCount * this.tyIncrement - this.tyIncrement * i
				delay =
					this.delayIncrement *
						(halfWordCount - (i - halfWordCount)) -
					this.delayIncrement
			} else {
				// bottom half (moves down)
				ty =
					-1 *
					(halfWordCount * this.tyIncrement -
						(i - halfWordCount) * this.tyIncrement)
				delay =
					this.delayIncrement *
						(halfWordCount - (i - halfWordCount)) -
					this.delayIncrement
			}

			innerHTML += `<span data-delay="${delay}" data-ty="${ty}">${this.el.innerHTML}</span>`
			// console.log(i, ty, delay)
		}

		this.el.innerHTML = innerHTML
		this.el.classList.add('text-rep')

		// stuff all these new clones into an array for gsap to animate
		this.words = [...this.el.querySelectorAll('span')].slice(0, -1)
		// console.log(this.words)
	}

	// set pb and mt the amount the words will translate up/down
	setBoundaries() {
		const paddingBottomMarginTop =
			(getHeight(this.el) *
				Math.floor(this.totalWords / 2) *
				this.tyIncrement) /
			100
		gsap.set(this.el, {
			marginTop: paddingBottomMarginTop,
			paddingBottom: paddingBottomMarginTop,
		})
		// console.log(paddingBottomMarginTop)
	}

	// creates the timeline that does the work of moving the elements, changes
	// here reflect how the clones move as the effect scrolls
	createScrollTimeline() {
		this.scrollTimeline = gsap.timeline({ paused: true }).to(this.words, {
			duration: 1,
			ease: 'power1',
			yPercent: (_, target) => target.dataset.ty,
			delay: (_, target) => target.dataset.delay,
		})
	}

	// intersection observer to trigger gsap timeline
	// from codrops who got it from:
	// https://medium.com/elegant-seagulls/parallax-and-scroll-triggered-animations-with-the-intersection-observer-api-and-gsap3-53b58c80b2fa
	createObserver() {
		const observerOptions = {
			root: null,
			rootMargin: '0px 0px',
			threshhold: 0,
		}

		this.observer = new IntersectionObserver((entry) => {
			if (entry[0].intersectionRatio > 0) {
				if (!this.isLoaded) {
					this.isLoaded = true
				}
				//gsap ticker runs a function per requestAnimationFrame
				gsap.ticker.add(this.progressTween)
			} else {
				if (this.isLoaded) {
					gsap.ticker.remove(this.progressTween)
				} else {
					this.isLoaded = true
					// add and remove immediately
					gsap.ticker.add(this.progressTween, true)
				}
			}
		}, observerOptions)

		this.progressTween = () => {
			// Get scroll distance to bottom of viewport.
			const scrollPosition = window.scrollY + window.innerHeight
			// Get element's position relative to bottom of viewport.
			const elPosition = scrollPosition - this.el.offsetTop
			// Set desired duration.
			const durationDistance = window.innerHeight + this.el.offsetHeight
			// Calculate tween progress.
			const currentProgress = elPosition / durationDistance
			// Set progress of gsap timeline.
			this.scrollTimeline.progress(currentProgress)
		}

		this.observer.observe(this.el)
	}

	cleanUp() {
		// remove listeners?
	}
}

// helper function
function getHeight(el) {
	const computedStyle = getComputedStyle(el)
	let elHeight = el.clientHeight // height with padding
	elHeight -=
		parseFloat(computedStyle.paddingTop) +
		parseFloat(computedStyle.paddingBottom)
	return elHeight
}

// grab and init
document.querySelectorAll('[data-module="repeatText"]').forEach((el) => {
	new RepeatText(el)
})

// show the stacking
document
	.querySelector('.toggle-style')
	.addEventListener('mousedown', function () {
		document.querySelector('body').classList.toggle('stack')
	})
