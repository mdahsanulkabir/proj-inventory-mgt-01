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

// import { Box, Toolbar, Typography } from '@mui/material';
// import React from 'react';
// import { Outlet } from 'react-router-dom';

// 
//     return (
//         <Box
//         sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
//       >
//         <Toolbar />
//         <Typography variant='h2' component='h2' sx={{color: 'blue'}}>
//             dsfsdfsdfsdfsdfsdfsfd sdf s s asd afd ds
//         </Typography>
//             <Outlet />
//         </Box>
//     );
// };

// export default AdminPanel;
