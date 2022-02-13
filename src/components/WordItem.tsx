import React from 'react';
import theme from '../theme';
import {
  Checkbox,
  ListItem,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { CheckBoxHandler } from './../Redux/AppReducer';
import { connect } from 'react-redux';
import ShowTextOnHover from './../helpers/ShowTextOnHover';

interface IWordItem {
  word: string;
  defenition: string;
  translated: string;
  translatedDefenition: string;
  isChecked: boolean;
  isTranslated: boolean;
  CheckBoxHandler: any;
  id: number;
  wordsArr: any;
}

function WordItem(props: IWordItem) {
  const { word, translated, isTranslated, defenition, translatedDefenition } =
    props;
  return (
    <ListItem key={word + '123'}>
      <FormControlLabel
        key={'lbl' + word}
        control={
          <Checkbox
            style={{
              color: theme.palette.primary.main,
            }}
            onChange={() => {
              props.CheckBoxHandler(props.id, props.wordsArr);
            }}
            checked={props.isChecked}
            key={'chb' + word}
          />
        }
        label={
          <Typography
            sx={{ color: theme.palette.text.primary }}
            key={'txt' + word}
            component={'div'}
          >
            {!isTranslated ? (
              <ShowTextOnHover ShownText={defenition}>{word}</ShowTextOnHover>
            ) : (
              <ShowTextOnHover ShownText={translatedDefenition}>
                {translated}
              </ShowTextOnHover>
            )}
          </Typography>
        }
      />
    </ListItem>
  );
}
const MapStateToProps = (store: any) => {
  return {
    wordsArr: store.app.WordsArr,
  };
};
export default connect(MapStateToProps, { CheckBoxHandler })(WordItem);
