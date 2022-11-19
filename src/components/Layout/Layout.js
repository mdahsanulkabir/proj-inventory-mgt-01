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
  FactoryOutlined,
  Menu,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import useLoadWarehouse from '../../Hooks/useLoadWarehouse'
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";


const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const [storeSubListMenu, setStoreSubListMenu] = useState(false);
  const [adminSubListMenu, setAdminSubListMenu] = useState(false);
  const [drawerState, setDrawerState] = useState(false);
  const [user] = useAuthState(auth);
  const [ token, setToken ] = useState('')

  
  useEffect(()=> {
    if(user){
      user.getIdToken()
      .then(res => setToken(res))
    }
    },[])


  const {warehouses} = useLoadWarehouse();
  console.log(warehouses);



  const handleStoresSubList = (e) => {
    setStoreSubListMenu(!storeSubListMenu);
  };

  const handleAdminSubList = () => {
    setAdminSubListMenu(!adminSubListMenu);
    navigate("admin");
  };

  const toggleDrawer = (drawer) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(drawer);
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
          <Menu onClick={toggleDrawer(true)}/>
          <Typography variant="h6" noWrap component="div" onClick={() => navigate("/layout")}>
            Singer Inventory Management System
          </Typography>
          <Typography sx={{color: '#fff'}}>{user?.email}</Typography>
        </Toolbar>
      </AppBar>

      {/*****************sidebar goes here******************** */}
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
        variant="temporary"
        anchor="left"
        open={drawerState}
        onClose={toggleDrawer(false)}
      >
        <Box role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
            
        <Toolbar />
        <List dense>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleAdminSubList()}>
              <ListItemIcon>
                <AdminPanelSettings color="primary" />
              </ListItemIcon>
              <ListItemText primary="ADMIN" />
              {adminSubListMenu ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={adminSubListMenu} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("admin/userMgt")}
              >
                <ListItemIcon>
                  <ManageAccounts color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("admin/appSetup")}
              >
                <ListItemIcon>
                  <Settings color="primary" fontSize="small" />
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
                <Kitchen color="primary" />
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
                <Widgets color="primary" />
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
                <Warehouse color="primary" />
              </ListItemIcon>
              <ListItemText primary="WAREHOUSE" />
              {storeSubListMenu ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={storeSubListMenu} timeout="auto" unmountOnExit>
            <List dense disablePadding>
              {
                warehouses.map(warehouse => {
                
                  return (
                    <ListItemButton sx={{ pl: 4 }} key={warehouse?._id}>
                      <ListItemIcon>
                        <WarehouseOutlined color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={warehouse?.name}
                        secondary={warehouse?.description}
                      />
                    </ListItemButton>
                    )
                })
              }
            </List>
          </Collapse>
        </List>
        <Divider />
        <List dense>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCart color="secondary" />
              </ListItemIcon>
              <ListItemText primary="COMMERCIAL" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List dense>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Factory color="secondary" />
              </ListItemIcon>
              <ListItemText primary="PRODUCTION" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={()=>navigate("showProduction")}>
              <ListItemIcon><FactoryOutlined color="secondary" fontSize="small"/></ListItemIcon>
              <ListItemText primary="Show Production"/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={()=>navigate("")}>
              <ListItemIcon><FactoryOutlined color="secondary" fontSize="small"/></ListItemIcon>
              <ListItemText primary="FG/SFG Production Entry"/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={()=>navigate("")}>
              <ListItemIcon><FactoryOutlined color="secondary" fontSize="small"/></ListItemIcon>
              <ListItemText primary="RM Requisition"/>
            </ListItemButton>
          </ListItem>
        </List>
        </Box>
      </Drawer>

      {/* **************** OTHER OUTLETS / FUNCTIONALITY OF THE APP******************** */}
      <Outlet />
    </Box>
  );
};

export default Layout;
