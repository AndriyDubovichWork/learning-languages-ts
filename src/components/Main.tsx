import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { GetWord, SetWordKnownFalse, addWordToDb } from '../Redux/AppReducer';
import { styled } from '@mui/material/styles';
import { Card, Typography, CardContent } from '@mui/material';
import { Box } from '@mui/system';

export const ColorButton = styled(LoadingButton)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#1B1B1B',
  '&:hover': {
    color: '#000',
    backgroundColor: '#e8ca51',
  },
  '&:active': {
    color: '#000',
    backgroundColor: '#E5AC00',
  },
  '&:disabled': {
    backgroundColor: '#333',
    color: '#f3ca20',
  },
}));

interface IMain {
  word: string;
  translate: string;
  WordKnown: boolean;
  translatedExplain: string;
  originalExplain: string;
  GetWord: Function;
  addWordToDb: Function;
  SetWordKnownFalse: React.MouseEventHandler<HTMLButtonElement>;
}

const Main = (props: IMain) => {
  const [disableNext, setDisableNext] = useState(false);
  const [disableTranslate, setDisableTranslate] = useState(true);
  const { translate, translatedExplain, originalExplain } = props;
  React.useEffect(() => {
    if (props.word && disableNext) {
      setDisableNext(false);
    }
    if (props.word) {
      setDisableTranslate(false);
    }
    if (props.word && !props.WordKnown) {
      setDisableTranslate(true);
    }
  }, [props.word, props.WordKnown]);

  const getWord = () => {
    setDisableNext(true);
    setDisableTranslate(true);
    props.GetWord();
  };
  const DontKnowWord = (e: any) => {
    props.SetWordKnownFalse(e);
    props.addWordToDb(
      props.word,
      props.originalExplain,
      props.translate,
      props.translatedExplain
    );
  };
  return (
    <Box
      sx={{
        width: '300px',
        margin: '0 auto',
      }}
    >
      <Box sx={{ mt: 25 }}>
        <Box>
          <ColorButton
            disabled={disableNext}
            color='primary'
            variant='contained'
            onClick={getWord}
            sx={{ m: 2 }}
          >
            next
          </ColorButton>
          <ColorButton
            disabled={disableTranslate}
            variant='contained'
            onClick={DontKnowWord}
            sx={{ m: 2 }}
          >
            translate
          </ColorButton>
        </Box>
        <Box>
          <Typography>
            {props.WordKnown ? (
              <>
                <Typography component={'span'} variant={'h2'}>
                  {props.word}
                </Typography>
                <br />
                <Typography component={'span'} variant={'h5'}>
                  {originalExplain}
                </Typography>
              </>
            ) : (
              <Typography component={'span'} variant={'h4'}>
                {props.word}
              </Typography>
            )}
          </Typography>
        </Box>
        <Box>
          <Typography component={'h5'} variant={'h5'}>
            {!props.WordKnown && translate}
          </Typography>
        </Box>
        <Box>
          <Typography component={'h5'} variant={'h5'}>
            {!props.WordKnown && translatedExplain}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

interface IMapStateToProps {
  app: {
    word: string;
    originalExplain: string;

    translate: string;
    translatedExplain: string;

    WordKnown: boolean;
  };
}

const MapStateToProps = (state: IMapStateToProps) => {
  return {
    word: state.app.word,
    originalExplain: state.app.originalExplain,

    translate: state.app.translate,
    translatedExplain: state.app.translatedExplain,

    WordKnown: state.app.WordKnown,
  };
};
export default connect(MapStateToProps, {
  GetWord,
  SetWordKnownFalse,
  addWordToDb,
})(Main);
