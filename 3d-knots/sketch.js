let angle = 0;
let beta = 0;

let vectors = [];

function setup() {
    createCanvas(600, 400, WEBGL);
}

function draw() {
    background(51);
    rotateY(angle);

    let r = 0.8 + 1.6 * sin(6 * beta);
    let theta = 2 * beta;
    let phi = 0.6 * PI * sin(12 * beta);

    r *= 60;

    let x = r * cos(phi) * cos(theta);
    let y = r * cos(phi) * sin(theta);
    let z = r * sin(phi);

    beta += 0.005

    if (beta < PI) vectors.push({x, y, z})

    noFill();
    stroke(255);
    strokeWeight(4);
    beginShape();
    for (let v of vectors) {     
        vertex(v.x, v.y, v.z);
    }
    endShape();

    angle += 0.02;
}