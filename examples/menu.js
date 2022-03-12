var LCDPLATE, lcd;
LCDPLATE = require("adafruit-i2c-lcd").plate;
lcd = new LCDPLATE(1, 0x20);

// lcd.createChar(1, [0,0,10,31,31,14,4,0]); // Heart
// lcd.createChar(2, [0, 1, 3, 22, 28, 8, 0, 0]) // Check Mark
// lcd.createChar(3, [0, 14, 21, 23, 17, 14, 0, 0]) // Clock
// lcd.createChar(4, [31, 17, 10, 4, 10, 17, 31, 0]) // Timer
// lcd.createChar(5, [8, 12, 10, 9, 10, 12, 8, 0]) // Forward Symbol
// lcd.createChar(6, [2, 6, 10, 18, 10, 6, 2, 0]) // Backward Symbol
// lcd.createChar(7, [31, 17, 21, 21, 21, 21, 17, 31]) // Pause

lcd.createChar(0, [0, 0, 10, 31, 31, 14, 4, 0]); // Heart
lcd.createChar(1, [0, 1, 3, 22, 28, 8, 0, 0]); // Check Mark
lcd.createChar(2, [14, 17, 17, 31, 27, 27, 31, 0]); // Lock
lcd.createChar(3, [31, 21, 31, 31, 14, 10, 27, 0]); // Alien
lcd.createChar(4, [1, 3, 15, 15, 15, 3, 1, 0]); // Speaker
lcd.createChar(5, [4, 14, 14, 14, 31, 0, 4, 0]); // Bell
lcd.createChar(6, [0, 17, 27, 4, 4, 27, 17, 0]); // Cross
lcd.createChar(7, [0, 14, 21, 27, 14, 14, 0, 0]); // Skull

const red = lcd.colors.RED;
const blue = lcd.colors.GREEN;
const green = lcd.colors.BLUE;
const white = lcd.colors.WHITE;
const yellow = lcd.colors.VIOLET;
const on = lcd.colors.ON;
const off = lcd.colors.OFF;


var option_d = {
  "1. Option1": {
    "a. Subopt1.1 ": "abc",
    "b. Subopt1.2": "def",
    "c. Subopt1.3": "abghia",
  },
  "2. Option2": {
    "a. Subopt2.1": "i. Miniopt2.1",
    "b. Subopt2.2": "ii. Miniopt2.2",
    "c. Subopt2.3": "ii. Miniopt2.3",
  },
  "3. Option3": {
    "a. Subopt3.1": "i. Miniopt3.1",
    "b. Subopt3.2": "ii. Miniopt3.2",
    "c. Subopt3.3": "ii. Miniopt3.3",
  },
};

class Menu {
    constructor(len, option_index, cursor, prevlist) {
      
      this.len = Object.keys(option_d).length;
      this.option_index = 0;
      this.cursor = [];
      this.prev_list = [];

      this.this_d = option_d;
    }

    create_menu(this_d, option_index) {
      this.this_d = this_d;
      var i = 0;
      this.option_index=option_index;

      for (var val in this.this_d) {
        if (i < this.len && this.option_index == i) {
          // if (this.opt==i):
          if (typeof(this.this_d) == "object") {
            this.prev_list.push(this.this_d);
            //console.log(this.prev_list);
            lcd.clear();
            this.print_list(this.this_d[val], 0);
            console.log("inside create menu");
            this.cursor.push(this.option_index);
          }
          this.option_index = 0;
        }
        i += 1;
      }
      //this.this_d = this_d;
    }

    print_list(this_d, cursor) {
      this.this_d = this_d;

      var temp_list = [];
       lcd.clear();

      if (typeof(this.this_d) == "string")
        {lcd.message(this.this_d);
          console.log("inside string option");
        }
      else {
        for (var x in this.this_d) {
          temp_list.push(x);
        }
        this.len = temp_list.length;
        for (var item=0; item<temp_list.length;item++) {
          if (item == cursor && item == 0) {
            lcd.message(  temp_list[item] + " \x02");          //cursor
            lcd.message("\n"+ temp_list[item + 1]);
            console.log(temp_list[item] + "\n" +temp_list[item+1]);
          } else if (item + 1 == cursor) {
            lcd.message(  temp_list[item]);
            lcd.message( "\n"+ temp_list[item + 1] +" \x02");         //cursor
            console.log(temp_list[item] + "\n" +temp_list[item+1]);
          }
        }
      }

    }

    handle_menu(button){
      switch (button) {
    
      case "SELECT":
       
        this.create_menu(this.this_d,this.option_index);
        break;
      case "RIGHT":
        
        this.create_menu(this.this_d,this.option_index);
        break;
      case "UP":
       
        lcd.clear();
       
        if (this.option_index>0)
                this.option_index-=1;
        this.print_list(this.this_d,this.option_index) ; 
        break;
      case "DOWN":
       
        lcd.clear();
        
        if (this.option_index<this.len-1)
                this.option_index+=1;
        this.print_list(this.this_d,this.option_index) ; 
        break;
      case "LEFT":
       
        lcd.clear();
       
        console.log(this.prev_list[this.prev_list.length-1]);
        this.print_list(this.prev_list[this.prev_list.length-1],this.cursor[this.cursor.length-1])
            if (this.prev_list[this.prev_list.length-1]!=this.prev_list[0]){
                this.prev_list.pop(this.prev_list.length-1);
                this.cursor.pop(this.cursor-1);
            }
            this.option_index=0;
        break;
       
      default:
        

        return void 0;
      }
    }



}




let display=  new Menu();

var arr = [red, blue, green, white, yellow, on, off];
function randomcolors(arr) {
  return arr[Math.floor(Math.random() * arr.len)];
}
//show hello world in red
setInterval(() => {
  lcd.backlight(randomcolors(arr));
}, 2000);
// lcd.backlight(red);
lcd.message("\x00 \x01 \x02 \x03 \x04 \x05 \x06 \x07   \n  Demo Loaded!");
lcd.clear();
display.print_list(option_d,display.option_index);

// show button state on lcd and console
function displayButton(state, button) {
  lcd.clear();
  lcd.message("Button: " + lcd.buttonName(button) + "\nState: " + state);
  console.log(state, lcd.buttonName(button));
}

//register events to show button press/release
lcd.on("button_change", function (button) {
  console.log("button_==", lcd.buttonName(button));
//   display.handle_menu(lcd.buttonName(button))
});

// lcd.on("button_down", function (button) {
// //   displayButton("pressed", button);
//     display.handle_menu("pressed",lcd.buttonName(button));
// });

lcd.on("button_up", function (button) {
   //displayButton("released", button);
   //lcd.clear();
    display.handle_menu(lcd.buttonName(button));
});
