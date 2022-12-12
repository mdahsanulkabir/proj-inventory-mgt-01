import { Box, Button, ButtonGroup, Grid, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const AllBOM = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ width: "100%" }}>
            <Toolbar />
            <Toolbar sx={{mt: 2}}>
                <Grid container spacing={2} sx={{textAlign: 'center', alignItems: 'center'}}>
                    <Grid item xs={4}>
                        <ButtonGroup variant="contained">
                            <Button onClick={()=>navigate("showBOM")}>Show BOM</Button>
                            <Button onClick={()=>navigate("bomAnalyse")}>Analyse</Button>
                            <Button onClick={()=>navigate("")}>BOM FOR MRP</Button>
                            <Button onClick={()=>navigate("/layout/allbom")}>BOM Dashboard</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" component='h6'>
                            ALL BOM
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
            <Outlet />
        </Box>
    );
};

export default AllBOM;