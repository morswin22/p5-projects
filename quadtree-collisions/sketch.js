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