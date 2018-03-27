let vehicles = [];

let food = [];
let poison = [];

function setup() {
  createCanvas(640, 360);

  for (let i = 0; i < 15; i++) {
    let x = random(width);
    let y = random(height);
    vehicles.push(new Vehicle(x,y));
  }

  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    food.push(createVector(x,y));
  }
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    poison.push(createVector(x,y));
  }
}

function draw() {
  background(51);

  if (random(1) < 0.05) {
    let x = random(width);
    let y = random(height);
    food.push(createVector(x,y));
  }

  let target = createVector(mouseX, mouseY);
  
  food.forEach(f=>{
    fill(0,255,0);
    noStroke();
    ellipse(f.x,f.y, 8,8);
  });

  poison.forEach(p=>{
    fill(255,0,0);
    noStroke();
    ellipse(p.x,p.y, 8,8);
  });

  for (let i = vehicles.length-1; i >= 0; i--){
    let v = vehicles[i];
    v.behaviors(food, poison);

    v.update();
    v.display();

    if (v.dead()) {
        vehicles.splice(i,1);
    }
  }

}