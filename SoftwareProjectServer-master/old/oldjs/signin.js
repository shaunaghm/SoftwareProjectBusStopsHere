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
const signinbutton = document.getElementById("signinbutton");
const signoutbutton = document.getElementById("signoutbutton");

  signinbutton.addEventListener('click',e=>{
    const email = emailinput.value;
    const pass = passwordinput.value;
    const  auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));

  });

  signoutbutton.addEventListener('click',e=>{
    firebase.auth().signOut();
  });
  
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
    } else{
      console.log("not logged in");
    }

  });

}());

