// var map = null;

function initMap(){
	var color2 = '#000050';
	var color3 = '#0078BD';

	var directionsService = new google.maps.DirectionsService();
	var bounds = new google.maps.LatLngBounds();

	var map = new google.maps.Map(document.getElementById("map"),{
		mapTypeControl: false,
		streetViewControl: false,
		fullscreenControl: false,
		zoomControl: false,
		zoom: 4,
		styles:
					[
	  {
	    "stylers": [
	      {
	        "saturation": -100
	      },
	      {
	        "visibility": "simplified"
	      }
	    ]
	  }
	]
	});



	for(var i = 0;i<props.length;i++){
		addTriangle(props[i],i+1);
	}

	function addTriangle(theseProps,index){

		var directionsRenderer1 = new google.maps.DirectionsRenderer({
			suppressMarkers: true,
			preserveViewport: true
		});
		var directionsRenderer2 = new google.maps.DirectionsRenderer({
			suppressMarkers: true,
			preserveViewport: true,
			polylineOptions: {
				strokeColor: color2
        }});
		var directionsRenderer3 = new google.maps.DirectionsRenderer({
			suppressMarkers: true,
			preserveViewport: true,
			polylineOptions: {
				strokeColor: color3
        }});
		directionsRenderer1.setMap(map);
		directionsRenderer2.setMap(map);
		directionsRenderer3.setMap(map);





		var a = new google.maps.Marker({
		icon:{
			url: window.location.origin+'/static/icon.png',
			scaledSize: new google.maps.Size(50, 50)
		},
		label: {
	    	text: theseProps[0]
	    },
		maxWidth: 133,
		map: map,
		position: theseProps[1]
		});

		var b = new google.maps.Marker({
		icon:{
			url: window.location.origin+'/static/icon.png',
			scaledSize: new google.maps.Size(50, 50)
		},
		label: {
	    	text: theseProps[2]
	    },
		maxWidth: 133,
		map: map,
		position: theseProps[3]
		});

		var c = new google.maps.Marker({
		icon:{
			url: window.location.origin+'/static/icon.png',
			scaledSize: new google.maps.Size(50, 50)
		},
		label: {
	    	text: theseProps[4]
	    },
		maxWidth: 133,
		map: map,
		position: theseProps[5]
		});

		console.log(i)
		// click events to articles
		// var thisI = i+1;


		var nextUrl = window.location.href;
		var lastIndex = nextUrl.lastIndexOf("/");
		var nextUrl = nextUrl.slice(0,lastIndex);
		// console.log(nextUrl);
		a.addListener('click',function(){
			window.location.replace(nextUrl+"/"+(index)+".html");
			// return(<a href="{{ url_for('auth.register') }}">Register</a></li>);
			});
		b.addListener('click',function(){
			window.location.replace(nextUrl+"/"+(index)+".html");
		});
		c.addListener('click',function(){
			window.location.replace(nextUrl+"/"+(index)+".html");
		});

		// google.maps.event.addListener(box1, 'click', function() {
		// 	window.location.replace(window.location.origin+"/"+(i)+".html");
  //    	});
		// google.maps.event.addListener(box2, 'click', function() {
		// 	window.location.replace(window.location.origin+"/"+(i)+".html");
  //    	});
		// google.maps.event.addListener(box3, 'click', function() {
		// 	window.location.replace(window.location.origin+"/"+(i)+".html");
  //    	});




		// line1
		var request = {
			origin: theseProps[1],
		    destination: theseProps[3],
		    travelMode: 'BICYCLING'
		};
		directionsService.route(request, function(result, status) {
			if (status == 'OK') {
				directionsRenderer1.setDirections(result);
			}else{
				var path = new google.maps.Polyline({
					path: [theseProps[1],theseProps[3]],
					geodesic: true
				})
				path.setMap(map);
			}
		});

		// line2
		var request = {
			origin: theseProps[3],
		    destination: theseProps[5],
		    travelMode: 'BICYCLING'
		};
		directionsService.route(request, function(result, status) {
			if (status == 'OK') {
				directionsRenderer2.setDirections(result);
			}else{
				var path = new google.maps.Polyline({
					path: [theseProps[3],theseProps[5]],
					strokeColor: color2,
					geodesic: true
				})
				path.setMap(map);
			}
		});

		// lline3
		var request = {
			origin: theseProps[5],
		    destination: theseProps[1],
		    travelMode: 'BICYCLING'
		};
		directionsService.route(request, function(result, status) {
			if (status == 'OK') {
				directionsRenderer3.setDirections(result);
			}else{
				var path = new google.maps.Polyline({
					path: [theseProps[5],theseProps[1]],
					strokeColor: color3,
					geodesic: true
				})
				path.setMap(map);
			}
		});



		// center at most recent
		if(i==props.length-1){
			bounds.extend(a.position);
			bounds.extend(b.position);
			bounds.extend(c.position);
		}
		map.fitBounds(bounds);
		map.panToBounds(bounds);
	}




	// if been defined from another article
	var bounds = new google.maps.LatLngBounds();
	if(articleProp !== null){
		console.log('articleprop inside mapcode');
		console.log(articleProp);
		bounds.extend(articleProp[1]);
		bounds.extend(articleProp[3]);
		bounds.extend(articleProp[5]);
		map.fitBounds(bounds);
		map.panToBounds(bounds);
	}
}