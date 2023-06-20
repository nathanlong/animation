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

// Simplifed version of Viget dynamic modules for demo purposes only
// DON'T REUSE THIS PATTERN, use the real deal, with HMR and all that...
// https://www.viget.com/articles/how-does-viget-javascript/
const dataModules = [...document.querySelectorAll('[data-module="replaceme"]')]

dataModules.forEach((element) => {
  element.dataset.module.split(' ').forEach(function () {
    new replaceme(element)
  })
})
