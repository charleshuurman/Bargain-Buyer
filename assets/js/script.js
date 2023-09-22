// Gas API 
var data = null;
var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function() {
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

// Function to get latitude and longitude based on city name using Google Geocoding API
function getLatLngFromCity(city) {
    const apiKey = "AIzaSyBxWLcUfDyLG_YtaDZMM5GFhq5rCt7m7EM";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                document.getElementById('latitude').value = location.lat;
                document.getElementById('longitude').value = location.lng;

                initMap(location.lat, location.lng);
            }
        })
        .catch(error => console.error("Error fetching geocode data: ", error));
}

document.querySelector('#submit-button').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    getLatLngFromCity(city); // Fetch latitude and longitude based on the city input
});

window.initMap = initMap; // Expose the initMap to the global scope as it's required by Google's callback

// function to render user input
const button = document.querySelector('#submit-button');

function renderUserInput() {
  let citySearchInput = JSON.parse(localStorage.getItem('citySearch'));
  let cityHistory = document.getElementById('user-city');

  if (citySearchInput !== null) {
    cityHistory.innerHTML = '';

    citySearchInput.forEach(function (citySearch) {
      let cityItem = document.createElement('p');
      cityItem.textContent = citySearch.citySearch;
      cityHistory.appendChild(cityItem);
    });
  } 
}

// event listener for submit button
document.addEventListener('DOMContentLoaded', function () {
  renderUserInput();

  document.getElementById('submit-button').addEventListener('click', function (event) {
    event.preventDefault();
    console.log("click submit button");

    let city = document.getElementById('city').value;

    var citySearch = {
      citySearch: city,
    };

    if (city.trim() !== '') {
      let citySearchInput = JSON.parse(localStorage.getItem('citySearch')) || [];
      citySearchInput.push(citySearch);
      localStorage.setItem('citySearch', JSON.stringify(citySearchInput));
      renderUserInput();
    } else {
      console.error('Enter a city name');
      return;
    }

  });
});