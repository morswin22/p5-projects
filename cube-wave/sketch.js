let angle = 0;
let w = 24;
let ma;
let maxD;

let img;

function preload() {
    img = loadImage('box.png');
}

function setup() {
    createCanvas(400, 400, WEBGL);
    ma = atan(sqrt(1/sqrt(2)));
    maxD = dist(0,0,200,200);
}

function draw() {
    background(100);

    ortho(-320, 320, -320, 320, 0, 600);
    rotateX(-QUARTER_PI);
    rotateY(ma);

    
    for (let z = 0; z< height; z+=w) {
        for (let x = 0; x< width; x+=w) {
            push();

            let d = -dist(x,z,width/2, height/2);
            let offset = map(d, 0, maxD, -PI, PI);
            let h = floor( map(sin(angle+offset),-1,1,50,250) );

            fill(255);
            translate(x + w/2 - width/2, 0, z - height / 2);
            //normalMaterial();
            //texture(img);
            box(w-2, h, w-2);

            pop();
        }
    }
    
    angle += 0.05;
}