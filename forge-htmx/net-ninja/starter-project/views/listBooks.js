import createBookTemplate from './book.js';

const listBooksTemplate = (books = []) => /*html*/ `
  <div class="book-list">
    ${books.length === 0 
      ? '<p class="no-books">No books found. Add some books to your reading list!</p>'
      : `<ul class="books-ul">
          ${books.map(book => createBookTemplate(book)).join('')}
        </ul>`
    }
  </div>
`;

export default listBooksTemplate;