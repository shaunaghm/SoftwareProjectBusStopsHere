
/*
function setStopsToSave(){
    var stops = [404];
    for(var i=0;i<stops.length;i++){
        updatingLoop(stops[i]);
    }
}

function updatingLoop(stopid){
    var requestLoop = setInterval(function(){
        updateStopData(stopid);
    },60000);
}

function updateStopData(stopid){
    requestURL = realtimeURL+stopid;
    requestAPI({
        url: requestURL,
        json: true
    }, function(errorAPI, responseAPI, bodyAPI) {
    if (!errorAPI && responseAPI.statusCode === 200) {
        busData = bodyAPI;
        firebaseTools.saveStopRealtime(busData,stopid);
        newTempDue(busData);
        //saveStopOldtime(busData,stopid);
        //printDate(busData.timestamp);
        //console.log(bodyAPI);
    }
    else{
        console.log("Something went wrong")
    }
    });
}

function printDate(dateString){//----16/03/2018 09:23:01
    var datearr = {year:"",month:"",day:"",hour:"",minute:"",second:""};
    datearr.day = dateString.substr(0,2);
    datearr.month = dateString.substr(3,2);
    datearr.year = dateString.substr(6,4);
    datearr.hour = dateString.substr(11,2);
    datearr.minute = dateString.substr(14,2);
    datearr.second = dateString.substr(17,2);
    //console.log(datearr);
    return(datearr)//[year,month,day,hour,minute,second]
}



function errData(err){
    console.log("ERROR");
    console.log(err);
}

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
        if(bus.scheduledarrivaldatetime===listOfBuses[i].scheduledarrivaldatetime){
            return true;
        }
    }
    return false;
}

function saveBus(bus){
    console.log("Bus arrived at stop and saved");
    var valuesToSave = {sch:bus.scheduledarrivaldatetime,act:bus.arrivaldatetime};
    //jsonInfo.routes[0].buses[jsonInfo.routes[0].buses.length] = valuesToSave;
    firebaseTools.saveStopOldtime(valuesToSave,"Teststopid");
}*/