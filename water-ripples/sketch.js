let cols;
let rows;

let current = [];
let previous = [];

const dampening = 0.87;

function setup() {
    createCanvas(850, 550);
    cols = width;
    rows = height;
    for (x = 0; x < cols; x++) {
        current[x] = [];
        previous[x] = [];
        for (y = 0; y < rows; y++) {
            current[x][y] = 0;
            previous[x][y] = 0;
        }
    }
}

function draw() {
    background(0);
    loadPixels();
    for (x = 1; x < cols-1; x++) {
        for (y = 1; y < rows-1; y++) {
            current[x][y] = (
                  previous[x-1][y]
                + previous[x+1][y]
                + previous[x][y-1]
                + previous[x][y+1]) / 2 
                - current[x][y];

            current[x][y] *= dampening;

            pixels[(x*4 + y*4*cols) + 0] = current[x][y] * 255;
            pixels[(x*4 + y*4*cols) + 1] = current[x][y] * 255;
            pixels[(x*4 + y*4*cols) + 2] = current[x][y] * 255;
            pixels[(x*4 + y*4*cols) + 3] = 255;
        }
    }
    updatePixels();

    let temp = previous;
    previous = current;
    current = temp;

    if (random(1) < 0.25) {
        current[parseInt(random(width))][parseInt(random(height))] = 100;
    }
}