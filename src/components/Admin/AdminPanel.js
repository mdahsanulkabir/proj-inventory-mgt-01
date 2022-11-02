import { Box, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <Box
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography variant='h2' component='h2' sx={{color: 'blue'}}>
            dsfsdfsdfsdfsdfsdfsfd sdf s s asd afd ds
        </Typography>
            <Outlet />
        </Box>
    );
};

export default AdminPanel;