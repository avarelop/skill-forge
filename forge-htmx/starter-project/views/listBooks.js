import createBookTemplate from './book.js';

const listBooksTemplate = (books) => /*html*/ `
  <h1>Books</h1>
  <ul>
    ${books.map(book => createBookTemplate(book)).join('')}
  </ul>
`;

export default listBooksTemplate;