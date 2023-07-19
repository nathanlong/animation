import { gsap } from '../../public/vendor/gsap-3.10.4/index.js'

export default class replaceme {
  constructor(el) {
    this.el = el
    this.setVars()
    this.bindEvents()
  }

  setVars() {
    this.counter = 0
  }

  bindEvents() {
    this.el.addEventListener('click', )
  }

  handleClick = () => {
    this.counter = this.counter + 1;
    console.log(this.counter);
  }
}

const dataModules = [...document.querySelectorAll('[data-module="replaceme"]')]

dataModules.forEach((element) => {
  element.dataset.module.split(' ').forEach(function () {
    new replaceme(element)
  })
})
