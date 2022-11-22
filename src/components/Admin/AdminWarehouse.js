import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CreateWarehouse from "./CreateWarehouse";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function AdminWarehouse() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: "100%", display: "flex" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "110px" }}>
        <Tabs
          dense
          orientation="vertical"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Create Warehouse" />
          <Tab label="Update Warehouse" />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={value} index={0}>
          <CreateWarehouse />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Update Warehouse
        </TabPanel>
      </Box>
    </Box>
  );
}
