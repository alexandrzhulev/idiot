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

var SPEED = 1000;

function Idiot(map){

    var idiot = this;

    /**
     * Idiot properties
     */
    this.map = map;

    this.health = HEALTH;
    this.speed = SPEED;



    this._findPosition = function() {
        var position = {};

        var idiotMap = this.map;
        for (var y in idiotMap) {
            var row = idiotMap[y];
            for (var x in row) {
                // ------------------------------------------------------------------------------- if statement !!!
                switch (row[x]) {
                    case IDIOT:
                        position = {x : x, y: y};
                        break;
                    default : break;
                }
            }
        }

        return position;
    };

   /* -------------------------------------------------------------------------------------------- array to obj
    var position = {};
    position = this._findPosition();
    position.x;
    position.y;

    */


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

    this.run = function() {
        setInterval(function(){
            idiot.move()

        }, SPEED)

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
                break;
            case PLANT:
                console.log("in " + direction + " there is a PLANT");
                this.stepInDirection(direction);
                this.eat();
                break;
            case SPACE:
                console.log("in " + direction + " there is a SPACE");
                this.stepInDirection(direction);
                break;
        }
    };





    this.stepInDirection = function(direction) {
        var idiotMap = this.map,
            x = parseInt(this.positionX),
            y = parseInt(this.positionY);

        idiotMap[y][x] = SPACE;

        this.health -= HEALTH_LOSS;

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
        updateMap(this.map, direction, [x,y]);

    };


    /**
     * Eat Idiot method
     */
    this.eat = function(direction) {

        this.health = this.health + HEALTH_GAIN;
        console.log("ATE! Health = " + this.health);
    };



    /**
     * Die Idiot method
     */
    this.die = function() {

        var idiotMap = this.map,
            x = parseInt(this.positionX),
            y = parseInt(this.positionY);

        idiotMap[y][x] = DEAD;
        console.log("IDIOT IS DEAD!");
        updateMap(this.map, null, [x,y]);
    };


    //------------------------------------ 4 Directions CONST -------------------------------------

    function chooseDirection() {
        return Math.floor((Math.random() * 4) + 1);
    }
}
