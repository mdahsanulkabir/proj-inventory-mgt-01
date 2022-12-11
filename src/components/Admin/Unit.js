import { ScaleTwoTone, Widgets } from '@mui/icons-material';
import { Box, Button, Container, CssBaseline, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Unit = () => {
    const [unitName, setUnitName] = useState("");
    const [unitSymbol, setUnitSymbol] = useState("");
    const [ presentUnits, setPresentUnits ] = useState([])
    const [error, setError] = useState(null);

    useEffect(()=> {
        fetch('http://localhost:5000/api/units')
        .then(res => res.json())
        .then(data => setPresentUnits(data))
        .catch(error => console.log(error))
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUnit = { 
            unitName, unitSymbol
        }
        const response = await fetch(`http://localhost:5000/api/unit`, {
            method: "POST",
            body: JSON.stringify(newUnit),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();
        console.log(response);

        if (!response.ok) {
            setError(json.error);
        }

        if(response.ok){
            setUnitName("");
            setUnitSymbol("");
            setError(null);
        }
    }
    return (
        <Box>
            <CssBaseline />
            <Container >
                <Paper elevation = {4} sx={{display : 'flex'}}>
                    <Box>
                        <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: 'center' }}> 
                            <Widgets color="primary" />
                            <Typography
                                variant="h6"
                                component="h6"
                                color="primary.main"
                                align="center"
                            >Present Units in Action</Typography>
                        </Box>
                        <Box sx={{alignItems:'center'}}>
                            {
                                presentUnits.map((presentUnit, index)=> (
                                    <Typography key={index} variant='h6' component='h6' color='secondary.main'>{presentUnit.unitName}</Typography>
                                ))
                            }
                        </Box>
                        
                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: 'center' }}> 
                            <Widgets color="primary" />
                            <Typography
                                variant="h6"
                                component="h6"
                                color="primary.main"
                                align="center"
                            >Add Unit</Typography>
                        </Box>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, marginInline: '20px'}}>
                            <TextField margin="normal" required fullWidth id="unitName" label="Unit Name" onChange={(e)=> setUnitName(e.target.value)} space={unitName}/>
                            <TextField margin="normal" required fullWidth id="unitSymbol" label="Unit Symbol" onChange={(e)=> setUnitSymbol(e.target.value)} space={unitSymbol}/>
                            <Box sx={{ width: '100%', display : 'flex', justifyContent: 'center'}}>
                                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, }}>
                                    <ScaleTwoTone sx={{mr:1}}/> Create Unit
                                </Button>
                            </Box>
                            {error && <div className="error">{error}</div>}
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Unit;