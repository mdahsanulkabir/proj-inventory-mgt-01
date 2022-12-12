import { Box, Typography } from '@mui/material';
import React from 'react';

const AllBOMDashboard = () => {
    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <Typography variant='h2' component='h2' color="success">
                This is the BOM Dashboard
            </Typography>
            <Typography>Total SFG is xx pcs</Typography>
            <Typography>Factory SFG is yy pcs</Typography>
            <Typography>3rd party SFG is zz pcs</Typography>
            <Typography variant='h3' component='h3' color='secondary'>
                For MRP - Goto BOM for MRP
            </Typography>
        </Box>
    );
};

export default AllBOMDashboard;