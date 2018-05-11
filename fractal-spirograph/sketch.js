let path = [];

let root;
let end;

let stopped = false;

let k = -4;

function setup() {
    createCanvas(600, 600);

    let query = getParameterByName('k');
    if (query) k = parseInt(query);

    root = new Orbit(width/2, height/2, 120, 0, undefined);

    root
    .addChild()
    .addChild()
    .addChild()
    .addChild()
    .addChild()
    .addChild()
    .addChild()
    .addChild()
    .addChild()
    .addChild()
    .addChild();
}

function draw() {
    background(51);

    if (!stopped) { 
        for (let i = 0; i<50; i++) {
            root.update();
            path.push(createVector(end.x,end.y));
        }
        root.show();
    } else {
        noLoop();
    }

    beginShape();
    stroke(255,0,255);
    for (let pos of path) {
        vertex(pos.x, pos.y);
    }
    endShape();
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