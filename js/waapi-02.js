// set up animation
//
// BUT start at non-zero for opacity fade in, this is to help prevent
// poor LCP (Largest Contentful Paint) scores in automated testing:
// https://www.debugbear.com/blog/opacity-animation-poor-lcp
//
// When you start with elements at 0 opacity, it will be excluded as an LCP
// element, but then if it's repainted (like animation) it will result in
// a high LCP score

const appear = [
  { opacity: 0, transform: 'translateY(24px)' },
  // { opacity: 0.1, transform: 'translateY(20px)' },
  { opacity: 1, transform: 'translateY(0)' },
]

const appearOptions = {
  duration: 1250,
  fill: 'both', // preserves end state for elements after animation
  easing: 'cubic-bezier(0.33, 1, 0.68, 1)', //easeOutCubic
}

// get first descendants of wrapper, and specially targeted elements
const observerElements = document.querySelectorAll(
  '.appear-wrapper > *, .appear'
)

// begin as soon as the element becomes visible at all in the document
const observerOptions = { root: null, rootMargin: '0px 0px', threshold: 0 }

// observer function
const Observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // set up but pause animation, freezing elements in faded out state
    let animation = entry.target.animate(appear, {
      ...appearOptions,
      delay: entry.target.dataset.appearDelay ? parseInt(entry.target.dataset.appearDelay) : 0,
    })
    animation.pause()

    if (entry.isIntersecting) {
      animation.play()

      // remove the observer when done
      Observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// attach observers
observerElements.forEach((el) => {
  Observer.observe(el)
})

// Features
//
// - Does not prevent visibility with JS disabled
// - Elements should fade in smoothly regardless of scroll speed (no
//   scroll flash)
// - No classlist manipulation, all contained in this script
//
// Wishlist
// - Decendant animations triggered when parent starts?
