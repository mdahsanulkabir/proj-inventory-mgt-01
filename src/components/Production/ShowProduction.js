import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';




const ShowProduction = () => {
    const navigate = useNavigate();
    const [duration, setDuration] = useState('daily');
    const [status, setStatus] = useState('all');
    const [ categoryChecked, setCategoryChecked ] = useState([true, true, true, true])

    

    const handleAllChecked = (event) => {
        setCategoryChecked([
            event.target.checked, 
            event.target.checked,
            event.target.checked,
            event.target.checked
        ]);
    }
    const handleChecked0 = (event) => {
        setCategoryChecked([
            event.target.checked, 
            categoryChecked[1],
            categoryChecked[2],
            categoryChecked[3]
        ]);
    }
    const handleChecked1 = (event) => {
        setCategoryChecked([
            categoryChecked[0], 
            event.target.checked,
            categoryChecked[2],
            categoryChecked[3]
        ]);
    }
    const handleChecked2 = (event) => {
        setCategoryChecked([
            categoryChecked[0], 
            categoryChecked[1],
            event.target.checked,
            categoryChecked[3]
        ]);
    }
    const handleChecked3 = (event) => {
        setCategoryChecked([
            categoryChecked[0], 
            categoryChecked[1],
            categoryChecked[2],
            event.target.checked
        ]);
    }

    useEffect(()=>{
        duration === 'daily' && navigate('/layout/showProduction') 
        duration === 'weekly' && navigate('weeklyProduction') 
        duration === 'monthly' && navigate('monthlyProduction') 
        duration === 'yearly' && navigate('yearlyProduction')
    },[duration])

    

    return (
        <Box sx={{  width: "100%" }}>
            <Toolbar />
            <Typography variant='h5' component='h5' color='secondary' sx={{textAlign:'center', fontWeight: 700}}>Production History</Typography>
            <Box>
                <FormControl sx={{marginInline:'auto', width:'100%'}}>
                    <Grid container spacing={3} sx={{alignItems : 'flex-end'}}>
                        <Grid item md={4}>
                            <Paper>
                            <FormLabel id="demo-row-radio-buttons-group-label">Duration</FormLabel>
                            <RadioGroup row name="row-radio-buttons-group" 
                                value={duration}
                                onChange={(e)=>{
                                    setDuration(e.target.value);
                                    // duration === 'daily' && navigate('/layout/showProduction') 
                                    // duration === 'weekly' && navigate('weeklyProduction') 
                                    // duration === 'monthly' && navigate('monthlyProduction') 
                                    // duration === 'yearly' && navigate('showProduction/yearlyProduction') 
                                }}
                            >
                                <FormControlLabel value="daily" control={<Radio color='secondary'/>} label="Daily"/>
                                <FormControlLabel value="weekly" control={<Radio color='secondary'/>} label="Weekly" />
                                <FormControlLabel value="monthly" control={<Radio color='secondary'/>} label="Monthly" />
                                <FormControlLabel value="yearly" control={<Radio color='secondary'/>} label="Yearly" />
                            </RadioGroup>
                            <Divider />
                            </Paper>
                        </Grid>
                        <Grid item md={4}>
                            <Paper>
                                <FormLabel id="demo-row-radio-buttons-group-label">Select Active/All SKU</FormLabel>
                            <RadioGroup row name="row-radio-buttons-group" 
                                value={status}
                                onChange={(e)=>setStatus(e.target.value)}
                            >
                                <FormControlLabel value="all" control={<Radio color='secondary'/>} label="Select All SKU" />
                                <FormControlLabel value="active" control={<Radio color='secondary'/>} label="Select Active SKU Only" />
                            </RadioGroup>
                            <Divider />
                            </Paper>
                        </Grid>
                        <Grid item md={4}>
                            <Paper>
                            <FormLabel>Select SKU Category</FormLabel>
                            <FormControlLabel
                                label='All Category'
                                control={
                                    <Checkbox
                                        color='secondary'
                                        checked={
                                            categoryChecked[0] && (categoryChecked[1] && (categoryChecked[2] && categoryChecked[3]))
                                        }
                                        indeterminate={
                                            categoryChecked.some(item => item === true) === 
                                            categoryChecked.some(item => item === false)
                                        }
                                        onChange={handleAllChecked}
                                    />
                                }
                            />
                            <FormGroup sx={{ display: 'flex', flexDirection:'row' }}>
                                <FormControlLabel control={<Checkbox color='secondary' checked={categoryChecked[0]} onChange={handleChecked0}/>} label="Own Items" />
                                <FormControlLabel control={<Checkbox color='secondary' checked={categoryChecked[1]} onChange={handleChecked1}/>} label="Sonlu Items" />
                                <FormControlLabel control={<Checkbox color='secondary' checked={categoryChecked[2]} onChange={handleChecked2}/>} label="SBS Items" />
                                <FormControlLabel control={<Checkbox color='secondary' checked={categoryChecked[3]} onChange={handleChecked3}/>} label="WanBao Items" />
                            </FormGroup>
                            <Divider />
                            </Paper>
                        </Grid>
                    </Grid>
                </FormControl>
            </Box>
            <Outlet context={[duration , status, categoryChecked]}/>
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

// ////////// selection of SKU series
// show Sonlu, SBS, WanBao, Own  >>>>>>>>> Default all checked       >>> Check BOX  

export default ShowProduction;