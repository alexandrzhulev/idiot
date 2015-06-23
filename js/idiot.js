/**
 * Idiot object
 *
 * @param map
 * @constructor
 * @param x
 * @param y
 */


var UP_DIRECTION = 1;
var RIGHT_DIRECTION = 2;
var DOWN_DIRECTION = 3;
var LEFT_DIRECTION = 4;


function Idiot(map){

    /**
     * Idiot properties
     */
    this.map = map;


    this._findPosition = function() {
        var position = [];

        var IdiotMap = this.map;
        for (var y in IdiotMap) {
            var row = IdiotMap[y];
            for (var x in row) {
                switch (row[x]) {
                    case IDIOT: position = [x, y];
                }
            }
        }

        return position;
    };

    this.positionX = this._findPosition()[0];
    this.positionY = this._findPosition()[1];

    this.getElement = function(coordinates) {

        var IdiotMap = this.map,
            positionX = coordinates[0],
            positionY = coordinates[1];

        return IdiotMap[positionY][positionX];
    };


    this.lookInDirection = function(direction) {
        var element;
        var x = parseInt(this.positionX),
            y = parseInt(this.positionY);
        switch (direction) {
            case UP_DIRECTION:
                element = this.getElement([x, y-1]);
                break;
            case RIGHT_DIRECTION:
                element = this.getElement([x+1, y]);
                break;
            case DOWN_DIRECTION:
                element = this.getElement([x, y+1]);
                break;
            case LEFT_DIRECTION:
                element = this.getElement([x-1, y]);
                break;
        }

        return element;
    };


    /**
     * Move Idiot method
     */
    this.move = function() {

        var direction = chooseDirection();

        switch (this.lookInDirection(direction)) {
            case WALL:
                console.log("in " + direction + " there is a WAll");
                this.move();
                break;
            case PLANT:
                console.log("in " + direction + " there is a PLANT");
                this.eat();
                break;
            case SPACE:
                console.log("in " + direction + " there is a SPACE");
                this.moveInDirection(direction);
                this.move();
                break;
        }
    };

    this.moveInDirection = function(direction) {
        var idiotMap = this.map,
            x = parseInt(this.positionX),
            y = parseInt(this.positionY);
        switch (direction) {
            case UP_DIRECTION:
                this.positionY = y - 1;
                break;
            case RIGHT_DIRECTION:
                idiotMap[y][x] = SPACE;
                idiotMap[y][x+1] = IDIOT;
                this.map = idiotMap;
                this.positionX = x+1;
                this.positionY = y;
                console.log("posX after move " + this.positionX);
                console.log("posY after move " + this.positionY);
                break;
            case DOWN_DIRECTION:
                this.positionY = y + 1;
                break;
            case LEFT_DIRECTION:
                this.positionX = x - 1;
                break;
        }
    };


    /**
     * Eat Idiot method
     */
    this.eat = function() {

        // change plant on its position to idiot

        // view this on map

    };

    /**
     * Die Idiot method
     */
    this.die = function() {



        // check on lifetime existing

        // change idiot on its position from alive to dead

        // view this on map

    };

    this.updateMap = function() {


    };


    function chooseDirection() {
        return Math.floor((Math.random() * 4) + 1);
    }
}