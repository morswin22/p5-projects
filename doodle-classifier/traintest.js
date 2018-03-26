function trainEpoch(training) {
    shuffle(training, true);
    for(let i = 0; i < training.length; i++) {
        let data = training[i];

        toDraw = createImage(28,28);
        toDraw.loadPixels();
        data.forEach((e,i) => {
            toDraw.pixels[i*4 + 0] = 255 - e;
            toDraw.pixels[i*4 + 1] = 255 - e;
            toDraw.pixels[i*4 + 2] = 255 - e;
            toDraw.pixels[i*4 + 3] = 255;
        });
        toDraw.updatePixels();
        toDraw.resize(280,280);
        // isTesting = true;

        background(255);
        image(toDraw, 0, 0);

        let inputs = Array.from(data).map(x => x / 255);
        let label  = training[i].label;
        let targets = [0,0,0];
        targets[label] = 1;

        nn.train(inputs, targets);
    }
    // isTesting = false;
}

function testAll(testing) {
    let correct = 0;
    for(let i = 0; i < testing.length; i++) {
        let data = testing[i];
        let inputs = Array.from(data).map(x => x / 255);
        let label  = testing[i].label;
        let guess = nn.predict(inputs);
        let classification = guess.indexOf(max(guess));

        if (classification === label) {
            correct++;
        }        
    }
    let percent = 100 * correct / testing.length;
    return percent;
}