// 01 - Basic Web Animation functions

const windowWidth = window.innerWidth
const windowHeight = window.innerHeight

// SPIN ANIMATION
const tumbling = [
  { transform: 'rotate(0)', backgroundColor: '#8ecae6' },
  { backgroundColor: '#219ebc', offset: 0.3 },
  { backgroundColor: '#023047', offset: 0.6 },
  { transform: 'rotate(360deg)', backgroundColor: '#8ecae6' },
]

const tumblingTiming = {
  duration: 3000,
  iterations: Infinity,
}

const el = document.getElementById('animation-target')

// GROW ANIMATION

const shrinkGrow = [{ transform: 'scale(1)' }, { transform: 'scale(3)' }]
const shrinkGrowOptions = {
  duration: 1000,
  iterations: Infinity,
  composite: 'add', // this allows us to independently animate the same property
}

// INITIALIZE

// binding it will autoplay the animation, so pause it right away
const animation = el.animate(tumbling, tumblingTiming)
animation.pause()

const scaleAnimation = el.animate(shrinkGrow, shrinkGrowOptions)
scaleAnimation.pause()

// HELPER FUNCTIONS

function handleMouseMove(event) {
  // find % of mouseX then affect playback speed x 10
  let windowP = event.pageX / windowWidth
  let spin = windowP * 10

  // find % of mouseY then choose the same frame from the animation
  let windowH = event.pageY / windowHeight
  let frame = Math.floor(windowH * shrinkGrowOptions.duration)

  // in this case we're dynamically altering the playback
  animation.playbackRate = spin
  // in this one we're scrubbing the animation frames back and forth
  scaleAnimation.currentTime = frame
}

// CONTROLS

document.getElementById('spin').addEventListener('mousedown', function () {
  animation.play()
})

document.getElementById('stop').addEventListener('mousedown', function () {
  animation.pause()
})

document
  .getElementById('speed-up')
  .addEventListener('mousedown', function () {
    animation.playbackRate = animation.playbackRate * 1.2
  })

document.getElementById('reset').addEventListener('mousedown', function () {
  animation.playbackRate = animation.playbackRate * 0.8
})

// bind the mouse position to
document
  .getElementById('mouse-bind')
  .addEventListener('mousedown', function () {
    // raw binding, this fires A LOT, recommend debounceing in
    // a real-world example
    document.onmousemove = handleMouseMove
    animation.play()
  })
