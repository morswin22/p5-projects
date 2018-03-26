const len = 784;
const totalData = 1000;
const toTrain   = 800;

const CAT     = 0;
const TRAIN   = 1;
const RAINBOW = 2;
const result  = ['cat','train','rainbow'];

let catsData;
let trainsData;
let rainbowsData;

let cats     = {};
let trains   = {};
let rainbows = {};

let nn;

let toDraw;
let isTraining = false;

function preload() {
    catsData     = loadBytes('data/bin/cat1000.bin');
    trainsData   = loadBytes('data/bin/train1000.bin');
    rainbowsData = loadBytes('data/bin/rainbow1000.bin');
}

function setup() {
    createCanvas(280,280);
    background(255);

    prepareData(cats, catsData, CAT);    
    prepareData(trains, trainsData, TRAIN);    
    prepareData(rainbows, rainbowsData, RAINBOW);    

    nn = new NeuralNetwork(len, 64, 3);

    let training = [];
    training = training.concat(cats.training);
    training = training.concat(trains.training);
    training = training.concat(rainbows.training);

    let testing = [];
    testing = testing.concat(cats.training);
    testing = testing.concat(trains.training);
    testing = testing.concat(rainbows.training);
    
    let epochP   = createP('Epoch: 0 (not trained)');
    let percentP = createP('Percent: ??');
    let text     = createP('');

    let epochCounter = 0;
    let trainButton = select('#train');
    trainButton.mousePressed(async ()=>{
        epochCounter++;
        console.log(`Training for epoch #${epochCounter}...`);
        trainEpoch(training);
        epochP.html(`Epoch: ${epochCounter}`);
    });

    let testButton = select('#test');
    testButton.mousePressed(()=>{
        let percent = testAll(testing);
        percentP.html(`Percent: ${nf(percent, 2, 2)}%`);
    });

    let guessButton = select('#guess');
    guessButton.mousePressed(() => {
        let inputs = [];
        let img = get();
        img.resize(28,28);
        img.loadPixels();
        for(let i = 0; i<len; i++) {
            let bright = img.pixels[i];
            inputs[i] = (255 - bright) / 255.0;
        }

        let guess = nn.predict(inputs);
        console.log(guess);
        let classification = guess.indexOf(max(guess));
        console.log(classification, max(guess));

        text.html(`I think this is a ${result[classification]}.`);

        image(img,0,0);
    });

    let clearButton = select('#clear');
    clearButton.mousePressed(() => {
        background(255);
        text.html('');
    });
}

function draw() {
    strokeWeight(12);
    stroke(0);
    if(mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }

    // if (isTraining === true) {
    //     background(255);
    //     image(toDraw,0,0);
    // }
}