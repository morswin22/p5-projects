var x;
var y;
var spacing = 15;

function setup() {
    createCanvas(600, 600);

    x = 0;
    y = 0;

    background(0);
    stroke(255);
}

function draw() {

    (random(1) < 0.5) ? line(x,y,x+spacing,y+spacing) : line(x,y+spacing,x+spacing,y);
    x += spacing;

    if (x >= width) {
        y += spacing;
        x = 0;
    }

    if (y >= height) {
        // y = 0;
        noLoop();
    }

}