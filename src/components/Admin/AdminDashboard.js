import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const AdminDashboard = () => {
    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <Typography variant='h2' component='h2' color="success">
                This is the admin Dashboard
            </Typography>
        </Box>
    );
};

export default AdminDashboard;