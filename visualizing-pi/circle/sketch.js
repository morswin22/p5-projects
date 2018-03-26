let pi;
let digits;

let curr;
let prev;

let counter;

let index = 0;

function preload() {
    pi = loadStrings('../pi-1million.txt');
}

function setup() {
    createCanvas(400, 400);
    pi = pi[0];
    digits = int(pi.split(''));

    curr = digits[0];
    prev = curr;

    background(51);
    translate(width/2, height/2);
    //rotate(PI);

    counter = [
        color(96, 169, 23),
        color(27, 161, 226),
        color(170,0,255),
        color(229,20,0),
        color(240,163,10),
        color(109,135,100),
        color(118,96,138),
        color(0, 80, 239),
        color(100,118,135),
        color(224, 114, 208)
    ];

    counter.forEach((e, i) => { // HERE IS AN ERROR!
        let a = map(i, 0, counter.length, 0, TWO_PI) - PI/2;
        let x = 162*cos(a) - 3;
        let y = 162*sin(a) + 5;

        stroke(255);
        fill(255);
        strokeWeight(1);
        text(i, x, y);

        stroke(e);
        strokeWeight(4);
        noFill();
        arc(0,0, 300, 300, a-PI/counter.length, TWO_PI/counter.length + a-PI/counter.length); // here...
    });

}

function draw() {
    translate(width/2, height/2);
    
    curr = digits[index];

    let ca = map(curr, 0, counter.length, 0, TWO_PI) - PI/2 + random(-0.13,0.13);
    let cx = 150*cos(ca);
    let cy = 150*sin(ca);

    let pa = map(prev, 0, counter.length, 0, TWO_PI) - PI/2 + random(-0.13,0.13);
    let px = 150*cos(pa);
    let py = 150*sin(pa);

    stroke(counter[curr].levels[0],counter[curr].levels[1],counter[curr].levels[2],10);
    strokeWeight(1);
    line(px,py,cx,cy);

    stroke(255);

    index++;
    prev = curr;
}