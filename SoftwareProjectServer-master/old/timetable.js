var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=";
var data;
var stopid;

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
  getStopNumber();
  firebase.initializeApp(config);
  var ref = firebase.database().ref();
  ref.on("value",function(snapshot){
    data = snapshot.val();
  //console.log(data);
    displayTimes();
  });
/*const addFavouriteButton = document.getElementById("addFavouriteButton");
  addFavouriteButton.addEventListener('click',e=>{

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
          console.log(firebaseUser);
          var database = firebase.database().ref('users/'+firebaseUser.uid).set({
          favouriteStop: stopid
        });
      } else{
        console.log("not logged in");
      }
    });
  });  */

}());

function emptyOptions(table){
    while(table.rows.length>1){
        table.deleteRow(1);
    }
}

function displayTimes(){
  var timeTable = document.getElementById("times-table");
  emptyOptions(timeTable);
  var stopdata = data.realtime;
  var key = "stop"+stopid;
  if(stopdata[key].errorcode=="0"){
    var busesToStop = stopdata[key].results;
    for(var i = 0 ; i<busesToStop.length;i++) {
        var newRow = timeTable.insertRow(-1);
        var currentCell = newRow.insertCell(0);
        currentCell.innerHTML = busesToStop[i].route;
        currentCell = newRow.insertCell(1);
        currentCell.innerHTML = busesToStop[i].departureduetime;
        currentCell = newRow.insertCell(2);
        currentCell.innerHTML = (busesToStop[i].departuredatetime).substr(11,5);
        currentCell = newRow.insertCell(3);
        currentCell.innerHTML = getPastTime(busesToStop[i],key,1);//change to 1 later
        currentCell = newRow.insertCell(4);
        currentCell.innerHTML = getPastTime(busesToStop[i],key,7);//CHANGE TO 7 when data is better
        currentCell = newRow.insertCell(5);
        currentCell.innerHTML = (busesToStop[i].scheduleddeparturedatetime).substr(11,5);
    }
  }
}


function getPastTime(todaybus,stopkey,daysAgo) {
  var todaySched = todaybus.scheduleddeparturedatetime;
  var todayRoute = todaybus.route;
  var olddata = data.oldtime;
  var todayTime = todaySched.substr(11,8);
  var date = makePastDateString(daysAgo);
  if((date in olddata)&&(stopkey in olddata[date])&&(todayRoute in olddata[date][stopkey])){
    var arrivedYesterday = ((olddata[date][stopkey][todayRoute][todayTime])+"").substr(0,5);//Line checks date for bus and returns the time it arrived
    if(arrivedYesterday=="undef"){//To do : refractor this whole thing into a method
      var todayTimeNoMin = todayTime.substr(0,3);
      var newMin = parseInt(todayTime.substr(3,4))+1;
      todayTime = todayTimeNoMin+newMin+":00";
      var arrivedYesterday = ((olddata[date][stopkey][todayRoute][todayTime])+"").substr(0,5);//Line checks date for bus and returns the time it arrived
    }
    if(arrivedYesterday=="undef"){
      newMin+=1;
      todayTime = todayTimeNoMin+newMin+":00";
      var arrivedYesterday = ((olddata[date][stopkey][todayRoute][todayTime])+"").substr(0,5);//Line checks date for bus and returns the time it arrived
    }
    if(arrivedYesterday=="undef"){
      newMin+=1;
      todayTime = todayTimeNoMin+newMin+":00";
      var arrivedYesterday = ((olddata[date][stopkey][todayRoute][todayTime])+"").substr(0,5);//Line checks date for bus and returns the time it arrived
    }
    if(arrivedYesterday=="undef"){
      newMin-=4;
      todayTime = todayTimeNoMin+newMin+":00";
      var arrivedYesterday = ((olddata[date][stopkey][todayRoute][todayTime])+"").substr(0,5);//Line checks date for bus and returns the time it arrived
    }
    if(arrivedYesterday=="undef"){
      newMin-=1;
      todayTime = todayTimeNoMin+newMin+":00";
      var arrivedYesterday = ((olddata[date][stopkey][todayRoute][todayTime])+"").substr(0,5);//Line checks date for bus and returns the time it arrived
    }
    if(arrivedYesterday=="undef"){
      newMin-=1;
      todayTime = todayTimeNoMin+newMin+":00";
      var arrivedYesterday = ((olddata[date][stopkey][todayRoute][todayTime])+"").substr(0,5);//Line checks date for bus and returns the time it arrived
    }
    if(arrivedYesterday=="undef"){
      arrivedYesterday="No bus data";
    }
  }else{arrivedYesterday="No route data";}
  if(arrivedYesterday==="MISSI"){
    arrivedYesterday="MISSING";//Todo: Fix this so you don't need the hack
  }
  return(arrivedYesterday);
}


function makePastDateString(daysAgo){
  var date = new Date();
  date.setDate(date.getDate()-daysAgo);
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


function getStopNumber(){
  var urlIn = window.location.href;
  var searchString = "timetable/";
  var idlocation = urlIn.indexOf(searchString)+searchString.length;
  stopid = urlIn.substr(idlocation);
  //console.log(stopid);
}
