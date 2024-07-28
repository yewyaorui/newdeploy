import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

// Styled components
const Title = styled(Typography)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'block',
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

const StyledSearchIcon = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const InputRoot = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
}));

const InputInput = styled('input')(({ theme }) => ({
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '20ch' },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#CE7777',
}));

const Header = () => {
    return (
        <AppBar position="static">
            <StyledToolbar>
                <Title variant="h5">
                    Clinic Finder
                </Title>
                <Box display="flex">
                    <Title variant="h6">
                        explore new places
                    </Title>
                    {/* <Autocomplete> */}
                    <Search>
                        <StyledSearchIcon>
                            <SearchIcon />
                        </StyledSearchIcon>
                        <InputRoot>
                            <InputInput placeholder="Search..." />
                        </InputRoot>
                    </Search>
                    {/* </Autocomplete> */}
                </Box>
            </StyledToolbar>
        </AppBar>
    );
};

export default Header;