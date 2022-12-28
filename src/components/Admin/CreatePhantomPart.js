import { Widgets } from '@mui/icons-material';
import { Autocomplete, Box, Button, Container, CssBaseline, FormControl, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import useLoadParts from '../../Hooks/useLoadParts';
import useLoadSFGBOM from '../../Hooks/useLoadSFGBOM';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TokenContext } from '../../App';

const CreatePhantomPart = () => {
    // const token = useContext(TokenContext); //todo for now i am using local storage 
    const token = localStorage.getItem("token");
    
    const [ phantomObject_id, setPhantomObject_id ] = useState('')
    const [ phantomObject_name, setPhantomObject_name ] = useState('')
    const { parts } = useLoadParts();
    const { sfgBOMs } = useLoadSFGBOM();
    const [ partsAndSFG, setPartsAndSFG ] = useState([{ _id: "", obj_id : "", model_type : ""}]);

    const sfgPart = sfgBOMs.map(part => ({
        label : part.material_name,
        _id : part._id,
        obj_id : part.object_id,
        sis_code : part.sis_code,
        model_type: "SFGBOM"
    }))

    const rmParts = parts.map(part => ({
            label : part.material_name,
            _id : part._id,
            obj_id : part.object_id,
            sis_code : part.sis_code,
            model_type: "RM"
        })
    )

const partOptions = rmParts.concat(sfgPart)

    const handlePhantomObject_id = (e) => {
        setPhantomObject_id(e.target.value)
    }

    const handlePhantomObject_name = (e) => {
        setPhantomObject_name(e.target.value)
    }

    const handleParts = (e, index, newValue) => {
        console.log(newValue);
        const { _id, obj_id, model_type } = newValue;
        const list = [ ...partsAndSFG ];
        list[index].obj_id = obj_id;
        list[index].model_type = model_type;
        list[index]._id = _id;
    }

    const handlePartsRemove = (index) => {
        const list = [...partsAndSFG];
        list.splice(index,1);
        setPartsAndSFG(list);
    }
    
    const handlePartsAndSFGAdd = () => {
        setPartsAndSFG([ ...partsAndSFG, {_id : "", obj_id : "", model_type : ""} ])
    }

    const handleSubmit = async () => {
        const addedSubstitutes = partsAndSFG.map((part, index) =>  ({
            object_id : part._id,
            model_type : part.model_type
        }))

        const newPhantomPart = {
            object_id : phantomObject_id,
            material_name : phantomObject_name,
            source_category : "phantom",
            sfg_category: "phantom",
            sap_code: phantomObject_id,
            sis_code : `phantom-${phantomObject_id}`,
            substitutes : addedSubstitutes //Object.values(partsAndSFG),
        }

        const response = await fetch(`http://localhost:5000/api/createPhantomPart`, {
            method: "POST",
            body: JSON.stringify(newPhantomPart),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token,
            },
        });

        const json = await response.json();
        

        if (!response.ok) {
            console.log(json.error);
        }

        if(response.ok){
            // dispatch({ type : 'reset'})
            console.info("a new BOM added");
            console.log(json);
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
                            Create Phantom Part
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        // onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1, marginInline: '20px'}}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sfgID"
                            label="Phantom Part Object ID"
                            autoFocus
                            onChange={(e) => handlePhantomObject_id(e)}
                            value={phantomObject_id}
                            helperText="Must be Unique. SAP Code = object id, sis-code = phantom-object Id"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sfgName"
                            label="Phantom Part Name"
                            onChange={(e) => handlePhantomObject_name(e)}
                            value={phantomObject_name}
                        />
                    
                        <FormControl>
                            {/* //? the repeating component     */}
                            {
                                partsAndSFG.map((singlePartAndSFG, index) => (
                                    <Box key={index} sx={{display : 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Autocomplete
                                            disablePortal
                                            options={partOptions}
                                            sx={{ width: 700 }}
                                            getOptionLabel={(option) => option.obj_id +" "+ option.label }
                                            isOptionEqualToValue = {(option, singlePartAndSFG) => {
                                                // console.log(("value =",singlePartAndSFG, "options =", option));
                                                return  option.id === singlePartAndSFG.id
                                            }}
                                            renderOption={(props, option) => (
                                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                {/* <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                    alt=""
                                                /> */}
                                                <span style={{color : 'red'}}>{option?.obj_id}</span> {option?.label} <span style={{color : 'blue'}}>{option?.sis_code}</span>
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Choose a part"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                            onChange={(e, newValue) => newValue && handleParts(e, index, newValue)}
                                            // value={partsAndSFG[index]}
                                        />
                                        {
                                            partsAndSFG.length - 1 === index && (
                                                <Button variant="contained" 
                                                    onClick={() => handlePartsAndSFGAdd()}>
                                                    Add Part
                                                </Button>
                                            )
                                        }
                                        {
                                            partsAndSFG.length !== 1 && (
                                                <Button color="error" variant="contained"
                                                    onClick={() => handlePartsRemove(index)}>
                                                    Delete Part
                                                </Button>
                                            )
                                        }
                                    </Box>
                                ))
                            }
                            <Button variant="contained" onClick={handleSubmit}>
                                Save Phantom Part <span><ArrowForwardIosIcon sx={{ fontSize: 15 }} /></span>
                            </Button>
                        </FormControl> 
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default CreatePhantomPart;