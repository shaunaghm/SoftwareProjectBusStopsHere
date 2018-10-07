var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=";
var data;
var stopid;
var favouriteStopTitle;

(function() {
console.log("HERE");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDAtxW4gA1iQ2k2QMHTaNd-EaJE8dcGXJg",
  authDomain: "softwareproject-e4114.firebaseapp.com",
  databaseURL: "https://softwareproject-e4114.firebaseio.com",
  projectId: "softwareproject-e4114",
  storageBucket: "softwareproject-e4114.appspot.com",
  messagingSenderId: "549994885429"
  };

  favouriteStopTitle = document.getElementById("favouriteStopTitle");
  firebase.initializeApp(config);
  var ref = firebase.database().ref();

  ref.once("value",function(snapshot){
    data = snapshot.val();
    console.log("data loaded");
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        var userid = firebaseUser.uid;
        stopid = data.users[userid].favouriteStop;//firebase.database().ref('users/'+firebaseUser.uid).favouriteStop;
        favouriteStopTitle.innerHTML = "Times for your favourite stop : "+stopid;
        displayTimes();
      } else{
        favouriteStopTitle.innerHTML = "Please sign up or log in to see favourite stops";
        //stopid = 404; //Setting default stopid Todo redirect to signin/up
      }
    });
  //console.log(data);    
    if(stopid==null){
      favouriteStopTitle.innerHTML = "Loading...";
    }
  },function(error){
    console.error(error);
  });
}());

function emptyOptions(table){
    while(table.rows.length>1){
        table.deleteRow(1);
    }
}

function displayTimes(){
  console.log(data.oldtime);
  var timeTable = document.getElementById("times-table");
  emptyOptions(timeTable);
  var stopdata = data.realtime;
  var key = "stop"+stopid;
  console.log(key);
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
        currentCell.innerHTML = getPastTime(busesToStop[i],key,1);
        currentCell = newRow.insertCell(4);
        currentCell.innerHTML = getPastTime(busesToStop[i],key,3);//CHANGE TO 7 when data is better
        currentCell = newRow.insertCell(5);
        currentCell.innerHTML = (busesToStop[i].scheduleddeparturedatetime).substr(11,5);
    }
  }
}


function getPastTime(todaybus,stopkey,daysAgo) {
  var todaySched = todaybus.scheduleddeparturedatetime;
  var todayRoute = todaybus.route;
  var olddata = data.oldtime;
  var newMin;
  var todayTime = todaySched.substr(11,8);
  var date = makePastDateString(daysAgo);
  console.log(date);
  if((date in olddata)&&(stopkey in olddata[date])&&(todayRoute in olddata[date][stopkey])){
    var arrivedYesterday = ((olddata[date][stopkey][todayRoute][todayTime])+"").substr(0,5);//Line checks date for bus and returns the time it arrived
    //console.log(todayTime);
    if(arrivedYesterday=="undef"){//To do : refractor this whole thing into a method
      var todayTimeNoMin = todayTime.substr(0,3);
      newMin = parseInt(todayTime.substr(3,4))+1;
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


