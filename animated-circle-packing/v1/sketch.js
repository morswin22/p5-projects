let circles = [];

let img;

function preload() {
    img = loadImage('kitten.jpg');
}

function setup() {
    createCanvas(600, 600);

    img.loadPixels();

}

function draw() {
    background(51);

    let total = 25;
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

    let x = random(width);
    let y = random(height);

    let valid = true;
    for(let circle of circles) {
        let d = dist(x,y,circle.x,circle.y);
        if (d - 2 < circle.r) {
            valid = false;
            break;
        }
    }
    
    if (valid) {
        let index = floor(x)*4 + floor(y) * img.width * 4;
        let col = color(
            img.pixels[index+0],
            img.pixels[index+1],
            img.pixels[index+2],
            img.pixels[index+3],
        );
        return new Circle(x, y, col);
    }
    return false;
}