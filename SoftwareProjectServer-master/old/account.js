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
  const  auth = firebase.auth();

  auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      //console.log("buttonsignin");
      prepareForUserInteraction();
      window.location.href = "/";//redirect away if signed in 
    } else{
      prepareForUserInteraction();
      //console.log("buttonsignin");
      //prepareForUserInteraction();
    }
  });
}());


function prepareForUserInteraction(){
  console.log("prepareForUserInteraction");
  buttonsignup.addEventListener('click',e=>{
    const usernamesignup = usernameinputsignup.value;
    const emailsignup = emailinputsignup.value;
    const passwordsignup = passwordinputsignup.value;
    const passwordsignup2 = passwordinputsignup2.value;
    if(passwordsignup!==passwordsignup2){
      signupError("Error: Passwords must match");
    }else{
      firebase.auth().createUserWithEmailAndPassword(emailsignup,passwordsignup).then(function(user){
        console.log(user);
      }).catch(function(error){
        signupError(error.message);
      });
    }
  });
  
  buttonsignin.addEventListener('click',e=>{
    const emailsignin = emailinputsignin.value;
    const passwordsignin = passwordinputsignin.value;
    firebase.auth().signInWithEmailAndPassword(emailsignin,passwordsignin).then(function(user){
      console.log(user);

    }).catch(function(error){
      console.log(error.message);
    });
  });
}

function signupError(errorMessage) {
  var errorMessages = "";
  signupMessage.style.visibility = "visible";
  if(errorCode===0){
    errorMessages+=errorMessage+'\n';
  }
  signupMessage.innerHTML=errorMessage;
}




/*//example on how to check user
function checkUser(){
  var user = firebase.auth().currentUser;
  console.log(user);
}*/

/*//another way to check user  
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
    } else{
      console.log("not logged in");
    }

  });*/