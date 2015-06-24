var idiotMap = renderMap(testMap1);

var idiot = new Idiot(idiotMap);

viewMap(idiotMap);

//setInterval(function(){ idiot.move(); }, 3000);

idiot.run();
