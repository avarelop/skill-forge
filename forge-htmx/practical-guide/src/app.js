import express from 'express';

const app = express();


app.use(express.static('public'));

app.get('/', (_, res) => {
  res.send('index.html');
});

app.listen(3000);
