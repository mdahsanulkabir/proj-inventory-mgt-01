import { Box, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import BOMskuVSpart from "./BOMskuVSpart";
import SFGinhouse from "./SFGinhouse";
import SFG3rdParty from "./SFG3rdParty";

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

const ShowBOM = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%',background: 'red' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="SKU Vs Parts"/>
                    <Tab label="SFG Inhouse"/>
                    <Tab label="SFG Third Party"/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}><BOMskuVSpart /></TabPanel>
            <TabPanel value={value} index={1}><SFGinhouse /></TabPanel>
            <TabPanel value={value} index={2}><SFG3rdParty /></TabPanel>
        </Box>
    );
};

export default ShowBOM;