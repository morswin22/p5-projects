const requiredId = 'Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 05c4)';

let player;

function setup() {
    createCanvas(400, 400);

    player = new Player({
        x: 20,
        y: 120,
        w: 360,
        h: 260
    });
}

function draw() {
    background(255);

    useGamepad(requiredId);

    const drawHolder = (label,x,y) => {
        push();
        translate(x, y);

        noStroke();
        fill(255,0,255);
        if (rowSelected == 1 && gpIsPressed(label)) {
            arc(0, 0, 50, 50, -PI, map(gpGetButton(label).value,0,1,-PI,0));
        }

        stroke(0);
        noFill();
        line(-25,0,25,0);

        noStroke();
        fill(0);
        textAlign(RIGHT, CENTER);
        text('0',-27,0);
        textAlign(LEFT, CENTER);
        text('1',27,0);

        pop();
    }

    const drawCircleButton = (label, x, y) => {
        push();
        translate(x, y);

        noStroke();
        fill(0);
        ellipse(0,0,30,30);

        stroke(255);
        noFill();
        switch(label) {
            case 'SQUARE':
                rect(-6,-6,12,12);
                break;
            case 'CIRCLE':
                ellipse(0,0,18);
                break;
            case 'CROSS':
                line(-6,-6,6,6);
                line(-6,6,6,-6);
                break;
            case 'TRIANGLE':
                beginShape();
                vertex(0,-8);
                vertex(8,4);
                vertex(-8,4);
                endShape(CLOSE);
                break;
        }

        if (rowSelected == 1 && gpIsPressed(label)) {
            stroke(255,0,255);
            noFill();
            ellipse(0,0,35,35);
        }

        pop();
    }

    const drawAxel = (label,x,y) => {
        push();
        translate(x, y);

        noStroke();
        fill(0);
        ellipse(0,0,60,60);

        if(rowSelected == 1) {
            let axel = gpGetAxel(label);
            noStroke();
            fill(255,0,0);
            ellipse(axel.value.x * 22, axel.value.y * 22, 13, 13);
        }

        pop();
    }

    if (gamepad) {
        noStroke();
        fill(0);
        textAlign(LEFT, TOP);
        text('Gamepad is connected!',0,0);

        // "select buckets"
        for(let i in buckets) {
            let x = ((width-60)/buckets.length)*i+30;
            noStroke();
            if (bucketSelected == i) {
                fill(30,144,255);
            } else if (rowSelected == 0 && bucketHover == i) {
                fill(91, 174, 255);
            } else {
                fill(135,206,250);
            }
            ellipse(30+x, 60, 30, 30);
        }

        if (rowSelected == 0) {
            noStroke();
            fill(0);
            textAlign(CENTER, TOP);
            text(buckets[bucketHover],30+((width-60)/buckets.length)*bucketHover+30,85);
        }

        switch(bucketSelected) {
            case 0:
                drawHolder('L2',125,200);
                drawHolder('R2',275,200);
                break;
            case 1:
                drawCircleButton('TRIANGLE', 200, 170);
                drawCircleButton('SQUARE', 170, 200);
                drawCircleButton('CIRCLE', 230, 200);
                drawCircleButton('CROSS', 200, 230);
                break;
            case 2:
                drawAxel('left',125,200)
                drawAxel('right',275,200)
                break;
            case 3:
                if (rowSelected == 1) {
                    player.move(gpGetAxel('left'));
                    player.rotate(gpGetAxel('right'));
                }
                player.render();
                break;
        }     

    } else {
        console.warn('Not connected');
    }

    gpPressed(res => {
        console.log(res);
        switch(res.name) {
            case 'UP':
                rowSelected = 0;
                break;
            case 'DOWN':
                rowSelected = 1;
                break;
        }
        if (rowSelected == 0) {
            switch(res.name) {
                case 'RIGHT':
                    bucketHover = (bucketHover+1)%buckets.length;
                    break;
                case 'LEFT':
                    bucketHover--;
                    if (bucketHover < 0) {
                        bucketHover = buckets.length-1;
                    }
                    break;
                case 'CROSS':
                    bucketSelected = bucketHover;
                    rowSelected = 1;
                    break;
            }
        }
    });
    gpReleased(res => {
        console.log(res);
    })

}

let rowSelected = 0;

let buckets = [
    'L2 and R2',
    'Circle Buttons',
    'Axes',
    'Demo'
];
let bucketSelected = 0;
let bucketHover = 0;