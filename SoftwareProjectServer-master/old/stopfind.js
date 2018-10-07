var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=";
var data

var routeGlobal
var stopGlobal
var directionGlobal

(function() {

// Initialize Firebase
  var config = {
  apiKey: "AIzaSyDAtxW4gA1iQ2k2QMHTaNd-EaJE8dcGXJg",
  authDomain: "softwareproject-e4114.firebaseapp.com",
  databaseURL: "https://softwareproject-e4114.firebaseio.com",
  projectId: "softwareproject-e4114",
  storageBucket: "softwareproject-e4114.appspot.com",
  messagingSenderId: "549994885429"
  };
firebase.initializeApp(config);
}());

  var ref = firebase.database().ref();

  ref.on("value",function(snapshot){
  data = snapshot.val();
  document.getElementById("SelectRoute").style.visibility = "visible";

    //var keys = Object.keys(snapshot.val().routes);
    //console.log(keys);
    //console.log(snapshot.val().stop404.date20180228.numberofroutes);
    //console.log(JSON.stringify(snapshot.val(),null,2));
  });

function emptyOptions(menu){
    while(menu.length>1){
        menu.remove(1);
    }
}

function resetForm(){
   var routeSelector = document.getElementById("SelectRoute");
   routeSelector.value = 0;
}

function selectRoute(){
  var routeSelectValue = document.getElementById("SelectRoute").value;
  var directionSelect = document.getElementById("SelectDirection");
  directionSelect.style.visibility = "visible";
  emptyOptions(directionSelect);
  if(routeSelectValue!='-'){
    var directions = data.routes[routeSelectValue];
    for(var i = 0 ;i<directions.length;i++){
      var opt = directions[i];
      var el = document.createElement("option");
      el.textContent = opt.direction;
      el.value = ""+i;
      directionSelect.appendChild(el);
    }
  }
}

function selectDirection() {
  var routeSelectValue = document.getElementById("SelectRoute").value;
  var directionSelectValue = document.getElementById("SelectDirection").value;
  var stopSelect = document.getElementById("SelectStop");
  stopSelect.style.visibility = "visible";
  emptyOptions(stopSelect);
  if(routeSelectValue!='-'){
    var stops = data.routes[routeSelectValue][directionSelectValue].stops;
    for(var i = 0 ;i<stops.length;i++){
      var opt = stops[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      stopSelect.appendChild(el);
    }
  }
  routeGlobal = routeSelectValue;
  stopGlobal = stopSelect;
  directionGlobal = directionSelectValue;


}

function selectStop(){
  var stopSelectValue = document.getElementById("SelectStop").value;
  newurl = '/timetable/'+stopSelectValue;
  console.log("redirecting to "+newurl);
  window.location.href = newurl;
}

