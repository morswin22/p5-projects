const model = tf.sequential();

const hidden = tf.layers.dense({
    units: 4,
    inputShape: [2],
    activation: 'sigmoid'
});

const output = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
});

model.add(hidden);
model.add(output);

const sgdOpt = tf.train.sgd(0.1);
model.compile({
    optimizer: sgdOpt,
    loss: 'meanSquaredError'
});

const xs = tf.tensor2d([
    [0.0, 0.0],
    [0.0, 1.0],
    [1.0, 0.0],
    [1.0, 1.0],
])

const ys = tf.tensor2d([
    [0.0],
    [1.0],
    [1.0],
    [0.0],
])

const train = async () => {
    while (true) {
        let f = (await model.fit(xs, ys, {epochs: 10, shuffle: true})).history.loss[0];
        console.log(f);
        if (f < 0.01) break;
    }
}

let xor = undefined;

train().then(()=>{
    console.log('Done training')
    let outputs = model.predict(xs);
    outputs.print();
    xor = (a, b) => ( (model.predict(tf.tensor2d([[a,b]]))).dataSync()[0] > 0.5 ) ? true : false;
})
