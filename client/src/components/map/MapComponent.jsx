import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
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
    <div>
      <LoadScript googleMapsApiKey="AIzaSyDCexQVc-38W5UbjuoHlvUkaQXvr4Vv3Dc">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
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

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter an address"
      />
      <button onClick={addLocation}>Add Event</button>
    </div>
  );
}

export default MapComponent;
