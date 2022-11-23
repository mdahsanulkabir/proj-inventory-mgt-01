// ? Admin can create a new user with this form
// ? email should be fixed, user can change the displayName
// ? initially the password will be set as - Singer@!123. User must changer his/her password while 
// ? first log in
// ? User must verify his/her email. (Admin can by pass the verification in Update user form)
// ? Until verification, the account will be disabled and cannot access any route

import { PersonAdd } from '@mui/icons-material';
import { Box, Button, Container, CssBaseline, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useReducer } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


// initial state of the form
const initialValue = {
    userEmail : "",
    password : "Singer@!123",
    error : null
  }
  
    const reducer = (state, action) => {
      switch ( action.type ) {
        case 'email':        return { ...state, userEmail : action.payload};
        case 'error':        return { ...state, error : action.payload};
        case 'reset':        return initialValue;
        default:             throw new Error(`Unknown action type: ${action.type}`);
      }
    }

const CreateUser = () => {
    const [state, dispatch] = useReducer(reducer, initialValue)

    const { userEmail, password, error } = state;


    // TODO Move the token to global level and use useContext 
    // Todo we need to use the token to access role level tasks
    const [ token, setToken ] = useState('');
    const [user] = useAuthState(auth);


    //? this will pull the token for the logged in user who wants to 
    //? create a new user
    useEffect(()=> {
      if(user){
        user.getIdToken(true)
        .then(res => setToken(res))
      }
      },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { 
            userEmail, password
        }
        // TODO need to setup the createUser route in backend
        const response = await fetch(`http://localhost:5000/api/create-user`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token,
            },
        });

        const json = await response.json();
        

        if (!response.ok) {
            dispatch({ type : 'error', payload : json.error})
        }

        if(response.ok){
            dispatch({ type : 'reset'})
            console.log("a new user added");
        }
    }
    return (
        <Box>
            <CssBaseline />
            <Container>
                <Paper elevation = {3}>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: 'center' }}> 
                        <PersonAdd color="primary" sx={{ mr : 2 }}/>
                        <Typography variant="h6" color="primary.main" align="center">Create a new User</Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, marginInline: '20px'}}>
                        <TextField margin="normal" required fullWidth 
                            id="email" label="Email" 
                            onChange={(e) => dispatch({ type : 'email', payload : e.target.value })}
                            value={userEmail} helperText="someone@somewhere.com"/>
                        <TextField margin="normal" required fullWidth disabled
                            id="password" label="Default Password" 
                            onChange={(e) => dispatch({ type : 'password', payload : e.target.value })}
                            value={password}/>
                        <Box sx={{ width: '100%', display : 'flex', justifyContent: 'center'}}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, }}>Create User</Button>
                        </Box>
                        {error && <div className="error">{error}</div>}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default CreateUser;