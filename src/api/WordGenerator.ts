const axios = require('axios').default;

const options = {
  method: 'GET',
  url: 'https://random-words-api.vercel.app/word',
  // headers: {
  //   'x-rapidapi-host': 'random-words-with-pronunciation.p.rapidapi.com',
  //   'x-rapidapi-key': '933c98fa7amshe2840a4a213dfadp15a53ajsn8629f35eaef5',
  // },
};

const word = () => {
  return axios.request(options).catch(() => {
    word();
  });
};

export default word;
