let grid;

function setup() {
    createCanvas(400, 400);
    grid = new Array(4).fill(0).map((x)=>x = new Array(4).fill(0));
    addNumber();
    addNumber();
    console.table(grid);
}

function addNumber() {
    let options = [];
    grid.map((row, i)=>row.map((cell, j)=>{
        if (cell === 0) options.push({x:i,y:j});
    }));
    if (options.length > 0) {
        let spot = random(options);
        grid[spot.x][spot.y] = (random(1) > 0.5) ? 2 : 4;
    }
}

function slide(row) {
    let arr = row.filter(cell => cell);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
}

function combine(row) {
    for (let i = 3; i >= 1; i--) {
        let a = row[i];
        let b = row[i - 1];
        if (a == b) {
            row[i] = a + b;
            row[i-1] = 0;
        }
    }
    return row;
}

function operate(row) {
    row = slide(row);
    row = combine(row);
    row = slide(row);
    return row;
}

function cpy(grid) {
    let extra = new Array(4).fill(0).map((x)=>x = new Array(4).fill(0));
    extra.map((row, i)=>row.map((cell, j)=>{
        extra[i][j] = grid[i][j];
    }));
    return extra;
}

function compare(a,b) {
    var isTrue = false;
    a.map((row, i)=>row.map((cell, j)=>{
        if (a[i][j] != b[i][j]) {
            isTrue = true;
        }
    }));
    return isTrue;
}

function flipGrid (grid) {
    grid.map((row, i)=>{
        grid[i] = row.reverse();
    });
    return grid;
}

function rotateGrid (grid) {
    let newGrid = new Array(4).fill(0).map((x)=>x = new Array(4).fill(0));
    grid.map((row, i)=>row.map((cell, j)=>{
        newGrid[i][j] = cell;
    }));
    return newGrid;
}

function draw() {
    background(255);
    drawGrid();   
}

function keyPressed() {
  let flipped = false;
  let rotated = false;
  let played = true;
  switch (keyCode) {
    case DOWN_ARROW:
      // do nothing
      break;
    case UP_ARROW:
      grid = flipGrid(grid);
      flipped = true;
      break;
    case RIGHT_ARROW:
      grid = transposeGrid(grid, 1);
      rotated = true;
      break;
    case LEFT_ARROW:
      grid = transposeGrid(grid, 1);
      grid = flipGrid(grid);
      rotated = true;
      flipped = true;
      break;
    default:
      played = false;
  }

  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);
    if (flipped) {
      grid = flipGrid(grid);
    }
    if (rotated) {
      grid = transposeGrid(grid, -1);
    }
    if (changed) {
      addNumber();
    }
  }
}

function drawGrid () {
    let w = width / grid.length;
    grid.map((row, i)=>row.map((cell, j)=>{
        stroke(0);
        noFill();
        strokeWeight(2);
        rect(i*w, j*w, w, w);
        if (cell !== 0) {
            textAlign(CENTER,CENTER);
            textSize(64);
            fill(0);
            noStroke();
            text(cell, i * w + w/2, j*w + w/2);
        }
    }));
}