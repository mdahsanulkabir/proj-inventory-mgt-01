import { Widgets } from '@mui/icons-material';
import { Autocomplete, Box, Button, Container, CssBaseline, FormControl, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useLoadParts from '../../Hooks/useLoadParts';
import useLoadSFGSourceCategory from '../../Hooks/useLoadSFGSourceCategory';
import useLoadSFGCategory from '../../Hooks/useLoadSFGCategory';
import useLoadSFGBOM from '../../Hooks/useLoadSFGBOM';
import { TokenContext } from '../../App';
import useLoadPhantomParts from '../../Hooks/useLoadPhantomParts';

const CreateBOM = () => {
    const { parts } = useLoadParts();
    const { sfgBOMs } = useLoadSFGBOM();
    const { phantomParts } = useLoadPhantomParts();
    const { sfgSourceCategories } = useLoadSFGSourceCategory();
    const { sfgCategories } = useLoadSFGCategory();
    const [ partsAndSFG, setPartsAndSFG ] = useState([{ _id: "", obj_id : "", model_type : "", quantity : 0, unit: ""}]);
    const [ sfgObject_id, setSFGObject_id ] = useState('');
    const [ sfgName, setSFGName ] = useState('')
    const [ sfgSource, setSFGSource ] = useState('F');
    const [ sfgCategory, setSFGCategory ] = useState('')
    const [ sfgSAPCode, setSfgSAPCode ] = useState('')
    const [ sfgSisCode, setSfgSisCode ] = useState('')
    // const token = useContext(TokenContext); //todo for now i am using local storage 
    const token = localStorage.getItem("token");

    // console.log(partsAndSFG);
    // console.log(sfgSourceCategories);
    // console.log(sfgSAPCode);
    // console.log(sfgBOMs);
    const sfgPart = sfgBOMs.map(part => ({
            label : part.material_name,
            _id : part._id,
            obj_id : part.object_id,
            sis_code : part.sis_code,
            unit : part.unit,
            model_type: "SFGBOM"
    }))
    
    const rmParts = parts.map(part => ({
            label : part.material_name,
            _id : part._id,
            obj_id : part.object_id,
            sis_code : part.sis_code,
            unit : part.unit,
            model_type: "RM"
        })
    )

    const phantom_parts = phantomParts.map(phantomPart => ({
        label : phantomPart.material_name,
        _id : phantomPart._id,
        obj_id : phantomPart.object_id,
        sis_code : phantomPart.sis_code,
        unit : phantomPart.unit,
        model_type: "PHANTOMPART"
    }))

    const firstCombinedPartOption = rmParts.concat(sfgPart)
    const partOptions = firstCombinedPartOption.concat(phantom_parts)

    console.log(rmParts);
    console.log(sfgPart);
    console.log(phantom_parts);

    const sfgSourceCategoryOptions = sfgSourceCategories.map(sfgSourceCategory => ({
        label: sfgSourceCategory.source_category,
        _id: sfgSourceCategory._id
    }))

    const sfgCategoryOptions = sfgCategories.map(sfgCategory => ({
        label: sfgCategory.sfg_category,
        _id: sfgCategory._id
    }))

    const handleParts = (e, index, newValue) => {
    console.log(newValue);
    const { _id, obj_id, model_type, unit } = newValue;
    const list = [ ...partsAndSFG ];
    list[index].obj_id = obj_id;
    list[index].model_type = model_type;
    list[index]._id = _id;
    list[index].unit = unit;
    }

    const handleSubmit = async () => {
        
        const addedChildren = partsAndSFG.map((part, index) =>  ({
                    object_id : part._id,
                    model_type : part.model_type,
                    quantity : parseFloat(part.quantity) ? parseFloat(part.quantity) : 0
                })
        )

        console.log({
            object_id : sfgObject_id,
            material_name : sfgName,
            source_category : sfgSource,
            sfg_category: sfgCategory,
            sap_code: sfgSAPCode,
            sis_code : sfgSisCode,
            children : addedChildren    //  Object.values(partsAndSFG)
        });

        const newSFGBOM = {
            object_id : sfgObject_id,
            material_name : sfgName,
            source_category : sfgSource,
            sfg_category: sfgCategory,
            sap_code: sfgSAPCode,
            sis_code : sfgSisCode,
            children : addedChildren //Object.values(partsAndSFG),
        }


        const response = await fetch(`http://localhost:5000/api/createSFGBOM`, {
            method: "POST",
            body: JSON.stringify(newSFGBOM),
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
    
    const handleSFGObject_id = (e) => {
        setSFGObject_id(e.target.value);
    }
    
    const handleSFGName = (e) => {
        setSFGName(e.target.value);
    }

    const handleSAPCode = (e) => {
        setSfgSAPCode(prev => e.target.value)
    }

    const handleSFGSISCode = (e) => {
        setSfgSisCode(e.target.value)
    }

    const handleSFGSource = (value) => {
        setSFGSource(value._id)
    }

    const handleSFGCategory = (value) => {
        console.log(value);
        setSFGCategory(value._id);
    }



    const handleQtyChange = (e, index) => {
        if(e.target.value) {
            // console.log("qty =", e.target.value);
            // console.log("type =", typeof e.target.value)
            const { value } = e.target;
            const list = [ ...partsAndSFG ];
            list[index].quantity = value;
            // console.log("type =", typeof list[index].quantity)
            // console.log("val =",  list[index].quantity)
            setPartsAndSFG(list);
        } else {
            // console.log("qty =", 0);
            const list = [ ...partsAndSFG ];
            list[index].quantity = "";
            setPartsAndSFG(list);
        };
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
                        <Autocomplete 
                            disablePortal
                            options={sfgSourceCategoryOptions}
                            getOptionLabel = {(option) => option.label}
                            isOptionEqualToValue = {(option, value) => {
                                return option.id === value.id
                            }}
                            renderOption = {(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    {option.label}
                                </Box>
                            )}
                            renderInput = {(params) => (
                                <TextField
                                    {...params}
                                    label="Choose a SFG source category"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                            onChange = {(e, newValue ) => newValue && handleSFGSource(newValue)}
                        />
                        <Autocomplete 
                            disablePortal
                            options={sfgCategoryOptions}
                            getOptionLabel = {(option) => option.label}
                            isOptionEqualToValue = {(option, value) => {
                                return option.id === value.id
                            }}
                            renderOption = {(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    {option.label}
                                </Box>
                            )}
                            renderInput = {(params) => (
                                <TextField
                                    {...params}
                                    label="Choose a SFG category"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                            onChange = {(e, newValue ) => newValue && handleSFGCategory(newValue)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="sapCode"
                            label="SAP Code"
                            onChange={(e) => handleSAPCode(e)}
                            value={sfgSAPCode}
                            helperText="Must be Unique"
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
                        <Button variant="contained" onClick={handleSubmit}>
                            Save SFG BOM <span><ArrowForwardIosIcon sx={{ fontSize: 15 }} /></span>
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default CreateBOM;