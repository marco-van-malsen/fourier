// Fourier Series
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html
// https://youtu.be/Mm2eYfj0SgA

// Extended by : Marco van Malsen

let time = 0;
let wave = [];
let path = [];

let slider;

function setup() {
  createCanvas(725, 400);
  slider = createSlider(1, 10, 5);
  noFill();
}

function draw() {
  background(0);
  translate(225, 200);

  let x = 0;
  let y = 0;

  for (let i = 0; i < slider.value(); i++) {
    let prevX = x;
    let prevY = y;

    let n = i * 2 + 1;
    let radius = 75 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 100);
    ellipse(prevX, prevY, radius * 2);

    stroke(255, 0, 0);
    line(prevX, prevY, x, y);
  }
  path.unshift([x, y]);
  wave.unshift(y);

  // draw path
  stroke(0, 255, 0);
  beginShape();
  for (let p = 0; p < path.length - 1; p++) {
    let point = path[p];
    vertex(point[0], point[1]);
  }
  endShape();

  // remove extra elements
  if (path.length > 125) {
    path.pop();
  }

  // draw connector
  translate(225, 0);
  stroke(255, 100);
  line(x - 225, y, 0, wave[0]);

  // draw wave
  stroke(0, 255, 0);
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

  // remove extra elements
  let amplitude = 75 * (4 / PI);
  let length = 250;
  stroke(255, 100);
  rect(0, -amplitude, length, amplitude * 2)
  stroke(0, 255, 0);
  if (wave.length > 250) {
    wave.pop();
  }

  // next please
  time += 0.05;
}