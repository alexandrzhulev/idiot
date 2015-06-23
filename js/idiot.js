/**
 * Idiot object
 *
 * @param map
 * @constructor
 * @param x
 * @param y
 */

function Idiot(map){

    /**
     * Idiot properties
     */
    this.map = map;

    this.position = function() {
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

    // position x, y




    /**
     * Move Idiot method
     */
    this.move = function(){

    };


    /**
     * Eat Idiot method
     */
    this.eat = function(){

    };

    /**
     * Die Idiot method
     */
    this.die = function(){

    };




}