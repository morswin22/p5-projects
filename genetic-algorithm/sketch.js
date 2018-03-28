let target;
let popmax;
let mutationRate;
let population;

function setup() {
    createCanvas(640, 360);
    target = "To be or not to be.";
    popmax = 150;
    mutationRate = 0.01;

    population = new Population(target, mutationRate, popmax);
}

function draw() {
    population.naturalSelection();
    population.generate();
    population.calcFitness();
    displayInfo();
    if (population.isFinished()) {
        print(millis()/1000);
        noLoop();
    }
}

function displayInfo() {
    background(255);
    let answer = population.getBest();
    textFont('Courier');
    textAlign(LEFT);
    fill(0);

    textSize(24);
    text("Best phrase:",20,30);
    textSize(40);
    text(answer, 20, 100);

    textSize(18);
    text("total generations:     " + population.getGenerations(), 20, 160);
    text("average fitness:       " + nf(population.getAverageFitness(), 0, 2), 20, 180);
    text("total population:      " + popmax, 20, 200);
    text("mutation rate:         " + int(mutationRate * 100) + "%", 20, 220);
 
    textSize(10);
    text("All phrases:\n" + population.allPhrases(), 500, 10);
}