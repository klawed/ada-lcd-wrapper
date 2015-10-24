# lcd-wrapper
This repo composes the lcd object provided by [this excellent library](https://github.com/fehmer/adafruit-i2c-lcd).

## Usage
```
//code here REALLY soon
```
### function initialize()
initializes the board or throws an error as returned by the i2c subsystem
### function staticMessage(message)
params: message
* clear screen and send message to screen.  `message` will be truncated if it is longer than 16 characters
### function displayMenu(list,property)
display a list of menu items associated with actions  that are invoked when the select button is pressed

## TODO
### Unit Tests
### Mock LCD/LCD Simulator
