import React, { useEffect, useState } from 'react';
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
import {
  GetWordsFromDb,
  DeleteSelected,
  TranslateSelected,
  IsChecked,
} from './../Redux/AppReducer';
import WordItem from './WordItem';

const Sidebar = (props: any) => {
  const [DisableTranslateAndDelete, setDisableTranslateAndDelete] =
    useState(true);

  useEffect(() => {
    props.GetWordsFromDb();
    setDisableTranslateAndDelete(props.IsChecked(props.words));
  }, []);
  useEffect(() => {
    props.IsChecked(props.words).then((res: any) => {
      setDisableTranslateAndDelete(res);
    });
  }, [props.words]);

  const drawer = (
    <div>
      <List>
        <ListItem key='1'>
          <ColorButton
            disabled={!DisableTranslateAndDelete}
            color='primary'
            variant='contained'
            onClick={() => {
              props.TranslateSelected(props.words);
            }}
            sx={{ m: 2 }}
          >
            Translate
          </ColorButton>
          <ColorButton
            disabled={!DisableTranslateAndDelete}
            color='primary'
            variant='contained'
            onClick={() => {
              props.DeleteSelected(props.words);
            }}
            sx={{ m: 2 }}
          >
            Delete
          </ColorButton>
          <Divider />
        </ListItem>
        {props.words.map((obj: any) => {
          try {
            return (
              <WordItem
                key={obj.id + obj.word}
                word={obj.word}
                defenition={obj.defenition}
                translated={obj.translatedWord}
                translatedDefenition={obj.translatedDefenition}
                id={obj.id}
                isChecked={obj.isChecked}
                isTranslated={obj.isTranslated}
              />
            );
          } catch (error) {}
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
const MapStateToProps = (store: any) => {
  return {
    words: store.app.WordsArr,
  };
};
export default connect(MapStateToProps, {
  GetWordsFromDb,
  DeleteSelected,
  TranslateSelected,
  IsChecked,
})(Sidebar);
