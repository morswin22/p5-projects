let f4;
let f7;

let f4path = [];
let f7path = [];

let theta = 0;

let k1 = -4;
let k2 = -7;

function setup() {
    createCanvas(600, 600);

    window['f4end'] = undefined;
    window['f4stopped'] = false;
    window['f7end'] = undefined;
    window['f7stopped'] = false;

    let q1 = getParameterByName('k1');
    if (q1) k1 = parseInt(q1);
    
    let q2 = getParameterByName('k2');
    if (q2) k1 = parseInt(q2);

    f4 = new Orbit(width/2, height/2, 120, 0, undefined, k1, 'f4');
    f7 = new Orbit(width/2, height/2, 120, 0, undefined, k2, 'f7');

    let f4temp = f4.addChild();
    let f7temp = f7.addChild();
    for (let i = 0; i < 10; i++) {
        f4temp = f4temp.addChild();
        f7temp = f7temp.addChild();
    }

    while(!f4stopped) {
        f4.update();
        f4path.push(createVector(f4end.x,f4end.y));
    }

    while(!f7stopped) {
        f7.update();
        f7path.push(createVector(f7end.x,f7end.y));
    }

}

function displayFractal(path, color) {
    beginShape();
    noFill();
    stroke(color);
    for (let pos of path) {
        vertex(pos.x, pos.y);
    }
    endShape();
}

function draw() {
    background(51);

    // displayFractal(f4path, color(255,0,0));
    // displayFractal(f7path, color(0,0,255));

    let amt = map(cos(theta),-1,1,0,1);
    theta += 0.01;

    beginShape();
    noFill();
    stroke(255, 0, 255);
    for (let i in f4path) {
        let f4v = f4path[i];
        let f7v = f7path[i];
        
        let x = lerp (f7v.x, f4v.x, amt);
        let y = lerp (f7v.y, f4v.y, amt);
        vertex(x, y);
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