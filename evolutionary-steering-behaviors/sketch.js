let vehicles = [];

let food = [];
let poison = [];

let debug;

function setup() {
  createCanvas(640, 360);

  debug = createCheckbox();

  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    vehicles.push(new Vehicle(x,y));
  }

  for (let i = 0; i < 40; i++) {
    let x = random(width);
    let y = random(height);
    food.push(createVector(x,y));
  }
  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    poison.push(createVector(x,y));
  }
}

function draw() {
  background(51);

  if (random(1) < 0.1) {
    let x = random(width);
    let y = random(height);
    food.push(createVector(x,y));
  }

  if (random(1) < 0.01) {
    let x = random(width);
    let y = random(height);
    poison.push(createVector(x,y));
  }

  let target = createVector(mouseX, mouseY);
  
  food.forEach(f=>{
    fill(0,255,0);
    noStroke();
    ellipse(f.x,f.y, 4,4);
  });

  poison.forEach(p=>{
    fill(255,0,0);
    noStroke();
    ellipse(p.x,p.y, 4,4);
  });

  for (let i = vehicles.length-1; i >= 0; i--){
    let v = vehicles[i];
    v.boundaries();
    v.behaviors(food, poison);

    v.update();
    v.display();

    let newVehicle = v.clone();
    if (newVehicle != null) {
      vehicles.push(newVehicle);
    }

    if (v.dead()) {
        food.push(createVector(v.position.x, v.position.y));
        vehicles.splice(i,1);
    }

  }

}

function mouseDragged() {
  let x = mouseX;
  let y = mouseY;
  vehicles.push(new Vehicle(x,y));
}