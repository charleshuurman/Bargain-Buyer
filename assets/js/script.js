// Gas API 
var data = null;

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
    }
});

// Google Maps API 
let map;
let service;
let infowindow;

function initMap(lat, lng) {
    const userInput = new google.maps.LatLng(lat, lng);
    
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map-result"), {
        center: userInput,
        zoom: 15,
    });

    // Request to set markers for gas stations in the area 
    const request = {
        location: userInput,
        radius: '500',
        query: "Gas station"
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
}

function createMarker(place) {
    if (!place.name || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
    });
}

document.querySelector('#submit-button').addEventListener('click', function () {
    let latitude = parseFloat(document.getElementById('latitude').value);
    let longitude = parseFloat(document.getElementById('longitude').value);

    if (isNaN(latitude) || isNaN(longitude)) {
        console.error("Please enter valid latitude and longitude values.");
        return;
    }

    initMap(latitude, longitude);
});

window.initMap = initMap; // Expose the initMap to the global scope as it's required by Google's callback

