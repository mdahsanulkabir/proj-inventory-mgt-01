import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

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

const BOMskuVSpart = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ height: "100%", display: "flex" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: '110px' }}>
                <Tabs
                    // dense
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Only Raw" />
                    <Tab label="Inhouse + 3rd SFG" />
                </Tabs>
            </Box>
            <Box sx={{marginInline: "auto"}}>
                <TabPanel value={value} index={0}>Only raw parts</TabPanel>
                <TabPanel value={value} index={1}>In house Part and 3rd party SFG</TabPanel>
            </Box>
        </Box>
    );
};

export default BOMskuVSpart;