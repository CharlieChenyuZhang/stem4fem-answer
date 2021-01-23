let classifier;
let canvas;
let label;
let confidence;
let defaultBackgroundColor = 150;

function preload() {
  console.log("preload");
  classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
  console.log("setup");
  canvas = createCanvas(300, 300);
  background(defaultBackgroundColor);
  canvas.mouseReleased(classifyCanvas);

  // add button
  let button = createButton("Clear Canvas");
  button.position(7, 370);
  button.mousePressed(clearCanvas);
  label = createDiv("Lable: ...");
  confidence = createDiv("COnfidence: ...");
}

function draw() {
  strokeWeight(15);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  console.log(results);

  label.html("Label: " + results[0].label);
  confidence.html("Confidence: " + nf(results[0].confidence, 0, 2));
}

function clearCanvas() {
  background(defaultBackgroundColor);
  label.html("Label: ");
  confidence.html("Confidence: ");
}
