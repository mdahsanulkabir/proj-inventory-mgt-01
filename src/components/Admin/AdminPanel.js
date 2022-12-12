import * as React from "react";
import Box from "@mui/material/Box";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Grid, Toolbar, Typography } from "@mui/material";



const AdminPanel = () => {
    const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Toolbar />
      <Toolbar sx={{mt: 2}}>
        <Grid container spacing={2} sx={{textAlign: 'center', alignItems: 'center'}}>
            <Grid item xs={4}>
            <ButtonGroup variant="contained">
              <Button onClick={()=>navigate("userMgt")}>User Management</Button>
                <Button onClick={()=>navigate("appSetup")}>APP Setup</Button>
                <Button onClick={()=>navigate("/layout/admin")}>Dashboard</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h6" component='h6'>
                    Admin Panel
                </Typography>
            </Grid>
        </Grid>
      </Toolbar>
      <Outlet />
    </Box>
  );
}

export default AdminPanel;
