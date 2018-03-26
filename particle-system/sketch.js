let particles;
let centerX;
let bottomY;
let w;
let h;

function setSize() {
    w = 600;
    h = 400;
    if (windowWidth < w) w = windowWidth;
    if (windowHeight < h) h = windowHeight;
    centerX = w/2;
    bottomY = h-20;
}

function setup() {
    setSize();
    createCanvas(w,h);
    particles = new Array(15).fill().map(p=>p = new Particle(centerX,bottomY));
}

function windowResized() {
    setSize();
    resizeCanvas(w,h);
}

function draw() {
    background(255);

    for (let i = 0; i<4; i++) particles.push(new Particle(centerX,bottomY));

    particles.sort((a,b)=>a.col - b.col);

    particles.map(p=>{
        p.update();
        p.show();
    });

    particles = particles.filter(p=>!p.finished());
    
}