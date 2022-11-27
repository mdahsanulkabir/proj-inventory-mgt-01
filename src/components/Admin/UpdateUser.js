// ? Admin can create a new user with this form
// ? email should be fixed, user can change the displayName
// ? initially the password will be set as - Singer@!123. User must changer his/her password while 
// ? first log in
// ? User must verify his/her email. (Admin can by pass the verification in Update user form)
// ? Until verification, the account will be disabled and cannot access any route

import { ManageAccounts, Person } from '@mui/icons-material';
import { Box, Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useReducer } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


// initial state of the form
const allUserInitialState = [];
const reducerAllUserCredentials = (state, action) => {
    switch ( action.type ) {
        case 'INITIALISE_USERS':    return action.payload;
        case 'email':               return { ...state, userEmail : action.payload};
        case 'displayName':         return { ...state, displayName : action.payload};
        case 'error':               return { ...state, error : action.payload};
        case 'reset':               return allUserInitialState;
        default:                    throw new Error(`Unknown action type: ${action.type}`);
    }
}

const selectedUserInitialState = {};

const reducerSelectedUser = (state, action) => {
    switch ( action.type ) {
        case 'Initialise_selectedUser': return action.payload;
        case 'displayName':             return { ...state, displayName : action.payload };
        case 'phoneNumber':             return { ...state, phoneNumber : action.payload }
        case 'reset':                   return { ...state, error : action.payload}
        default:                        throw new Error(`Unknown action type: ${action.type}`);
    }
}

const UpdateUser = () => {
    
    const [ allUserCredentialsState, dispatchAllUserCredentials ] = useReducer( reducerAllUserCredentials, allUserInitialState );
    const [ selectedUserCredential, dispatchSelectedUserCredential ] = useReducer ( reducerSelectedUser , selectedUserInitialState );


    // TODO Move the token to global level and use useContext 
    const [ token, setToken ] = useState('');
    const [user] = useAuthState(auth);
    useEffect(()=> {
        if(user){
            user.getIdToken(true)
            .then(res => setToken(res))
            .catch(error => console.log(error))
        }
        },[])
    

    //? loading all user credentials
    useEffect( () => {
        fetch(`http://localhost:5000/api/getUsers`)
        .then(res => res.json())
        .then(data => {
            dispatchAllUserCredentials({
                type: 'INITIALISE_USERS',
                payload: data
            })

        })
        .catch(error => console.log(error))
    },[])

    allUserCredentialsState && console.log(allUserCredentialsState);

    const handleSelectedUser = (email) => {
        const selectedUser = allUserCredentialsState.find(getuser => getuser.email === email);
        dispatchSelectedUserCredential({
            type: 'Initialise_selectedUser',
            payload: selectedUser
        })
        console.log(selectedUser);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedUserCredential);

        

        //? below codes are for the API
        const response = await fetch(`http://localhost:5000/api/update-user`, {
            method: "PATCH",
            body: JSON.stringify(selectedUserCredential),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token,
            },
        });

        const json = await response.json();
        

        if (!response.ok) {
            dispatchSelectedUserCredential({ type : 'error', payload : json.error})
        }

        if(response.ok){
            dispatchSelectedUserCredential({ type : 'reset'})
            console.log("an user updated");
        }
    }

    
    
    return (
        <Box>
            <CssBaseline />
            <Container>
                <Paper elevation = {3}>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: 'center' }}> 
                        <ManageAccounts color="primary" sx={{ mr : 2 }}/>
                        <Typography variant="h6" component="h6" color="primary.main" align="center">Update existing user</Typography>
                    </Box>
                    <Box display="flex" sx={{mt : 3, height:"70vh"}}>
                        <Box align="center" sx={{ width: "50%", marginInline: '20px'}}>
                            <Typography>List of Users</Typography>
                            <List sx={{overflow: "auto", height:"60vh"}}>
                                {allUserCredentialsState?.map(user => {
                                    return (
                                            <ListItem disablePadding key={user.uid}>
                                                <ListItemButton onClick={() => handleSelectedUser(user.email)}>
                                                    <ListItemIcon>
                                                        <Person color="primary" />
                                                    </ListItemIcon>
                                                        <ListItemText primary={`${user.email}`} />
                                                </ListItemButton>
                                            </ListItem>
                                    )
                                })}
                            </List>
                        </Box>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{marginInline: '20px', width:"50%"}}>
                            <Typography>User Credentials</Typography>
                            <Box display='flex' alignItems='center'>
                                {/* <FormLabel id="demo-radio-buttons-group-label">User ID: </FormLabel> */}
                                <TextField margin="normal"  fullWidth 
                                    id="userId" 
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                    label="User ID" 
                                    value={selectedUserCredential.uid}
                                    />
                            </Box>
                            <Box display='flex' alignItems='center'>
                                {/* <FormLabel id="demo-radio-buttons-group-label">Email: </FormLabel> */}
                                <TextField margin="normal"  fullWidth 
                                    id="email" 
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                    label="Email" 
                                    value={selectedUserCredential.email}
                                    />
                            </Box>
                            <TextField margin="normal" required fullWidth 
                                id="displayName" label="Profile Name" 
                                onChange={(e) => dispatchSelectedUserCredential({ type : 'displayName', payload : e.target.value })}
                                value={selectedUserCredential.displayName}
                                />
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Email Verified</FormLabel>
                                <RadioGroup row name="row-radio-buttons-group" defaultValue="false">
                                    <FormControlLabel value="true" control={<Radio />} label="Verified" />
                                    <FormControlLabel value="false" control={<Radio />} label="Not Verified" />
                                </RadioGroup>
                            </FormControl>
                            <TextField margin="normal" required fullWidth
                                id="phone-number" label="Phone Number" 
                                onChange={(e) => dispatchSelectedUserCredential({ type : 'phoneNumber', payload : e.target.value })}
                                value={selectedUserCredential.phoneNumber}
                                />
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label2">Account Status</FormLabel>
                                <RadioGroup row name="row-radio-buttons-group" defaultValue="false">
                                    <FormControlLabel value="false" control={<Radio />} label="Enabled" />
                                    <FormControlLabel value="true" control={<Radio />} label="Disabled" />
                                </RadioGroup>
                            </FormControl>
                            <Box sx={{ width: '100%', display : 'flex', justifyContent: 'center'}}>
                                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, }}>Update User</Button>
                            </Box>
                            {/* {error && <div className="error">{error}</div>} */}
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default UpdateUser;