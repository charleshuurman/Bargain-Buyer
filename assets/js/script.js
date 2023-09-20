// Accessing Elements by ID
const submitBtnOne = document.querySelector('#first-button');

/*
const userLon = document.querySelector("#lon-input")
const userLat = document.querySelector("#lat-input")
const userCity = document.querySelector("#city-input")
*/
// Gas API 
var data = null;

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

// Set coordinates for Houston for test, lon and lat to be filled with user variables
//xhr.open("GET", "https://api.collectapi.com/gasPrice/fromCoordinates?lng={userLon}&lat={userLat}");
xhr.open("GET", "https://api.collectapi.com/gasPrice/fromCoordinates?lng=-95.358421&lat=29.749907");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", "apikey 6Ryvzp1sKQ7LW1sRGmM83U:23lcJdTMB1ecR7DuwNxQ5A");

xhr.send(data);

// Google Maps API 
let map;
let service;
let infowindow;

function initMap() {
  //const userInput = new google.maps.LatLng({userLat}, {userLon});
  const userInput = new google.maps.LatLng(30.266666, -97.733330);
  // Set Austin as test center

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: userInput,
    zoom: 15,
  });

  // unfinished request that will set markers for gas stations in the area 
/*
  const request = {
    query: "Gas station",
    fields: ["name"],
  };
*/
  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

window.initMap = initMap;
//

// Local Storage

// event listener
document.getElementById('first-button').addEventListener('click', function (event) {
  // event.preventDefault();
  console.log("click");
}) 


