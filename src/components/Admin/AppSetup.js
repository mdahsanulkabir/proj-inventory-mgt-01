import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AdminWarehouse from './AdminWarehouse';
import AdminPart from './AdminPart';
import AdminSKU from './AdminSKU';
import AdminSupplier from './AdminSupplier';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

export default function AppSetup() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Warehouse"/>
          <Tab label="Part"/>
          <Tab label="SKU"/>
          <Tab label="Supplier"/>
        </Tabs>
      </Box>
      <TabPanel component='div' value={value} index={0}><AdminWarehouse/></TabPanel>
      <TabPanel value={value} index={1}><AdminPart/></TabPanel>
      <TabPanel value={value} index={2}><AdminSKU /></TabPanel>
      <TabPanel value={value} index={3}><AdminSupplier /></TabPanel>
    </Box>
  );
}
