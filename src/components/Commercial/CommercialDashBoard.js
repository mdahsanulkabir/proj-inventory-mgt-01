import { Box, Typography } from '@mui/material';
import React from 'react';

const CommercialDashBoard = () => {
    return (
        <Box
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <Typography variant='h2' component='h2' color="success">
                This is the commercial Dashboard
            </Typography>
            <Typography>Total Supplier are AAA qty</Typography>
            <Typography>Import suppliers qty xxx qty</Typography>
            <Typography>3rd party yyy qty</Typography>
            <Typography>Local party zzz qty</Typography>
        </Box>
    );

    
};

export default CommercialDashBoard;