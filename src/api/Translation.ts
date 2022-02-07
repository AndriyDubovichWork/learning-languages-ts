const axios = require('axios').default;

const Translation = (word: string) => {
  return axios.request({
    method: 'GET',
    url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
    params: {
      langpair: 'en|ukr',
      q: word,
      mt: '1',
      onlyprivate: '0',
      de: 'a@b.c',
    },
    headers: {
      'x-rapidapi-host':
        'translated-mymemory---translation-memory.p.rapidapi.com',
      'x-rapidapi-key': '933c98fa7amshe2840a4a213dfadp15a53ajsn8629f35eaef5',
    },
  });
};
export default Translation;
