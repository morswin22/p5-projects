let cities;
let totalCities = 10;

let order = [];

let totalPermitations = 0;
let count = 0;

let recordDist;
let recordOrder;

function setup() {
    createCanvas(600, 600);
    let i =0;
    cities = new Array(totalCities).fill(0).map(x=>{
        order[i] = i;
        i++;
        return createVector(random(width), random(height/2));
    });

    recordDist = calcDistance(cities, order);
    recordOrder = order.slice();

    totalPermitations = factorial(totalCities);
}

function draw() {
    background(51);
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

    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    order.forEach((cid, i)=>{
        let city = cities[cid];
        vertex(city.x, city.y);
    });
    endShape();

    let d = calcDistance(cities, order);
    if (d<recordDist) {
        recordDist = d;
        recordOrder = order.slice();
    }

    nextOrder();

    stroke(255, 0 ,255);
    fill(255);
    let percent = 100 * (count / totalPermitations);
    text(percent.toPrecision(4) + "% completed", 25, height/2-30);

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

    count++;

}

function factorial(n) {
    if (n==1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}