let numbers = [];
let count = 1;
let sequence = [];
let index = 0;

let scl = 0;

let arcs = [];

let biggest = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    numbers[index] = true;
    sequence.push(index);
}

function draw() {
    background(0);
    translate(0, height/2);

    scl = lerp(scl, width / biggest, 0.1);
    scale(scl);

    step();

    for (let arc of arcs) {
        arc.render();
    }
}

function step() {
    let next = index - count;
    if (next < 0 || numbers[next]) {
        next = index + count;
    }
    numbers[next] = true;
    sequence.push(next);

    arcs.push(new Arc(index, next, count%2));  

    index = next;
    count++;

    if (index > biggest) {
        biggest = index;
    }
}