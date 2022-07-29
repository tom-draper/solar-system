class CelestrialBody {
  constructor(radius, color, dUnits) {
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
  constructor(radius, orbitRadius, speed, color, sun, dUnits, tUnits) {
    super(radius, color, dUnits);
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
  constructor(x, y, radius, dUnits) {
    super(radius, "#f5e633", dUnits);
    this.x = x;
    this.y = y;
  }
}

class SolarSystem {
  constructor(realistic = true, width = 1900, height = 1000) {
    this.sun = undefined;
    this.planets = [];

    createCanvas(width, height);
    if (realistic) {
      this.realistic(width, height);
    } else {
      this.compact(width, height);
    }
  }

  realistic(width, height, dUnits = 1.3, tUnits = 1000) {
    this.dUnits = dUnits;
    this.tUnits = tUnits;
    // Radius values are relatve to Earth (Earth = 1)
    this.sun = new Sun(width / 2, height / 2, 109, this.dUnits);

    // Orbital radius are distances 10^10 meters from sun
    let mercury = new Planet(
      0.4,
      5.67,
      1 / 0.088,
      "#c9c8c7",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(mercury);

    let venus = new Planet(
      0.9,
      10.7,
      1 / 0.225,
      "#f2d79e",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(venus);

    let earth = new Planet(
      1,
      15.1,
      1 / 3.65,
      "#287ab8",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(earth);

    let mars = new Planet(
      0.5,
      20.8,
      1 / 0.687,
      "#c65836",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(mars);

    let jupiter = new Planet(
      11.2,
      74.2,
      1 / 43.33,
      "#e3b371",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(jupiter);

    let saturn = new Planet(
      9.4,
      147.7,
      1 / 10.759,
      "#eac757",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(saturn);

    let uranus = new Planet(
      4,
      294.6,
      1 / 30.687,
      "#eac757",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(uranus);

    let neptune = new Planet(
      3.9,
      447.5,
      1 / 60.19,
      "#88baf0",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(neptune);
  }

  compact(width, height, dUnits = 5, tUnits = 1000) {
    this.dUnits = dUnits;
    this.tUnits = tUnits;
    // Radius values are relatve to Earth (Earth = 1)
    this.sun = new Sun(width / 2, height / 2, 12, this.dUnits);

    // Orbital radius are distances 10^10 meters from Sun
    let mercury = new Planet(
      0.4,
      10,
      1 / 0.088,
      "#c9c8c7",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(mercury);

    let venus = new Planet(
      0.9,
      20,
      1 / 0.225,
      "#f2d79e",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(venus);

    let earth = new Planet(
      1,
      30,
      1 / 0.365,
      "#287ab8",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(earth);

    let mars = new Planet(
      0.5,
      40,
      1 / 0.687,
      "#c65836",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(mars);

    let jupiter = new Planet(
      6,
      65,
      1 / 43.33,
      "#e3b371",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(jupiter);

    let saturn = new Planet(
      3,
      80,
      1 / 10.759,
      "#eac757",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(saturn);

    let uranus = new Planet(
      2,
      90,
      1 / 30.687,
      "#eac757",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(uranus);

    let neptune = new Planet(
      2,
      100,
      1 / 60.19,
      "#88baf0",
      this.sun,
      this.dUnits,
      this.tUnits
    );
    this.planets.push(neptune);
  }

  animate() {
    background("#000000");
    this.sun.draw();
    console.log(this.planets);
    for (let planet of this.planets) {
      planet.draw();
      planet.orbit();
    }
  }
}

let ss;
function setup() {
  ss = new SolarSystem();
}

function draw() {
  ss.animate();
}
