import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './map.css';

const options = {
  fullscreenControl: false, 
  zoomControl: true,
  mapTypeControl: false, 
  streetViewControl: false, 
  scaleControl: false,
  rotateControl: false,
  gestureHandling: 'auto', 
};

function MapComponent({ selectedEventLocation }) {
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
  const [locations, setLocations] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    if (selectedEventLocation) {
      setCenter({
        lat: selectedEventLocation.lat,
        lng: selectedEventLocation.lng,
      });
      // Adjust zoom level to ensure it's not too far out
    }
  }, [selectedEventLocation]);

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker.id);
  };

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyD7dokCBpYsusuyt5lOP5ZB3eaCaWV5JEM">
        <GoogleMap
          mapContainerClassName="google-map"
          center={center}
          zoom={15} 
          options={options}
        >
          {/* Add a marker for the selected event */}
          {selectedEventLocation && (
            <Marker
              position={center}
              onClick={() => handleMarkerClick({ id: 'selectedEvent' })}
            />
          )}
          
          {/* Render InfoWindow if needed */}
          {activeMarker === 'selectedEvent' && (
            <InfoWindow
              position={center}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div>
                <h2>Selected Event</h2>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapComponent;
