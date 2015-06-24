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

var IDIOT = 0;
var WALL = 1;
var SPACE = 2;
var PLANT = 3;
var DEAD = 4;


var SCALE = 10;
var CELL_SIZE = 35;


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
    var wall,
        idiot,
        space,
        plant;
    for (var row in map) {
        for (var cell in map[row]) {
            var top = row * CELL_SIZE;
            var left = cell * CELL_SIZE;
            switch (map[row][cell]) {
                case WALL:
                    wall  = document.createElement("div");
                    wall.setAttribute("class", "wall");
                    wall.setAttribute("style", "top: " + top + "px; left: " + left + "px");
                    world.appendChild(wall);
                    break;
                case IDIOT:
                    idiot = document.createElement("div");
                    idiot.setAttribute("class", "idiot");
                    idiot.setAttribute("style", "top: " + top + "px; left: " + left + "px");
                    world.appendChild(idiot);
                    break;
                case PLANT:
                    plant = document.createElement("div");
                    plant.setAttribute("class", "plant");
                    plant.setAttribute("style", "top: " + top + "px; left: " + left + "px");
                    world.appendChild(plant);
                    break;
                case SPACE:
                    space = document.createElement("div");
                    space.setAttribute("class", "space");
                    space.setAttribute("style", "top: " + top + "px; left: " + left + "px");
                    world.appendChild(space);
                    break;
            }
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

    if (direction == null) {
        cells[prevPos].setAttribute("class", "dead");
        return;
    }

    cells[prevPos].setAttribute("class", "space");
    var value = 0;
    switch (direction) {
        case UP_DIRECTION:
            //--------------------------------------------------------------------------------------
            value = prevPos-length;
            cells[prevPos-length].setAttribute("class", "idiot");
            break;
        case RIGHT_DIRECTION:
            cells[prevPos + 1].setAttribute("class", "idiot");
            break;
        case DOWN_DIRECTION:
            cells[prevPos + length].setAttribute("class", "idiot");
            break;
        case LEFT_DIRECTION:
            cells[prevPos - 1].setAttribute("class", "idiot");
            break;
    }

    cells[value].setAttribute("class", "idiot");
}
