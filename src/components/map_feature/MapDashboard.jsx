import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import List from './List/List';
import Map from './Map/Map';
import Header from './Header/Header';
import { getPlacesData } from '../../api';

const MapDashboard = () => {

    const [places, setPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    useEffect(() => {
        if (bounds) {
            // console.log(coordinates, bounds);

            getPlacesData(bounds.sw, bounds.ne)
                .then((data) => {
                    // console.log(data);
                    setPlaces(data);
                })
                .catch((error) => {
                    console.error("Error fetching places data:", error);
                });
        }
    }, [coordinates, bounds]);


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header />
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <List places={places} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MapDashboard;
