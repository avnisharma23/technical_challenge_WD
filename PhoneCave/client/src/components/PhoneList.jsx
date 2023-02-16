

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

const theme = createTheme();

function PhoneList() {
  const [phones, setPhones] = useState(null)
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    console.log(API_URL);
    axios
      .get(`${API_URL}/api/phones`)
      .then(response => {
        setPhones(response.data)
        setLoading(false)
        console.log(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <PhoneIphoneIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            PhoneCave
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {loading && 
          <Box sx={{ display: 'flex', width:'100%', justifyContent:'center', top:'calc(50% - 93px)', position:'absolute'}}>
            <CircularProgress />
          </Box>
        }
        {!loading &&
          <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
            <Grid container spacing={4}>
              {phones.map((phone) => (
                <Grid item key={phone.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                      }}
                      image={phone.imageFileName}
                      alt="phone image"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {phone.name}
                      </Typography>
                      <Typography>
                      {phone.manufacturer}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`phones/${phone.id}`} >
                        <Button size="small">View</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        }       
      </main>
    </ThemeProvider>
  );
}

export default PhoneList