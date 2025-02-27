// Function to fetch the ISS location from the backend
function fetchISSLocation() {
    fetch('/get_location')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("location").innerHTML = "Error fetching ISS location.";
            } else {
                // Update the display with the current ISS coordinates
                document.getElementById("location").innerHTML =
                    `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;
            }
        })
        .catch(error => {
            document.getElementById("location").innerHTML = "Error fetching ISS location.";
        });
}

// Call fetchISSLocation() every 5 seconds to update the location
setInterval(fetchISSLocation, 5000);

// Fetch location initially when the page loads
fetchISSLocation(); 