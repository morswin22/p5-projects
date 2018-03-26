let airplanes = [];

let texture;

let fade = 8;
let a = 0;
let bg = 3;

let tails;

function preload() {
    texture = loadImage('airplane.png');
}

function setup() {
    createCanvas(640, 333);

    tails = createGraphics(width, height);
    tails.background(bg);

    for (let i = 0; i<6; i++) {
        airplanes.push(new Airplane(randomGaussian(80,30), randomGaussian(height/2,height/9), i));
    }
}

function draw() {
    tails.fill(bg,fade);
    tails.stroke(bg);
    tails.rect(0,0,width,height);
    image(tails,0,0);

    airplanes.forEach(airplane=>{
        airplane.update();
        airplane.show();
    })

    a+=0.05;

}