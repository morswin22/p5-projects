let tree;
let finished = false;
let target;

let checkbox;
let reset;
let reroll;
let selected;

function setup() {
    createCanvas(600, 400);
    frameRate(2);

    tree = new Tree();

    for (let i = 0; i < 30; i++) {
        tree.addValue(floor(random(0, 100)));
    }
    
    target = random(tree.traverse());

    checkbox = createCheckbox('Stopped', true);
    selected = createP('Selected: '+ target);
    reset = createButton('Reset');
    reset.mouseClicked(()=>{
        tree._animationCurrent = undefined;
        finished = false;
    });
    reroll = createButton('Reroll');
    reroll.mouseClicked(()=>{
        tree._animationCurrent = undefined;
        finished = false;
        target = random(tree.traverse());
        selected.html('Selected: '+ target);
    });

    console.log(tree);
    console.log(tree.traverse());
}

function draw() {
    background(51);

    let stopped = checkbox.checked();

    if (!stopped && !finished) finished = tree.searchAnimation(target);
    if ((stopped || finished) && tree._animationCurrent && tree._animationCurrent != 1) {
        fill(0,255,255);
        stroke(0,255,255);
        ellipse(tree._animationCurrent.x, tree._animationCurrent.y, 22, 22);
    };
    tree.traverse();
}