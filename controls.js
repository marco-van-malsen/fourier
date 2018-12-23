// Original: Marco van Malsen

controls = []; // global variable to store all controls

// each individual control
class Control {
  // (x,y) = upper left corner of control element
  // (w,h) = width and height of control element
  // (val) = value to show
  // (min) = mininum value
  // (max) = maximum value
  // (fnc) = function to execute when clicked
  constructor(x, y, w, h, val, min, max, fnc) {
    this.fnc = fnc;
    this.h = h;
    this.max = max;
    this.min = min;
    this.val = val;
    this.w = w;
    this.x = x;
    this.y = y;
  }

  // check if the control was clicked
  isClicked(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h);
  }

  // draw the control
  show() {
    // draw rectangle
    stroke(255, 100);
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h);

    // draw text
    fill(255);
    noStroke();
    let val2Show = (this.fnc && this.val > 0 ? "+" + this.val : this.val); // prefix the plus sign if needed
    text(val2Show, this.x + this.w * 0.5, this.y + this.h * 0.5);
    noFill();
  }
}

// create a set of controls
// (x,y) = upper left corner of control-set
// (w,h) = total width and height of control-set
// (cur) = current value
// (min) = mininum value
// (max) = maximum value
// (stp) = step-size to increase/decrease value
// (fnc) = function to call when clicked
function createControlSet(x, y, w, h, cur, min, max, stp, fnc) {
  // determine size of individual controls
  let controlX = x - 0.5 * w;
  let controlY = y - 0.5 * h;
  let controlW = w / 3;
  let control;

  // control to decrease value
  control = new Control(controlX, controlY, controlW, h, -stp, min, max, fnc);
  controls.push(control);

  // control to show current value (do not assign a function to execute !)
  controlX += controlW;
  control = new Control(controlX, controlY, controlW, h, cur, min, max);
  controls.push(control);

  // control to increase value
  controlX += controlW;
  control = new Control(controlX, controlY, controlW, h, stp, min, max, fnc);
  controls.push(control);
}

// handle mouse press events
function mousePressed() {
  // check if control element was pressed; then execute the associated function
  for (let c of controls) {
    if (c.isClicked(mouseX, mouseY)) {
      c.fnc(c.val);
    }
  }
}

function setNumSegments(value) {
  if (segments === segmentsMin && value < 0) return;
  if (segments === segmentsMax && value > 0) return;
  segments += value;
  reset();
}

function setLevelOfDetail(value) {
  if (detail === detailMin && value < 0) return;
  if (detail === detailMax && value > 0) return;
  detail += value;
  reset();
}