// Create a PixiJS application of type cavas with specify background color and make it resizes to the iframe window
const app = new PIXI.Application({
  background: '#4cc9f0',
  resizeTo: window,
})

// Adding the application's view to the DOM
document.body.appendChild(app.view)

// Basic settings
app.stage.eventMode = 'dynamic'
app.stage.hitArea = app.screen

// Create container for orbs
const container = new PIXI.Container()
app.stage.addChild(container)

const colors = ['0x4361ee', '0x3a0ca3', '0x7209b7', '0xf72585']

const blurFilter1 = new PIXI.BlurFilter()
const blurFilter2 = new PIXI.BlurFilter()
const blurFilter3 = new PIXI.BlurFilter()

// Bunny Cursor
const graphics = new PIXI.Graphics()
const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png')
app.stage.addChild(bunny)
bunny.anchor.set(0.5)
bunny.x = app.screen.width / 2
bunny.y = app.screen.height / 2
bunny.filters = [blurFilter1]
app.stage.addChild(graphics)

// Helper Functions

function randomCircle() {
  const circle = new PIXI.Graphics()
  // create random circle
  const randomColor = Math.floor(Math.random() * colors.length)
  circle.beginFill(colors[randomColor])
  circle.drawCircle(0, 0, (Math.random() * app.screen.width) / 4)
  circle.endFill()
  // generateTexture converts a graphic to a texture, which can be used to
  // create a sprite
  const texture = app.renderer.generateTexture(circle)
  return {
    texture,
  }
}

// Orbs
const orbs = []

// orb vars
let trackSpeed = 0.03
let rotationSpeed = 0.01

// set wrapping boundaries (invisible rectangle) to be roughly equal to orb size
const padding = app.screen.width / 4
const bounds = new PIXI.Rectangle(
  -padding,
  -padding,
  app.screen.width + padding * 2,
  app.screen.height + padding * 2
)

// create 20 orbs with randomized variables
for (let i = 0; i < 20; i++) {
  const orb = PIXI.Sprite.from(randomCircle().texture)

  orb.anchor.set(0.5)
  container.addChild(orb)

  orb.direction = Math.random() * Math.PI * 2
  orb.speed = 1
  orb.turnSpeed = Math.random() - 0.8

  orb.x = Math.random() * bounds.width
  orb.y = Math.random() * bounds.height

  orb.scale.set(1 + Math.random() * 0.3)
  orb.original = new PIXI.Point()
  orb.original.copyFrom(orb.scale)

  orbs.push(orb)
}

// Blur the orbs
container.filters = [blurFilter2]
blurFilter2.blur = 300
blurFilter2.quality = 25

// Events
app.stage.on('pointermove', (event) => {
  mouseX = event.global.x
  mouseY = event.global.y
})

// Ticker variables
let mouseX
let mouseY
let count = 0

// Listen for animate update
app.ticker.add((delta) => {
  count += 0.02

  // delta is 1 if running at 100% performance
  // creates frame-independent transformation
  bunny.rotation += rotationSpeed * delta

  // the farther the cursor, the faster the move speed
  let xdiff = Math.abs((mouseX - bunny.x) * trackSpeed)
  let ydiff = Math.abs((mouseY - bunny.y) * trackSpeed)
  let largestdiff = Math.max(xdiff, ydiff)

  if (bunny.x < mouseX) {
    bunny.x += xdiff * delta
  }

  if (bunny.x > mouseX) {
    bunny.x -= xdiff * delta
  }

  if (bunny.y < mouseY) {
    bunny.y += ydiff * delta
  }

  if (bunny.y > mouseY) {
    bunny.y -= ydiff * delta
  }

  blurFilter1.blur = 0.5 * largestdiff

  // animate orbs
  for (let i = 0; i < orbs.length; i++) {
    const orb = orbs[i]

    orb.direction += orb.turnSpeed * 0.01
    orb.x += Math.sin(orb.direction) * orb.speed
    orb.y += Math.cos(orb.direction) * orb.speed

    orb.rotation = -orb.direction - Math.PI / 2
    orb.scale.x = orb.original.x + Math.sin(count) * 0.2

    // wrap the orbs around as they hit the bounds
    if (orb.x < bounds.x) {
      orb.x += bounds.width
    } else if (orb.x > bounds.x + bounds.width) {
      orb.x -= bounds.width
    }

    if (orb.y < bounds.y) {
      orb.y += bounds.height
    } else if (orb.y > bounds.y + bounds.height) {
      orb.y -= bounds.height
    }
  }
})

document.getElementById('toggleBlur').addEventListener('click', (e) => {
  let currentAmount = blurFilter2.blur
  let newAmount = parseInt(e.target.dataset.amount)
  blurFilter2.blur = newAmount
  e.target.dataset.amount = currentAmount
})
