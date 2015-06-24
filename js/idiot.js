/**
 * App Constants
 *
 */
var DIRECTIONS_NUMBER = 4;
var UP_DIRECTION = 1;
var RIGHT_DIRECTION = 2;
var DOWN_DIRECTION = 3;
var LEFT_DIRECTION = 4;

var HEALTH = 10;
var HEALTH_LOSS = 1;
var HEALTH_GAIN = 3;

var SPEED = 1000;

/**
 * Idiot object constructor
 *
 * @param map
 * @constructor
 */

function Idiot(map){

    var idiot = this;
    var lifecycle;

    idiot.map = map;
    idiot.health = HEALTH;
    idiot.speed = SPEED;

    idiot._findPosition = function() {
        var position = {};
        var idiotMap = idiot.map;
        for (var y in idiotMap) {
            var row = idiotMap[y];
            for (var x in row) {
                if (row[x] == IDIOT) {
                    position = {
                        x: x,
                        y: y
                    };
                }
            }
        }

        return position;
    };

    idiot.position = idiot._findPosition();

    idiot.getElement = function(coordinates) {
        var IdiotMap = idiot.map,
            positionX = coordinates[0],
            positionY = coordinates[1];

        return IdiotMap[positionY][positionX];
    };

    idiot.lookInDirection = function(direction) {
        var element;
        var x = parseInt(idiot.position.x),
            y = parseInt(idiot.position.y);
        switch (direction) {
            case UP_DIRECTION:
                element = idiot.getElement([x, y - 1]);
                break;
            case RIGHT_DIRECTION:
                element = idiot.getElement([x + 1, y]);
                break;
            case DOWN_DIRECTION:
                element = idiot.getElement([x, y + 1]);
                break;
            case LEFT_DIRECTION:
                element = idiot.getElement([x - 1, y]);
                break;
        }

        return element;
    };

    idiot.run = function() {
        lifecycle = setInterval(
            function() {
                idiot.move()
            },
            SPEED);
    };

    /**
     * Move Idiot method
     */
    idiot.move = function() {

        if (!idiot.health) {
            idiot.die();
            return;
        }

        var direction = chooseDirection();

        switch (idiot.lookInDirection(direction)) {
            case WALL:
                console.log("in " + direction + " there is a WAll"); //-------------------------------------------------
                break;
            case PLANT:
                console.log("in " + direction + " there is a PLANT"); //------------------------------------------------
                idiot.stepInDirection(direction);
                idiot.eat();
                break;
            case SPACE:
                console.log("in " + direction + " there is a SPACE"); //------------------------------------------------
                idiot.stepInDirection(direction);
                break;
        }
    };


    idiot.stepInDirection = function(direction) {
        var idiotMap = idiot.map,
            prevX = parseInt(idiot.position.x),
            prevY = parseInt(idiot.position.y),
            currX,
            currY;

        switch (direction) {
            case UP_DIRECTION:
                currX = prevX;
                currY = prevY - 1;
                break;
            case RIGHT_DIRECTION:
                currX = prevX + 1;
                currY = prevY;

                break;
            case DOWN_DIRECTION:
                currX = prevX;
                currY = prevY + 1;
                break;
            case LEFT_DIRECTION:
                currX = prevX - 1;
                currY = prevY;
                break;
        }

        idiot.health -= HEALTH_LOSS;
        idiotMap[prevY][prevX] = SPACE;
        idiotMap[currY][currX] = IDIOT;
        idiot.map = idiotMap;
        idiot.position.x = currX;
        idiot.position.y = currY;

        console.log("MOVED! Health = " + idiot.health); //---------------------------------------------------------------
        updateMap(idiot.map, direction, [prevX, prevY]);
    };


    /**
     * Eat Idiot method
     */
    idiot.eat = function() {
        idiot.health += HEALTH_GAIN;
        console.log("ATE! Health = " + idiot.health); //---------------------------------------------------------------
    };


    /**
     * Die Idiot method
     */
    idiot.die = function() {
        var idiotMap = idiot.map,
            x = parseInt(idiot.position.x),
            y = parseInt(idiot.position.y);
        idiotMap[y][x] = DEAD;

        console.log("IDIOT IS DEAD!"); //------------------------------------------------------------------------------
        updateMap(idiot.map, null, [x, y]);

        clearTimeout(lifecycle);
    };

    function chooseDirection() {
        return Math.floor((Math.random() * DIRECTIONS_NUMBER) + 1);
    }
}
