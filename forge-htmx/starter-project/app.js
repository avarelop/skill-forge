import express from 'express';
import BOOKS_DATA from './data/data.js';
import createBookTemplate from './views/book.js';
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

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: Math.random().toString(), title, author };
  BOOKS_DATA.push(newBook);
  res.redirect(`/books/${newBook.id}`);
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = BOOKS_DATA.find(book => book.id === id);
  res.send(createBookTemplate(book));
});

// listen to port
app.listen(3000, () => {
  console.log('App listening on port 3000');
});