var jsonfile = require('jsonfile');
var request = require("request");
var admin = require("firebase-admin");
var serviceAccount = require("./softwareproject-e4114-firebase-adminsdk-f1lpm-aaac181e62.json");
var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=";
var stop = "404";

/*
reformatJSON();
function reformatJSON(){
    var jsonInfo = require('./');
    jsonfile.writeFile('./.json', jsonInfo, {spaces:2}, function(err) {
        console.error(err)
    })
}
*/
