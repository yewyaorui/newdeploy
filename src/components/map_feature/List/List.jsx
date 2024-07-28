import React, { useState } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';


// Styled components
const StyledFormControl = styled(FormControl)(({ theme }) => ({
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: '30px',
}));

const SelectEmpty = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const Loading = styled(Box)(({ theme }) => ({
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const Container = styled(Box)(({ theme }) => ({
    padding: '25px',
    backgroundColor: '#E8C4C4',
}));

const MarginBottom = styled(Box)(({ theme }) => ({
    marginBottom: '30px',
}));

const list = styled(Box)(({ theme }) => ({
    height: '75vh',
    overflow: 'auto',
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
    height: '75vh',
    overflow: 'auto',
}));



const List = ({ places }) => {
    const [type, setType] = useState('clinics');
    const [rating, setRating] = useState('');



    return (
        <Container>
            <Typography variant="h4">Clinics & Pet Stores around you~~</Typography>
            <StyledFormControl>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="clinics">Clinics</MenuItem>
                    <MenuItem value="pet store">Pet Store</MenuItem>
                </Select>
            </StyledFormControl>

            <StyledFormControl>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </StyledFormControl>
            <StyledGrid container spacing={3}>
                {places?.map((place, i) => (
                    <Grid item key={i} xs={12} >
                        <PlaceDetails place={place} />
                    </Grid>
                ))}
            </StyledGrid>
        </Container>
    );
};

export default List;