import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const drawerWidth = 240;

const useStyles = makeStyles({
    pages : {
        background: '#f9f9f9',
        width : '100%'
    },
    drawer : {
        width : drawerWidth
    },
    drawerPaper : {
        width : drawerWidth
    },
    root : {
        display : 'flex'
    }
})

const Layout = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* App bar */}



            {/* Drawer Component */}
            <Drawer
                className={classes.drawer}
                variant='permanent'
                anchor='left'
                classes={{paper : classes.drawerPaper}}
            >
                <div>
                    <Typography variant='h5'>SRP</Typography>
                </div>
                <List>
                    <ListItem>
                        <ListItemText primary='hello' />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='hi' />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='good morning' />
                    </ListItem>
                </List>
            </Drawer>




            <div className={classes.page}>
                { children }
            </div>
        </div>
    );
};

export default Layout;