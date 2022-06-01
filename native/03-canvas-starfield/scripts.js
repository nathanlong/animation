function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default class starfield {
  constructor(el) {
    this.el = el
    this.setVars()
    this.bindEvents()
    this.drawStarField()
  }

  setVars() {
    // this.canvas = this.el.querySelector<HTMLCanvasElement>('canvas')
    // this.canvas = this.el
    this.canvas = document.getElementById('stars')
    this.ctx = this.canvas.getContext('2d')
  }

  bindEvents() {
    this.canvas.addEventListener('click', this.handleClick)
  }

  handleClick = () => {
    this.drawStarField()
  }

  drawStar(x, y, radius, hue, sat, lum, alpha) {
    if (!this.ctx) {
      return
    }
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, 360)
    this.ctx.fillStyle = `hsla(${hue},${sat}%,${lum}%,${alpha})`
    this.ctx.fill()
  }

  drawStarField() {
    if (!this.canvas || !this.ctx) {
      return
    } 

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    const pixels = this.canvas.width * this.canvas.height
    const stars = Math.floor(pixels * 0.0005)
    const colors = [0, 60, 240]

    for (let i = 0; i < stars; i++) {
      let x = random(2, this.canvas.width - 2)
      let y = random(2, this.canvas.height - 2)
      let size = random(1, 4)
      let radius = size / 2
      let hue = colors[random(0, colors.length - 1)]
      let sat = random(50, 100)
      let alpha = random(0.5, 1)
      let lum = random(90, 98)

      requestAnimationFrame(() => {
        this.drawStar(x, y, radius, hue, sat, lum, alpha)
      })
    }
  }
}

const dataModules = [
  ...document.querySelectorAll('[data-module="starfield"]'),
]

dataModules.forEach((element) => {
  element.dataset.module.split(' ').forEach(function () {
    new starfield(element)
  })
})
