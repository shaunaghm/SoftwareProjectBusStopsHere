var jsonfile = require('jsonfile');
var request = require("request");
var admin = require("firebase-admin");
var serviceAccount = require("./softwareproject-e4114-firebase-adminsdk-f1lpm-aaac181e62.json");
var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=406";//change to 3918 after testing
var savedBusesDue = [];
var tempBusesDue = [];
//createSaveFile();

/*var requestLoop = setInterval(function(){
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
},10000);*/


var jsonInfo = require('./ExampleStopSavesDay.json');

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://softwareproject-e4114.firebaseio.com"
});

var database = admin.database();

var ref = database.ref('stop404');
var data = {
	name: "sdgfsdfsdfsdf",
	stuff: "twetwetrwrw"
}
//ref.push(data);
ref.child("date20180228").set(jsonInfo);


ref.on('value', gotData, errData);

function gotData(data){
	//console.log(data.val());
	var scores = data.val();
	var keys = Object.keys(scores);
	console.log(keys);
	for(var i=0;i<keys.length;i++){
		var k = keys[i];
		var initials = scores[k].name;
		var stuff = scores[k].stuff;
		console.log(initials,stuff);
	}
}

function errData(err){
	console.log("ERROR");
	console.log(err);
}


/*
function newTempDue(newRealTimeData){
	tempBusesDue = [];
	for(var i = 0 ; i<newRealTimeData.numberofresults; i++){
		var bus = newRealTimeData.results[i];
		if(bus.duetime==="Due"||bus.duetime==="1"){
			tempBusesDue.push(bus);
			console.log(bus.route);

		}
	}
	isBusGone();
	isNewBus();
	savedBusesDue = tempBusesDue;
}*/
/*
function isNewBus(){
	for(var i=0;i<tempBusesDue.length;i++){
		if(!isInList(tempBusesDue[i],savedBusesDue)){
			console.log("New bus, dunno if we need to know this")
			console.log(tempBusesDue[i])		
		}
	}
}*/
/*
function isBusGone(){
	for(var i=0;i<savedBusesDue.length;i++){
		if(!isInList(savedBusesDue[i],tempBusesDue)){
			console.log(savedBusesDue[i])
			saveBus(savedBusesDue[i]);	
		}
	}
}*/

/*function isInList(bus,listOfBuses){
	for(var i=0;i<listOfBuses.length;i++){
		if(bus.scheduledarrivaldatetime===listOfBuses[i].scheduledarrivaldatetime){
			return true;
		}
	}
	return false;
}*/
/*
function saveBus(bus){
	console.log("Bus arrived at stop and saved");
	var jsonInfo = require('./stop3918_26_02_2018');
	var valuesToSave = {sch:bus.scheduledarrivaldatetime,act:bus.arrivaldatetime};
	jsonInfo.routes[0].buses[jsonInfo.routes[0].buses.length] = valuesToSave;

	jsonfile.writeFile('ExampleStopSavesDay.json',jsonInfo,function(err){
		console.log("Saving the bus time");
	})
}*/


/*

function createSaveFile(){
    var routes = [{"routeid":"66","numberofbuses":"0","buses":[]}]; //todo : write function that populates the routes
    var stopSaveInfo = {"timestamp":"","stopid":"3918","numberofroutes":"1","routes":routes};
	jsonfile.writeFile('ExampleStopSavesDay.json',stopSaveInfo,function(err){
		console.log("Initilising the save file for this stop");
	})
}
*/
