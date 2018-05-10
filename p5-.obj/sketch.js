let angle = 0;
let kitten;
let train;

function preload() {
  kitten = loadImage('kitten.jpg');
  train = loadModel('train.obj');
}

function setup() {
  createCanvas(400, 300, WEBGL);
}

function draw() {
  background(0);
  ambientLight(255, 255, 255);
  directionalLight(255, 255, 255, 0, 0, 1);
  rotateX(PI);
  rotateY(angle * 1.3);
  // rotateZ(angle * 0.7);
  // box(100);
  translate(-20, -70, 0);
  texture(kitten);
  model(train);
  angle -= 0.015;
}