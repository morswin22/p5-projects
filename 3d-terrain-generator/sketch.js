var cols;
var rows;
var scl = 20;

var flying = 0;

var w = 1200;
var h = 900;

var terrain = [];

function setup() {
    createCanvas(600,600,WEBGL);

    cols = w / scl;
    rows = h / scl;

    for (var x = 0; x < cols; x++) {
        terrain[x] = [];
    }    
}

function draw() {

    flying -= 0.1;

    var yoff = flying;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff,yoff), 0, 1, -100, 100);
            xoff += 0.2;
        }
        yoff += 0.2;
    }

    background(0);
    stroke(20,255,20);
    noFill();

    translate(width/2,height/2);
    rotateX(PI/3);

    translate(-w+w/5,-h);
    for (var y = 0; y < rows; y++) {
        beginShape(TRIANGLE_STRIP);
        for (var x = 0; x < cols; x++) {
            vertex(x*scl, y*scl, terrain[x][y]);
            vertex(x*scl, (y+1)*scl, terrain[x][y]);
        }
        endShape();
    }

}