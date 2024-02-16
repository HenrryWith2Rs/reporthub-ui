import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

type UserCardProps = {
  name: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
};

const UserCard: React.FC<UserCardProps> = ({ name, sub, role, iat, exp }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
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
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          Select type
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color="primary" label="Soft" size="small" />
          <Chip label="Medium" size="small" />
          <Chip label="Hard" size="small" />
        </Stack>
      </Box>
    </Card>
  );
};

export default UserCard;
