//Setting up the express server
console.log("Server starting");
var express = require('express');
var app = express();


var bodyParser = require('body-parser');
var firebaseTools = require("./firebaseTools.js");
var saving = require("./saving.js");

app.set('view engine','ejs');
var server = app.listen(3000, listening);
function listening(){
	console.log("listening...");
}
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

//Initilising the saving script

saving.setStopsToSave(); //comment out for testing

//Setting up the page routes

app.get('/',getIndex);
app.get('/index',getIndex);
app.get('/Index',getIndex);
function getIndex(request,response){
   response.render('index');
}

app.get('/stopfinder',getStopFinder);
app.get('/Stopfinder',getStopFinder);
function getStopFinder(request,response){
  response.render('stopfinder');
}

app.get('/me',getDashboard);
app.get('/Me',getDashboard);
function getDashboard(request,response){
  response.render('me');
}


app.get('/contact',getContact);
app.get('/Contact',getContact);
function getContact(request,response){
  response.render('contact');
}

app.get('/about',getAbout);
app.get('/About',getAbout);
function getAbout(request,response){
  response.render('about');
}

app.get('/account',getAccount);
app.get('/Account',getAccount);
function getAccount(request,response){
  response.render('account');
}

app.get('/timetable/:stopid/',getTimetable);
app.get('/Timetable/:stopid/',getTimetable);
function getTimetable(request,response){
    var data = request.params;
    var stopid = data.stopid;
    if(!isNaN(stopid)){
        //console.log(data.stopid);
        saving.forceSaveStop(stopid);
        firebaseTools.checkStopInfo(stopid);
        response.render('timetable');
    }
    else{
        response.render('nopage'); 
    }
}

app.get('/go/:journey/',getGo);
app.get('/Go/:journey/',getTimetable);
function getGo(request,response){
    var data = request.params;
    var journey = data.journey;
    if(!isNaN(journey)){
        response.render('go');
    }
    else{
        response.render('nopage');
    }
}

app.get('*',get404);
function get404(request,response){
  response.render('nopage');
}

app.post('/go',function (request, response) {
    console.log(request.body);
    saving.forceSaveStop(request.body.stopid);
    //response.sendStatus(200);
    response.send(request.body.stopid);
});



/*
http = require('http');
fs = require('fs');
server = http.createServer( function(req, res) {

    console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
saving.forceSaveStop(stopid);*/

/*function emptytest(request,response){
    response.render('emptytest',{testing:"TESTING THE ENGINE"});//,{title:'Hey','Hello World'});
}*/

/*function test(request,response){
    response.render('test',{testing:"TESTING THE ENGINE"});//,{title:'Hey','Hello World'});
}*/


