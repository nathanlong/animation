import { gsap } from './vendor/gsap/index.js'

// User Animation Settings Storage ---------------------------------------------
//
// This class sets out to:
//
// * Set up a localStorage user animation preference that's persistant
// * Honor both prefers-reduced-motion and user preference override
// * Set root level variables that can be used to pause CSS animation
// * Expose a method that returns a 0 for no animation and a 1 for yes plz

export class userAnimationSettings {
	constructor() {
		this.setVars()
		this.bindEvents()
		this.init()
		this.updateUI()
		this.setValues()
	}

	setVars() {
		// the user preference will be stored in localStorage
		this.userAnimPref = localStorage.getItem('animating')
		// to gather it, we'll be checking for reduced motion preferences
		this.mqlRm = window.matchMedia('(prefers-reduced-motion: reduce)')
		// and we need a global animation toggle set
		this.toggle = document.querySelector('[data-animation-toggle]')
	}

	bindEvents() {
		// if the preference changes while the page is active
		this.mqlRm.addEventListener('change', this.mqChange)
		// if the user indicates a different preference other than what's set
		this.toggle.addEventListener('change', this.toggleChange)
	}

	init() {
		// if not already done, set initial animation preferences
		//
		// 1 = anim ok, 0 = stop anim
		// setting as a number bc the value is set as a string no matter what
		// (easier to parse later?)
		if (this.userAnimPref === null) {
			if (this.mqlRm.matches === true) {
				// if the user has opted out, disable animation
				this.setPref(0)
			} else {
				this.setPref(1)
			}
		}
	}
	
	setValues() {
		let root = document.documentElement;
		if (this.check() === 0) {
			root.style.setProperty("--play-state", "paused");
			root.style.setProperty("--toggle", "0");
		} else {
			root.style.setProperty("--play-state", "running");
			root.style.setProperty("--toggle", "1");
		}
	}

	updateUI() {
		if (this.check() === 0) {
			this.toggle.checked = false
		} else {
			this.toggle.checked = true
		}

		// after this we're going to be checking for changes on this toggle
		this.toggle.classList.add('init')
	}

	// eventListeners change the context of `this` to the element that triggered
	// the event!, so add an arrow function, which has no `this` context
	mqChange = () => {
		// a match indicates a preference for reduced motion, so set the preference
		if (this.mqlRm.matches === true) {
			this.setPref(0)
		} else {
			this.setPref(1)
		}

		// RIGHT NOW, this is the simplest way to stop/start the animation
		// immediately, this could be made more sophisticated with a type of
		// callback or event emitter to stop/start animations
		location.reload()
	}

	toggleChange = () => {
		// make sure we've initialized the UI first
		if (this.toggle.classList.contains('init')) {
			// then check to see what we're changing
			if (this.toggle.checked === false) {
				this.setPref(0)
			} else {
				this.setPref(1)
			}

			// see note in mqChange()
			location.reload()
		}
	}

	// set localStorage animation preference so it persists
	setPref(val) {
		localStorage.setItem('animating', val)
	}

	check() {
		// TODO: there's a gap on first load where we haven't determined user
		// preferences, right now we default to prefers-reduced-motion for the
		// check, and then once the setting has been recorded we use that
		
		if (this.userAnimPref === null) {
			// if no preference recorded, check mq
			if (this.mqlRm.matches === true) {
				return 0
			} else {
				return 1
			}
		} else {
			// otherwise return value of preference
			return parseInt(this.userAnimPref)
		}
	}
}

const animSettings = new userAnimationSettings()


// ----- WAAPI
const tumbling = [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }]

const tumblingTiming = {
	duration: 3000,
	iterations: Infinity,
}

const el = document.querySelector('.waapi-anim')

// run animation if user has animations turned on
if (animSettings.check() === 1) {
	el.animate(tumbling, tumblingTiming)
}


// ----- GSAP

function gsapCheck() {
	// a little counter intuitive, we're passing this to the paused prop,
	// so we want to invert the check
	let check = animSettings.check() === 1 ? false : true;
	return check;
}

let gsapEl = document.querySelector('.gsap-anim')
let tl = gsap.timeline({
	repeat: -1,
	yoyo: true,
	paused: gsapCheck()
}).fromTo(gsapEl, {
	y: 0,
	scaleY:0.9
},{
	y: -20,
	scaleY: 1,
	rotation: '20deg',
	duration: 0.6,
	ease: "power2.out"
})

// Destroy preference

document.querySelector('.pref-destroy').addEventListener('click', function(){
	localStorage.removeItem('animating');
})

// Check the play state

console.log(animSettings.check(), '<-- 0 is disabled, 1 is enabled')

