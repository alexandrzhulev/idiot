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

var RADIUS = 7;

/**
 * Idiot object constructor
 *
 * @param map
 * @constructor
 */

function Idiot(map){

    var stepsNumber = 0;

    var idiot = this;
    var lifecycle;

    idiot.map = map;
    idiot.health = HEALTH;
    idiot.speed = SPEED;
    idiot.radius = RADIUS;
    idiot.position = findPosition();
    idiot.wallInDirection = {};
    idiot.route = {};

    idiot.getElement = function(coordinates) {
        var IdiotMap = idiot.map,
            positionX = coordinates[0],
            positionY = coordinates[1];

        return IdiotMap[positionY][positionX];
    };

    idiot.lookInDirection = function(direction, radius) {
        var element;
        var x = parseInt(idiot.position.x),
            y = parseInt(idiot.position.y);
        switch (direction) {
            case UP_DIRECTION:
                element = idiot.getElement([x, y - radius]);
                break;
            case RIGHT_DIRECTION:
                element = idiot.getElement([x + radius, y]);
                break;
            case DOWN_DIRECTION:
                element = idiot.getElement([x, y + radius]);
                break;
            case LEFT_DIRECTION:
                element = idiot.getElement([x - radius, y]);
                break;
            default : break;
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

    idiot.move = function() {
        if (!idiot.health) {
            idiot.die();
            return;
        }
        idiot.findPlant();
        if (idiot.route.direction == false) {
            var direction = chooseDirection();
            switch (idiot.lookInDirection(direction, 1)) {
                case WALL:
                    break;
                case PLANT:
                    idiot.stepInDirection(direction);
                    idiot.eat();
                    break;
                case SPACE:
                    idiot.stepInDirection(direction);
                    break;
                default : break;
            }
        } else {
            for (var i = 1; i <= idiot.route.radius; i++) {
                setTimeout(idiot.stepInDirection(idiot.route.direction), SPEED);
            }
            idiot.eat();
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
            default : break;
        }
        idiot.health -= HEALTH_LOSS;
        idiotMap[prevY][prevX] = SPACE;
        idiotMap[currY][currX] = IDIOT;
        idiot.map = idiotMap;
        idiot.position.x = currX;
        idiot.position.y = currY;
        //console.log("MOVED! Health = " + idiot.health); //---------------------------------------------------------------
        updateMap(idiot.map, direction, [prevX, prevY]);
        console.log("Number of steps: " + (++stepsNumber)); //------------------------------------------------------------
    };

    idiot.eat = function() {
        idiot.health += HEALTH_GAIN;
        //console.log("ATE! Health = " + idiot.health); //---------------------------------------------------------------
    };

    idiot.die = function() {
        var idiotMap = idiot.map,
            x = parseInt(idiot.position.x),
            y = parseInt(idiot.position.y);
        idiotMap[y][x] = DEAD;
        //console.log("IDIOT IS DEAD!"); //------------------------------------------------------------------------------
        updateMap(idiot.map, null, [x, y]);
        clearTimeout(lifecycle);
    };

    idiot.findPlant = function() {
        idiot.wallInDirection = {
            1: false,
            2: false,
            3: false,
            4: false
        };
        for (var radius = 1; radius <= idiot.radius; radius++) {
            for (var direction = 1; direction <= DIRECTIONS_NUMBER; direction++) {
                if (idiot.wallInDirection[direction]) {
                    continue;
                } else {
                    switch (idiot.lookInDirection(direction, radius)) {
                        case WALL:
                            idiot.wallInDirection[direction] = true;
                            break;
                        case PLANT:
                            return idiot.route = {
                                direction: direction,
                                radius: radius
                            };
                            break;
                        case SPACE:
                            break;
                        default : break;
                    }
                }
            }
        }

        return idiot.route = {
            direction: false
        }
    };

    function findPosition() {
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
    }

    function chooseDirection() {

        return Math.floor((Math.random() * DIRECTIONS_NUMBER) + 1);
    }
}
