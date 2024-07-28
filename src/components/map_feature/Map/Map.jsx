import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';
import Rating from '@mui/material/Rating';

import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { getPlacesData } from '../../../api';
// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '124px',
}));

const MapContainer = styled(Box)(({ theme }) => ({
    height: '85vh',
    width: '100%',
}));

const MarkerContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    '&:hover': {
        zIndex: 2,
    },
}));

const Pointer = styled('div')(({ theme }) => ({
    cursor: 'pointer',
}));

const getPhotoUrl = (photoReference) => {
    const API_KEY = 'AIzaSyBiHG0yDcGnMY3DBuE68w3CpMex5e84akU';
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;
}

const Map = ({ setCoordinates, setBounds, coordinates }) => {
    const [places, setPlaces] = useState([]);
    const isDesktop = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        if (coordinates && coordinates.lat && coordinates.lng) {
            const sw = { lat: coordinates.lat - 0.05, lng: coordinates.lng - 0.05 };
            const ne = { lat: coordinates.lat + 0.05, lng: coordinates.lng + 0.05 };

            console.log('Coordinates:', coordinates);
            console.log('Bounding box:', { sw, ne });

            if (isNaN(sw.lat) || isNaN(sw.lng) || isNaN(ne.lat) || isNaN(ne.lng)) {
                console.error('Invalid bounding box coordinates:', { sw, ne });
                return;
            }

            getPlacesData(sw, ne)
                .then((data) => {
                    console.log('Fetched places data:', data);
                    setPlaces(data);
                })
                .catch((error) => {
                    console.error('Error fetching places data:', error);
                });
        } else {
            console.error('Invalid coordinates:', coordinates);
        }
    }, [coordinates]);

    return (
        <MapContainer>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBiHG0yDcGnMY3DBuE68w3CpMex5e84akU' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                }}
                onChange={(e) => {
                    console.log('Map changed:', e);
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(key, childProps) => {
                    console.log(`Child clicked: ${key}`, childProps);
                }}
            >
                {places?.map((place, i) => {
                    const lat = Number(place.geometry?.location?.lat);
                    const lng = Number(place.geometry?.location?.lng);

                    if (isNaN(lat) || isNaN(lng)) {
                        console.warn(`Place ${place.name} has invalid coordinates: lat=${lat}, lng=${lng}`);
                        return null;
                    }

                    return (
                        <MarkerContainer
                            lat={lat}
                            lng={lng}
                            key={i}
                        >
                            {isDesktop ? (
                                <StyledPaper elevation={3}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={Pointer}
                                        src={place.photos ? getPhotoUrl(place.photos[0].photo_reference) : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/tiV7IgAAAAASUVORK5CYII='}
                                        alt={place.name}
                                    />
                                    <Rating name="read-only" value={place.rating || 0} readOnly />
                                </StyledPaper>
                            ) : (
                                <LocationOnOutlined color="primary" fontSize="large" />
                            )}
                        </MarkerContainer>
                    );
                })}
            </GoogleMapReact>
        </MapContainer>
    );
}

export default Map;
