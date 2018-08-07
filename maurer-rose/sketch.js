let nSlider, nSpan;
let dSlider, dSpan;

let points = [];
let i = 0;

let walker = {x:0,y:0};

let first = true;

let toggleRose;
let drawRose = false;

let precision = 360;
let scl = 150;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent(document.querySelector('#canvas'));
    angleMode(DEGREES);

    nSlider = createSlider(1,10,6,1);
    nSlider.parent(document.querySelector('#nSlider'));
    nSpan = document.querySelector('#nSlider span');

    nSlider.changed(e=>{
        reset();
    });

    dSlider = createSlider(1,100,29,1);
    dSlider.parent(document.querySelector('#dSlider'));
    dSpan = document.querySelector('#dSlider span');
    
    dSlider.changed(e=>{
        reset();
    });
    
    setInterval(()=>{
        nSpan.innerHTML = nSlider.value();
        dSpan.innerHTML = dSlider.value();
    },100);

    toggleRose = createButton('Show Rose');
    toggleRose.mouseClicked(()=>{
        drawRose = !drawRose;
        toggleRose.html(`${(drawRose) ? 'Hide' : 'Show'} Rose`);
        reset();
    })
    toggleRose.parent(document.querySelector('#controls'));

    reset();
    first = false;
}

function reset() {
    background(51);
    if (first) translate(width/2, height/2);

    let n = nSlider.value();
    let d = dSlider.value();

    nSpan.innerHTML = n;
    dSpan.innerHTML = d;

    // draw rose
    if (drawRose) {
        stroke(255,0,255);
        noFill();
        beginShape();
        for(let a = 0; a < 360; a += 360/precision) {
            let r = sin(n * a) * scl;
            let x = r * cos(a);
            let y = r * sin(a);
            vertex(x,y);
        }
        endShape(CLOSE);
    }

    // generate points
    points = [];
    let theta = 0;
    for (let i = 0; i < 361; i++) {
        let k = theta;
        let r = sin(n*k) * scl;
        let x = r * cos(k);
        let y = r * sin(k);
        points.push({x,y});
        theta += d;
    }

    // reset i
    i = 0;
    walker = {x:0,y:0};
}

function draw() {
    translate(width/2, height/2);
    if (points[i]) {

        // draw line from walker to points[i]
        stroke(255,255,255);
        line(walker.x, walker.y, points[i].x, points[i].y);
        walker = points[i];

        i++;
    }
}
