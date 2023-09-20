// Accessing Elements by ID
const submitBtnOne = document.querySelector('#first-button');

/*
var userLon = document.querySelector("#lon-input")
var userLat = document.querySelector("#lat-input")
var userCity = document.querySelector("#city-input")
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

//

// render city search text (ie. Austin)
function renderCityText() {
  let userCity = JSON.parse(localStorage.getItem('userCitySearch'));
  let citySearchList = 
}
// Local Storage
// event listener
document.getElementById('first-button').addEventListener('click', function (event) {
  event.preventDefault();
  console.log("click");

  // var citySearch = document.getElementById('city-search').value;
}) 


