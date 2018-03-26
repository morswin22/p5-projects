let ship;
let asteroids = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for (let i = 0; i<8; i++) {
        asteroids.push(new Asteroid());
    }
    
}

function draw() {
    background(0);

    ship.update();
    ship.render();

    asteroids.forEach((asteroid, i)=>{
        asteroid.update();
        asteroid.render();
    })

    if (ship.finished) {
        background(0);
        text('Game Over', width/2, height/2);
        noLoop();
    }

}

function keyPressed() {
    switch(keyCode) {
        case RIGHT_ARROW:
            ship.setRotation(0.1);
            break;
        case LEFT_ARROW:
            ship.setRotation(-0.1);
            break;
        case UP_ARROW:
            ship.boosting(true);
            break;
        case 32: // space
            ship.shoot();
            // TODO: start charging and shoot on keyReleased()
            break;
    }
}

function keyReleased() {
    switch(keyCode) {
        case RIGHT_ARROW:
            ship.setRotation(0);
            break;
        case LEFT_ARROW:
            ship.setRotation(0);
            break;
        case UP_ARROW:
            ship.boosting(false);
            break;
    }
}