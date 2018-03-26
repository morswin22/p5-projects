let yoff = 0;

function setup() {
    createCanvas(250, 250);
}

function draw() {
    background(51);

    translate(width/2, height/2);
    rotate(PI/2);
    
    stroke(255);
    fill(255, 50);
    strokeWeight(1);

    let da = PI/150;
    let dx = 0.05;

    let xoff = 0;

    beginShape();
    for (let a = -PI/2; a <= 3*PI/2; a+= da) {
        let n = noise(xoff); //noise(xoff,yoff);
        let r = sin(2*a) * map(n, 0, 1, 50 ,125);
        let x = r * cos(a);
        let y = map(sin(yoff*25), -1, 1, 0.4, 1) * r * sin(a);
        if (a <= PI/2) {
            xoff += dx;
        } else {
            xoff -= dx;
        }
        vertex(x,y);
    }
    endShape();

    yoff += 0.002;
}