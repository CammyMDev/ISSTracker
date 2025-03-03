const locationHistory = [];

//fetch the ISS location from the backend
function fetchISSLocation(map, marker, polyline) {
    fetch('/get_location')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("location").innerHTML = "Error fetching ISS location.";
            } else {
                // Update the display with the current ISS coordinates
                document.getElementById("location").innerHTML =
                    `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;

                //Update Marker   
                marker.setLatLng([data.latitude, data.longitude]);
                //Update Location History to draw Trajectory
                locationHistory.push([data.latitude, data.longitude]);
                //Draw Trajectory
                polyline.setLatLngs(locationHistory);
            }
        })
        .catch(error => {
            document.getElementById("location").innerHTML = "Error fetching ISS location.";
        });   
}

//Create Our Map
var map = L.map('map');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.fitWorld().zoomIn();

//Create our Marker and Line
var marker = L.marker([0, 0]).addTo(map);
var polyline = L.polyline(locationHistory, {color: 'red'}).addTo(map);

map.on('resize', function(e) {
    map.fitWorld({reset: true}).zoomIn();
});

setInterval(function() {
    fetchISSLocation(map, marker,polyline);
}, 5000);
fetchISSLocation(map,marker);



