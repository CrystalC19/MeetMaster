// Defining initMap function
function initMap() {
    var myLatLng = { lat: 32.8567, lng: -96.99 };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 9
    });

    // Marker arrays with title and content (with latitude and longitude)
    var markers = [
        { position: { lat: 32.7904, lng: -96.8103 }, title: 'American Airlines Center', content: 'American Airlines Center: Nicki Minaj (5/16/24 5pm-12am)' },
        { position: { lat: 32.7480, lng: -97.0934 }, title: 'AT&T Stadium', content: 'AT&T Stadium: Cowboys Game (8/26/24 2pm-6pm)' },
        { position: { lat: 32.7739, lng: -96.8017 }, title: 'KBH Convention Center', content: 'KBH CC: Asian Food and Culture Festival (5/25-5/27)' },
        { position: { lat: 32.9847, lng: -97.0875 }, title: 'Lake Grapevine', content: 'Lake Grapevine: Mothers Day Picnic (5/12/24 11am-4pm)' },
        { position: { lat: 32.7160, lng: -97.3725 }, title: 'Colonial Country Club', content: 'Colonial Country Club: Autism Awareness Golf Tournament (6/21/24 10am-5pm)' },
        { position: { lat: 32.8412, lng: -96.7845 }, title: 'SMU', content: 'SMU: Coding Bootcamp Graduation (8/13/24 6:30pm)' },
        { position: { lat: 32.7564, lng: -97.3423 }, title: 'Panther Island Pavilion', content: 'Panther Island Pavilion: Memorial Day Chili Cookoff (5/27/24 4pm-8pm)' },
        { position: { lat: 32.8738, lng: -96.9450 }, title: 'Toyota Music Factory', content: 'Toyota Music Factory: DJ Khaled (7/15/24 7pm)' },
        { position: { lat: 33.0811, lng: -96.8263 }, title: 'Legacy West', content: 'Legacy West Food Hall: Cinco De Mayo Celebration (5/5/24)' },
        { position: { lat: 33.2075, lng: -97.1526 }, title: 'UNT', content: 'UNT: 2024 Presidential Debate (4/30/24 5pm)' },
    ];

    // Looping the markers and placing them on the map
    markers.forEach(function(markerInfo) {
        var marker = new google.maps.Marker({
            position: markerInfo.position,
            map: map,
            title: markerInfo.title,
            // Customize the marker icon to make it smaller
            icon: {
                url: 'https://maps.google.com/mapfiles/kml/pal4/icon49.png', // URL to a smaller marker icon
                scaledSize: new google.maps.Size(25, 25) // Size of the smaller marker icon
            }
        });

        // Create an InfoWindow with the marker content
        var infoWindow = new google.maps.InfoWindow({
            content: markerInfo.content
        });

        // Add event listener to show InfoWindow when marker is clicked
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });

        // Add event listener to show InfoWindow when marker is hovered
        marker.addListener('mouseover', function() {
            infoWindow.open(map, marker);
        });

        // Close InfoWindow when mouse moves away from marker
        marker.addListener('mouseout', function() {
            infoWindow.close();
        });
    });
}
