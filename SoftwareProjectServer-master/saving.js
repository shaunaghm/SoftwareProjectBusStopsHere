var requestAPI = require("request");
var bodyParser = require('body-parser');
var firebaseTools = require("./firebaseTools.js");
var realtimeURL = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=";
var saved = {}; //= {404:{nextbusdue:60,BusesDue[]},3819:{nextbusdue:60,BusesDue[]}};
var stops =[];

module.exports = {  
    setStopsToSave: function(){
        stops = [404,317,3917,3981,3026];
        for(var i=0;i<stops.length;i++){
        	var stopid = stops[i];
        	saved[stopid]={savedBusesDue:[]};
            setTimeout(timerFunction,10,stops[i]);
        }
    },
    forceSaveStop: function(stopid){
        updateStopData(stopid,function(){
        	console.log("forceUpdate");
        });
    }
};

function timerRefresh(stopid){//1000ms = 1s
	var interval = 60;//start with minute as default
	var nextbus = saved[stopid].nextbusdue;
	if(nextbus=="-1"){interval = 20*60;}//20 minutes if there is no bus detected
	else if(nextbus==null){interval = 1*30;}//check in 30s if something goes wrong or server start
	else if(nextbus=="Due"){interval = 30;}//30 seconds if bus is close
	else{
	   var nextbustime = (parseFloat(nextbus))*60;//convert to seconds
	   interval = nextbustime/4;
	}
	if(interval<30){
		interval = 30;
	}
	else if(interval>(60*60)){
		interval = 60*60;
	}
    console.log("Next bus due in "+nextbus+" minutes. Next refresh for stop "+stopid+" in "+interval/60+" minutes");//log the interval in second
	interval*=1000;//work in s not ms
	return(interval);
    
}

function timerFunction(stopid,interval){
	updateStopData(stopid,function(){
        interval=timerRefresh(stopid);
	    setTimeout(timerFunction,interval,stopid);
	});
}

function updateStopData(stopid,callback){
    requestURL = realtimeURL+stopid;
    requestAPI({
        url: requestURL,
        json: true
    }, function(errorAPI, responseAPI, bodyAPI) {
    if (!errorAPI && responseAPI.statusCode === 200) {
        firebaseTools.saveStopRealtime(bodyAPI,stopid);
        if(stops.indexOf(stopid)!=-1){
          checkNewBusesDue(bodyAPI,stopid);
          if(bodyAPI.errorcode==="0"){saved[stopid].nextbusdue = bodyAPI.results[0].duetime;}
          else{saved[stopid].nextbusdue="0";}
          if(bodyAPI.errorcode==="1"){saved[stopid].nextbusdue="-1";}//returns the duetime for the first bus
        }else{console.log(stopid+" updated manual but not set to be saved in database yet");}
    }
    else{
        console.log("Something went wrong")
    }
    });
    callback();
}

function errData(err){
    console.log("ERROR");
    console.log(err);
}

function checkNewBusesDue(newRealTimeData,stopid){
    var tempBusesDue = [];
    var tempBusRoutesdue = [];
    for(var i = 0 ; i<newRealTimeData.numberofresults; i++){
        var bus = newRealTimeData.results[i];
        //if(bus.duetime==="Due"||bus.duetime==="1"||bus.duetime==="2"||bus.duetime==="3"||bus.duetime==="4"){
            tempBusesDue.push(bus);
            tempBusRoutesdue.push(bus.route);
        //}
    }
    console.log("Stop "+stopid+" tracking ");
    console.log("Buses due : "+tempBusRoutesdue+"");
    isBusGone(tempBusesDue,stopid);
    isNewBus(tempBusesDue,stopid);
    saved[stopid].savedBusesDue = tempBusesDue;
}
function isNewBus(tempBusesDue,stopid){
    for(var i=0;i<tempBusesDue.length;i++){
        if(!isInList(tempBusesDue[i],saved[stopid].savedBusesDue)){
            console.log("Stop "+stopid+" :New "+tempBusesDue[i].route);
        }
    }
}

function isBusGone(tempBusesDue,stopid){
	if(saved[stopid].savedBusesDue==null){}
	var savedBuses = saved[stopid].savedBusesDue;
    for(var i=0;i<savedBuses.length;i++){
        if(!isInList(savedBuses[i],tempBusesDue)){
            console.log("The "+savedBuses[i].route+" has passed");
            saveBus(savedBuses[i],stopid);  
        }
    }
}

function isInList(bus,listOfBuses){
    for(var i=0;i<listOfBuses.length;i++){
        if(bus.scheduledarrivaldatetime===listOfBuses[i].scheduledarrivaldatetime){
            return true;
        }
    }
    return false;
}

function saveBus(bus,stopid){
    console.log("Bus arrived at stop and saved");
    var savekey = bus.scheduledarrivaldatetime;
    var busArrivalTime = bus.arrivaldatetime;
    var busRoute = bus.route;
    //console.log(bus);
    if(bus.duetime==="Due"|| bus.duetime==="1"||bus.duetime==="2"){
        console.log("OK");
        firebaseTools.saveStopOldtime(savekey,busArrivalTime,busRoute,stopid);
    }else{
        console.log("MISSING : "+ bus.duetime);
        firebaseTools.saveStopOldtime(savekey,"99:99:99",busRoute,stopid);//Don't save time if it dissapears too soon
    }
}


function printDate(dateString){//----16/03/2018 09:23:01
    var datearr = {year:"",month:"",day:"",hour:"",minute:"",second:""};
    datearr.day = dateString.substr(0,2);
    datearr.month = dateString.substr(3,2);
    datearr.year = dateString.substr(6,4);
    datearr.hour = dateString.substr(11,2);
    datearr.minute = dateString.substr(14,2);
    datearr.second = dateString.substr(17,2);
    return(datearr)//[year,month,day,hour,minute,second]
}
