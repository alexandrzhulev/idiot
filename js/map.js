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


function render(map) {
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


function view(map) {
    var world = document.getElementById("world");

    var wall  = document.createElement("div");
    var idiot = document.createElement("div");
    var space = document.createElement("div");
    var plant = document.createElement("div");
    wall.setAttribute("class", "wall");
    idiot.setAttribute("class", "idiot");
    space.setAttribute("class", "space");
    plant.setAttribute("class", "plant");

    world.appendChild(wall );
    world.appendChild(idiot);
    world.appendChild(space);



    for (var row in map) {
        for (var cell in map[row]) {
            switch (map[row][cell]) {
                case WALL:
                    wall.setAttribute("style", "top: " + row + "px; botom: " + cell + "px");
                    world.appendChild(wall);
                    break;
                case IDIOT:
                    world.appendChild(idiot);
                    break;
                case PLANT:
                    world.appendChild(space);
                    break;
                case SPACE:
                    world.appendChild(plant);
                    break;
            }
        }
    }
}
