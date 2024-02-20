import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

type UserCardProps = {
  name: string;
  sub: string;
  role: string;
};

const UserCard: React.FC<UserCardProps> = ({ name, sub, role }) => {
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
      </Box>
      <Divider />
    </Card>
  );
};

export default UserCard;
