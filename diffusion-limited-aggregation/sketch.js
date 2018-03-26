let tree = [];
let walkers = [];

let maxWalkers = 100;
let iterations = 250;

let r = 4;

function setup() {
    createCanvas(400, 400);

    tree.push(new Walker(width/2, height/2, true));
    for(let i = 0; i<maxWalkers; i++) {
        walkers.push(new Walker());
    }
}

function draw() {
    background(51);

    tree.forEach(p=>{
        p.show();
    });

    for(let i = 0; i<iterations; i++) {
        walkers.forEach((w,i)=>{
            w.walk();
            if (w.checkStuck(tree)) {
                tree.push(w);
                walkers.splice(i,1);
                walkers.push(new Walker());
            }
        });
    }

    walkers.forEach(w=>{
        w.show();
    })
}