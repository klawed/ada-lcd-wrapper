require('coffee-script');
require('coffee-script/register');
require('i2c');
var Promise = require('promise');
var LCDPLATE=require('adafruit-i2c-lcd').plate;
var SELECT = 1;
var WEST = 2;
var NORTH = 8;
var EAST = 16;
var SOUTH = 4;

function initialize() {
    lcd= new LCDPLATE( '/dev/i2c-1', 0x20);
    lcd.backlight(7);
    staticMessage('Scan an item\nor press select');
}

function logButton(button) {
    console.log(button);
}

function displayMessage(message) {
    if (message.length > 15) {
	scrollMessage(message);
    } else {
	staticMessage(message);
    }
}

function staticMessage(message) {
	lcd.clear();
	lcd.message(message);
}
var scroller;
function scrollMessage(message) {
    var screenLen = 16;
    clearInterval(scroller);
    var messageLen = message.length;
    var i = 0;
    scroller = setInterval(function(){
	var substr;
	if (i < messageLen - screenLen) {
	    substr = message.substr(i, screenLen);
	} else if (i < messageLen) {
	    substr = message.substr(i, messageLen - i) + " " + message.substr(0,(screenLen - (messageLen - i -1)));
	} else {
	    i = 0;
	    substr = message.substr(i, screenLen);
	}
	lcd.clear();
	lcd.message(substr);
	i++;
    },400);
}
function displayMenu(list,property) {
    var promise = new Promise(function(resolve, reject) {
	var curIndex = 0;
	var total = list.length;
	lcd.clear();
	staticMessage((curIndex +1) + " of " + total + "\n* " + list[curIndex][property].substr(0,13));
	var selectMenu = function(button) {
	    switch(button) {
	    case SELECT:
		lcd.removeListener("button_up", arguments.callee);
		resolve(list[curIndex]);
		break;
	    case SOUTH:
		if (curIndex < list.length-1)
		    curIndex++;
		break;
	    case NORTH:
		if (curIndex > 0)
		    curIndex--;
		break
	    }
	    lcd.clear();
	    staticMessage((curIndex +1) + " of " + total + "\n* " + list[curIndex][property].substr(0,13));
	}
	lcd.on('button_up',selectMenu);
    });
    return promise;
}


module.exports = {'initialize':initialize,'staticMessage':staticMessage, 'displayMenu':displayMenu};
