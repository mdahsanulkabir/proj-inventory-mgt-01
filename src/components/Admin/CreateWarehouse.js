import { Warehouse } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const CreateWarehouse = () => {
    const [name, setName] = useState("");
    const [space, setSpace] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [user] = useAuthState(auth);


    // TODO Move the token to global level and use useContext 
    // Todo we need to use the token to access role level tasks
    const [ token, setToken ] = useState('');
    useEffect(()=> {
      if(user){
        user.getIdToken()
        .then(res => setToken(res))
      }
      },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newWarehouse = {name ,space, description}
        console.log(newWarehouse);
        const response = await fetch(`http://localhost:5000/api/createwarehouse`, {
            method: "POST",
            body: JSON.stringify(newWarehouse),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token,
            },
        });


        const json = await response.json();
        // console.log(response);

        if (!response.ok) {
            setError(json.error);
        }

        if(response.ok){
            setName("");
            setSpace("");
            setDescription("");
            setError(null);
        }
    }
  return (
    <Container>
      <CssBaseline />
      <Paper elevation={3}>
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              minWidth: "300px",
              alignItems: "center",
              mx: 'auto'
            }}
          >
            <Warehouse color="primary" sx={{mr:2}}/>
            <Typography
              variant="h6"
              component="h6"
              color="primary.main"
              align="center"
            >
              Create a new Warehouse
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="warehouseName"
              label="Warehouse Name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="warehouseSpace"
              label="Warehouse Space (sft)"
              onChange={(e) => setSpace(e.target.value)}
              value={space}
              helperText="Space in Square Feet"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="warehouseDescription"
              label="Short Description"
              onChange={(e)=> setDescription(e.target.value)}
              space={description}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, }}
            >
              Create Warehouse
            </Button>
            {error && <div className="error">{error}</div>}
          </Box>
          
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateWarehouse;
