var requestAPI = require("request");
var admin = require("firebase-admin");
var serviceAccount = require("./softwareproject-e4114-firebase-adminsdk-f1lpm-aaac181e62.json");
var stopInfoURLTemplate = "https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?stopid=";
var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=406";//change to 3918 after testing

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://softwareproject-e4114.firebaseio.com"
});

var database = admin.database();
var ref = admin.database().ref();

module.exports = {
    saveStopRealtime: function(toSaveData,dataid){
        var realtime = database.ref('realtime');
        var stopname = "stop"+dataid;
        realtime.child(stopname).set(toSaveData);
    },    
    saveStopOldtime: function(toSaveDataKey,toSaveBusAct,toSaveBusRoute,dataid){
        var oldtime = database.ref('oldtime');
        var stopname = "stop"+dataid;
        var dateString = makeDateString();
        var daysave = oldtime.child(dateString);
        var daystopsave = daysave.child(stopname);
        var daystoproutesave = daystopsave.child(toSaveBusRoute);
        var schedArrivalKey = toSaveDataKey.substr(11,8);
        var daystopsavebus = daystoproutesave.child(schedArrivalKey);
        var actArrivalData = toSaveBusAct.substr(11,8);
        if(toSaveBusAct.charAt(0)==9){
            daystopsavebus.set("MISSING");
        }
        else{daystopsavebus.set(actArrivalData);}
    },
    checkStopInfo: function(stopid){
        ref.once('value')
        .then(function(snapshot){
            var stopinformationcur = snapshot.child("stopinformation").val();
            console.log(stopid);
            console.log(stopinformationcur[stopid]);
            if(stopinformationcur[stopid]==null){
                var stopInfoURL = stopInfoURLTemplate+stopid;
                requestAPI({
                    url: stopInfoURL,
                    json: true
                }, function(errorAPI, responseAPI, bodyAPI) {
                    if (!errorAPI && responseAPI.statusCode === 200 && bodyAPI.errorcode==="0") {
                        database.ref('stopinformation').child(stopid).set(bodyAPI.results[0]);
                        console.log("null");
                    }
                    else{
                        console.log("Something went wrong")
                    }
                });
            }
            else{
                console.log("The stop information has been downloaded already");
            }
            //stopfinderHeader.innerHTML = "Select a Stop";
            //routeGlobal.style.visibility = "visible";
            //stopfindMainDiv.style.visibility = "visible";
        });
    }
};

function makeDateString(){
	var date = new Date();
    var month = date.getMonth()+1;//because month is 0 to 11, consistency...
	if(month<10){
		month = "0"+month;
	}
	var day = date.getDate();
	if(day<10){
		day = "0"+day;
	}
	var dateString = "date"+date.getFullYear()+month+day;
	return(dateString);
}