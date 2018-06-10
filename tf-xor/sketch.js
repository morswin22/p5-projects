let model;

let resolution, cols, rows;
let inputs = [];
let xs;

const training_xs = tf.tensor2d([
    [0.0, 0.0],
    [0.0, 1.0],
    [1.0, 0.0],
    [1.0, 1.0],
])

const training_ys = tf.tensor2d([
    [0.0],
    [1.0],
    [1.0],
    [0.0],
])

const xor = (a, b) => ( (model.predict(tf.tensor2d([[a,b]]))).dataSync()[0] > 0.5 ) ? true : false;
let loss;

function setup() {
    createCanvas(400, 400);

    model = tf.sequential();
    let hidden = tf.layers.dense({
        inputShape: [2],
        units: 2,
        activation: 'sigmoid'
    });
    let output = tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    });
    model.add(hidden);
    model.add(output);

    model.compile({
        optimizer: tf.train.sgd(0.1),
        loss: 'meanSquaredError'
    });

    // drawing
    resolution = 20;
    cols = width / resolution;
    rows = height / resolution;

    // create inputs for all pixels
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x1 = i / cols;
            let x2 = j / rows;
            inputs.push([x1,x2]);
        }
    }

    xs = tf.tensor2d(inputs);

}

function draw() {
    background(0);

    model.fit(training_xs, training_ys, {epochs: 5, shuffle: true}).then(r=>loss = r.history.loss[0]);

    tf.tidy(() => {
        // make predictions for all inputs (once)
        let ys = model.predict(xs);
        let ys_val = ys.dataSync();

        // draw the gpu output
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x1 = i / cols;
                let x2 = j / rows;

                noStroke();
                fill(ys_val[i + j * cols] * 255);
                rect(i*resolution, j * resolution, resolution, resolution);
            }
        }
    });

}