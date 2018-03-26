let boundary;
let qtree;

let p;

let w = 50;
let h = 50;
let scaling = 1.2;

function setup() {
    createCanvas(400, 400);

    boundary = new Rectangle(200,200,200,200);
    qtree = new QuadTree(boundary, 4);
    console.log(qtree);

    for(let i = 0; i<300; i++) {
        let x = randomGaussian(width/2, width/8);
        let y = randomGaussian(height/2, height/8);
        let point = new Point(x, y);
        qtree.insert(point);
    }

    p = createP();

}

function draw() {
    background(51);
    qtree.show();

    stroke(0,255,0);
    strokeWeight(1);
    rectMode(CENTER);
    let range = new Rectangle(mouseX,mouseY, w, h);
    rect(range.x, range.y, range.w*2, range.h*2);
    let points = qtree.query(range);
    for (let p of points) {
        strokeWeight(3);
        point(p.x, p.y);
    }
    p.html(points.length);
}

function mouseWheel(event) {
    if (event.delta > 0) {
        w *= scaling;
        h *= scaling;
    } else {
        w /= scaling;
        h /= scaling;
    }
}