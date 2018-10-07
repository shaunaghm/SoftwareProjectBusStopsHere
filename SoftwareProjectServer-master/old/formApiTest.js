
/*var url = "https://data.dublinked.ie/cgi-bin/rtpi/routelistinformation";

jsonp(url, function(data) {
});



function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}



*/

/*var request = new XMLHttpRequest();
request.open('GET',url);
request.responseType = 'json';
request.send();

*/


/*

    $(function() {
    $.getJSON(url, function(data) {
    //console.log(data);
       $.each(data.results, function(i, f) {
          //var tblRow = "<tr>" + "<td>" + f.route + "</td>" + "<td>" + f.duetime + "</td>" + "<td>" + f.arrivaldatetime + "</td>" + "<td>" + f.scheduledarrivaldatetime + "</td>" + "</tr>"
          //$(tblRow).appendTo("#userdata tbody");
     });
   });

});





*/


/*// var getJSON = require('get-json');
var url = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=406";
var stopJson;
setup();

function setup(){
	loadJSON(url,gotData);
	console.log("SETUP")
}

userdata.onload = function(){
	console.log("LOADED");
}

function gotData(data){
	stopJson = data;
	console.log(stopJson)
}



   $(function() {
   $.getJSON(url, function(data) {
       $.each(data.results, function(i, f) {
          var tblRow = "<tr>" + "<td>" + f.route + "</td>" +
           "<td>" + f.duetime + "</td>" + "<td>" + f.arrivaldatetime + "</td>" + "<td>" + f.scheduledarrivaldatetime + "</td>" + "</tr>"
           $(tblRow).appendTo("#userdata tbody");
     });

   });
*/