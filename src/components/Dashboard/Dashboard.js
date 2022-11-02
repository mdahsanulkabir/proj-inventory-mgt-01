import { Box, Toolbar, Typography } from '@mui/material';
import React from 'react';


const Dashboard = () => {
    
    return (
        <Box
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography variant='h2' component='h2' sx={{color: 'blue'}}>
            This is the Dashboard
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent eleme
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidun
        </Typography>
      </Box>
    );
};

export default Dashboard;