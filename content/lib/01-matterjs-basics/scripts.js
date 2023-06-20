export class Basics {
  constructor(el) {
    this.el = el
    this.setVars()
  }

  setVars() {
    this.elWidth = this.el.offsetWidth
    this.elHeight = this.el.offsetHeight

    console.log(this.percentY(50))

    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composites = Matter.Composites,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Constraint = Matter.Constraint,
      Bodies = Matter.Bodies

    // create engine
    var engine = Engine.create(),
      world = engine.world

    // create renderer
    var render = Render.create({
      element: this.el,
      engine: engine,
      options: {
        width: this.elWidth,
        height: this.elHeight,
        showAngleIndicator: true,
      },
    })

    Render.run(render)

    // create runner
    var runner = Runner.create()
    Runner.run(runner, engine)

    // add bodies
    var rows = 10,
      yy = 600 - 25 - 40 * rows

    var stack = Composites.stack(400, yy, 5, rows, 0, 0, function (x, y) {
      return Bodies.rectangle(x, y, 40, 40)
    })

    Composite.add(world, [
      stack,
      // walls
      Bodies.rectangle(this.percentX(50), 0, this.percentX(100), 10, {
        isStatic: true,
      }),
      Bodies.rectangle(
        this.percentX(50),
        this.percentY(100),
        this.percentX(100),
        10,
        { isStatic: true }
      ),
      Bodies.rectangle(
        this.percentX(100),
        this.percentY(50),
        10,
        this.percentY(100),
        { isStatic: true }
      ),
      Bodies.rectangle(0, this.percentY(50), 10, this.percentY(100), {
        isStatic: true,
      }),
    ])

    var ball = Bodies.circle(this.percentY(15), this.percentY(50), 50, {
      density: 0.04,
      frictionAir: 0.005,
    })

    Composite.add(world, ball)
    Composite.add(
      world,
      Constraint.create({
        pointA: { x: this.percentX(37.5), y: this.percentY(15) },
        bodyB: ball,
      })
    )

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      })

    Composite.add(world, mouseConstraint)

    // keep the mouse in sync with rendering
    render.mouse = mouse

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: this.percentX(100), y: this.percentY(100) },
    })

    // context for MatterTools.Demo
    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Matter.Render.stop(render)
        Matter.Runner.stop(runner)
      },
    }
  }

  percentX(percent) {
    return Math.round((percent / 100) * this.elWidth)
  }
  percentY(percent) {
    return Math.round((percent / 100) * this.elHeight)
  }
}

const basicsTarget = document.querySelector('[data-module="basics"]')

if (basicsTarget) {
  new Basics(basicsTarget)
}
