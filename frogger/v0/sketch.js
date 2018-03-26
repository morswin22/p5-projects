let frog;
let cars = new Array();
let logs = new Array();

let grid = 50;

function resetGame() {
    frog = new Frog(width/2-grid/2, height-grid*1, grid);
    frog.detach();
}

function setup() {
    createCanvas(500, 500);

    // row 1 - frog spawn
    resetGame();

    // row 2 - cars
    for (let i = 0; i < 2; i++) {
        let x = i * 300;
        cars.push(new Car(x, height-grid*2, grid*2, grid, 2));
    }

    // row 3 - cars
    for (let i = 0; i < 2; i++) {
        let x = i * 200 + 150;
        cars.push(new Car(x, height-grid*3, grid, grid, -3.5));
    }

    // row 4 - cars
    for (let i = 0; i < 4; i++) {
        let x = i * 150 + 25;
        cars.push(new Car(x, height-grid*4, grid, grid, 1.2));
    }

    // row 5 - safety

    // row 6 - logs
    for (let i = 0; i < 2; i++) {
        let x = i * 250 + 100;
        logs.push(new Log(x, height-grid*6, grid*3, grid, 2.3));
    }

    // row 7 - logs
    for (let i = 0; i < 3; i++) {
        let x = i * 200 + 30;
        logs.push(new Log(x, height-grid*7, grid*2, grid, -1.3));
    }

    // row 8 - logs
    for (let i = 0; i < 2; i++) {
        let x = i * 400 + 10;
        logs.push(new Log(x, height-grid*8, grid*4, grid, 0.5));
    }

    // row 9 - safety

    // row 10 - safety
}

function draw() {
    background(51);

    // safety

    fill(255, 100);
    rect(0,height-grid*1,width,grid);
    rect(0,height-grid*5,width,grid);
    rect(0,height-grid*10,width,grid*2);

    // update

    cars.forEach(car=>{
        car.update();
        car.edges();
        if (car.intersects(frog)) {
            resetGame();
        }
    });

    frog.detach();
    let onLog = false;
    logs.forEach(log=>{
        log.update();
        log.edges();
        if (frog.y < height-grid*5 && frog.y > height-grid*9 && log.intersects(frog)) {
            onLog = true;
            frog.attach(log);
        }
    });
    if (frog.y < height-grid*5 && frog.y > height-grid*9 && !onLog) {
        resetGame();
    }

    frog.update();

    // show
    
    cars.forEach(car=>{
        car.show();
    })

    logs.forEach(log=>{
        log.show();
    })

    frog.show();
}

function keyPressed() {
    switch(keyCode) {
        case UP_ARROW:
            frog.move(0,-1);
            break;
        case DOWN_ARROW:
            frog.move(0,1);
            break;
        case RIGHT_ARROW:
            frog.move(1,0);
            break;
        case LEFT_ARROW:
            frog.move(-1,0)
            break;
    }
}