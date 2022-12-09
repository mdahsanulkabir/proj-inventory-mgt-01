import { Widgets } from '@mui/icons-material';
import { Autocomplete, Box, Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { TokenContext } from '../../App';
import useLoadParts from '../../Hooks/useLoadParts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const CreateBOM = () => {
    // const [value, setValue] = useState(null);
    const [qty, setQty] = useState(0);
    const token = useContext(TokenContext);
    const { parts } = useLoadParts();
    const [ partsAndSFG, setPartsAndSFG ] = useState([{ _id: "", obj_id : "", model_type : "", quantity : 0}]);
    // console.log(parts);
    // console.log(value?.id , "qty = ", qty);
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
        console.log(partsAndSFG);
    }

    const handleParts = (e, index, newValue) => {
        console.log(newValue);
        const { _id, obj_id, model_type } = newValue;
        const list = [ ...partsAndSFG ];
        list[index].obj_id = obj_id;
        list[index].model_type = model_type;
        list[index]._id = _id;
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
        setPartsAndSFG([ ...partsAndSFG, {_id : "", obj_id : "", model_type : "", quantity : 0} ])
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
                        onSubmit={handleSubmit}
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
                            onChange={(e) => {

                            }}
                            value={""}
                            helperText="Must be Unique"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sfgName"
                            label="SFG Name"
                            onChange={(e) => {

                            }}
                            value={""}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sisCode"
                            label="SIS Code"
                            onChange={(e) => {

                            }}
                            value={""}
                            helperText="Must be Unique"
                        />
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">SFG Source</FormLabel>
                            <RadioGroup row name="row-radio-buttons-group" defaultValue="F"
                                onChange={(e) => {

                                }}
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
                                        onChange={(e, newValue) => handleParts(e, index, newValue)}
                                        // value={partsAndSFG[index]}
                                    />
                                    <TextField
                                        sx={{mt: 0, mb: 0}}
                                        margin="normal"
                                        required
                                        id="sisCode"
                                        label="Quantity"
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