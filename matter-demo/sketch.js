var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;

var boxes = [];
var ground;

function setup() {
    createCanvas(400,400);
    engine = Engine.create();
    world = engine.world;

    ground = Bodies.rectangle(width/2,height+10, width, 24, {isStatic: true});
    World.add(world, ground);
}

function mousePressed() {
    boxes.push( new Box(mouseX,mouseY,20,20) );
}

function draw() {
    background(51);
    Engine.update(engine);

    for (var box of boxes) {
        box.show();
    }

    strokeWeight(2);
    stroke(255,0,0);
    line(0,height,width,height);
}