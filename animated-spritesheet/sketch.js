let textures = {};

let barrels = [];
let particles = [];

function preload() {
    textures.explosion = loadImage('images/explosion.png'); // 96x96
    textures.barrel = loadImage('images/barrel.png');
}

function setup() {
    createCanvas(600, 400);

    barrels.push(new Barrel(125, 55));
    barrels.push(new Barrel(250, 155));
    barrels.push(new Barrel(375, 255));

    setTimeout(()=>{
        barrels[0].explode();
        setTimeout(()=>{
            barrels[0].explode();
            setTimeout(()=>{
                barrels[0].explode();
            }, 350);
        }, 200);
    }, 500);
}

function draw() {
    background(255);
    
    barrels = barrels.filter(b => !b.finished);
    for(let barrel of barrels) {
        barrel.render();
    }

    particles = particles.filter(p => !p.finished);
    for(let particle of particles) {
        particle.render();
    }

}