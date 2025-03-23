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

// Add these configurations to ensure proper content type headers
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/books', (_, res) => {
  res.render('templates/bookList.template.html', { books: BOOKS_DATA });
});

app.get('/books/new', (_, res) => {
  res.render('templates/bookForm.template.html', {
    isEdit: false,
    book: { title: '', author: '' }
  });
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

app.get('/books/edit/:id', (req, res) => {
  const { id } = req.params;
  const book = BOOKS_DATA.find(book => book.id === id);
  
  if (!book) {
    res.status(404).send('Book not found');
    return;
  }
  
  res.render('templates/bookForm.template.html', {
    isEdit: true,
    book: book
  });
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const idx = BOOKS_DATA.findIndex(book => book.id === id);

  if (idx === -1) {
    res.status(404).send('Book not found');
    return;
  }

  BOOKS_DATA.splice(idx, 1);
  res.render('templates/bookList.template.html', { books: BOOKS_DATA });
});

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  
  const bookIndex = BOOKS_DATA.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    res.status(404).send('Book not found');
    return;
  }
  
  // Update the book
  BOOKS_DATA[bookIndex] = {
    ...BOOKS_DATA[bookIndex],
    title,
    author
  };
  
  // Set the header to close the modal
  res.setHeader('HX-Trigger', 'closeModal');
  
  // Return the updated book item HTML
  res.render('templates/bookList.template.html', { 
    books: [BOOKS_DATA[bookIndex]] 
  });
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  
  // Generate a new ID (in a real app, this would be more robust)
  const id = Date.now().toString();
  
  // Add the new book
  const newBook = { id, title, author };
  BOOKS_DATA.push(newBook);
  
  // Set the header to close the modal
  res.setHeader('HX-Trigger', 'closeModal');
  
  // Return the HTML for just the new book
  res.render('templates/bookList.template.html', { 
    books: [newBook] 
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
