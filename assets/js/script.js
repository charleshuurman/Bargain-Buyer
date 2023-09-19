// Gas API 
var data = null;

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

// Set coordinates for Houston for test, lng and lat to be filled with user variables
xhr.open("GET", "https://api.collectapi.com/gasPrice/fromCoordinates?lng=-95.358421&lat=29.749907");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", "apikey 6Ryvzp1sKQ7LW1sRGmM83U:23lcJdTMB1ecR7DuwNxQ5A");

xhr.send(data);

