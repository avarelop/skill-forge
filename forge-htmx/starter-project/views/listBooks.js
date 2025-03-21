import BOOKS_DATA from '../data/data.js';
import createBookTemplate from './book.js';

const listBooksTemplate = () => /*html*/ `
  <h1>Books</h1>
  <ul>
    ${BOOKS_DATA.map(book => createBookTemplate(book)).join('')}
  </ul>
`;

export default listBooksTemplate;