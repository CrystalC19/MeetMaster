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
