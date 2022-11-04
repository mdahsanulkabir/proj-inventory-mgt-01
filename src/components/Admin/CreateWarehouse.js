import { Warehouse } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const CreateWarehouse = () => {
    const [name, setName] = useState();
    const [space, setSpace] = useState();
    const [description, setDescription] = useState();
    const [error, setError] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = data.get("warehouse-name");
        const space = data.get("warehouse-space");
        const description = data.get("warehouse-description");
        const newWarehouse = {name ,space, description}
        console.log(newWarehouse);
        const response = await fetch(`http://localhost:5000/api/createwarehouse`, {
            method: "POST",
            body: JSON.stringify(newWarehouse),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if(response.ok){
            setName("");
            setSpace("");
            setDescription("");
            setError("");
        }
    }
  return (
    <Container>
      <CssBaseline />
      <Paper elevation="3">
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
              name="warehouse-name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="warehouseSpace"
              label="Warehouse Space (sft)"
              name="warehouse-space"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="warehouseDescription"
              label="Short Description"
              name="warehouse-description"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, }}
            >
              Create Warehouse
            </Button>
          </Box>
          
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateWarehouse;
