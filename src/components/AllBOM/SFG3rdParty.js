import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import SFG3rdPartyMetalSheet from "./SFG3rdPartyMetalSheet";
import SFG3rdPartyPlastic from "./SFG3rdPartyPlastic";

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

const SFG3rdParty = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ height: "100%", display: "flex", background: 'blue' }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: '110px' }}>
                <Tabs
                    // dense
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Summary" />
                    <Tab label="Metal Sheets" />
                    <Tab label="Plastics" />
                    <Tab label="Party Wise" />
                </Tabs>
            </Box>
            <Box sx={{  marginInline: "auto", 
                        background: 'yellow', 
                        width: '100%', 
                        overflowX: 'auto',
                        height: '80vh',
                        display: 'flex'
            }}>
                <TabPanel value={value} index={0}>Summary</TabPanel>
                <TabPanel value={value} index={1}><SFG3rdPartyMetalSheet /></TabPanel>
                <TabPanel value={value} index={2}><SFG3rdPartyPlastic /></TabPanel>
                <TabPanel value={value} index={3}>Party Wise</TabPanel>
            </Box>
        </Box>
    );
};

export default SFG3rdParty;