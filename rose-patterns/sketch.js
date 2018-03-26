
var d = 8;
var n = 5;

function setup() {
    createCanvas(500,500);
    sliderN = createSlider(1,10,1,1);
    sliderD = createSlider(1,10,9,1);
}

function draw() {
    background(51);
    translate(width/2,height/2);

    d = sliderD.value();
    n = sliderN.value();

    beginShape();
    stroke(255);
    strokeWeight(1);
    noFill();
    for (var a = 0; a < TWO_PI * d; a+=0.01) {
        var r = 200* cos((n/d)*a);

        var x = r * cos(a);
        var y = r * sin(a);

        vertex(x,y);
    }
    endShape();

}