function create2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }

var grid;
var rows;
var cols;

var scl = 10;

var pause = false;
var pauseBtn;

function setup() {
    createCanvas(600,400);

    cols = height / scl;
    rows = width / scl;

    grid = create2DArray(cols, rows);
    grid.map((col, y) => {
        col.fill(0).map((row, x) => {
            grid[y][x] = floor(random(2));
        });
    });

    pauseBtn = createButton('pause');
    pauseBtn.position(10,10);
    pauseBtn.mousePressed(e => pause = !pause);
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        var x = floor(mouseX / scl);
        var y = floor(mouseY / scl);
        grid[y][x] = (grid[y][x] == 1) ? 0 : 1;
    }
}

function update() {
    if (pause) return;
    var next = create2DArray(cols, rows);

    grid.map((col, y) => col.map((row, x) => {
        // normal
        var neighbors = 0;
        for(var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var c = (y-1+i + cols) % cols;
                var r = (x-1+j + rows) % rows;
                neighbors += grid[c][r];
            }
        }
        neighbors -= grid[y][x];
        if (row == 0 && neighbors == 3) {
            next[y][x] = 1;
        } else if (row == 1 && (neighbors < 2 || neighbors > 3)) {
            next[y][x] = 0;
        } else {
            next[y][x] = row;
        }
    }));

    grid = next;
}

function draw() {
    background(0);

    grid.map((col, y) => col.map((row, x) => {
        if (row == 1) {
            fill(255);
            stroke(0);
            rect(x*scl,y*scl,scl-1,scl-1);
        }
    }));

    update();

}