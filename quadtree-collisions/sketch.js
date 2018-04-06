let particleCount = 1000;
let particles = [];

let qtree;
let boundary;

let pFps;
let cUseQtree;

function setup() {
    createCanvas(600, 400);
    boundary = new Rectangle(300, 200, 300, 200);
    for (let i = 0; i < particleCount; i++) {
        particles[i] = new Particle(random(width),random(height));
    }

    pFps = createP('');
    cUseQtree = createCheckbox('Use qtree?', true);
}

function draw() {
    background(0);

    qtree = new QuadTree(boundary, 4);

    for (let p of particles) {
        qtree.insert(new Point(p.x, p.y, p));
        p.move();
        p.render();
        p.setHighlight(false);
    }

    if (cUseQtree.checked()) {
        // QTREE
        for (let p of particles) {
            let others = qtree.query(new Circle(p.x, p.y, p.r*2));
            for (let other of others) {
                other = other.userData;
                if (p !== other && p.intersects(other)) {
                    p.setHighlight(true);
                }
            }
        }
    } else {
        // NORMAL
        for (let p of particles) {
            for (let other of particles) {
                if (p !== other && p.intersects(other)) {
                    p.setHighlight(true);
                }
            }
        }
    }

    pFps.html(frameRate().toPrecision(2));
}

// let boundary;
// let qtree;

// let p;

// let w = 50;
// let h = 50;
// let scaling = 1.2;

// let particleCount = 1000;
// let particles = [];

// let framerateP;
// let withQuadTree;
// let total;

// function setup() {
//     createCanvas(600, 400);
//     boundary = new Rectangle(300,200,300,200);
//     qtree = new QuadTree(boundary, 4);
//     console.log(qtree);

//     for(let i = 0; i<300; i++) {
//         let x = randomGaussian(width/2, width/8);
//         let y = randomGaussian(height/2, height/8);
//         let point = new Point(x, y);
//         qtree.insert(point);
//     }

//     p = createP();

// }

// function draw() {
//     background(51);
//     qtree.show();

//     stroke(0,255,0);
//     strokeWeight(1);
//     rectMode(CENTER);
//     let range = new Rectangle(mouseX,mouseY, w, h);
//     rect(range.x, range.y, range.w*2, range.h*2);
//     let points = qtree.query(range);
//     for (let p of points) {
//         strokeWeight(3);
//         point(p.x, p.y);
//     }
//     p.html(points.length);
// }

// function mouseWheel(event) {
//     if (event.delta > 0) {
//         w *= scaling;
//         h *= scaling;
//     } else {
//         w /= scaling;
//         h /= scaling;
//     }
// }