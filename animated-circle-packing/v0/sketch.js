let circles = [];
let spots = [];

let img;

function preload() {
    img = loadImage('2017.jpg');
}

function setup() {
    createCanvas(592, 331);

    img.loadPixels();
    for (let i = 0; i < img.pixels.length; i+=4) {
        let c = color(
            img.pixels[i+0],
            img.pixels[i+1],
            img.pixels[i+2],
            img.pixels[i+3]
        );
        let b = brightness(c);
        if (b > 1) {
            let x = (i/4) % img.width;
            let y = ((i/4)-x) / img.height/sqrt(3);
            spots.push(createVector(x,y));
        }
    }

}

function draw() {
    background(51);

    let total = 10;
    let count = 0;
    let attempts = 0;
    while(count < total) {
        let newCircle = createCircle();
        if (newCircle) {
            circles.push(newCircle);
            count++;
        }
        attempts++;
        if (attempts > 1000) {
            noLoop();
            break;
        }
    }

    circles.forEach(circle=>{
        circle.grow();
        circle.show();
    })
    
}

function createCircle() {
    let spot = random(spots);
    if (!spot) return false;
    let x = spot.x;
    let y = spot.y;

    let valid = true;
    for(let circle of circles) {
        let d = dist(x,y,circle.x,circle.y);
        if (d - 2 < circle.r) {
            valid = false;
            break;
        }
    }
    
    if (valid) {
        return new Circle(x, y);
    }
    return false;
}