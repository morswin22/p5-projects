let video;
let classifier;

let isReady = false;
let label = 'Unloaded';

function setup() {
    createCanvas(640, 540);

    video = createCapture(VIDEO);
    video.hide();

    classifier = ml5.imageClassifier('MobileNet', video, ()=>{
        console.log('MobileNet ready');
        isReady = true;
        label = 'Loaded';
    })
}

function draw() {
    background(0);
    image(video, 0, 0, 640, 480);

    if (isReady) {
        predict();
    }

    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}

function predict() {
    classifier.predict((err, res)=>{
        if(!err) {
            label = res[0].className;
        } else {
            console.error(err);
            noLoop();
        }
    });
}