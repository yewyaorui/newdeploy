const axios = require('axios');

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const URL = `${PROXY_URL}https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
const API_KEY = 'AIzaSyBiHG0yDcGnMY3DBuE68w3CpMex5e84akU';

export const getPlacesData = async (sw, ne) => {
    try {
        if (!sw || !ne || !sw.lat || !sw.lng || !ne.lat || !ne.lng) {
            throw new Error('Invalid bounding box coordinates');
        }

        // Calculate the center of the bounding box
        const centerLat = (sw.lat + ne.lat) / 2;
        const centerLng = (sw.lng + ne.lng) / 2;

        const { data } = await axios.get(URL, {
            params: {
                location: `${centerLat},${centerLng}`,
                radius: 3000,
                type: 'veterinary_care',
                key: API_KEY
            }
        });

        if (!data.results) {
            throw new Error('No results found');
        }

        const detailedPlaces = await Promise.all(data.results.map(async (place) => {
            if (!place.place_id) {
                throw new Error(`Invalid place data: ${JSON.stringify(place)}`);
            }

            const placeDetails = await axios.get(`${PROXY_URL}https://maps.googleapis.com/maps/api/place/details/json`, {
                params: {
                    place_id: place.place_id,
                    key: API_KEY
                }
            });

            if (!placeDetails.data.result) {
                throw new Error(`No details found for place_id: ${place.place_id}`);
            }

            return placeDetails.data.result;
        }));

        return detailedPlaces;

    } catch (error) {
        if (error.response) {
            console.error("Response error: ", error.response.data);
        } else if (error.request) {
            console.error("Request error: ", error.request);
        } else {
            console.error("General error: ", error.message);
        }
        return [];
    }
};
