import { Widgets } from '@mui/icons-material';
import { Autocomplete, Box, Button, Container, CssBaseline, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';

const CreatePart = () => {
    const [object_id, setObject_id] = useState("");
    const [source_category, setSource_category] = useState("");
    const [rm_category, setRm_category] = useState("");
    const [sis_code, setSis_code] = useState("");
    const [material_name, setMaterial_name] = useState("");
    const [allUnits, setAllUnits] = useState([])
    const [unit, setUnit] = useState("unit");
    const [error, setError] = useState('');

    // ! Need to correct the code below 7 lines
    useEffect( () => {
        fetch(`http://localhost:5000/api/units`)
        .then(res => res.json())
        .then(data => {
            // const units = data.map((unit, index) => ({label:unit.unitName, id:index+1}))
            const units = data.map((unit) => unit.unitSymbol)
            setAllUnits(units);
            
        })
    },[])
    console.log(allUnits);
    console.log("unit is - ",unit);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPart = { 
            object_id, source_category, rm_category, sis_code, material_name, unit
        }
        const response = await fetch(`http://localhost:5000/api/rm`, {
            method: "POST",
            body: JSON.stringify(newPart),
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
            setObject_id("");
            setSource_category("");
            setRm_category("");
            setSis_code("");
            setMaterial_name("");
            setUnit("");
            setError(null);
        }
    }
    return (
        <Box>
            <CssBaseline />
            <Container>
                <Paper elevation = {3}>
                    <Box
                        sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: 'center'
                        }}
                    > 
                        <Widgets color="primary" />
                        <Typography
                            variant="h6"
                            component="h6"
                            color="primary.main"
                            align="center"
                        >
                            Create a new Part
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1, marginInline: '20px'}}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="materialName"
                            label="Material Name"
                            autoFocus
                            onChange={(e) => setMaterial_name(e.target.value)}
                            value={material_name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="objectID"
                            label="Object ID"
                            onChange={(e) => setObject_id(e.target.value)}
                            value={object_id}
                            helperText="Must be Unique"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sisID"
                            label="SIS ID"
                            onChange={(e) => setSis_code(e.target.value)}
                            value={sis_code}
                            helperText="Must be Unique"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sourceCategory"
                            label="Source Category"
                            onChange={(e)=> setSource_category(e.target.value)}
                            space={source_category}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="rmCategory"
                            label="RM Category"
                            onChange={(e)=> setRm_category(e.target.value)}
                            space={rm_category}
                        />
                        {/* // ! there are some isses with the autocomplete */}
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={allUnits}
                            sx={{ width: 300 }}
                            value={unit}
                            // isOptionEqualToValue={(option, value) => option.label === value.label}
                            onChange={(event, newValue)=> setUnit(newValue)}
                            renderInput={(params) => <TextField {...params} label="Unit" required />}
                        />
                        <Typography>Selected unit is {unit}</Typography>
                        <Box sx={{
                            width: '100%',
                            display : 'flex',
                            justifyContent: 'center'
                        }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, }}
                        >
                            Create Part
                        </Button>
                        </Box>
                        {error && <div className="error">{error}</div>}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default CreatePart;