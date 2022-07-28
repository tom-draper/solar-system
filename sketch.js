
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
    this.orbitRadius = (orbitRadius + sun.radius) * dUnits;

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

  // Radius values are relatve to Earth (Earth = 1)
  sun = new Sun(width/2, height/2, 109);

  // Orbital radius are distances 10^10 meters from Sun
  let mercury = new Planet(0.4, 5.67, "#c9c8c7", sun);
  planets.push(mercury);

  let venus = new Planet(0.9, 10.7, "#f2d79e", sun);
  planets.push(venus);
  
  let mars = new Planet(0.5, 20.8, "#c65836", sun);
  planets.push(mars);

  let earth = new Planet(1, 15.1, "#287ab8", sun);
  planets.push(earth);

  let jupiter = new Planet(11.2, 74.2, "#e3b371", sun);
  planets.push(jupiter);
  
  let saturn = new Planet(9.4, 147.7, "#eac757", sun);
  planets.push(saturn);

  let uranus = new Planet(4, 294.6, "#eac757", sun);
  planets.push(uranus);
  
  let neptune = new Planet(3.9, 447.5, "#88baf0", sun);
  planets.push(neptune);
}

function draw() {
  background("#0f0f0f");
  sun.create()
  for (let planet of planets) {
    planet.create()
    planet.orbit()
  }
}
