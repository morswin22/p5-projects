let blobs = [];
let blobsNum = 5;

function setup() {
    createCanvas(200, 100);
    colorMode(HSB)

    for (let i = 0; i < blobsNum; i ++) {
        blobs.push(new Blob(random(width),random(height)));
    }
}

function draw() {
    background(51);

    loadPixels();
    for( let x = 0; x < width; x ++) {
        for( let y = 0; y < height; y ++) {
            let col = 0;
            for (let b of blobs) {
                let xdif = x-b.pos.x;
                let ydif = y-b.pos.y;
                let d = (xdif*xdif) + (ydif*ydif);
                col += 100 * ((b.r*b.r)/d);
            }
            set(x, y, color(col,255, 255));
        }
    }
    updatePixels();

    for (let b of blobs) {
        b.update();
    }
}