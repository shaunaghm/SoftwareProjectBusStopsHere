	    //jsonfile.writeFile('busSave3918.json',body);

        //response.send(busData.errorcode);
        //response.sendFile('/public/index.html');


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

/*

function gotData(data){
  //console.log(data.val());
  var scores = dat a.val();
  var keys = Object.keys(scores);
  console.log(keys);
  for(var i=0;i<keys.length;i++){
    var k = keys[i];
    var initials = scores[k].name;
    var stuff = scores[k].stuff;
    console.log(initials,stuff);
  }
}*/

/*
function saveStopData(stopid) {
    console.log(stopid);
            requestAPI({
                url: url,
                json: true
            }, function(errorAPI, responseAPI, bodyAPI) {
                if (!errorAPI && responseAPI.statusCode === 200) {
                    //jsonfile.writeFile('busSave3918.json',body);
                    busData = bodyAPI;
                    myFirebaseTest.saveTest(busData);

                    console.log(bodyAPI);
                    //response.send(busData.errorcode);
                    //response.sendFile('/public/index.html');
                }
                else{
                    console.log("Something went wrong")
                }
            });*/
/*
}

app.use(express.bodyParser());
app.post('/', function(req, res) {
    console.log(req.body);
    res.send(200);
});

app.get('/index',homepage);

function homepage(request,response){
    response.sendFile('/home/team1/SoftwareProjectServer/public/homepage.html');
}*!/
*/


//createSaveFile();

//var jsonInfo = require('./ExampleStopSavesDay.json');



//ref.push(data);


/*
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
*/


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
var data = {
	name: "sdgfsdfsdfsdf",
	stuff: "twetwetrwrw"
};


*/
/*

function createSaveFile(){
    var routes = [{"routeid":"66","numberofbuses":"0","buses":[]}]; //todo : write function that populates the routes
    var stopSaveInfo = {"timestamp":"","stopid":"3918","numberofroutes":"1","routes":routes};
	jsonfile.writeFile('ExampleStopSavesDay.json',stopSaveInfo,function(err){
		console.log("Initilising the save file for this stop");
	})
}
*/

