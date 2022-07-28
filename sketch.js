
class CelestrialBody {
  constructor(radius, color) {
    this.radius = radius * dUnits;
    this.color = color;
  }

  create() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius);
  }
}

class Planet extends CelestrialBody {
  constructor(radius, orbitRadius, color, sun) {
    super(radius, color);
    this.orbitRadius = orbitRadius * dUnits;

    this.x = 0;
    this.y = 0;
    this.orbitAngle = 0; // degrees relative to x axis

    // 2000 is an arbitrary animation speed (which also depends on the frame rate)
    // The -1.5 exponent is due to Kepler's 3rd Law
    this.orbitAngleDelta = 2000 * Math.pow(this.orbitRadius, -1.5);
    this.sun = sun;
  }

  
  orbit() {
    this.x = this.sun.x + this.orbitRadius * cos(radians(this.orbitAngle));
    this.y = this.sun.y + this.orbitRadius * sin(radians(this.orbitAngle));
    this.orbitAngle = (this.orbitAngle + this.orbitAngleDelta) % 360;
  }
}

class Sun extends CelestrialBody {
  constructor(x, y, radius) {
    super(radius, '#f5e633')
    this.x = x
    this.y = y
  }
}

let sun;
let planets = [];
let dUnits = 1;
let tUnites = 1;

function setup() {
  let width = 1900;
  let height = 1000;

  createCanvas(width, height);

  sun = new Sun(width/2, height/2, 40);

  let earth = new Planet(10, 200, "#287ab8", sun);
  planets.push(earth);
}

function draw() {
  background("#0f0f0f");
  sun.create()
  planets[0].create();
  planets[0].orbit();
}
