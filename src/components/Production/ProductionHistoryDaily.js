import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import useLoadDailyFGProdData from '../../Hooks/useLoadDailyFGProdData';
import useLoadSKU from '../../Hooks/useLoadSKU';

const ProductionHistoryDaily = () => {
    const [ startDate, setStartDate ] = useState('2022-02-22');
    const [ endDate, setEndDate ] = useState('2022-05-22');
    const { dailyFGProdData } = useLoadDailyFGProdData(startDate, endDate);
    const { sku } = useLoadSKU();
    console.log(dailyFGProdData);

    return (
        <Box 
            sx={{ p: 3, width:'100%' }}
        >
            <Typography variant='h5' component='h5' color='secondary' 
                sx={{textAlign:'center', fontWeight: 700}}>
                    Production History Daily 
            </Typography>
            
        </Box>
    );
};

export default ProductionHistoryDaily;