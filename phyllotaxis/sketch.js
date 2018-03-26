let n = 0;
let c = 5;
let av = 137.5;

function setup() {
    createCanvas(600, 600);
    background(51);
    angleMode(DEGREES);
    colorMode(HSB);
    av = getParameterByName('a') || av;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function draw() {

    let a = n * av;
    let r = c * sqrt(n);

    let x = r * cos(a) + width/2;
    let y = r * sin(a) + height/2;

    let col = r*2 % 216;

    fill(col, 255, 255);
    noStroke();
    ellipse(x,y,5,5);

    n++;
}