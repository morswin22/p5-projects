let player;
let blobs = [];

let zoom = 1;

function setup() {
    createCanvas(600,600);
    player = new Blob(0, 0, 64);
    for (let i = 0; i < 50; i++) {
        blobs[i] = new Blob(random(-width,width),random(-height, height),16);
    }
}

function draw() {
    background(0);

    translate(width/2, height/2);
    let newzoom = 64 / player.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-player.pos.x, -player.pos.y)

    player.update();
    player.show();

    for(let i = blobs.length-1; i >= 0; i--) {
        blobs[i].show();
        if (player.eats(blobs[i])) {
            blobs.splice(i,1);
        }
    }

    if (random(1) < 0.02) {
        blobs.push(new Blob(randomGaussian(player.pos.x, width), randomGaussian(player.pos.y, height),16));
    }
}