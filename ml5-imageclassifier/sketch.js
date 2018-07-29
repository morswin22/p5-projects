let img;
let classifier;

function setup() {
    createCanvas(640, 480);

    img = createImg('images/puffin.jpg', ()=>{
        image (img, 0, 0, width, height);
    });
    img.hide();

    classifier = ml5.imageClassifier('MobileNet', ()=>{
        console.log('MobileNet ready');
        classifier.predict(img, (err, res)=>{
            if(!err) {
                console.log(res);
                let label = res[0].className;
                let prob = res[0].probability;
                fill(0);
                textSize(64);
                text(label, 10, height - 100);
                createP(label);
                createP(prob);
            } else {
                console.error(err);
            }
        })
    })
}