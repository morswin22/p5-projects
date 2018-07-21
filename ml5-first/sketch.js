let video;
let miblenet;

let ready;

function setup() {
    //console.log = createP;
    createCanvas(windowWidth, windowHeight);

    video = createCapture(VIDEO);
    video.hide();
    
    mobilenet = ml5.imageClassifier('MobileNet', video, () => {
        ready = true;
        createP('MobileNet ready');
    });

}

function predict() {
    mobilenet.predict((err, res) => {
        if(!err) {
            noStroke();
            fill (0);
            text (res[0].classy);
        }
    }, 1);
}

function draw() {
    image(video, 0, 0, width, height);
    if (ready && video.loadedmetadata) {
        predict();
    }
}