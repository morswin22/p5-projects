let cirPath = [];
let triPath = [];

let spacing = 10;

let theta = 0;

function polarToCartesian(r, angle) {
    return createVector(r * cos(angle), r * sin(angle));
}

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    let radius = 100; 
    
    let astart = 0;
    let aend = 120;
    let start = polarToCartesian(radius,astart);
    let end =   polarToCartesian(radius,aend);
    for (let a = astart; a < 360; a+=spacing) {
        cirPath.push(polarToCartesian(radius,a));

        let amt = (a%120) / (aend - astart);
        triPath.push(p5.Vector.lerp(start, end, amt));

        if ((a+spacing) % 120 === 0) {
            astart += 120;
            aend += 120;
            start = polarToCartesian(radius,astart);
            end =   polarToCartesian(radius,aend);
        }
    }
}

function draw() {
    background(220);
    translate(width/2, height/2);
    rotate(30);
    stroke(0);
    noFill();

    let amt = map(sin(theta),-1,1,0.2,1);
    theta += 5;

    beginShape();
    for (let i in cirPath) {
        let cv = cirPath[i];
        let tv = triPath[i];
        
        let x = lerp (cv.x, tv.x, amt);
        let y = lerp (cv.y, tv.y, amt);
        vertex(x, y);
    }
    endShape(CLOSE);

    // beginShape();
    // for (let v of cirPath) {
    //     vertex(v.x, v.y);
    // }
    // endShape(CLOSE);

    // beginShape();
    // for (let v of triPath) {
    //     vertex(v.x, v.y);
    // }
    // endShape(CLOSE);
}