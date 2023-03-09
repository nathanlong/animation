// svg-01.js

const svg01_01 = document.getElementById('svg-01-mask-animate')
const svg01root = document.getElementById('svg-01')

document
  .getElementById('button-svg-01')
  .addEventListener('click', function () {
    // begins at 0
    svg01_01.beginElement()
  })

document
  .getElementById('button-svg-02')
  .addEventListener('click', function () {
    // ends, seems to interact with fill=freeze
    svg01_01.endElement()
  })
