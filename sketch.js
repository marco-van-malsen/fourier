// Fourier Series
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html
// https://youtu.be/Mm2eYfj0SgA

// Extended by : Marco van Malsen

let mainR = 75; // radius of initial circle
let path = []; // actual path created by pendulum
let time = 0; // start at 0 degrees
let wave = []; // combined sine wave created by pendulum
let waveLength = 360; // maximum length of wave that will be shown

let segments = 3; // number of segments
let segmentsMax = 10; // maximum number of segments
let segmentsMin = 1; // minimum number of segments
let segmentsStep = 1; // increase/decrease number of segments by this amount

let detail = 180; // level of detail per cycle
let detailMax = 360; // maximum level of detail
let detailMin = 30; // minimum level of detail
let detailStep = 30; // increase/decrease level of detail by this amount

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
  textSize(14);

  // reset
  reset();
}

function draw() {
  // let the world be a very dark place
  background(0);

  // initialize controls
  controls = [];
  let controlH = 40;
  let controlW = 3 * controlH;
  let controlX = 225;
  let controlY = 50;

  // initialize controls for 'No. of Segments"
  fill(255);
  text('No. of Segments', controlX, controlH - 0.5 * controlH);
  createControlSet(controlX, controlY, controlW, controlH, segments, segmentsMin, segmentsMax, segmentsStep, setNumSegments);

  // initialize controls for 'Level of Detail'
  controlX += 225 + 0.5 * waveLength;
  text('Level of Detail', controlX, controlH - 0.5 * controlH);
  createControlSet(controlX, controlY, controlW, controlH, detail, detailMin, detailMax, detailStep, setLevelOfDetail);

  // draw controls
  noFill();
  for (let c of controls) c.show();

  // reset pendulum's position
  let x = 0;
  let y = 0;

  // translate to center of pendulum
  translate(225, 200);

  // calculate amplitude
  let amplitude = mainR * (4 / PI);

  // set initial length of X-axis (from center to one end)
  let lengthXaxis = 0;

  // calculate and draw pendulum
  for (let i = 0; i < segments; i++) {
    // calculate next segment
    let prevX = x;
    let prevY = y;
    let n = i * 2 + 1;
    let radius = mainR * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    // update X-axis
    lengthXaxis += radius;

    // draw segment
    stroke(255, 0, 0);
    strokeWeight(2);
    line(prevX, prevY, x, y);
  }

  // update path and wave
  path.unshift([x, y]);
  wave.unshift(y);

  // remove extra segments
  path.splice(detail, path.length - detail);
  wave.splice(waveLength, wave.length - waveLength);

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