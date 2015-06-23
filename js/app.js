
var idiotMap = render(testMap1);


var idiot = new Idiot(idiotMap);


console.log("positionX " + idiot.positionX);

console.log("positionY " + idiot.positionY);


//console.log();


//console.log(idiot.getElement([2,2]));
//console.log(idiot.lookInDirection(2));

//setInterval(function(){ idiot.move(); }, 3000);
 idiot.move();
