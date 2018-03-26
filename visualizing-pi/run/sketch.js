let pi;
let digits;

let counter = new Array(10).fill(0);

let index = 0;
let offset = 20;

let w = 25;

function preload() {
    pi = loadStrings('../pi-1million.txt');
}

function setup() {
    createCanvas(400, 400);
    pi = pi[0];
    digits = int(pi.split(''));
}

function draw() {
    background(51);
    
    counter[digits[index]]++;

    let dx = (width-offset*2)/counter.length;
    counter.forEach((e, i) => {
        let x = i*dx + offset + (dx/2-w/2);
        let y = height- offset;

        stroke(255);
        strokeWeight(2);
        if (e >= 350) {
            stroke(255,0,0);
            strokeWeight(4);
            noLoop();
        }
        rect(x,y,25, -e);

        stroke(0)
        strokeWeight(4);
        fill(255);
        text(i, x+9, y-6);
    });

    index++;
}