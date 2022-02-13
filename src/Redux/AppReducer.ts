import word from '../api/WordGenerator';
import Translation from '../api/Translation';
import {
  addWordToDB,
  GetWordsFromDB,
  SetWordsToDb,
} from './../DataBase/Controler';
const structuredClone = require('realistic-structured-clone');

const SET_WORD = 'app/SET_WORD';
const SET_ORIGINAL_EXPLAIN = 'app/SET_ORIGINAL_EXPLAIN';
const SET_TRANSLATE = 'app/SET_TRANSLATE';
const SET_TRANSLATED_EXPLAIN = 'app/SET_TRANSLATED_EXPLAIN';
const SET_WORD_KNOWN = 'app/SET_WORD_KNOWN';
const SET_WORDS_ARR = 'app/SET_WORDS_ARR';

let initialState = {
  word: '',
  originalExplain: '',
  translate: '',
  translatedExplain: '',
  WordsArr: [],
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
    case SET_WORDS_ARR:
      return {
        ...state,
        WordsArr: action.WordsArr,
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

const SetWordsArr = (WordsArr: any) => ({ type: SET_WORDS_ARR, WordsArr });
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
export const SetWordKnownFalse = () => (dispatch: any) => {
  dispatch(SetWordKnown(false));
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
  }
};
export const addWordToDb =
  (
    word: string,
    originalExplain: string,
    translate: string,
    translatedExplain: string
  ) =>
  async (dispatch: any) => {
    addWordToDB(word, originalExplain, translate, translatedExplain);
    dispatch(GetWordsFromDb());
  };
export const GetWordsFromDb = () => async (dispatch: any) => {
  let res = await GetWordsFromDB().map((obj: any) => {
    obj.isChecked = false;
    obj.isTranslated = false;
    return obj;
  });
  // console.log(res);
  const result = structuredClone(res);
  dispatch(SetWordsArr(result));
};
export const CheckBoxHandler =
  (id: number, WordsArr: any) => async (dispatch: any) => {
    WordsArr.map((obj: any) => {
      if (obj.id === id) {
        obj.isChecked = !obj.isChecked;
      }
    });
    const res = structuredClone(WordsArr);
    dispatch(SetWordsArr(res));
  };
export const DeleteSelected = (WordsArr: any) => async (dispatch: any) => {
  let SavedItems: any = [];
  WordsArr.map((obj: any) => {
    if (!obj.isChecked) {
      SavedItems.push(obj);
    }
  });

  const res = structuredClone(SavedItems);
  SetWordsToDb(res);
  dispatch(SetWordsArr(res));
};
export const TranslateSelected = (WordsArr: any) => async (dispatch: any) => {
  WordsArr.map((obj: any) => {
    if (obj.isChecked) {
      obj.isTranslated = !obj.isTranslated;
    }
  });

  const res = structuredClone(WordsArr);
  SetWordsToDb(res);
  dispatch(SetWordsArr(res));
};

export const IsChecked = (WordsArr: any) => async (dispatch: any) => {
  let res = false;

  WordsArr.map((obj: any) => {
    if (obj.isChecked) {
      res = true;
    }
  });
  return res;
};

export default AppReducer;
