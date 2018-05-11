class Cell {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.bomb = false;
        this.revealed = false;
        this.neighborsCount = 0;
        this.exploded = false;
        this.flagged = false;
    }

    show() {
        stroke(0);
        noFill();
        rect(this.x, this.y, this.w, this.w);
        if (this.revealed) {
            if (this.bomb) {
                if(this.flagged) {
                    image(flagImg,this.x + 3,this.y + 3,this.w-6, this.w-6);
                }
                let img;
                if (!this.exploded) {
                    img = bombImg;
                } else {
                    img = explosionImg;
                }
                push(); 
                if (this.flagged) {
                    tint(255, 205); 
                }
                image(img,this.x + 1,this.y + 1,this.w-2, this.w-2);
                pop();
            } else {
                fill(220);
                rect(this.x, this.y, this.w ,this.w);
                if(this.flagged) {
                    image(flagImg,this.x + 3,this.y + 3,this.w-6, this.w-6);
                }
                if (this.neighborsCount > 0) {
                    textAlign(CENTER);
                    textSize(20);
                    fill(0);
                    text(this.neighborsCount, this.x + this.w/2, this.y + 2*this.w/3);
                }
            }
        } else if(this.flagged) {
            image(flagImg,this.x + 3,this.y + 3,this.w-6, this.w-6);
        }
    } 

    contains(x, y) {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }

    reveal() {
        if (!this.flagged) {
            this.revealed = true;
            if (this.bomb) {
                // End game
                this.exploded = true;
                gameOver();
            } else if (this.neighborsCount == 0) {
                // Reveal neighbors
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        let xoff = (this.x/this.w) + x;
                        let yoff = (this.y/this.w) + y;
                        if (!(xoff < 0 || xoff >= cols || yoff < 0 || yoff >= rows)) {
                            let neighbor = grid[xoff][yoff];
                            if (!neighbor.bomb && !neighbor.revealed) neighbor.reveal();
                        }
                    }
                }
            }
        }
    }

    flag() {
        this.flagged = !this.flagged;
    }

    countBombs() {
        if (this.bomb) return -1;
        let total = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                let xoff = (this.x/this.w) + x;
                let yoff = (this.y/this.w) + y;
                if (!(xoff < 0 || xoff >= cols || yoff < 0 || yoff >= rows)) {
                    let neighbor = grid[xoff][yoff];
                    if (neighbor.bomb) total++;
                }
            }
        }
        this.neighborsCount = total;
    }
}