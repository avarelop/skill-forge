import express from 'express';
import mustache from 'mustache-express';
import BOOKS_DATA from '../data/data.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set up mustache as the template engine
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './public');

app.get('/', (req, res) => {
  res.send('index.html');
});

app.get('/books', (_, res) => {
  res.render('templates/bookList.template.html', { books: BOOKS_DATA });
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const idx = BOOKS_DATA.findIndex(book => book.id === id);

  if (idx === -1) {
    res.status(404).send('Book not found');
    return;
  }

  const book = BOOKS_DATA[idx];
  res.render('templates/book.template.html', { book });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
