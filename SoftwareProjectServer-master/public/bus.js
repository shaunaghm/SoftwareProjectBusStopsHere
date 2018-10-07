var map;//map needs to be global to be accessed by a google callback... maybe
var userid;

(function() {//
    var accountnav = document.getElementById("accountnav");
    var loginnav = document.getElementById("loginnav");
    // Initialise Firebase
    var config = {
        apiKey: "AIzaSyDAtxW4gA1iQ2k2QMHTaNd-EaJE8dcGXJg",
        authDomain: "softwareproject-e4114.firebaseapp.com",
        databaseURL: "https://softwareproject-e4114.firebaseio.com",
        projectId: "softwareproject-e4114",
        storageBucket: "softwareproject-e4114.appspot.com",
        messagingSenderId: "549994885429"
    };
    firebase.initializeApp(config);
    //Check the page user is on
    var page = window.location.pathname;
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){//If there is a user signed in
            userid = firebaseUser.uid;
            if(page==='/') {
                window.location.href = "/me";
            }else if(page.indexOf("go/")!==-1){
              goFun();
            }else if(page==='/me'){
              meFun();
            }
            loginnav.style.display="inline";
            accountnav.style.display="none";
            loginnav.addEventListener('click',e=>{
                firebase.auth().signOut();
                loginnav.style.display="none";
                accountnav.style.display="inline";
            });
        }else{
            if(page.indexOf("go/")!==-1){
                window.location.href = "/account";
            }else if(page==='/me'){
              window.location.href = "/account";
            }
        loginnav.style.display="none";
        accountnav.style.display="inline";
        }
        if(page==='/account') {
            accountFun();
        }else if(page.indexOf("timetable/")!==-1) {
            timetableFun();
        }else if(page==='/stopfinder'){
            stopfinderFun();
        }
    });
    function accountFun() {
        var accounttitle = document.getElementById("account-title");

        var usernameinputsignup = document.getElementById("usernameinputsignup");
        var emailinputsignup = document.getElementById("emailinputsignup");
        var passwordinputsignup = document.getElementById("passwordinputsignup");
        var passwordinputsignup2 = document.getElementById("passwordinputsignup2");
        var signupMessage = document.getElementById("signupMessage");
        var buttonsignup = document.getElementById("buttonsignup");
    //
        var emailinputsignin = document.getElementById("emailinputsignin");
        var passwordinputsignin = document.getElementById("passwordinputsignin");
        var signinMessage = document.getElementById("signinMessage");
        var buttonsignin = document.getElementById("buttonsignin");
        var user = firebase.auth().currentUser;
        if(user){
            accounttitle.innerHTML = "You are signed in";
        } else{
            //console.log("not logged in");
        }
        buttonsignup.addEventListener('click',e=>{
            const usernamesignup = usernameinputsignup.value;
            const emailsignup = emailinputsignup.value;
            const passwordsignup = passwordinputsignup.value;
            const passwordsignup2 = passwordinputsignup2.value;
            if(usernamesignup===""||emailsignup===""||passwordsignup===""||passwordsignup2===""){
                signupError("Error: Fields are required");
            }else if(passwordsignup!==passwordsignup2){
                signupError("Error: Passwords must match");
            }else{
                firebase.auth().createUserWithEmailAndPassword(emailsignup,passwordsignup).then(function(user){
                    console.log(user.uid);
                    console.log(usernamesignup);
                    firebase.database().ref('users/'+user.uid).set({
                        username: usernamesignup,
                    }).then(function (){
                        window.location.href = "/me";//redirect away if signed in
                    });
                }).catch(function(error){
                    signupError(error.message);
                });
            }
        });
        buttonsignin.addEventListener('click',e=>{
            const emailsignin = emailinputsignin.value;
            const passwordsignin = passwordinputsignin.value;
            if(emailsignin===""||passwordsignin==="") {
                signinError("Error: Fields are required");
            }else {
                firebase.auth().signInWithEmailAndPassword(emailsignin, passwordsignin).then(function (user) {
                    window.location.href = "/me";//redirect away if signed in
                }).catch(function (error) {
                    signinError(error.message);
                    console.log(error.code);
                });
            }
        });
        function signupError(errorMessage) {
            signupMessage.style.visibility = "visible";
            signupMessage.innerHTML=errorMessage;
        }
        function signinError(errorMessage) {
            signinMessage.style.visibility = "visible";
            signinMessage.innerHTML=errorMessage;
        }
    }
    function meFun() {
        //card 1
        var favouriteStopTitle = document.getElementById("favouriteStopTitle");
        var journeycard = document.getElementById("journey-card");
        var ref = firebase.database().ref();
        var journeys;
        ref.once('value')
            .then(function(snapshot){
            //Populate Journeys
            usersdata = snapshot.child("users").val();
            userdata = usersdata[userid];
            favouriteStopTitle.innerHTML = "Welcome back "+userdata.username;
            journeys = userdata.journeys;
            refreshJourneyDiv();
            function refreshJourneyDiv() {
                if(!journeys){
                    journeys = [];
                }
                journeycard.innerHTML = "";
                for(var i=0;i<journeys.length;i++){
                    var journeydiv = document.createElement("div");
                    journeydiv.setAttribute("class","bus-card-seg");
                    journeydiv.innerHTML = journeys[i].title;
                    var gobutton = document.createElement('button');
                    gobutton.innerHTML = "GO";
                    journeydiv.appendChild(gobutton);
                    gobutton.setAttribute('class','btn btn-lg btn-sm');
                    gobutton.setAttribute('id','gobutton'+i);
                    gobutton.value = i;
                    //var dirtourl =  "/go/"+i;
                    gobutton.onclick = function () {
                        window.location.href = "/go/"+this.value;
                    };
                    //gobutton.setAttribute('class','gobutton');
                    journeycard.appendChild(journeydiv);
                }
                if(journeycard.innerHTML===""){
                    journeycard.innerHTML = "No journeys yet, try adding one!";
                }
            }
            //populate stops
            var stopscard = document.getElementById("stops-card");
            var stops = userdata.stops;
            stopscard.innerHTML = "";
            for (var i in stops) {
                var stopdiv = document.createElement("div");
                stopdiv.setAttribute("class","bus-card-seg");
                stopdiv.innerHTML = i+" : "+stops[i].title;
                if(stops[i].title!==undefined) {
                    var gobutton = document.createElement('button');
                    gobutton.innerHTML = "GO";
                    stopdiv.appendChild(gobutton);
                    gobutton.setAttribute('class', 'btn btn-lg btn-sm');
                    //gobutton.setAttribute('id','gobutton'+i);
                    gobutton.value = i;
                    //var dirtourl =  "/go/"+i;
                    gobutton.onclick = function () {
                        window.location.href = "/timetable/" + this.value;
                    };
                    //gobutton.setAttribute('class','gobutton');
                    stopscard.appendChild(stopdiv);
                }
            }
            if(stopscard.innerHTML===""){
                stopscard.innerHTML = "No stops yet, try adding one!";
                var addTimetableButton = document.createElement("button");
                addTimetableButton.setAttribute("class","btn btn-md btn-primary");
                addTimetableButton.setAttribute("id","addTimetableButton");
                addTimetableButton.innerHTML = "Find a stop";
                stopscard.appendChild(addTimetableButton);
                addTimetableButton.addEventListener('click',e=>{
                    window.location.href = "/stopfinder";
                });
            }
            //populate journey planner
            var counter = 0;
            var enterJourneyDescription = document.getElementById("enterJourneyDescription");
            var addjourneycard = document.getElementById("add-journey-card");
            var addstoptojourneybutton = document.getElementById("addstoptojourney-button");
            var removestopfromjourneybutton = document.getElementById("removestopfromjourney-button");
            var addjourneybutton = document.getElementById("addjourney-button");
            addstoptojourneybutton.addEventListener('click',e=>{
                var newjourdiv = document.createElement("div");
                newjourdiv.setAttribute("class","bus-card-seg");
                newSelect = document.createElement("select");
                newSelect.setAttribute("id", "newSelect"+ counter);
                for(stop in stops){
                    var opt = document.createElement("option");
                    opt.value= stop;
                    opt.innerHTML = stop; // whatever property it has
                    newSelect.appendChild(opt);
                }
                newjourdiv.appendChild(newSelect);
                newjourdiv.setAttribute("id", "newjourdiv"+ counter);
                $(addjourneycard).append(newjourdiv);
                counter++;
            });
            removestopfromjourneybutton.addEventListener('click',e=>{
                counter--;
                document.getElementById("newjourdiv"+ counter).remove();
            });
            addjourneybutton.addEventListener('click',e=>{
                var stopArr = [];
                var jouneyName = enterJourneyDescription.value;
                if(jouneyName===""){jouneyName="Journey";}
                for(var j = 0 ;j<counter;j++) {
                    var stopselect = document.getElementById("newSelect" + j);
                    stopArr.push(parseInt(stopselect.value));
                }
                journeys.push({"stops":stopArr,"title":jouneyName});
                var database = firebase.database().ref('users/' + userid).update({
                    journeys: journeys
                });
                refreshJourneyDiv();
            });
        });
    }
    function goFun(){
        var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=";
        var data;
        var stopid;
        var tableBox;
        var journeyid ;
        var journey = [];
        var goTitle;
        function getJourneyID(){
            var urlIn = window.location.href;
            var searchString = "go/";
            var idlocation = urlIn.indexOf(searchString)+searchString.length;
            journeyid = urlIn.substr(idlocation);
        }
        (function() {
            getJourneyID();
            tableBox = document.getElementById("tableBox");
            goTitle = document.getElementById("goTitle");
            var ref = firebase.database().ref();
            updateGoPage();
            setInterval(function(){ updateGoPage(); }, 60000);//update every 60s
            function updateGoPage() {
                ref.once("value",function(snapshot){
                    data = snapshot.val();
                    firebase.auth().onAuthStateChanged(firebaseUser => {
                        if(firebaseUser){
                            //goTitle.innerHTML = "Times for your favourite stop : "+stopid;
                            var userid = firebaseUser.uid;
                            journey = data.users[userid].journeys[journeyid];//firebase.database().ref('users/'+firebaseUser.uid).favouriteStop;
                            tableBox.innerHTML = "";
                            for(var i=0;i<journey.stops.length;i++){
                                stopid = journey.stops[i];
                                $.ajax({
                                    type:'POST',
                                    url: '/go',
                                    data: {"stopid":stopid},
                                    //dataType: 'json',
                                    success: function(result,status,xhr){
                                        stopid = result;
                                        var userstopdata = data.users[userid].stops[stopid];
                                        buildTable(stopid,userstopdata);
                                    }
                                });
                                //var userstopdata = data.users[userid].stops[stopid];
                                //buildTable(stopid,userstopdata);
                            }
                        } else{
                            //goTitle.innerHTML = "Please sign up or log in to see favourite stops";
                        }
                    });
                    if(stopid==null){
                        //goTitle.innerHTML = "Loading...";
                    }
                },function(error){
                    console.error(error);
                });
            }
        }());
        function buildTable(stopid,userstopdata) {
            var titleStr = stopid + " : " +userstopdata.title;
            if(titleStr===undefined){
                titleStr = "test";
            }
            var tablediv = document.createElement("div");
            tablediv.setAttribute("class","boxed");
            var title = document.createElement("h1");
            tablediv.appendChild(title);
            title.innerHTML = titleStr;
            tablediv.appendChild( document.createElement("hr"));
            var timestable = document.createElement("table");
            timestable.setAttribute("class","times-table");
            tablediv.appendChild(timestable);
            var headRow = timestable.appendChild(document.createElement("tr"));

            var currentCell = document.createElement("th");
            currentCell.innerHTML = "Bus route";
            headRow.appendChild(currentCell);

            currentCell = document.createElement("th");
            currentCell.innerHTML = "Minutes away";
            headRow.appendChild(currentCell);

            currentCell = document.createElement("th");
            currentCell.innerHTML = "Expected Arrival Time";
            headRow.appendChild(currentCell);

            currentCell = document.createElement("th");
            currentCell.innerHTML = "Arrived Yesterday at";
            headRow.appendChild(currentCell);

            currentCell = document.createElement("th");
            currentCell.innerHTML = "Arrived Last Week at";
            headRow.appendChild(currentCell);

            currentCell = document.createElement("th");
            currentCell.innerHTML = "Scheduled Arrival Time";
            headRow.appendChild(currentCell);
            tableBox.appendChild(tablediv);
            timestable.setAttribute("id","times-table"+stopid);
            displayTimes(stopid,userstopdata)
        }
        function emptyOptions(table){
            while(table.rows.length>1){
                table.deleteRow(1);
            }
        }
        function displayTimes(stopid,userstopdata){
            var ref = firebase.database().ref();
            ref.once("value",function(snapshot) {
                data = snapshot.val();
                var timeTable = document.getElementById("times-table" + stopid);
                emptyOptions(timeTable);
                var stopdata = data.realtime;
                var key = "stop" + stopid;
                if (stopdata[key].errorcode === "0") {
                    var busesToStop = stopdata[key].results;
                    for (var i = 0; i < busesToStop.length; i++) {
                        if (userstopdata.routes.indexOf(parseInt(busesToStop[i].route)) >= 0 || userstopdata.routes.indexOf(busesToStop[i].route) >= 0) {
                            var newRow = timeTable.insertRow(-1);
                            var currentCell = newRow.insertCell(0);
                            currentCell.innerHTML = busesToStop[i].route;
                            currentCell = newRow.insertCell(1);
                            currentCell.innerHTML = busesToStop[i].departureduetime;
                            currentCell = newRow.insertCell(2);
                            currentCell.innerHTML = (busesToStop[i].departuredatetime).substr(11, 5);
                            currentCell = newRow.insertCell(3);
                            currentCell.innerHTML = getPastTime(busesToStop[i], key, 1);
                            currentCell = newRow.insertCell(4);
                            currentCell.innerHTML = getPastTime(busesToStop[i], key, 3);//CHANGE TO 7 when data is better
                            currentCell = newRow.insertCell(5);
                            currentCell.innerHTML = (busesToStop[i].scheduleddeparturedatetime).substr(11, 5);
                        }
                    }
                }
            });
        }
        function getPastTime(todaybus,stopkey,daysAgo) {
            var todaySched = todaybus.scheduleddeparturedatetime;
            var todayRoute = todaybus.route;
            var olddata = data.oldtime;
            var newMin;
            var todayTime = todaySched.substr(11,8);
            var date = makePastDateString(daysAgo);
            if((date in olddata)&&(stopkey in olddata[date])&&(todayRoute in olddata[date][stopkey])){
                var arrivedYesterday = ((olddata[date][stopkey][todayRoute][todayTime])+"").substr(0,5);//Line checks date for bus and returns the time it arrived
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
    }
    function timetableFun() {
        var usertimetablediv = document.getElementById("user-timetable-interaction");
        var enterStopDescription = document.getElementById("enterStopDescription");
        var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=";
        var data;
        var stopid;
        var stopdata;
        var stopname;
        var routeboxes;
        var stopFbexists;
        var boxesDone = false;
        (function() {
            getStopNumber();
            var ref = firebase.database().ref();
            ref.on("value",function(snapshot){
                data = snapshot.val();
                displayTimes();
                stopdata = data.stopinformation[stopid];
                stopname = stopdata.fullname
                firebase.auth().onAuthStateChanged(firebaseUser => {
                    ref.once('value').then(function(snapshot){//check if there is a stops section
                        if (firebaseUser){stopFbexists = snapshot.child('users/'+firebaseUser.uid+'/stops').val();}//quick fix
                        if (firebaseUser && (!stopFbexists||!data.users[userid].stops[stopid])) {
                            if(!boxesDone) {
                                boxesDone = true;//Only want to do this once
                                userid = firebaseUser.uid;
                                enterStopDescription.value = stopname;
                                $(usertimetablediv).append('Please select routes : ');
                                for (var i in stopdata.operators[0].routes) {
                                    route = stopdata.operators[0].routes[i];
                                    var boxlabel = document.createElement("label");
                                    boxlabel.innerHTML = "&emsp;" + route + " ";
                                    var routecheckbox = document.createElement('input');
                                    routecheckbox.type = "checkbox";
                                    routecheckbox.value = route;
                                    routecheckbox.name = "routecheckbox";
                                    boxlabel.appendChild(routecheckbox);
                                    usertimetablediv.appendChild(boxlabel);
                                }
                                var addFavouriteButton = document.createElement("button");
                                addFavouriteButton.setAttribute("class","btn btn-sm btn-primary");
                                addFavouriteButton.setAttribute("id","addFavouriteButton");
                                addFavouriteButton.innerHTML = "Add Stop to Favourites";
                                usertimetablediv.appendChild(addFavouriteButton);
                                usertimetablediv.style.display = "block";
                                addFavouriteButton.addEventListener('click',e=>{
                                    var routecheckbox = document.getElementsByName("routecheckbox");
                                    var stopDescription = enterStopDescription.value;
                                    var routes = [];
                                    for (var j in stopdata.operators[0].routes) {
                                        if(routecheckbox[j].checked){
                                            routes.push(routecheckbox[j].value);
                                        }
                                    }
                                    if(stopFbexists) {
                                        var database = firebase.database().ref('users/' + firebaseUser.uid+'/stops/'+stopid).update({
                                            routes: routes,
                                            title: stopDescription
                                        });
                                    }else{
                                        var stops = [];
                                        stops[stopid] = {"routes":routes,"title":stopDescription};
                                        var database = firebase.database().ref('users/' + firebaseUser.uid).update({
                                            stops: stops
                                        });
                                    }
                                });
                            }
                        }else{
                            usertimetablediv.innerHTML = "Stop Location : "+stopname;
                            usertimetablediv.style.display = "block";
                        }
                    });
                });
            });
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
                    currentCell.innerHTML = getPastTime(busesToStop[i],key,1);
                    currentCell = newRow.insertCell(4);
                    currentCell.innerHTML = getPastTime(busesToStop[i],key,7);
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
                if(arrivedYesterday=="undef"){//Todo : refractor this whole thing into a method -make it not terrible
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
                    var arrivedYesterday="No bus data";
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
    }
    function stopfinderFun(){
        var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=";
        var routes;
        var markers=[];
        var routeinformation;
        var stopfinderHeader = document.getElementById("stopfinderHeader");
        var stopfindMainDiv = document.getElementById("stopfindMainDiv");
        var routeGlobal = document.getElementById("SelectRoute");
        var directionGlobal = document.getElementById("SelectDirection");
        var stopGlobal = document.getElementById("SelectStop");
        var goButtonGlobal = document.getElementById("goButton");
        var ref = firebase.database().ref();
        ref.once('value')
            .then(function(snapshot){
                routes = snapshot.child("routes").val();
                routeinformation = snapshot.child("routeinformation").val();
                stopfinderHeader.innerHTML = "Select a Stop";
                routeGlobal.style.visibility = "visible";
                stopfindMainDiv.style.visibility = "visible";
            });
        function emptyOptions(menu){
            while(menu.length>1){
                menu.remove(1);
            }
        }
        function resetForm(){
           routeGlobal.value = 0;
        }
        routeGlobal.addEventListener('change',e=>{
            clearMarkers();
            var routeSelectValue = routeGlobal.value;
            directionGlobal.style.visibility = "visible";
            emptyOptions(directionGlobal);
            if(routeSelectValue!='-'){
                var directions = routes[routeSelectValue];
                for(var i = 0 ;i<directions.length;i++){
                    var opt = directions[i];
                    var el = document.createElement("option");
                    el.textContent = opt.direction;
                    el.value = ""+i;
                    directionGlobal.appendChild(el);
                }
            }
        });
        directionGlobal.addEventListener('change',e=>{
            clearMarkers();
            var routeSelectValue = routeGlobal.value;
            var directionSelectValue = directionGlobal.value;
            populateMapStops(routeSelectValue,directionSelectValue);
            stopGlobal.style.visibility = "visible";
            emptyOptions(stopGlobal);
            if(routeSelectValue!='-'){
                var stops = routes[routeSelectValue][directionSelectValue].stops;
                for(var i = 0 ;i<stops.length;i++){
                    var opt = stops[i];
                    var el = document.createElement("option");
                    el.textContent = opt;
                    el.value = opt;
                    stopGlobal.appendChild(el);
                }
            }/*//todo figure out what is this?
            routeGlobal = routeSelectValue;
            stopGlobal = stopSelect;
            directionGlobal = directionSelectValue;*/
        });
        function populateMapStops(routeSelectValue,directionSelectValue) {
            clearMarkers();
            var position;
            var marker;
            var content;
            var stop;
            var infowindow;
            var openinfowindow;
            var stops = routeinformation[routeSelectValue].results[directionSelectValue].stops;
            for(var i=0; i<stops.length; i++) {//poproutes
                stop=stops[i];
                position = new google.maps.LatLng(stop.latitude,stop.longitude);
                content = "<p><h6>Stop Location : " +stop.fullname + "</h6> "+"<h7> Stop number : "+stop.stopid+"</h7><h6>"+"</h6> <a href=../timetable/"+stop.stopid+" >View timetable</a> </p>";
                //console.log(content);
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: stop.title
                });
                markers.push(marker);
                infowindow = new google.maps.InfoWindow();
                openinfowindow = infowindow;
                google.maps.event.addListener(marker,'click',(function(marker,content,infowindow){
                    return function(){
                        openinfowindow.close();
                        openinfowindow = infowindow;
                        infowindow.setContent(content);
                        infowindow.open(map,marker);
                    };
                })(marker,content,infowindow));
            }
            map.setCenter(new google.maps.LatLng(stops[Math.round(stops.length/2)].latitude,stops[Math.round(stops.length/2)].longitude));
        }
        function clearMarkers(){
            for(var i=0;i<markers.length;i++){
                markers[i].setMap(null);
            }
            markers=[];
        }
        goButtonGlobal.addEventListener('click',e=>{
            var stopSelectValue = stopGlobal.value;
            newurl = '/timetable/'+stopSelectValue;
            console.log("redirecting to "+newurl);
            window.location.href = newurl;
        });
    }
}());//This is the main end
function initMap(){
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(53.381290,-6.591850)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

//This is the actual end