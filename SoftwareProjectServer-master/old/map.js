var map;

  var stop
  var route
  var direction

function route(){
  route = document.getElementById("SelectRoute").value;
  direction = document.getElementById("SelectDirection").value;

  console.log("route is "+route);
  console.log("direction is "+direction)

  initialize();
 }


function initialize() {


console.log(route);
console.log(stop);
console.log(direction);


	var mapOptions = {
		zoom: 10,
		center: new google.maps.LatLng(53.381290,-6.591850)
	};

map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

$.getJSON('https://data.smartdublin.ie/cgi-bin/rtpi/routeinformation?routeid='+route+'&operator=bac&format=json', function(data) {
	console.log(data);
	json = data.results[direction].stops;
	
	function process(key,value) {
		console.log(key+" : "+value);
	}

	for(var i=0; i<json.length; i++) {
		var obj=json[i];
		console.log(obj);

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(obj.latitude,obj.longitude),
			map: map,
			title: obj.title
		});

		var clicker = addClicker(marker, obj.title);
		}
	});
	function addClicker(marker, content) {
		google.maps.event.addListener(marker, 'click', function() {
			if(infowindow) {infowindow.close();}
			infowindow = new google.maps.InfoWindow({content: content});
			infowindow.open(map, marker);
		});
	}
}

google.maps.event.addDomListener(window, 'load', initialize);




/* 
//Todo  check - moved over from stopfind
//route and direction variables (routeGlobal, directionGlobal, stopGlobal) from stopfind used
var map;

var json = $.getJSON('https://data.smartdublin.ie/cgi-bin/rtpi/routeinformation?routeid='+routeGlobal+'&operator=bac&format=jsonc', function(data) {
});

console.log(json);


function initialize() {

	var mapOptions = {
		zoom: 10,
		center: new google.maps.LatLng(53.381290,-6.591850)
	};

map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

$.getJSON('https://data.smartdublin.ie/cgi-bin/rtpi/routeinformation?routeid='+routeGlobal+'&operator=bac&format=json', function(data) {
	console.log(data);
	json = data.results[directionGlobal].stops;
	console.log("Direction is "+directionGlobal);
	function process(key,value) {
		console.log(key+" : "+value);
	}

	for(var i=0; i<json.length; i++) {
		var obj=json[i];
		console.log(obj);

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(obj.latitude,obj.longitude),
			map: map,
			title: obj.title
		});

		var clicker = addClicker(marker, obj.title);
		}

	});
	function addClicker(marker, content) {
	  google.maps.event.addListener(marker, 'click', function(){
	   if (infowindow) {infowindow.close();}
	   infowindow = new google.maps.InfowWindow({content: content});
	   infowindow.open(map, marker);
	  });
	}
      }

google.maps.event.addDomListener(window, 'load', initialize);
*/
