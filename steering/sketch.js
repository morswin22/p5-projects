var font;
var vehicles = [];

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
    createCanvas(600,300);

    var points = font.textToPoints('train',100, 200, 192);
    
    for (var i in points) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }
}

function draw() {
    background(51);
    for (var i in vehicles) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }

}