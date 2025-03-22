import express from 'express';
import BOOKS_DATA from './data/data.js';
import createBookTemplate from './views/book.js';
import createEditBookTemplate from './views/editBook.js';
import listBooksTemplate from './views/listBooks.js';

// create app
const app = express();
app.use(express.urlencoded({extended: false}));

// static assets
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.send('index.html');
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

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const idx = BOOKS_DATA.findIndex(book => book.id === id);
  
  if (idx === -1) {
    return res.status(404).send('Book not found');
  }

  BOOKS_DATA[idx].title = title;
  BOOKS_DATA[idx].author = author;

  res.send(createBookTemplate(BOOKS_DATA[idx]));
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const idx = BOOKS_DATA.findIndex(book => book.id === id);
  BOOKS_DATA.splice(idx, 1);
  res.send(listBooksTemplate());
});

app.get('/books/:id/edit', (req, res) => {
  const { id } = req.params;
  const book = BOOKS_DATA.find(book => book.id === id);
  res.send(createEditBookTemplate(book));
});

// listen to port
app.listen(3000, () => {
  console.log('App listening on port 3000');
});