const axios = require('axios');

const generateKey = async () => {
  const options = {
    method: 'GET',
    url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/createkey',
    headers: {
      'X-RapidAPI-Host':
        'translated-mymemory---translation-memory.p.rapidapi.com',
      'X-RapidAPI-Key': '933c98fa7amshe2840a4a213dfadp15a53ajsn8629f35eaef5',
    },
  };

  const res = await axios
    .request(options)
    .then((response: any) => {
      return response.data.key;
    })
    .catch(function (error: any) {
      console.error(error);
    });
  return await res;
};

export default generateKey;
