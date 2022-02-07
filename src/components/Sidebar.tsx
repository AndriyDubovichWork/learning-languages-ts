import React, { useState } from 'react';
import { connect } from 'react-redux';

import theme from '../theme';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ColorButton } from './Main';
import Typography from '@mui/material/Typography';

const Sidebar = (props: any) => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const drawer = (
    <div>
      <List>
        <ListItem>
          <ColorButton
            disabled={false}
            color='primary'
            variant='contained'
            // onClick={}
            sx={{ m: 2 }}
          >
            Translate
          </ColorButton>
          <ColorButton
            disabled={false}
            color='primary'
            variant='contained'
            // onClick={getWord}
            sx={{ m: 2 }}
          >
            Delete
          </ColorButton>
          <Divider />
        </ListItem>
        {arr.map((obj) => {
          return (
            <ListItem key={'lbs' + obj}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{
                      color: theme.palette.primary.main,
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {'lbs' + obj}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box
      component='nav'
      sx={{
        width: { sm: props.drawerWidth },
        flexShrink: { sm: 0 },
        backgroundColor: theme.palette.background.default,
      }}
      aria-label='mailbox folders'
    >
      <Drawer
        open={props.mobileOpen}
        variant='temporary'
        anchor='left'
        onClose={props.handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: props.drawerWidth,
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
const MapStateToProps = () => {
  return {};
};
export default connect(MapStateToProps, {})(Sidebar);
