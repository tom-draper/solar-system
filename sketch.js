class CelestrialBody {
  constructor(radius, color) {
    this.radius = radius * dUnits;
    this.color = color;
  }

  draw() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius);
  }
}

class Planet extends CelestrialBody {
  constructor(radius, orbitRadius, speed, color, sun) {
    super(radius, color);
    this.orbitRadius = orbitRadius * dUnits + sun.radius;

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
    super(radius, "#f5e633");
    this.x = x;
    this.y = y;
  }
}

class SolarSystem {
  constructor(realistic = false, width = 1900, height = 1000) {
    this.sun = undefined;
    this.planets = [];

    createCanvas(width, height);
    if (realistic) {
      this.dUnits = 1;
      this.tUnits = 10000;
      this.realistic(width, height);
    } else {
      this.dUnits = 5;
      this.tUnits = 10000;
      this.compact(width, height);
    }
  }

  realistic(width, height) {
    // Radius values are relatve to Earth (Earth = 1)
    this.sun = new Sun(width / 2, height / 2, 109);

    // Orbital radius are distances 10^10 meters from Sun
    let mercury = new Planet(0.4, 5.67, 1 / 0.88, "#c9c8c7", sun);
    this.planets.push(mercury);

    let venus = new Planet(0.9, 10.7, 1 / 2.25, "#f2d79e", sun);
    this.planets.push(venus);

    let earth = new Planet(1, 15.1, 1 / 3.65, "#287ab8", sun);
    this.planets.push(earth);

    let mars = new Planet(0.5, 20.8, 1 / 6.87, "#c65836", sun);
    this.planets.push(mars);

    let jupiter = new Planet(11.2, 74.2, 1 / 43.33, "#e3b371", sun);
    this.planets.push(jupiter);

    let saturn = new Planet(9.4, 147.7, 1 / 107.59, "#eac757", sun);
    this.planets.push(saturn);

    let uranus = new Planet(4, 294.6, 1 / 306.87, "#eac757", sun);
    this.planets.push(uranus);

    let neptune = new Planet(3.9, 447.5, 1 / 601.9, "#88baf0", sun);
    this.planets.push(neptune);
  }

  compact(width, height) {
    // Radius values are relatve to Earth (Earth = 1)
    this.sun = new Sun(width / 2, height / 2, 12);

    // Orbital radius are distances 10^10 meters from Sun
    let mercury = new Planet(0.4, 10, 1 / 0.88, "#c9c8c7", sun);
    this.planets.push(mercury);

    let venus = new Planet(0.9, 20, 1 / 2.25, "#f2d79e", sun);
    this.planets.push(venus);

    let earth = new Planet(1, 30, 1 / 3.65, "#287ab8", sun);
    this.planets.push(earth);

    let mars = new Planet(0.5, 40, 1 / 6.87, "#c65836", sun);
    this.planets.push(mars);

    let jupiter = new Planet(6, 65, 1 / 43.33, "#e3b371", sun);
    this.planets.push(jupiter);

    let saturn = new Planet(3, 80, 1 / 107.59, "#eac757", sun);
    this.planets.push(saturn);

    let uranus = new Planet(2, 90, 1 / 306.87, "#eac757", sun);
    this.planets.push(uranus);

    let neptune = new Planet(2, 100, 1 / 601.9, "#88baf0", sun);
    this.planets.push(neptune);
  }

  animate() {
    background("#000000");
    this.sun.draw();
    for (let planet of this.planets) {
      planet.draw();
      planet.orbit();
    }

  }
}


let ss;
function setup() {
  ss = SolarSystem()
}

function draw() {
  ss.animate()
}
