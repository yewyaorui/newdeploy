import React from 'react'
import { Box, Typography, Card, Button, Cardmedia, CardContent, CardActions, Chip, CardMedia } from '@mui/material'
import { LocationOn } from '@mui/icons-material';
import { Phone } from '@mui/icons-material';

import { styled } from '@mui/material/styles';

// Styled components
const StyledChip = styled(Chip)(({ theme }) => ({
    margin: '5px 5px 5px 0',
}));

const Subtitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
}));

const Spacing = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    border: '3px solid transparent',
    transition: '1s all ease-out',
    '&:hover': {
        border: '3px solid grey',
    },
}));



const getPhotoUrl = (photoReference) => {
    const API_KEY = 'AIzaSyBiHG0yDcGnMY3DBuE68w3CpMex5e84akU';
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;
}


const PlaceDetails = ({ place }) => {
    const placeholderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/tiV7IgAAAAASUVORK5CYII=";
    const photoUrl = place.photos ? getPhotoUrl(place.photos[0].photo_reference) : placeholderImage;

    return (
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={photoUrl}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant='subtitle1'>Rating</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.rating}</Typography>
                </Box>

                <Subtitle>
                    <LocationOn />
                    <Typography variant="body2" color="textSecondary" component="p">
                        {place.formatted_address}
                    </Typography>
                </Subtitle>

                {place.formatted_phone_number && (
                    <Spacing>
                        <Phone />
                        <Typography variant="body2" color="textSecondary" component="p">
                            {place.formatted_phone_number}
                        </Typography>
                    </Spacing>
                )}
            </CardContent>
            <CardActions>

                <StyledButton size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                    Website
                </StyledButton>
            </CardActions>
        </Card>
    );
};

export default PlaceDetails;