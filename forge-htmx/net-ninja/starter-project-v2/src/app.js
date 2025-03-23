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

app.get('/books/search', (req, res) => {
  const searchTerm = req.query.search?.toLowerCase() || '';
  
  if (!searchTerm) {
    res.render('templates/bookList.template.html', { books: BOOKS_DATA });
    return;
  }

  const filteredBooks = BOOKS_DATA.filter(book => 
    book.title.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm)
  );

  res.render('templates/bookList.template.html', { books: filteredBooks });
});

app.get('/books/:id/edit', (req, res) => {
  const book = BOOKS_DATA.find(book => book.id === req.params.id);
  res.render('templates/bookForm.template.html', {
    isEdit: true,
    book: book
  });
});

app.get('/books/new', (_, res) => {
  res.render('templates/bookForm.template.html', {
    isEdit: false,
    book: { title: '', author: '' }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
