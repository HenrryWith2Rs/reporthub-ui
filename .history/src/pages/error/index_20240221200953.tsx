import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/'); // Navigate to the dashboard route
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={handleBackToDashboard}>
              Back Home
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://images.pexels.com/photos/13582220/pexels-photo-13582220.jpeg"
              alt=""
              width={250}
              height={500}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}