import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import AddPart from "./CreatePart";
import CreateSFG from "./CreateSFG";
import UpdatePart from "./UpdatePart";
import UpdateSFG from "./UpdateSFG";
import Unit from "./Unit";


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

export default function AdminPart() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: "100%", display: "flex" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: '110px' }}>
        <Tabs
          dense
          orientation="vertical"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Create Part" />
          <Tab label="Create SFG" />
          <Tab label="Update Part" />
          <Tab label="Update SFG" />
          <Tab label="Add Unit" />
        </Tabs>
      </Box>
      <Box sx={{marginInline: "auto"}}>
        <TabPanel value={value} index={0}><AddPart /></TabPanel>
        <TabPanel value={value} index={1}><CreateSFG /></TabPanel>
        <TabPanel value={value} index={2}><UpdatePart /></TabPanel>
        <TabPanel value={value} index={3}><UpdateSFG /></TabPanel>
        <TabPanel value={value} index={4}><Unit /></TabPanel>
      </Box>
    </Box>
  );
}
