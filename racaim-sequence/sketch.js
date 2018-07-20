let attackLevel = 1.0;
let releaseLevel = 0;

let attackTime = 0.001;
let decayTime = 0.2;
let susPercent = 0.2;
let releaseTime = 0.5;

let numbers = [];
let count = 1;
let sequence = [];
let index = 0;
let scl = 0;
let biggest = 1;

let arcs = [];

let osc, env;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(5);

    env = new p5.Env();
    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
    env.setRange(attackLevel, releaseLevel);

    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.amp(env);
    osc.start();

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

    let n = (index % 25) + 24;
    let freq = pow(2, (n - 49) / 12) * 440;
    osc.freq(freq);
    env.play();
}