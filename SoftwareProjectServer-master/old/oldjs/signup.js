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
const emailinput = document.getElementById("emailinput");
const passwordinput = document.getElementById("passwordinput");
const signupbutton = document.getElementById("signupbutton");

  signupbutton.addEventListener('click',e=>{
    const email = emailinput.value;
    const pass = passwordinput.value;
    const  auth = firebase.auth();
    console.log(pass);
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));

  });
  
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
    } else{
      console.log("not logged in");
    }

  });

}());

function checkUser(){
  var user = firebase.auth().currentUser;
  console.log(user);
}