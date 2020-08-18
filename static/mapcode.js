// var map = null;
var map;
var freebounds;

function initMap(){
	var color2 = '#000050';
	var color3 = '#0078BD';



	var directionsService = new google.maps.DirectionsService();
	var bounds = new google.maps.LatLngBounds();
	// freebounds = new google.maps.LatLngBounds();

	map = new google.maps.Map(document.getElementById("map"),{
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

		console.log('theseprops in map');
		console.log(theseProps);

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



		var nextUrl = window.location.href;
		var lastIndex = nextUrl.lastIndexOf("/");
		var righthome = nextUrl.slice(0,lastIndex);

		var a = new google.maps.Marker({
		icon:{
			url: righthome+'/static/temp.png',
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
			url: righthome+'/static/temp.png',
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
			url: righthome+'/static/temp.png',
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






		// // line1
		// var request = {
		// 	origin: theseProps[1],
		//     destination: theseProps[3],
		//     travelMode: 'BICYCLING'
		// };
		// directionsService.route(request, function(result, status) {
		// 	if (status == 'OK') {
		// 		directionsRenderer1.setDirections(result);
		// 	}else{
		// 		var path = new google.maps.Polyline({
		// 			path: [theseProps[1],theseProps[3]],
		// 			geodesic: true
		// 		})
		// 		path.setMap(map);
		// 	}
		// });

		// // line2
		// var request = {
		// 	origin: theseProps[3],
		//     destination: theseProps[5],
		//     travelMode: 'BICYCLING'
		// };
		// directionsService.route(request, function(result, status) {
		// 	if (status == 'OK') {
		// 		directionsRenderer2.setDirections(result);
		// 	}else{
		// 		var path = new google.maps.Polyline({
		// 			path: [theseProps[3],theseProps[5]],
		// 			strokeColor: color2,
		// 			geodesic: true
		// 		})
		// 		path.setMap(map);
		// 	}
		// });

		// // lline3
		// var request = {
		// 	origin: theseProps[5],
		//     destination: theseProps[1],
		//     travelMode: 'BICYCLING'
		// };
		// directionsService.route(request, function(result, status) {
		// 	if (status == 'OK') {
		// 		directionsRenderer3.setDirections(result);
		// 	}else{
		// 		var path = new google.maps.Polyline({
		// 			path: [theseProps[5],theseProps[1]],
		// 			strokeColor: color3,
		// 			geodesic: true
		// 		})
		// 		path.setMap(map);
		// 	}
		// });


		var path = new google.maps.Polyline({
			path: [theseProps[5],theseProps[1]],
			strokeColor: color3,
			geodesic: true
		})
		path.setMap(map);
		var path = new google.maps.Polyline({
			path: [theseProps[3],theseProps[5]],
			strokeColor: color2,
			geodesic: true
		})
		path.setMap(map);
		var path = new google.maps.Polyline({
			path: [theseProps[1],theseProps[3]],
			strokeColor: color3,
			geodesic: true
		})
		path.setMap(map);


		// center at most recent
		if(i==props.length-1){
			bounds.extend(a.position);
			bounds.extend(b.position);
			bounds.extend(c.position);
		}
		map.fitBounds(bounds);
		map.panToBounds(bounds);
	}



	if(articleProp !== null){
		console.log('articleprop inside mapcode');
		console.log(articleProp);
		if(articleProp.length>2){
			freebounds.extend(articleProp[1]);
			freebounds.extend(articleProp[3]);				
		}
		if(articleProp.length>5){
			freebounds.extend(articleProp[5]);
		}
		map.fitBounds(freebounds);
		map.panToBounds(freebounds);
	}

}

// function resetBounds(articleProp){

// }



// google.maps.event.addDomListener(window, 'load', initMap);

// $(document).ready(function(){
// 	console.log('g"');
// });