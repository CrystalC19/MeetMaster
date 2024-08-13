// src/utils/geocode.js
import axios from 'axios';

const API_KEY = 'AIzaSyD7dokCBpYsusuyt5lOP5ZB3eaCaWV5JEM';

export const geocodeAddress = async (address) => {
  console.log('Geocoding address:', address); // Log the address being geocoded

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    );

    console.log('Geocoding response:', response.data); // Log the full response data

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      console.log('Geocoded location:', location); // Log the latitude and longitude
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('Geocoding failed: ' + response.data.status);
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Geocoding failed');
  }
};
