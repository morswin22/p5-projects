var hwidth = 900;
var hheight = 900;

var snake;
var tentacles = [];

var a = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    snake = new Snake(hwidth/2,hheight/2,60,5);

    for(var i = 0; i<2; i++) {
        tentacles.push(new Tentacle(hwidth/3 + hwidth/3*i,hheight,30,10));
    }
    
}

function draw() {
    background(51);
    translate(width/2 - hwidth/2,height/2-hheight/2);
    stroke(100,150,255);
    strokeWeight(8);
    fill(240,240,240);
    rect(0,0,hwidth,hheight);

    var target = snake.last().a;
    for(var i in tentacles) {
        tentacles[i].follow(target.x,target.y);
        tentacles[i].render(snake);
    }

    snake.follow((mouseX > hwidth) ? hwidth : mouseX, (mouseY > hheight) ? hheight : mouseY);
    snake.render(tentacles);
    

    /*stroke(255,0,0);
    point(mouseX,mouseY);*/

    
    a += 0.05;

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
 }