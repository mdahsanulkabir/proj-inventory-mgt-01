import { Box, Button, FormControl, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';

const LCStatusOptions = () => {
    const [ newStatusText, setNewStatusText ] = useState('')
    const [ newStatusDescription, setNewStatusDescription ] = useState('')
    const [ allStatus, setAllStatus ] = useState([])

    useEffect(()=> {
        fetch("http://localhost:5000/api/getLCStatusOptions")
        .then(res => res.json())
        .then(data => console.log(data))
    },[])

    const handleStatusText = (e) => {
        setNewStatusText(e.target.value);
    }
    const handleStatusDescription = (e) => {
        setNewStatusDescription(e.target.value);
    }

    const submit = async (event) => {
        event.preventDefault();
        console.log(newStatusText, newStatusDescription);
        const newStatus = {
            status : newStatusText,
            description : newStatusDescription
        }

        const response = await fetch(`http://localhost:5000/api/createLcStatus`, {
            method: "POST",
            body: JSON.stringify(newStatus),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();
        

        if (!response.ok) {
            console.log(json.error);
        }

        if(response.ok){
            // dispatch({ type : 'reset'})
            console.info("a new LC Status");
            console.log(json);
        }
    }
    return (
        <Box sx={{width:'60vw', height: '500px'}}>
            <Paper elevation={3}>
                <Grid container spacing={2} sx={{p:2}}>
                    <Grid item md={6}>
                        <Typography> Create New Status Option</Typography>
                        <FormControl component='form' onSubmit={submit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="statusText"
                                label="LC Status Name"
                                autoFocus
                                onChange={(e) => handleStatusText(e)}
                                value={newStatusText}
                                // InputLabelProps={{ shrink: true }}
                                helperText="Must be Unique"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="statusDescription"
                                label="LC Status Description"
                                onChange={(e) => handleStatusDescription(e)}
                                value={newStatusDescription}
                                // InputLabelProps={{ shrink: true }}
                            />
                            <Button type='submit' variant='outlined'> Create Status</Button>
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <Typography>Show Status Options</Typography>
                        {
                            allStatus ? allStatus.map( ( status, index ) => {
                                return (
                                    `${index} = ${status.status} : ${status.description}`
                                )
                            }) : "Not found"
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default LCStatusOptions;