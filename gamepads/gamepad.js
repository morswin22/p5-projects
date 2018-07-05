// const requiredId = 'Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 05c4)';

const gamepadAxes = ['left','right'];
const gamepadAxesSpec = ['left_x','left_y', 'right_x','right_y'];
const gamepadButtons = [
    'CROSS',
    'CIRCLE',
    'SQUARE',
    'TRIANGLE',
    'L1',
    'R1',
    'L2',
    'R2',
    'SHARE',
    'OPTIONS',
    'L3',
    'R3',
    'UP',
    'DOWN',
    'LEFT',
    'RIGHT',
    'PS',
    'PANEL'
];

let gamepad;
let gamepadButtonsPressed = [];
function useGamepad(rid) {
    gamepad = undefined;

    let gamepads = navigator.getGamepads();
    for(let i in gamepads) {
        if (gamepads[i] && gamepads[i].id == rid) {
            gamepad = gamepads[i];
            break;
        }
    }
    return gamepad;
}

function gpPressed(callback = ()=>{}) {
    if (gamepad) {
        for (let i in gamepad.buttons) {
            let button = gamepad.buttons[i];
            if (button.value > 0 && gamepadButtonsPressed.indexOf(i) == -1) {
                gamepadButtonsPressed.push(i);
                callback({
                    id: i,
                    name: gamepadButtons[i],
                    value: button.value
                });
            }
        }
    }
}

function gpReleased(callback = ()=>{}) {
    if (gamepad) {
        for(let i = gamepad.buttons.length -1; i >= 0; i--) {
            let button = gamepad.buttons[i];
            if (button.value <= 0 && gamepadButtonsPressed.indexOf(''+i) > -1) {
                gamepadButtonsPressed.splice(gamepadButtonsPressed.indexOf(''+i),1);
                callback({
                    id: ''+i,
                    name: gamepadButtons[i],
                    value: button.value
                });
            } 
        }
    }
}

function gpGetButton(label = undefined) {
    if (gamepad && label) {
        let id = gamepadButtons.indexOf(label);
        if (id > -1) {
            return {
                id,
                name: label,
                value: gamepad.buttons[id].value
            }
        }
    }
}

function gpIsPressed(label = undefined) {
    if (gamepad && label) {
        let id = gamepadButtons.indexOf(label);
        if (id > -1) {
            return gamepad.buttons[id].value > 0;
        }
    }
    return false;
}

function gpGetAxel(label = undefined) {
    if (gamepad && label) {
        let id = gamepadAxes.indexOf(label);
        if (id > -1) {
            return {
                id,
                name: label,
                value: {
                    x: gamepad.axes[id*2+0],
                    y: gamepad.axes[id*2+1]
                }
            }
        }
    }
}