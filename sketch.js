// Fourier Series
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html
// https://youtu.be/Mm2eYfj0SgA

// Extended by : Marco van Malsen

let mainR = 75; // radius of initial circle
let path = []; // actual path created by pendulum
let time = 0; // start at 0 degrees
let wave = []; // combined sine wave created by pendulum
let waveLength = 240; // maximum length of wave

let elements = 2; // number of elements
let elementsMax = 10; // max number of elements
let elementsMin = 1; // min number of elements
let elementsStep = 1; // increase/decrease number of elements by this amount

let detail = 180; // level of detail at number per 360 degrees
let detailMax = 360; // max level of detail
let detailMin = 30; // min level of detail
let detailStep = 30; // ncrease/decrease level of detail by this amount

// reset
function reset() {
  wave = [];
  path = [];
  time = 0;
}

function setup() {
  // create the world
  createCanvas(windowWidth, windowHeight);

  // set drawing defaults
  textAlign(CENTER, CENTER);
}

function draw() {
  // let the world be a very dark place
  background(0);

  // create and draw controls
  controls = [];
  createControlSet(225, 45, 90, 30, elements, elementsMin, elementsMax, elementsStep, setNumElements);
  createControlSet(225 + 225 + 0.5 * waveLength, 45, 90, 30, detail, detailMin, detailMax, detailStep, setLevelOfDetail);
  for (let c of controls) c.show();
  fill(255);
  text('# of Elements', 225, 20);
  text('Level of Detail', 225 + 225 + 0.5 * waveLength, 20);
  noFill();

  // reset pendulum's position
  let x = 0;
  let y = 0;

  // translate to center of pendulum
  translate(225, 200);

  // calculate amplitude
  let amplitude = mainR * (4 / PI);

  // set initial lengthg of X-axis (from center to one end)
  let lengthXaxis = 0;

  // calculate pendulum
  for (let i = 0; i < elements; i++) {
    let prevX = x;
    let prevY = y;

    let n = i * 2 + 1;
    let radius = mainR * (4 / (n * PI));
    lengthXaxis += radius;
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 0, 0);
    strokeWeight(2);
    line(prevX, prevY, x, y);
  }
  path.unshift([x, y]);
  wave.unshift(y);

  // draw initial circle and centerlines
  stroke(255, 100);
  strokeWeight(1);
  ellipse(0, 0, amplitude * 2);
  line(0, -amplitude - 5, 0, amplitude + 5);
  line(-lengthXaxis - 5, 0, lengthXaxis + 5, 0);

  // draw path
  stroke(0, 255, 0);
  strokeWeight(2);
  beginShape();
  for (let p = 0; p < path.length - 1; p++) {
    let point = path[p];
    vertex(point[0], point[1]);
  }
  endShape();

  // remove extra elements
  for (let p = path.length; p > detail; p--) path.pop();
  for (let w = wave.length; w > waveLength; w--) wave.pop();

  // draw line between pendulum and wave
  translate(225, 0);
  stroke(255, 100);
  strokeWeight(1);
  line(x - 225, y, 0, wave[0]);

  // draw wave
  stroke(0, 255, 0);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

  // draw box around wave
  let length = waveLength;
  stroke(255, 100);
  strokeWeight(1);
  line(-5, -amplitude, waveLength + 5, -amplitude); // top edge
  line(-5, 0, waveLength + 5, 0); // center line
  line(-5, amplitude, waveLength + 5, amplitude); // bottom edge
  line(0, -amplitude - 5, 0, amplitude + 5); // left edge
  line(waveLength, -amplitude - 5, waveLength, amplitude + 5); // right edge

  // next please
  time += TWO_PI / detail;
}