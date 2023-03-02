import React from 'react'
import Header from '../../common/header/Header'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, TextField } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';



const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
);

const card = (
    <React.Fragment style={{ panding: "40px" }}>
        <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
        </Button>
        <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
        </IconButton>
        <CardContent>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </CardContent>
        <CardActions>
            <Button variant="contained">Contained</Button>
        </CardActions>
    </React.Fragment>
);
export default function SetUser() {
    return (
        <>
            <Header />
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card}</Card>
            </Box>
        </>
    )
}
