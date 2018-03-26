var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 10;
var rows = 10;

var ding;
function preload() {
    ding = loadSound('ding.mp3');
}

function setup() {
    createCanvas(600, 800);
    engine = Engine.create();
    world = engine.world;

    Events.on(engine, 'collisionStart', function(event) {
        var pairs = event.pairs;
        for (var i in pairs) {
            var bodyA = pairs[i].bodyA;
            var bodyB = pairs[i].bodyB;
            if (bodyA.label == 'plinko'   && bodyB.label == 'particle' 
            ||  bodyA.label == 'partcile' && bodyB.label == 'plinko') {
                //ding.play();
            }
        }
    });

    var spacing = width / cols;
    for (var j = 0; j < rows;j++) {
        for(var i = 0; i < cols+1;i++) {
            var x = i * spacing;
            if (j % 2 == 1) {
                x += spacing/2;
            }
            var y = 20 + spacing + j * spacing;
            plinkos.push( new Plinko(x, y, 12) );
        }
    }

    bounds.push( new Boundary(width/2, height+50, width, 100) );

    for (var i = 0; i < cols + 1; i++) {
        var h = 100;
        var w = 10;
        var x = i * spacing;
        var y = height - h/2;
        bounds.push( new Boundary(x, y, w, h) );
    }

}

function draw() {
    if (frameCount % 20  == 1) {
        particles.push( new Particle(300, 50, 8) );
    }

    background(51);
    Engine.update(engine);

    for(var i in particles) {
        particles[i].show();
        if (particles[i].offScreen()) {
            World.remove(world, particles[i].body);
            particles.splice(i,1);
            i--;
        }
    }

    for(var plinko of plinkos) {
        plinko.show();
    }

    for(var bound of bounds) {
        bound.show();
    }
}