import * as React from "react";
import Box from "@mui/material/Box";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Toolbar } from "@mui/material";



const AdminPanel = () => {
    const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Toolbar />
      <Toolbar>
        <ButtonGroup variant="contained">
          <Button onClick={()=>navigate("userMgt")}>User Management</Button>
          <Button onClick={()=>navigate("appSetup")}>APP Setup</Button>
          <Button onClick={()=>navigate("/layout/admin")}>Dashboard</Button>
        </ButtonGroup>
      </Toolbar>
      <Outlet />
    </Box>
  );
}

export default AdminPanel;
