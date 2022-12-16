import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import CreatePhantomPart from "./CreatePhantomPart";
import UpdatePhantomPart from "./UpdatePhantomPart";
import DeletePhantomPart from "./DeletePhantomPart";

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

const AdminPhantomParts = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ height: "100%", display: "flex" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: '110px' }}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="All Phantom Parts" />
                    <Tab label="Create Phantom Part" />
                    <Tab label="Update Phantom Part" />
                    <Tab label="Delete Phantom Part" />
                </Tabs>
            </Box>
            <Box sx={{marginInline: "auto"}}>
                <TabPanel value={value} index={0}><CreatePhantomPart /></TabPanel>
                <TabPanel value={value} index={1}><UpdatePhantomPart /></TabPanel>
                <TabPanel value={value} index={1}><DeletePhantomPart /></TabPanel>
            </Box>
    </Box>
    );
};

export default AdminPhantomParts;