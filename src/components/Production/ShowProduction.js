import { Box, Button, ButtonGroup, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';




const ShowProduction = () => {
    const navigate = useNavigate();

    return (
      <Box sx={{ bgcolor: '#AAAAAA', width: "100%" }}>
        <Toolbar />
        <Typography variant='h5' component='h5' color='secondary' sx={{textAlign:'center', fontWeight: 700}}>Production History</Typography>
        <Toolbar>
          <ButtonGroup variant="contained" color='secondary'>
            <Button onClick={()=>navigate("")}>Daily</Button>
            <Button onClick={()=>navigate("")}>Weekly</Button>
            <Button onClick={()=>navigate("")}>Monthly</Button>
            <Button onClick={()=>navigate("")}>Yearly</Button>
          </ButtonGroup>
        </Toolbar>
        <Outlet />
      </Box>
    );
};


// ////////// selection of duration   >>>> LIST OPTIONS
// daily (startDate - endDate),   >>>>>>>> Default THIS MONTH        >>> Date time picker (default show this month  -- for both start and end)
// weekly( startWeek -  endWeek), >>>>>>>> Default Last 10 WEEKS     >>> Date time picker (default show this month weeks)
// monthly (startMonth - endMonth), >>>>>> Default THIS YEAR         >>> Selection values -> date time picker (Default show this year's months)
// yearly (startYear - EndYear) >>>>>>>>>> Default ALL               >>> Selection values (2016 to this year)

// ////////// Selection of SKU  >>>>>>>>>> 
// show all SKU, show active SKU   >>>>>>> Default ACTIVE            >>> Option button  
// show Sonlu, SBS, WanBao, Own  >>>>>>>>> Default all checked       >>> Check BOX  

export default ShowProduction;