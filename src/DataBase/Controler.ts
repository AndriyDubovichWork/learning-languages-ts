// Connection URI
export const addWordToDB = (
  word: string,
  defenition: string,
  translatedWord: string,
  translatedDefenition: string
) => {
  let id = 0;
  const wordObj = {
    id,
    word,
    defenition,
    translatedWord,
    translatedDefenition,
  };

  let words = localStorage.getItem('word');
  if (!words) {
    localStorage.setItem('word', JSON.stringify({ arr: [] }));
    words = localStorage.getItem('word');
  }
  if (words) {
    const wordArr = JSON.parse(words);
    wordObj.id = wordArr.arr.length;

    wordArr.arr.push(wordObj);
    localStorage.setItem('word', JSON.stringify(wordArr));
  }
};
export const GetWordsFromDB = () => {
  let words = localStorage.getItem('word');
  if (!words) {
    localStorage.setItem('word', JSON.stringify({ arr: [] }));
    words = localStorage.getItem('word');
  }
  if (words) {
    const wordArr = JSON.parse(words);
    return wordArr.arr;
  }
  console.error('cannot get a words');
  return undefined;
};
export const SetWordsToDb = (array: any) => {
  if (array) {
    localStorage.setItem('word', JSON.stringify({ arr: array }));
  }
};
