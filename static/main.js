// Function to fetch the ISS location from the backend
function fetchISSLocation(map) {
    fetch('/get_location')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("location").innerHTML = "Error fetching ISS location.";
            } else {
                // Update the display with the current ISS coordinates
                document.getElementById("location").innerHTML =
                    `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;

                
                marker.setLatLng([data.latitude, data.longitude])
            
            }
            
        })
        .catch(error => {
            document.getElementById("location").innerHTML = "Error fetching ISS location.";
        });


        
}

var map = L.map('map');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.fitWorld().zoomIn();

var marker = L.marker([0, 0]).addTo(map);

map.on('resize', function(e) {
    map.fitWorld({reset: true}).zoomIn();
});

setInterval(function() {
    fetchISSLocation(map, marker);
}, 5000);
fetchISSLocation(map,marker);



