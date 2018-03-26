let cities = [];
let totalCities = 10;

let population = [];
let fitness = [];
let totalPopulations = 500;

let recordDist = Infinity;
let recordOrder;
let currentOrder;

let order;

let statusP;

function setup() {
    createCanvas(600, 600);

    order = [];
    
    for (let i = 0; i < totalCities; i++) {
        cities[i] = createVector(random(width), random(height/2));
        order[i] = i;
    }

    for (let i = 0; i<totalPopulations; i++) {
        population[i] = shuffle(order);
    }

    statusP = createP('').style('font-size', '32pt');

}

function draw() {
    background(51);

    //ga
    calcFitness()
    normalizeFitness();
    nextGeneration();

    stroke(255);
    fill(255);
    cities.forEach((city, i)=>{
        ellipse(city.x, city.y, 8, 8);
    });

    stroke(255, 0 ,255);
    strokeWeight(3);
    noFill();
    beginShape();
    recordOrder.forEach((cid, i)=>{
        let city = cities[cid];
        vertex(city.x, city.y);
    });
    endShape();

    translate(0, height/2);

    stroke(255);
    fill(255);
    cities.forEach((city, i)=>{
        ellipse(city.x, city.y, 8, 8);
    });

    stroke(255, 0 ,255);
    strokeWeight(3);
    noFill();
    beginShape();
    currentOrder.forEach((cid, i)=>{
        let city = cities[cid];
        vertex(city.x, city.y);
    });
    endShape();

}

function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function calcDistance(points, order) {
    let sum = 0;
    for(let i = 0; i< order.length-1; i++) {
        let cityA = points[order[i]];
        let cityB = points[order[i+1]];
        let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
        sum += d;
    }
    return sum;
}

function calcFitness() {
    let currentRecord = Infinity;
    for (let i = 0; i<totalPopulations; i++) {
        let d = calcDistance(cities, population[i]);
        if (d<recordDist) {
            recordDist  = d;
            recordOrder = population[i];
        }
        if (d < currentRecord) {
            currentRecord  = d;
            currentOrder = population[i];
        }
        fitness[i] = 1/(d+1);
    }
}

function normalizeFitness() {
    let sum = 0;
    for (let i = 0; i<fitness.length; i++) {
        sum += fitness[i];
    }
    for (let i = 0; i<fitness.length; i++) {
        fitness[i] = fitness[i]/sum;
    }
}

function nextGeneration() {
    let newPopulation = [];
    for (let i = 0; i < population.length; i++){
        let orderA = pickOne(population, fitness);
        let orderB = pickOne(population, fitness);
        let order = crossover(orderA, orderB);
        mutate(order, 0.01);
        newPopulation[i] = order;
    }
    population = newPopulation;
}

function pickOne(list, prob) {
    let index = 0;
    let r = random(1);
    while(r>0){
        r = r - prob[index];
        index++;
    } 
    index--;
    return list[index].slice();
}

function mutate(order, mutationRate) {
    for(var i = 0; i < totalCities; i++) {
        if (random(1) < mutationRate) {
            let indexA = floor(random(order.length));
            let indexB = indexA + 1;
            if (indexB > order.length-1) {
                indexB = indexA - 1;
            }
            swap(order, indexA, indexB);
        }
    }
}

function crossover(orderA, orderB) {
    let start = floor(random(orderA.length));
    let end = floor(random(start+1, orderA.length));
    let newOrder = orderA.slice(start, end);
    //let left = totalCities - newOrder.length;
    for (let i = 0; i<orderB.length; i++) {
        let city = orderB[i];
        if (!newOrder.includes(city)) {
            newOrder.push(city);
        }
    }
    return newOrder;
}

function nextOrder() {

    let largestI = -1;
    for (let i = 0; i < order.length - 1; i++) {
        if (order[i] < order[i + 1]) {
            largestI = i;
        }
    }

    if (largestI == -1) {
        noLoop();
    }

    let largestJ = -1;
    for (let j = 0; j < order.length; j++) {
        if (order[largestI] < order[j]) {
            largestJ = j;
        }
    }

    swap(order, largestI, largestJ);

    let endArray = order.splice(largestI + 1);
    endArray.reverse();
    order = order.concat(endArray);

}

function factorial(n) {
    if (n==1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}