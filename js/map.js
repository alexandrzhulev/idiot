/**
 * Map of world for idiot app
 *
 * use
 * # - WALL
 * * - PLANT
 * O - IDIOT
 * (space) - SPACE
 *
 */

var testMap =  ["############################",
                "#####                 ######",
                "##   ***                **##",
                "#   *##**         **  *  *##",
                "#    ***     O    ##**    *#",
                "#       *         ##***    #",
                "#                 ##**     #",
                "#   *       #*             #",
                "#*          #**       *    #",
                "#***        ##**    *    **#",
                "##****     ###***       *###",
                "############################"];

var testMap1 = ["##########",
                "##O    ###",
                "# *    *##",
                "#     * *#",
                "# *   ** #",
                "#     *  #",
                "#  #*    #",
                "#* #** * #",
                "#* ##*  *#",
                "##########"];

/**
 * Map Constants
 */

var IDIOT = 0;
var WALL = 1;
var SPACE = 2;
var PLANT = 3;
var DEAD = 4;

var SCALE = 10; //-------------------------------------------------------------------------------------------------------
var CELL_SIZE = 35;

var STYLES = [
    "idiot",
    "wall",
    "space",
    "plant",
    "dead"
];


function renderMap(map) {

    var idiotMap = [];
    for (var key in map) {
        var mapArr = map[key].split("");
        for (var i in mapArr) {
            switch (mapArr[i]) {
                case "#": mapArr[i] = WALL;
                    break;
                case "*": mapArr[i] = PLANT;
                    break;
                case " ": mapArr[i] = SPACE;
                    break;
                case "O": mapArr[i] = IDIOT;
                    break;
            }
        }
        idiotMap.push(mapArr);
    }

    return idiotMap;
}


function viewMap(map) {

    var world = document.getElementById("world");
    var element;
    for (var row in map) {
        for (var cell in map[row]) {
            var top = row * CELL_SIZE;
            var left = cell * CELL_SIZE;
            element = document.createElement("div");
            element.setAttribute("class", STYLES[map[row][cell]]);
            element.setAttribute("style", "top: " + top + "px; left: " + left + "px");
            world.appendChild(element);
        }
    }
}

function updateMap(map, direction, prevIdiotPosition) {

    var length = map.length;
    var worldElements = document.getElementById("world");
    var cells = worldElements.getElementsByTagName("div");
    var prevX = prevIdiotPosition[0];
    var prevY = prevIdiotPosition[1];
    var prevPos = length * prevY + prevX;
    var currPosition = 0;

    if (direction == null) {
        cells[prevPos].setAttribute("class", STYLES[DEAD]);

        return;
    }

    cells[prevPos].setAttribute("class", STYLES[SPACE]);
    switch (direction) {
        case UP_DIRECTION:
            currPosition = prevPos - length;
            break;
        case RIGHT_DIRECTION:
            currPosition = prevPos + 1;
            break;
        case DOWN_DIRECTION:
            currPosition = prevPos + length;
            break;
        case LEFT_DIRECTION:
            currPosition = prevPos - 1;
            break;
    }

    cells[currPosition].setAttribute("class", STYLES[IDIOT]);
}
