let x_vals = [];
let y_vals = [];

let a, b, c;

const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);
const loss = (pred, labels) => pred.sub(labels).square().mean();

const predict = (x) => {
    const xs = tf.tensor1d(x);
    // y = ax^2 + bc + c;
    const ys = xs.square().mul(a).add(xs.mul(b)).add(c);
    return ys;
}

function setup() {
    createCanvas(400, 400);
    
    a = tf.variable(tf.scalar(random(1)));
    b = tf.variable(tf.scalar(random(1)));
    c = tf.variable(tf.scalar(random(1)));

}

function mousePressed() {
    let x = map (mouseX, 0, width, 0 , 1);
    let y = map (mouseY, 0, height, 1 , 0);
    x_vals.push(x);
    y_vals.push(y);
}

function draw() {

    tf.tidy(()=> {
        if (x_vals.length > 0) optimizer.minimize(() => loss(predict(x_vals), tf.tensor1d(y_vals)));
    });

    background(0);

    stroke(255);
    strokeWeight(8);
    for(let i = 0; i < x_vals.length; i++) {
        let px = map(x_vals[i], 0, 1, 0, width);
        let py = map(y_vals[i], 0, 1, height, 0);
        point(px, py);
    }

    const curveX = [];
    for (let x = 0; x <= 1.01; x += 0.025) {
        curveX.push(x);
    }
    const ys = tf.tidy(()=>predict(curveX));
    let curveY = ys.dataSync();
    ys.dispose();

    beginShape();
    noFill();
    stroke(255);
    strokeWeight(2);
    for(let i = 0; i < curveX.length; i++) {
        let x = map(curveX[i], 0, 1, 0, width);
        let y = map(curveY[i], 0, 1, height, 0);
        vertex(x,y);
    }
    endShape();
}