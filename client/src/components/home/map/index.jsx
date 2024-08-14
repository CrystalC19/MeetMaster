import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './map.css';

// Define options for the Google Map
const options = {
  fullscreenControl: false, 
  zoomControl: true,
  mapTypeControl: false, 
  streetViewControl: false, 
  scaleControl: false,
  rotateControl: false,
  gestureHandling: 'auto', 
};

// Access the API key from the environment variable
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;

function Map({ selectedEventLocation }) {
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
  const [activeMarker, setActiveMarker] = useState(null);
 
  useEffect(() => {
    if (selectedEventLocation) {
      setCenter({
        lat: selectedEventLocation.lat,
        lng: selectedEventLocation.lng,
      });
    }
  }, [selectedEventLocation]);

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker.id);
  };

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey={MAP_API_KEY}>
        <GoogleMap
          mapContainerClassName="google-map"
          center={center}
          zoom={15} 
          options={options}
        >
          {selectedEventLocation && (
            <Marker
              position={center}
              onClick={() => handleMarkerClick({ id: 'selectedEvent' })}
            />
          )}
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

export default Map;
