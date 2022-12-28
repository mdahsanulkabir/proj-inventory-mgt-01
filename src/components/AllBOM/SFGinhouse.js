import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import ThermoformingBOM from "./InHouseSFGBOM.js/ThermoformingBOM";

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
            <Box sx={{ p: 1 }}>
                {children}
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

const SFGinhouse = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ height: "100%", display: "flex",background: 'blue' }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: '110px' }}>
                <Tabs
                    // dense
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="BarCode" />
                    <Tab label="Thermoforming" />
                    <Tab label="Roll Forming" />
                    <Tab label="Power Press" />
                    <Tab label="Eva Wrap" />
                    <Tab label="Bending Heaters" />
                    <Tab label="U Shell Bend" />
                    <Tab label="Clinching" />
                    <Tab label="Pre Assembly" />
                    <Tab label="Body Foaming" />
                    <Tab label="Door Foaming" />
                    <Tab label="Post Assembly" />
                    <Tab label="Pad Printing" />
                    <Tab label="Hot Stamping" />
                    <Tab label="Finishing" />
                </Tabs>
            </Box>
            <Box sx={{marginInline: "auto",background: 'yellow', 
                        width: '100%', 
                        overflowX: 'auto',
                        height: '80vh',}}>
                <TabPanel value={value} index={0}>BarCode</TabPanel>
                <TabPanel value={value} index={1}><ThermoformingBOM/></TabPanel>
                <TabPanel value={value} index={2}>Roll Forming</TabPanel>
                <TabPanel value={value} index={3}>Power Press</TabPanel>
                <TabPanel value={value} index={4}>Eva Wrap</TabPanel>
                <TabPanel value={value} index={5}>Bending Heaters</TabPanel>
                <TabPanel value={value} index={6}>U Shell Bend</TabPanel>
                <TabPanel value={value} index={7}>Clinching</TabPanel>
                <TabPanel value={value} index={8}>Pre Assembly</TabPanel>
                <TabPanel value={value} index={9}>Body Foaming</TabPanel>
                <TabPanel value={value} index={10}>Door Foaming</TabPanel>
                <TabPanel value={value} index={11}>Post Assembly</TabPanel>
                <TabPanel value={value} index={12}>Pad Printing</TabPanel>
                <TabPanel value={value} index={13}>Hot Stamping</TabPanel>
                <TabPanel value={value} index={14}>Finishing</TabPanel>
            </Box>
        </Box>
    );
};

export default SFGinhouse;