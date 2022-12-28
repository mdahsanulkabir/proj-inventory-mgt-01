import { Box, Button, ButtonGroup, Grid, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState } from "react";
import InventoryDashboard from "./InventoryDashboard";
import MonthlyInventoryReport from "./MonthlyInventoryReport";
import InventoryOnDemand from "./InventoryOnDemand";
import InventoryIsolation from "./InventoryIsolation";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
            <Box 
                sx={{ p: 3 }}
            >
                <Box>{children}</Box>
            </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const Inventory = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <Box sx={{ width: "100%" }}>
            <Toolbar />
            <Box sx={{textAlign: 'center', alignItems: 'center'}}>
                <Typography variant="h6" component='h6'>INVENTORY</Typography>
            </Box>
            <Box sx={{ width: '100%',background: 'red' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Inventory Dashboard"/>
                        <Tab label="Monthly Inventory"/>
                        <Tab label="Inventory Status On demand"/>
                        <Tab label="Inventory on Isolation"/>
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}><InventoryDashboard/></TabPanel>
                <TabPanel value={value} index={1}><MonthlyInventoryReport /></TabPanel>
                <TabPanel value={value} index={2}><InventoryOnDemand/></TabPanel>
                <TabPanel value={value} index={3}><InventoryIsolation/></TabPanel>
            </Box>
        </Box>
    );
};

export default Inventory;