var jsonfile = require('jsonfile')
var request = require("request")
var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=406"//change to 3918 after testing
var savedBusesDue = [];
var tempBusesDue = [];
createSaveFile();

var requestLoop = setInterval(function(){
request({
    url: url,
    json: true
}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
	    jsonfile.writeFile('busSave3918.json',body);
        console.log("Writing full 3918 real time data to file ") 
        newTempDue(body);
    }
    else{
	console.log("Something went wrong")
	}
});
},10000);


function newTempDue(newRealTimeData){
	tempBusesDue = [];
	for(var i = 0 ; i<newRealTimeData.numberofresults; i++){
		var bus = newRealTimeData.results[i];
		if(bus.duetime=="Due"){
			tempBusesDue.push(bus);
			console.log(bus.route);

		}
	}
	isBusGone();
	isNewBus();
	savedBusesDue = tempBusesDue;
}

function isNewBus(){
	for(var i=0;i<tempBusesDue.length;i++){
		if(!isInList(tempBusesDue[i],savedBusesDue)){
			console.log("New bus, dunno if we need to know this")
			console.log(tempBusesDue[i])		
		}
	}
}

function isBusGone(){
	for(var i=0;i<savedBusesDue.length;i++){
		if(!isInList(savedBusesDue[i],tempBusesDue)){
			console.log(savedBusesDue[i])
			saveBus(savedBusesDue[i]);	
		}
	}
}

function isInList(bus,listOfBuses){
	for(var i=0;i<listOfBuses.length;i++){
		if(bus.scheduledarrivaldatetime==listOfBuses[i].scheduledarrivaldatetime){
			return true;
		}
	}
	return false;
}

function saveBus(bus){
	console.log("Bus arrived at stop and saved");
	var jsonInfo = require('./ExampleStopSavesDay');
	var valuesToSave = {sch:bus.scheduledarrivaldatetime,act:bus.arrivaldatetime};
	jsonInfo.routes[0].buses[jsonInfo.routes[0].buses.length] = valuesToSave;

	jsonfile.writeFile('ExampleStopSavesDay.json',jsonInfo,function(err){
		console.log("Saving the bus time");
	})
}

function createSaveFile(){
    var routes = [{"routeid":"66","numberofbuses":"0","buses":[]}]; //todo : write function that populates the routes
    var stopSaveInfo = {"timestamp":"","stopid":"3918","numberofroutes":"1","routes":routes};
	jsonfile.writeFile('ExampleStopSavesDay.json',stopSaveInfo,function(err){
		console.log("Initilising the save file for this stop");
	})
}