var LCDPLATE, lcd;
LCDPLATE = require('adafruit-i2c-lcd').plate;
lcd = new LCDPLATE(1, 0x20);

// lcd.createChar(1, [0,0,10,31,31,14,4,0]); // Heart
// lcd.createChar(2, [0, 1, 3, 22, 28, 8, 0, 0]) // Check Mark
// lcd.createChar(3, [0, 14, 21, 23, 17, 14, 0, 0]) // Clock
// lcd.createChar(4, [31, 17, 10, 4, 10, 17, 31, 0]) // Timer
// lcd.createChar(5, [8, 12, 10, 9, 10, 12, 8, 0]) // Forward Symbol
// lcd.createChar(6, [2, 6, 10, 18, 10, 6, 2, 0]) // Backward Symbol
// lcd.createChar(7, [31, 17, 21, 21, 21, 21, 17, 31]) // Pause

lcd.createChar(0, [0, 0, 10, 31, 31, 14, 4, 0]); // Heart
lcd.createChar(1, [0, 1, 3, 22, 28, 8, 0, 0]) // Check Mark
lcd.createChar(2, [14, 17, 17, 31, 27, 27, 31, 0]) // Lock
lcd.createChar(3, [31, 21, 31, 31, 14, 10, 27, 0]) // Alien
lcd.createChar(4, [1, 3, 15, 15, 15, 3, 1, 0]) // Speaker
lcd.createChar(5, [4, 14, 14, 14, 31, 0, 4, 0]) // Bell
lcd.createChar(6, [0, 17, 27, 4, 4, 27, 17, 0]) // Cross
lcd.createChar(7, [0, 14, 21, 27, 14, 14, 0, 0]) // Skull

const red = lcd.colors.RED
const blue = lcd.colors.GREEN
const green = lcd.colors.BLUE
const white = lcd.colors.WHITE
const yellow = lcd.colors.VIOLET
const on = lcd.colors.ON
const off = lcd.colors.OFF

var arr = [red, blue, green, white, yellow, on, off]
function randomcolors(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
//show hello world in red
setInterval(() => {
    lcd.backlight(randomcolors(arr));
}, 2000);
// lcd.backlight(red);
lcd.message('\x00 \x01 \x02 \x03 \x04 \x05 \x06 \x07   \n  Demo Loaded!');

// show button state on lcd and console
function displayButton(state, button) {
    lcd.clear();
    lcd.message('Button: ' + lcd.buttonName(button) + '\nState: ' + state);
    console.log(state, lcd.buttonName(button));
}

//register events to show button press/release
lcd.on('button_change', function (button) {
    console.log('button_change', lcd.buttonName(button));
});

lcd.on('button_down', function (button) {
    displayButton('pressed', button);
});

lcd.on('button_up', function (button) {
    displayButton('released', button);
});