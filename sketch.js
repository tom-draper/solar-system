
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
  constructor(radius, orbitRadius, speed, color, sun) {
    super(radius, color);
    this.orbitRadius = (orbitRadius + sun.radius) * dUnits;

    this.x = 0;
    this.y = 0;
    this.orbitAngle = 0; // Degrees relative to x axis

    this.orbitAngleDelta = speed * tUnits * Math.pow(this.orbitRadius, -1.5);
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
let dUnits = 2.5;
let tUnits = 10000;

function setup() {
  let width = 1900;
  let height = 1000;

  createCanvas(width, height);

  // Radius values are relatve to Earth (Earth = 1)
  sun = new Sun(width/2, height/2, 109);

  // Orbital radius are distances 10^10 meters from Sun
  let mercury = new Planet(0.4, 5.67, 1/0.88, "#c9c8c7", sun);
  planets.push(mercury);

  let venus = new Planet(0.9, 10.7, 1/2.25, "#f2d79e", sun);
  planets.push(venus);
  
  let earth = new Planet(1, 15.1, 1/3.65, "#287ab8", sun);
  planets.push(earth);

  let mars = new Planet(0.5, 20.8, 1/6.87, "#c65836", sun);
  planets.push(mars);

  let jupiter = new Planet(11.2, 74.2, 1/43.33, "#e3b371", sun);
  planets.push(jupiter);
  
  let saturn = new Planet(9.4, 147.7, 1/107.59, "#eac757", sun);
  planets.push(saturn);

  let uranus = new Planet(4, 294.6, 1/306.87, "#eac757", sun);
  planets.push(uranus);
  
  let neptune = new Planet(3.9, 447.5, 1/601.90, "#88baf0", sun);
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
