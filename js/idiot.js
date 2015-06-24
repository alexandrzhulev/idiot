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

var HEALTH = 10;
var HEALTH_LOSS = 1;
var HEALTH_GAIN = 3;

var SPEED = 100;

function Idiot(map){

    /**
     * Idiot properties
     */
    this.map = map;

    this.health = HEALTH;
    this.spaad = SPEED;

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

        if (!this.health) {
            this.die();
            return;
        }

        var direction = chooseDirection();

        switch (this.lookInDirection(direction)) {
            case WALL:
                console.log("in " + direction + " there is a WAll");
                this.move();
                break;
            case PLANT:
                console.log("in " + direction + " there is a PLANT");
                this.eatInDirection();
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

        idiotMap[y][x] = SPACE;

        this.health = this.health - HEALTH_LOSS;

        console.log("MOVED! Health = " + this.health);
        switch (direction) {
            case UP_DIRECTION:
                idiotMap[y-1][x] = IDIOT;
                this.map = idiotMap;
                this.positionX = x;
                this.positionY = y-1;
                console.log("posX after move " + this.positionX);
                console.log("posY after move " + this.positionY);
                break;
            case RIGHT_DIRECTION:
                idiotMap[y][x+1] = IDIOT;
                this.map = idiotMap;
                this.positionX = x+1;
                this.positionY = y;
                console.log("posX after move " + this.positionX);
                console.log("posY after move " + this.positionY);
                break;
            case DOWN_DIRECTION:
                idiotMap[y+1][x] = IDIOT;
                this.map = idiotMap;
                this.positionX = x;
                this.positionY = y+1;
                console.log("posX after move " + this.positionX);
                console.log("posY after move " + this.positionY);
                break;
            case LEFT_DIRECTION:
                idiotMap[y][x-1] = IDIOT;
                this.map = idiotMap;
                this.positionX = x-1;
                this.positionY = y;
                console.log("posX after move " + this.positionX);
                console.log("posY after move " + this.positionY);
                break;
        }
    };


    /**
     * Eat Idiot method
     */
    this.eatInDirection = function(direction) {

        var idiotMap = this.map,
            x = parseInt(this.positionX),
            y = parseInt(this.positionY);

        idiotMap[y][x] = SPACE;

        this.health = this.health + HEALTH_GAIN;

        console.log("ATE! Health = " + this.health);
        switch (direction) {
            case UP_DIRECTION:
                idiotMap[y-1][x] = IDIOT;
                this.map = idiotMap;
                this.positionX = x;
                this.positionY = y-1;
                console.log("posX after move " + this.positionX);
                console.log("posY after move " + this.positionY);
                break;
            case RIGHT_DIRECTION:
                idiotMap[y][x+1] = IDIOT;
                this.map = idiotMap;
                this.positionX = x+1;
                this.positionY = y;
                console.log("posX after move " + this.positionX);
                console.log("posY after move " + this.positionY);
                break;
            case DOWN_DIRECTION:
                idiotMap[y+1][x] = IDIOT;
                this.map = idiotMap;
                this.positionX = x;
                this.positionY = y+1;
                console.log("posX after move " + this.positionX);
                console.log("posY after move " + this.positionY);
                break;
            case LEFT_DIRECTION:
                idiotMap[y][x-1] = IDIOT;
                this.map = idiotMap;
                this.positionX = x-1;
                this.positionY = y;
                console.log("posX after move " + this.positionX);
                console.log("posY after move " + this.positionY);
                break;
        }

    };

    /**
     * Die Idiot method
     */
    this.die = function() {

        clearTimeout(this.move);

        var idiotMap = this.map,
            x = parseInt(this.positionX),
            y = parseInt(this.positionY);

        idiotMap[y][x] = DEAD;
        console.log("IDIOT IS DEAD!");
    };




    this.updateMap = function() {


    };


    function chooseDirection() {
        return Math.floor((Math.random() * 4) + 1);
    }
}
