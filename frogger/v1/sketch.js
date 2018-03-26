let frog;
let lanes = new Array();

const SAFETY = 0;
const CAR    = 1;
const LOG    = 2;

let grid = 50;

function resetGame() {
    frog = new Frog(width/2-grid/2, height-grid*1, grid);
    frog.detach();
}

function setup() {
    createCanvas(500, 550);

    lanes.push(new Lane(0,SAFETY,color(100)));
    lanes.push(new Lane(1,LOG,3,1,150,3));
    lanes.push(new Lane(2,LOG,2,3,350,-2.5));
    lanes.push(new Lane(3,LOG,4,1,200,1));
    lanes.push(new Lane(4,LOG,3,1,250,-1.7));
    lanes.push(new Lane(5,SAFETY,color(100)));
    lanes.push(new Lane(6,CAR,3,1,150,2.7));
    lanes.push(new Lane(7,CAR,2,2,150,-3.6));
    lanes.push(new Lane(8,CAR,1,3,150,2.3));
    lanes.push(new Lane(9,CAR,4,1,150,-1.5));
    lanes.push(new Lane(10,SAFETY,color(100)));

    resetGame();
}

function draw() {
    background(51);

    lanes.forEach(lane=>{
        lane.update();
    });

    let laneIndex = floor(frog.y/grid);
    lanes[laneIndex].check(frog);

    lanes.forEach(lane=>{
        lane.show();
    });

    frog.update();
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