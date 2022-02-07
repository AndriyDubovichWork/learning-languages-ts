const mongoose = require('mongoose');

// Connection URI
export const CreateConnection = () => {
  const uri =
    'mongodb+srv://asadad:<5t3rf197>@words.ncocx.mongodb.net/words?retryWrites=true&w=majority';
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res: any) => console.log('Connected to DB'))
    .catch((error: any) => console.error(error));
};
