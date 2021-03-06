let video;
let mobilenet;
let classifier;

let mIsReady = false;
let cIsReady = false;
let label = 'Unloaded';

let pinkBtn, pinkHold = false, pinkTotal = 0;
let greenBtn, greenHold = false, greenTotal = 0;
let blueBtn, blueHold = false, blueTotal = 0;
let fm = 30; // frames max
let fd = 0;  // frames delta

let isTraining = false;
let isPredicting = false;

let successImg;
let errorImg;

let pm = 15;
let pd = 0;

function preload() {
    successImg = loadImage('img/success.png');
    errorImg = loadImage('img/error.png');
}

function setup() {
    createCanvas(640, 540);

    video = createCapture(VIDEO);
    video.hide();

    mobilenet = ml5.featureExtractor('MobileNet', ()=>{
        console.log('MobileNet ready');
        mIsReady = true;
        label = 'Loaded';
    });
    classifier = mobilenet.classification(video, ()=>{
        console.log('Classifier ready');
        cIsReady = true;
    });

    pinkBtn  = createButton('0').addClass('pink');
    greenBtn = createButton('0').addClass('green');
    blueBtn  = createButton('0').addClass('blue');

    pinkBtn.mousePressed(()=>{pinkHold = true;});
    greenBtn.mousePressed(()=>{greenHold = true;});
    blueBtn.mousePressed(()=>{blueHold = true;});

    pinkBtn.mouseReleased(()=> {pinkHold = false;  fd=0});
    greenBtn.mouseReleased(()=>{greenHold = false; fd=0});
    blueBtn.mouseReleased(()=> {blueHold = false;  fd=0});

    trainBtn = createButton('Train');
    trainBtn.mouseClicked(()=>{
        classifier.train(e=>{
            console.log(e);
            if (e === null) {
                isTraining = false;
                label = 'Done training';
            } else {
                isTraining = true;
                label = `Calculating loss: ${e}`;
            }
        }).catch(e=>{
            label = e;
        });
    });
    
}

function draw() {
    background(0);
    image(video, 0, 0, 640, 480);

    if (pinkHold&&fd==1)  {
        pinkTotal++;
        pinkBtn.html(pinkTotal);
        classifier.addImage('pink');
    }
    if (greenHold&&fd==1) {
        greenTotal++;
        greenBtn.html(greenTotal);
        classifier.addImage('green');
    }
    if (blueHold&&fd==1)  {
        blueTotal++;
        blueBtn.html(blueTotal);
        classifier.addImage('blue');
    }

    if (pinkHold || greenHold || blueHold) {
        fd = (fd+1) % fm;
        label = 'Adding example images';
    }

    predict();
    pd = (pd+1) % pm;

    fill(255);
    textSize(32);
    text(label, 10, height - 20);

    push();
    textAlign(LEFT, CENTER);
    textSize(16);
    // MobileNet
    image((mIsReady) ? successImg : errorImg, 10, 10, 32, 32);
    text(`MobileNet is ${(mIsReady) ? 'ready' : 'loading' }`, 47, 28);

    // MobileNet
    image((cIsReady) ? successImg : errorImg, 10, 47, 32, 32);
    text(`Classifier is ${(cIsReady) ? 'ready' : 'loading' }`, 47, 47+18);

    pop();
}

function predict() {
    if(mIsReady && cIsReady && pd == 1) {
        classifier.classify((err, res)=>{
            if(!err && !isTraining) {
                label = res;
            } else {
                label = err;
                noLoop();
            }
        });
    }
}