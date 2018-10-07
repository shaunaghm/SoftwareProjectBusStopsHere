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
  var ref = firebase.database().ref();
  ref.on("value",function(snapshot){
    var keys = Object.keys(snapshot.val().routes);
    console.log(keys);
    //console.log(snapshot.val().stop404.date20180228.numberofroutes);
    //console.log(JSON.stringify(snapshot.val(),null,2));
  });