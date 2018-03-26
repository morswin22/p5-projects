class Lane extends Rectangle {
    
    constructor(index, type, n, len, spacing, speed) {
        super(0,index*grid,width,grid);
        this.obstacles = new Array();
        this.type = type;

        if (typeof n == "number") {
            this.strk = color(51);
            this.col = color(51);
            let offset = random(0, 200);
            for (let i = 0; i < n; i++) {
                this.obstacles.push(new Obstacle(offset + spacing * i, this.y, len*grid, grid, speed));
            }
        } else {
            this.col = n;
            this.strk = color(0);
        }
    }

    check(frog) {
        switch(this.type) {
            case CAR:
                this.obstacles.forEach(car=>{
                    if (car.intersects(frog)) {
                        resetGame();
                    }
                });
                break;
            case LOG:
                let ok = false;
                this.obstacles.forEach(log=>{
                    if (log.intersects(frog)) {
                        ok = true;
                        frog.attach(log);
                    }
                });
                if (!ok) {
                    resetGame();
                }
                break;
        }
    }

    show() {
        fill(this.col);
        stroke(this.strk);
        rect(this.x, this.y, this.w, this.h);
        this.obstacles.forEach(obstacle=>{
            obstacle.show();
        });
    }

    update() {
        this.obstacles.forEach(obstacle=>{
            obstacle.update();
            obstacle.edges();
        });
    }

}