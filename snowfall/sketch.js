let snow = [];
let gravity;

let spritesheet;
let textures = [];

function preload() {
    spritesheet = loadImage('flakes.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    gravity = createVector(0, 0.1);

    // Create a spritesheet
    for (let x = 0; x < spritesheet.width; x+= 32) {
        for (let y = 0; y < spritesheet.width; y+= 32) {
            let img = spritesheet.get(x, y, 32, 32);
            textures.push(img);
        }
    }
}

function draw() {
    background(0);

    snow.push(new Snowflake(random(textures)));

    for (let flake of snow) {
        flake.applyForce(gravity);
        flake.update();
        flake.render();
    }

    for (let i = snow.length -1; i >= 0; i--) {
        if (snow[i].offScreen()) {
            snow.splice(i, 1);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    snow = [];
}