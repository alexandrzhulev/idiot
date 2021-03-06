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

var SPEED = 500;

var RADIUS = 7;
var STEP_WIDTH = 1;

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
    idiot.wallInOneStepDirection = {};
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
        var direction = 0;
        if (!idiot.health) {
            idiot.die();
            return;
        }
        idiot.findPlant();
        if (idiot.route.direction == false) {
            direction = chooseRandomDirection();
        } else {
            direction = idiot.route.direction;
        }
        switch (idiot.lookInDirection(direction, STEP_WIDTH)) {
            case WALL: break;
            case PLANT:
                idiot.stepInDirection(direction);
                idiot.eat();
                break;
            case SPACE:
                idiot.stepInDirection(direction);
                break;
            default : break;
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
        updateMap(idiot.map, direction, [prevX, prevY]);
        console.log("Number of steps: " + (++stepsNumber)); //------------------------------------------------------------
    };

    idiot.eat = function() {
        //idiot.health += HEALTH_GAIN;
        idiot.health = 20;
    };

    idiot.die = function() {
        var idiotMap = idiot.map,
            x = parseInt(idiot.position.x),
            y = parseInt(idiot.position.y);
        idiotMap[y][x] = DEAD;
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
                            idiot.wallInDirection = {
                                1: false,
                                2: false,
                                3: false,
                                4: false
                            };
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

        idiot.wallInOneStepDirection = {
            1: false,
            2: false,
            3: false,
            4: false
        };
        for (var wallDirection = 1; wallDirection <= DIRECTIONS_NUMBER; wallDirection++) {
            if (idiot.wallInOneStepDirection[wallDirection]) {
                continue;
            } else {
                idiot.wallInOneStepDirection[wallDirection] = (idiot.lookInDirection(wallDirection, STEP_WIDTH) == WALL);
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

    function chooseRandomDirection() {
        var directions = [];
        for (var direction in idiot.wallInOneStepDirection) {
            if (idiot.wallInOneStepDirection[direction] == false) {
                directions.push(direction);
            }
        }
        idiot.wallInOneStepDirection = {
            1: false,
            2: false,
            3: false,
            4: false
        };
        var path = directions[Math.floor(Math.random()*directions.length)];

        return parseInt(path);
    }
}
