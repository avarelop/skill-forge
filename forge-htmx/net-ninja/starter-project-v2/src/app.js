import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('index.html');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
