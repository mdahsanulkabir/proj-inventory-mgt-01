import { Source, Widgets } from '@mui/icons-material';
import { Autocomplete, Box, Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { TokenContext } from '../../App';
import useLoadParts from '../../Hooks/useLoadParts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const CreateBOM = () => {
    const token = useContext(TokenContext);
    const { parts } = useLoadParts();
    const [ sfgSource, setSFGSource ] = useState('F');
    const [ partsAndSFG, setPartsAndSFG ] = useState([{ _id: "", obj_id : "", model_type : "", quantity : 0, unit: ""}]);
    const [ sfgObject_id, setSFGObject_id ] = useState('');
    const [ sfgName, setSFGName ] = useState('')
    const [ sfgSisCode, setSfgSisCode ] = useState('')

    console.log(partsAndSFG);

    const part_model_type = "RM";
    const sfg_model_type = "SFGBOM";

    const partOptions = parts.map(part => ({
            label : part.material_name,
            _id : part._id,
            obj_id : part.object_id,
            sis_code : part.sis_code,
            unit : part.unit,
            model_type: "RM"
        })
    )

    const handleSubmit = () => {
        console.log({
            object_id : sfgObject_id,
            material_name : sfgName,
            sis_code : sfgSisCode,
            source_category : sfgSource,
            children : Object.values(partsAndSFG),
        });
    }
    
    const handleSFGObject_id = (e) => {
        setSFGObject_id(e.target.value);
    }
    
    const handleSFGName = (e) => {
        setSFGName(e.target.value);
    }

    const handleSFGSISCode = (e) => {
        setSfgSisCode(e.target.value)
    }

    const handleSource = (e) => {
        setSFGSource(e.target.value);
    }

    const handleParts = (e, index, newValue) => {
        console.log(newValue);
        const { _id, obj_id, model_type, unit } = newValue;
        const list = [ ...partsAndSFG ];
        list[index].obj_id = obj_id;
        list[index].model_type = model_type;
        list[index]._id = _id;
        list[index].unit = unit;
    }

    const handleQtyChange = (e, index) => {
        console.log("qty =", e.target.value);
        const { value } = e.target;
        const list = [ ...partsAndSFG ];
        list[index].quantity = parseFloat(value);
        setPartsAndSFG(list);
    }

    const handlePartsRemove = (index) => {
        const list = [...partsAndSFG];
        list.splice(index,1);
        setPartsAndSFG(list);
    }
    
    const handlePartsAndSFGAdd = () => {
        setPartsAndSFG([ ...partsAndSFG, {_id : "", obj_id : "", model_type : "", quantity : 0, unit : ""} ])
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
                            Create BOM
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
                            label="SFG Object ID"
                            autoFocus
                            onChange={(e) => handleSFGObject_id(e)}
                            value={sfgObject_id}
                            helperText="Must be Unique"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sfgName"
                            label="SFG Name"
                            onChange={(e) => handleSFGName(e)}
                            value={sfgName}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sisCode"
                            label="SIS Code"
                            onChange={(e) => handleSFGSISCode(e)}
                            value={sfgSisCode}
                            helperText="Must be Unique"
                        />
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">SFG Source</FormLabel>
                            <RadioGroup row name="row-radio-buttons-group" value={sfgSource}
                                onChange={(e) => handleSource(e)}
                            >
                                <FormControlLabel value="F" control={<Radio />} label="Internal Production" />
                                <FormControlLabel value="3rd-Plastic" control={<Radio />} label="3rd Party Plastic" />
                                <FormControlLabel value="3rd-Sheet" control={<Radio />} label="3rd Party Sheet" />
                            </RadioGroup>

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
                                    <TextField
                                        sx={{mt: 0, mb: 0}}
                                        margin="normal"
                                        required
                                        id="sisCode"
                                        label={`Quantity - (${partsAndSFG[index].unit})`}
                                        onChange={(e) => {
                                            handleQtyChange(e, index)
                                        }}
                                        value={partsAndSFG[index].quantity}
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
                        </FormControl> 
                        <Button variant="contained" onClick={()=>handleSubmit()}>
                            Save SFG BOM <span><ArrowForwardIosIcon sx={{ fontSize: 15 }} /></span>
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default CreateBOM;


                                // <Box key={index} sx={{display : 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                //     <Autocomplete
                                //         disablePortal
                                //         id="combo-box-demo"
                                //         options={partOptions}
                                //         sx={{ width: 700 }}
                                //         getOptionLabel={(option) => option.obj_id+" "+option.label}
                                //         isOptionEqualToValue = {(option, value) => {
                                //             // console.log((value, option));
                                //             return  option?.obj_id === value?.obj_id || option?.id === value?.id
                                //         }}
                                //         renderOption={(props, option) => (
                                //             <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                //             {/* <img
                                //                 loading="lazy"
                                //                 width="20"
                                //                 src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                //                 srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                //                 alt=""
                                //             /> */}
                                //             <span style={{color : 'red'}}>{option.obj_id}</span> {option.label} <span style={{color : 'blue'}}>{option.sis_code}</span>
                                //             </Box>
                                //         )}
                                //         renderInput={(params) => (
                                //             <TextField
                                //                 {...params}
                                //                 label="Choose a part"
                                //                 inputProps={{
                                //                     ...params.inputProps,
                                //                     autoComplete: 'new-password', // disable autocomplete and autofill
                                //                 }}
                                //             />
                                //         )}
                                //         onChange={(event, newValue) => setValue(newValue)}
                                //         value={value}
                                //     />
                                //     <TextField
                                //         sx={{mt: 0, mb: 0}}
                                //         margin="normal"
                                //         required
                                //         id="sisCode"
                                //         label="Quantity"
                                //         onChange={(e) => {
                                //             setQty(e.target.value)
                                //         }}
                                //         value={qty}
                                //     />
                                //     <Button variant="contained">Add Part</Button>
                                //     <Button color="error" variant="contained">Delete Part</Button>
                                // </Box>