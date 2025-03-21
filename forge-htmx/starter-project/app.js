import express from 'express';
import createHomePageTemplate from './views/index.js';
import listBooksTemplate from './views/listBooks.js';

// create app
const app = express();
app.use(express.urlencoded({extended: false}));

// static assets
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.send(createHomePageTemplate());
});

app.get('/books', (req, res) => {
  res.send(listBooksTemplate());
});

// listen to port
app.listen(3000, () => {
  console.log('App listening on port 3000');
});