let cells = [];

function setup() {
    createCanvas(400, 400);

    for (let i = 0; i < 4; i++) {
        cells.push(new Cell());
    }

}

function draw() {
    background(151);

    for (let cell of cells) {
        cell.update();
        cell.render();
    }
}

function mousePressed() {
    for (let i = cells.length-1; i >= 0; i--) {
        let cell = cells[i];
        if (cell.contains(mouseX, mouseY)) {
            cells.push(cell.mitosis());
            cells.push(cell.mitosis());
            cells.splice(i,1);
        }
    }
}