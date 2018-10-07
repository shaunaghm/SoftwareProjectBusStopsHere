(function() {
var accountnav = document.getElementById("accountnav");
var loginnav = document.getElementById("loginnav");
// Initialize Firebase
  var config = {
  apiKey: "AIzaSyDAtxW4gA1iQ2k2QMHTaNd-EaJE8dcGXJg",
  authDomain: "softwareproject-e4114.firebaseapp.com",
  databaseURL: "https://softwareproject-e4114.firebaseio.com",
  projectId: "softwareproject-e4114",
  storageBucket: "softwareproject-e4114.appspot.com",
  messagingSenderId: "549994885429"
  };
  
  var firebaseapp = firebase.initializeApp(config);
  module.exports.firebaseapp = firebaseapp;
  const  auth = firebase.auth();

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    customForUser()
  } else{
    console.log("not logged in");
  }
});

function customForUser(){
  loginnav.style.display="inline";
  loginnav.addEventListener('click',e=>{
    firebase.auth().signOut();
  });
}
}());
//Todo make persistant logout button
/*  signoutbutton.addEventListener('click',e=>{
    firebase.auth().signOut();
  });*/
//window.location.href = "/";//redirect away if signed in 