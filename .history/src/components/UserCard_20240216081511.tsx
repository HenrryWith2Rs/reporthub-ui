import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';

// Styled Paper component with glassy transparency
const GlassyPaper = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(10px) saturate(200%)',
  backgroundColor: 'rgba(255, 255, 255, 0.3)', // Colorful background with transparency
  //   boxShadow: theme.shadows[3], // Apply shadow
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

type UserCardProps = {
  name: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
};

const UserCard: React.FC<UserCardProps> = ({ name, sub, role, iat, exp }) => {
  return (
    <GlassyPaper elevation={0}>
      {' '}
      {/* Glassy paper background */}
      <Card variant="outlined">
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {role}
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            User ID: {sub}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Issued At: {new Date(iat * 1000).toLocaleString()}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Expiration Time: {new Date(exp * 1000).toLocaleString()}
          </Typography>
        </Box>
        <Divider />
      </Card>
    </GlassyPaper>
  );
};

export default UserCard;
