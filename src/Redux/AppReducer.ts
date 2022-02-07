import word from '../api/WordGenerator';
import Translation from '../api/Translation';
import { CreateConnection } from './../DataBase/Controler';

const SET_WORD = 'app/SET_WORD';
const SET_ORIGINAL_EXPLAIN = 'app/SET_ORIGINAL_EXPLAIN';
const SET_TRANSLATE = 'app/SET_TRANSLATE';
const SET_TRANSLATED_EXPLAIN = 'app/SET_TRANSLATED_EXPLAIN';
const SET_WORD_KNOWN = 'app/SET_WORD_KNOWN';

let initialState = {
  word: '',
  originalExplain: '',
  translate: '',
  translatedExplain: '',
  WordKnown: true,
};

function AppReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_WORD:
      return {
        ...state,
        word: action.word,
      };
    case SET_ORIGINAL_EXPLAIN:
      return {
        ...state,
        originalExplain: action.originalExplain,
      };
    case SET_TRANSLATE:
      return {
        ...state,
        translate: action.translate,
      };
    case SET_TRANSLATED_EXPLAIN:
      return {
        ...state,
        translatedExplain: action.translatedExplain,
      };
    case SET_WORD_KNOWN:
      return {
        ...state,
        WordKnown: action.WordKnown,
      };

    default:
      return state;
  }
}

const SetWord = (word: string) => ({ type: SET_WORD, word });
const SetOriginalExplain = (originalExplain: string) => ({
  type: SET_ORIGINAL_EXPLAIN,
  originalExplain,
});
const SetTranslate = (translate: string) => ({
  type: SET_TRANSLATE,
  translate: translate,
});
const SetTranslatedExplain = (translatedExplain: string) => ({
  type: SET_TRANSLATED_EXPLAIN,
  translatedExplain,
});
const SetWordKnown = (WordKnown: boolean) => ({
  type: SET_WORD_KNOWN,
  WordKnown,
});
export const SetWordKnownFalse = () => {
  return SetWordKnown(false);
};
export const GetWord = () => async (dispatch: any) => {
  const data = await word();
  const translated = await Translation(
    data.data[0].word + ' . ' + data.data[0].definition
  );
  if (translated.status === 200) {
    dispatch(SetWordKnown(true));
    dispatch(SetWord(data.data[0].word));
    dispatch(SetOriginalExplain(data.data[0].definition));
    const translatedArr = translated.data.responseData.translatedText;

    dispatch(SetTranslate(translatedArr.split('.')[0].replace('&#39;', "'")));
    dispatch(
      SetTranslatedExplain(translatedArr.split('.')[1].replace('&#39;', "'"))
    );
    // addWordToDB(
    //   data.data[0].word,
    //   data.data[0].definition,
    //   translatedArr.split('.')[0].replace('&#39;', "'"),
    //   translatedArr.split('.')[1].replace('&#39;', "'")
    // );
  }
};

export default AppReducer;
