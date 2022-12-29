import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
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
                <Box sx={{ p: 2 }}>{children}</Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function AdminPO () {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Box sx={{ height: "100%", display: "flex" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: '110px' }}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Create PO" />
                    <Tab label="Upload PO" />
                    <Tab label="Update PO" />
                </Tabs>
            </Box>
            <Box sx={{marginInline: "auto"}}>
                <TabPanel value={value} index={0}>Create PO</TabPanel>
                <TabPanel value={value} index={1}>Upload PO</TabPanel>
                <TabPanel value={value} index={2}>Update PO</TabPanel>
            </Box>
    </Box>
    );
}