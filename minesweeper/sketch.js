let grid;

let cols;
let rows;
let w = 40;

let mines = 20;

let flagMode = false;
let flagCheckbox;

let bombImg;
let explosionImg;
let flagImg;

let bombSound;

function preload() {
    bombImg = loadImage('bomb.png');
    explosionImg = loadImage('explosion.png');
    flagImg = loadImage('flag.png');
    bombSound = loadSound('bomb.mp3');
}

function setup() {
    createCanvas(401, 401);
    cols = floor(width / w);
    rows = floor(height / w);
    gameStart();

    flagCheckbox = createCheckbox('Flag mode', flagMode);
    flagCheckbox.mouseClicked(()=>{
        flagMode = flagCheckbox.checked()
    });

    createButton('Restart').mousePressed(()=>{
        gameStart();
    });
}

function draw() {
    background(255);
    // Show cells
    for (let col of grid) {
        for (let cell of col) {
            cell.show();
        }
    }
}

function mousePressed() {
    // Reveal cell
    for (let col of grid) {
        for (let cell of col) {
            if (cell.contains(mouseX, mouseY)) {
                if (!flagMode) {
                    cell.reveal();
                    if(cell.bomb) {
                        bombSound.play();
                    }
                } else {
                    cell.flag();
                }
            };
        }
    }
}

function keyPressed() {
    if (key == "F" || key == "f") {
        flagMode = true;
        flagCheckbox.checked(flagMode);
    }
}

function keyReleased() {
    if (key == "F" || key == "f") {
        flagMode = false;
        flagCheckbox.checked(flagMode);
    }
}

function gameStart() {
    grid = [];
    // Create the grid
    for (let x = 0; x < cols; x++) {
        grid[x] = [];
        for (let y = 0; y < rows; y++) {
            grid[x][y] = new Cell(x*w, y*w, w);
        }
    }
    // Place mines
    for (let i = 0; i < mines; i++) {
        let cs;
        do {
            let cell = random(random(grid));
            cs = cell.bomb;
            cell.bomb = true;
        } while (cs === true);
    }
    // Count bombs in neighborhood
    for (let col of grid) {
        for (let cell of col) {
            cell.countBombs();
        }
    }
}

function gameOver() {
    // Reveal cells
    for (let col of grid) {
        for (let cell of col) {
            cell.revealed = true;
        }
    }
}