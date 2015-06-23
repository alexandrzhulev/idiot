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
