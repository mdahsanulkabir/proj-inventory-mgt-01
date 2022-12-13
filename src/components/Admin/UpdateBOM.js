import { Widgets } from '@mui/icons-material';
import { Autocomplete, Box, Button, Container, CssBaseline, FormControl, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TokenContext } from '../../App';
import useLoadSFGBOM from '../../Hooks/useLoadSFGBOM';
import useLoadParts from '../../Hooks/useLoadParts';
import useLoadSFGSourceCategory from '../../Hooks/useLoadSFGSourceCategory';
import useLoadSFGCategory from '../../Hooks/useLoadSFGCategory';

const UpdateBOM = () => {
    const { sfgBOMs } = useLoadSFGBOM();
    const { parts } = useLoadParts();
    const { sfgSourceCategories } = useLoadSFGSourceCategory();
    const { sfgCategories } = useLoadSFGCategory();
    
    const token = useContext(TokenContext);

    console.log(sfgBOMs);

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

    const partOptions = rmParts.concat(sfgPart)

    const sfgSourceCategoryOptions = sfgSourceCategories.map(sfgSourceCategory => ({
        label: sfgSourceCategory.source_category,
        _id: sfgSourceCategory._id
    }))

    const sfgCategoryOptions = sfgCategories.map(sfgCategory => ({
        label: sfgCategory.sfg_category,
        _id: sfgCategory._id
    }))
    console.log("Sfg source options are = ",sfgSourceCategoryOptions);


    const handleSFGObject_id = (e) => {
        setSFGObject_id(e.target.value);
    }
    
    const handleSFGName = (e) => {
        setSFGName(e.target.value);
    }


    const [ sfgSource, setSFGSource ] = useState('');
    const handleSFGSource = (value) => {
        setSFGSource(value._id)
    }
    
    const [ sfgCategory, setSFGCategory ] = useState('')
    const handleSFGCategory = (value) => {
        console.log(value);
        setSFGCategory(value);
    }

    const handleSAPCode = (e) => {
        setSfgSAPCode(prev => e.target.value)
    }

    const handleSFGSISCode = (e) => {
        setSfgSisCode(e.target.value)
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

    const handlePartsAndSFGAdd = () => {
        setPartsAndSFG([ ...partsAndSFG, {_id : "", obj_id : "", model_type : "", quantity : 0, unit : ""} ])
    }
    

    const handlePartsRemove = (index) => {
        const list = [...partsAndSFG];
        list.splice(index,1);
        setPartsAndSFG(list);
    }
    
    const [ sfgObject_id, setSFGObject_id ] = useState('');
    const [ sfgName, setSFGName ] = useState('')
    const [ sfgSAPCode, setSfgSAPCode ] = useState('')
    const [ sfgSisCode, setSfgSisCode ] = useState('')
    const [ partsAndSFG, setPartsAndSFG ] = useState([{ 
        _id: "", obj_id : "", model_type : "", quantity : 0, unit: ""
    }]);
    const [ mySelectedSFG, setMySelectedSFG ] = useState({})


    const handleSelectedSFGBOM = ( sfgbom_id ) => {
        const selectedSFG = sfgBOMs.find(sfgBOM => sfgBOM._id === sfgbom_id)
        console.log(selectedSFG);
        setMySelectedSFG(selectedSFG);
        setSFGObject_id(selectedSFG.object_id);
        setSFGName(selectedSFG.material_name);
        setSFGSource({
            _id : selectedSFG.source_category,
            label : sfgSourceCategoryOptions.find(source_ => source_._id === selectedSFG.source_category).label
        });
        setSFGCategory({
            _id:selectedSFG.sfg_category,
            label: sfgCategoryOptions.find(cat => cat._id === selectedSFG.sfg_category).label
        });
        setSfgSAPCode(selectedSFG.sap_code);
        setSfgSisCode(selectedSFG.sis_code);

        const elements = selectedSFG.children.map(element => {
            return {
                _id : element.object_id._id, 
                obj_id : element.object_id.object_id, 
                model_type : element.model_type, 
                quantity : element.quantity,
                unit : element.object_id.unit
            }
        })
        console.log("elements are below =  ", elements);
        setPartsAndSFG(elements);
    }

    const handleSubmit = async () => {
        const hello = partsAndSFG.map((part, index) =>  ({
            object_id : part._id,
            model_type : part.model_type,
            quantity : parseFloat(part.quantity) ? parseFloat(part.quantity) : 0
        }))

        console.log({
            object_id : sfgObject_id,
            material_name : sfgName,
            source_category : sfgSource._id,
            sfg_category: sfgCategory._id,
            sap_code: sfgSAPCode,
            sis_code : sfgSisCode,
            children : hello    //  Object.values(partsAndSFG)
        });

        const newSFGBOM = {
            object_id : sfgObject_id,
            material_name : sfgName,
            source_category : sfgSource._id,
            sfg_category: sfgCategory._id,
            sap_code: sfgSAPCode,
            sis_code : sfgSisCode,
            children : hello //Object.values(partsAndSFG),
        }

        const response = await fetch(`http://localhost:5000/api/update-sfgBOM/${mySelectedSFG._id}`, {
            method: "PATCH",
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
            console.log("BOM UPDATED");
            console.log(json);
        }
    }

    return (
        <Box>
            <CssBaseline />
            <Container>
            <Paper elevation = {3}>
                <Grid container>
                    <Grid item xs={8}>
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
                                Update BOM
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
                                InputLabelProps={{ shrink: true }}
                                helperText="Must be Unique"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="sfgName"
                                label="SFG Name"
                                onChange={(e) => handleSFGName(e)}
                                InputLabelProps={{ shrink: true }}
                                value={sfgName}
                            />
                            <Autocomplete 
                                disablePortal
                                options={sfgSourceCategoryOptions}
                                value={sfgSource}
                                getOptionLabel = {(sfgSource) => sfgSource?.label}
                                // value={mySelectedSFG?.source_category}
                                isOptionEqualToValue = {(sfgSource, value) => {
                                    return sfgSource._id === value._id
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
                                value={sfgCategory}
                                getOptionLabel = {(sfgCategory) => sfgCategory?.label}
                                isOptionEqualToValue = {(sfgCategory, value) => {
                                    return sfgCategory._id === value._id
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
                                InputLabelProps={{ shrink: true }}
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
                                InputLabelProps={{ shrink: true }}
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
                                            InputLabelProps={{ shrink: true }}
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
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>List of SFG BOMs</Typography>
                        <List sx={{overflow: "auto", height:"60vh"}}>
                            {
                                sfgBOMs?.map(sfgBOM => {
                                    return (
                                        <ListItem disablePadding key={sfgBOM._id}>
                                            <ListItemButton onClick={() => handleSelectedSFGBOM(sfgBOM._id)}>
                                                <ListItemIcon>
                                                    <Widgets color="primary" />
                                                </ListItemIcon>
                                                    <ListItemText primary={`${sfgBOM.material_name}`} />
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Grid>
                </Grid>
                <Button variant="contained" onClick={handleSubmit} sx={{ m : 3}}>
                    Update BOM <span><ArrowForwardIosIcon sx={{ fontSize: 15 }} /></span>
                </Button>
            </Paper>
            </Container>
        </ Box>
    );
};

export default UpdateBOM;