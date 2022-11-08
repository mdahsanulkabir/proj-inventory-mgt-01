import { 
    Box, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography } from '@mui/material';
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useLoadDailyFGProdData from '../../Hooks/useLoadDailyFGProdData';
import useLoadSKU from '../../Hooks/useLoadSKU';


const ProductionHistoryDaily = () => {
    const [ startDate, setStartDate ] = useState('2022-09-30');
    const [ endDate, setEndDate ] = useState('2022-11-01');
    const { dailyFGProdData } = useLoadDailyFGProdData(startDate, endDate);
    const { skus } = useLoadSKU();
    console.log(skus);
    console.log(dailyFGProdData);
    const [ duration, status, categoryChecked ] = useOutletContext();

    //get the dates of the selected duration range
    let uniqueDates = [...new Set(dailyFGProdData.map(item => item.date))];
    uniqueDates = uniqueDates.sort();
    console.log('dates count =', uniqueDates.length);

    return (
        <Box 
            sx={{ p: 3, width:'100%' }}
        >
            <Typography variant='h5' component='h5' color='secondary' 
                sx={{textAlign:'center', fontWeight: 700}}>
                    Production History Daily 
            </Typography>

            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            >
                <TableContainer component={Paper} sx={{ width: '100%',height:700 }}>
                    <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" width={50}>
                                SL
                            </TableCell>
                            <TableCell align="center">MODEL</TableCell>
                            <TableCell align="center">COLOR</TableCell>
                            <TableCell align="center">SKU</TableCell>
                            {
                                uniqueDates.map(date => {
                                    return (
                                        <TableCell align='center'>
                                            {date}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {   
                            skus?.map((sku, index) => {
                        return (
                            <TableRow
                                key={sku.sku}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>
                                    {index+1}
                                </TableCell>
                                <TableCell align="center">{sku.model}</TableCell>
                                <TableCell align="center">{sku.color}</TableCell>
                                <TableCell align="left">dfdfd</TableCell>
                                {
                                    uniqueDates.map(date => {
                                        return (
                                            <TableCell align='center'>
                                                {
                                                    dailyFGProdData.find((data) => data.date === date && data.sku === sku._id) ? 
                                                    dailyFGProdData.find((data) => data.date === date && data.sku === sku._id).quantity
                                                    : ''
                                                }
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            
        </Box>
    );
};

export default ProductionHistoryDaily;