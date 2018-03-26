var inc = 0.05;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];
var flowField;

function setup() {
    createCanvas(windowWidth,windowHeight);
    cols = floor(width / scl);
    rows = floor(height/ scl);
    fr = createP('');

    flowField = new Array(rows*cols);

    for (var i = 0; i< 2000; i++) {
        particles[i] = new Particle();
    }
    background(255);
}

function draw() {
    var yoff = 0;

    for (var y = 0; y< rows; y++) {
        var xoff = 0;
        for (var x = 0; x< cols; x++) {
            var index = x + y * cols;   
            var angle = noise(xoff,yoff, zoff)*TWO_PI;  
            var v = p5.Vector.fromAngle(angle);
            v.setMag(0.5);
            flowField[index] = v;
            xoff += inc;
        }
        yoff += inc;
    } 

    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowField);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
    
    zoff += 0.003;

    fr.html(floor(frameRate()));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}