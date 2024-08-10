import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './map.css';



const center = {
  lat: -3.745,
  lng: -38.523
};

const options = {
  fullscreenControl: false, 
  zoomControl: true,
  mapTypeControl: false, 
  streetViewControl: false, 
  scaleControl: false,
  rotateControl: false,
  gestureHandling: 'auto', 
};

function MapComponent() {
  const [locations, setLocations] = useState([]);
  const [address, setAddress] = useState('');
  const [activeMarker, setActiveMarker] = useState(null);

  const addLocation = () => {
    if (address) {
      const newLocation = {
        id: locations.length + 1,
        lat: 32.7767 + Math.random() * 0.01,
        lng: 96.7970 + Math.random() * 0.01,
        address: address
      };
      setLocations([...locations, newLocation]);
      setAddress('');
    }
  };

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker.id);
  };

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyDCexQVc-38W5UbjuoHlvUkaQXvr4Vv3Dc">
        <GoogleMap
          mapContainerClassName="google-map"
          center={center}
          zoom={10}
          options={options}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleMarkerClick(location)}
            />
          ))}
          
          {locations.map((location) => (
            activeMarker === location.id ? (
              <InfoWindow
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div>
                  <h2>{location.address}</h2>
                </div>
              </InfoWindow>
            ) : null
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapComponent;