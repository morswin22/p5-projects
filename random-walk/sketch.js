let pos;
let prev;
let clr;

function randomColor() {
    return color(random(255), random(255), random(255));
}

function setup() {
    createCanvas(400, 400);
    pos = createVector(200, 200);
    prev = pos.copy();
    clr = randomColor();
    background(51);
}

function draw() {
    stroke(clr);
    strokeWeight(2);
    point(pos.x,pos.y);
    
    line(pos.x, pos.y, prev.x, prev.y);
    prev.set(pos);
    
    let step = p5.Vector.random2D();

    let r = random(1);
    step.setMag(3);

    if (r<0.1) {
        clr = randomColor();
    }

    pos.add(step);

    pos.x = constrain(pos.x,0, width);
    pos.y = constrain(pos.y,0, height);
}
