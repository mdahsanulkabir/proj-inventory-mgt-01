import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ExpandLess,
  ExpandMore,
  WarehouseOutlined,
  AdminPanelSettings,
  ManageAccounts,
  Kitchen,
  Warehouse,
  Widgets,
  Settings,
  ShoppingCart,
  Factory,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";

const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const [storeSubListMenu, setStoreSubListMenu] = useState(false);
  const [adminSubListMenu, setAdminSubListMenu] = useState(false);

  const handleStoresSubList = () => {
    setStoreSubListMenu(!storeSubListMenu);
  };

  const handleAdminSubList = () => {
    setAdminSubListMenu(!adminSubListMenu);
    navigate("admin");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar onClick={() => navigate("/layout")}>
          <Typography variant="h6" noWrap component="div">
            Singer Inventory Management System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ****************sidebar goes here******************** */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: (theme) => theme.zIndex.appBar - 1,
            // mt : 8,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List dense>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleAdminSubList()}>
              <ListItemIcon>
                <AdminPanelSettings color='primary'/>
              </ListItemIcon>
              <ListItemText primary="ADMIN" />
              {adminSubListMenu ? <ExpandLess fontSize="small"/> : <ExpandMore fontSize="small"/>}
            </ListItemButton>
          </ListItem>
          <Collapse in={adminSubListMenu} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("admin/userMgt")}>
                <ListItemIcon>
                  <ManageAccounts color='primary' fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("admin/appSetup")}>
                <ListItemIcon>
                  <Settings color='primary' fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Setup" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List dense>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("allSKU")}>
              <ListItemIcon>
                <Kitchen color='primary'/>
              </ListItemIcon>
              <ListItemText primary="ALL SKU" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List dense>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("allParts")}>
              <ListItemIcon>
                <Widgets  color='primary'/>
              </ListItemIcon>
              <ListItemText primary="ALL PARTS" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List dense>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleStoresSubList()}>
              <ListItemIcon>
                <Warehouse color='primary'/>
              </ListItemIcon>
              <ListItemText primary="WAREHOUSE" />
              {storeSubListMenu ? <ExpandLess fontSize="small"/> : <ExpandMore fontSize="small"/>}
            </ListItemButton>
          </ListItem>
          <Collapse in={storeSubListMenu} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <WarehouseOutlined  color='primary' fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="First Shed" secondary="Light items"/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <WarehouseOutlined  color='primary' fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Third Shed" secondary="All Small Parts"/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <WarehouseOutlined  color='primary' fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Forth Shed" secondary="Cartons Metal Doors"/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <WarehouseOutlined  color='primary' fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="FG Shed" secondary="Heavy Parts"/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <WarehouseOutlined  color='primary' fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="OutSide" secondary="EPS and Roads"/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <WarehouseOutlined  color='primary' fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="SMC Premises" secondary="Outside of factory"/>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider/>
        <List dense>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCart  color='secondary'/>
              </ListItemIcon>
              <ListItemText primary="COMMERCIAL"/>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider/>
        <List dense>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Factory  color='secondary'/>
              </ListItemIcon>
              <ListItemText primary="PRODUCTION"/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* **************** OTHER OUTLETS / FUNCTIONALITY OF THE APP******************** */}
      <Outlet />
    </Box>
  );
};

export default Layout;
