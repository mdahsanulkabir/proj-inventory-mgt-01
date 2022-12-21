import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";


const CommercialMain = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ width: "100%" }}>
            <Toolbar />
            <Toolbar >
                <Grid container spacing={2} sx={{textAlign: 'center', alignItems: 'center'}}>
                    <Grid item xs={4}>
                        {/* <ButtonGroup variant="contained">
                            <Button onClick={()=>navigate("showBOM")}>Show BOM</Button>
                            <Button onClick={()=>navigate("bomAnalyse")}>Analyse</Button>
                            <Button onClick={()=>navigate("bomMRP")}>BOM FOR MRP</Button>
                        </ButtonGroup> */}
                        testing
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" component='h6'>
                            Commercial & Purchase Section
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                            <Button onClick={()=>navigate("/layout/commercial")}>COMMERCIAL Dashboard</Button>
                    </Grid>
                    <Grid item xs={1}>
                            <Button onClick={()=>navigate("commercialDetails")}>COMMERCIAL Details</Button>
                    </Grid>
                </Grid>
            </Toolbar>
            <Outlet />
        </Box>
    );
};

export default CommercialMain;