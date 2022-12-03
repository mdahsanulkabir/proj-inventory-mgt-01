import { Business } from '@mui/icons-material';
import { Box, Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useReducer } from 'react';
import { useState } from 'react';
import { TokenContext } from '../../App';

const supplierInitialState = {
    supplierID : '', 
    supplierName : '',
    supplierEmail : '',
    supplierAddress : '',
    supplierContactPerson : '',
    supplierContactPersonPhoneNumber : '',
    supplierCategory : '',
}

const reducerSupplier = ( state, action ) => {
    console.log(action);
    switch ( action.type ) {
        case 'supplierID' : return { ...state, supplierID : action.payload };
        case 'supplierName' : return { ...state, supplierName : action.payload };
        case 'supplierEmail' : return { ...state, supplierEmail : action.payload };
        case 'supplierAddress' : return { ...state, supplierAddress : action.payload };
        case 'supplierContactPerson' : return { ...state, supplierContactPerson : action.payload };
        case 'supplierContactPersonPhoneNumber' : return { ...state, supplierContactPersonPhoneNumber : action.payload };
        case 'supplierCategory' : return { ...state, supplierCategory : action.payload };
        case 'reset' :  return supplierInitialState;
        default:        throw new Error(`Unknown action type: ${action.type}`);
    }
}

const CreateSupplier = () => {
    const [ supplierState, dispatchSupplier ] = useReducer ( reducerSupplier, supplierInitialState)
    const [error, setError] = useState('');
    const token = useContext(TokenContext);

    // const supplierID = supplierState.supplierID
    // const supplierName = supplierState.supplierName
    // const supplierEmail = supplierState.supplierEmail
    // const supplierAddress = supplierState.supplierAddress
    // const supplierContactPerson = supplierState.supplierContactPerson
    // const supplierContactPersonPhoneNumber = supplierState.supplierContactPersonPhoneNumber
    // const supplierCategory = supplierState.supplierCategory

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const newSupplier = { 
        //     supplierID,
        //     supplierName,
        //     supplierEmail,
        //     supplierAddress,
        //     supplierContactPerson,
        //     supplierContactPersonPhoneNumber,
        //     supplierCategory
        // }
        console.log(supplierState);
        console.log(token);
        const response = await fetch(`http://localhost:5000/api/createSupplier`, {
            method: "POST",
            body: JSON.stringify(supplierState),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token,
            },
        });

        const json = await response.json();
        console.log(response);

        if (!response.ok) {
            setError(json.error);
        }

        if(response.ok){
            dispatchSupplier({
                type : 'reset',
            })
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
                        <Business color="primary" />
                        <Typography
                            variant="h6"
                            component="h6"
                            color="primary.main"
                            align="center"
                        >
                            Create a new Supplier
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
                            id="supplierID"
                            label="Supplier ID"
                            autoFocus
                            onChange={(e) => dispatchSupplier({
                                type : 'supplierID',
                                payload : e.target.value})}
                            value={ supplierState.supplierID }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="supplierName"
                            label="Supplier Name"
                            onChange={(e) => dispatchSupplier({
                                type : 'supplierName',
                                payload : e.target.value})}
                            value={supplierState.supplierName}
                            helperText="Must be Unique"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="supplierEmail"
                            label="Supplier Email"
                            onChange={(e) => dispatchSupplier({
                                type : 'supplierEmail',
                                payload : e.target.value})}
                            value={supplierState.supplierEmail}
                            helperText="Must be Unique"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="supplierAddress"
                            label="Source Address"
                            onChange={(e) => dispatchSupplier({
                                type : 'supplierAddress',
                                payload : e.target.value})}
                            space={supplierState.supplierAddress}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="supplierContactPerson"
                            label="Supplier Contact Person"
                            onChange={(e) => dispatchSupplier({
                                type : 'supplierContactPerson',
                                payload : e.target.value})}
                            value={supplierState.supplierContactPerson}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="supplierContactPersonPhoneNumber"
                            label="Supplier Contact Person Phone"
                            onChange={(e) => dispatchSupplier({
                                type : 'supplierContactPersonPhoneNumber',
                                payload : e.target.value})}
                            value={supplierState.supplierContactPersonPhoneNumber}
                        />
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Email Verified</FormLabel>
                            <RadioGroup row name="row-radio-buttons-group" defaultValue="local"
                                onChange={(e) => dispatchSupplier({
                                    type : 'supplierCategory',
                                    payload : e.target.value})}
                            >
                                <FormControlLabel value="local" control={<Radio />} label="Local Supplier" />
                                <FormControlLabel value="3rd Party" control={<Radio />} label="3rd Party Supplier" />
                                <FormControlLabel value="import" control={<Radio />} label="Import Supplier" />
                            </RadioGroup>
                        </FormControl>
                        
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
                            Create Supplier
                        </Button>
                        </Box>
                        {error && <div className="error">{error}</div>}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default CreateSupplier;