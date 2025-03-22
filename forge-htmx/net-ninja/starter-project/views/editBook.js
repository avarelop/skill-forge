const createEditBookTemplate = (book) => /*html*/ `
<form hx-put="/books/${book.id}" hx-target="closest li" hx-swap="outerHTML">
  <input 
    type="text" 
    name="title" 
    placeholder="Title"
    value="${book.title}"
    required>
  <input 
    type="text"
    name="author"
    placeholder="Author"
    value="${book.author}"
    required>
  <button type="submit">Update Book</button>
</form>
`;

export default createEditBookTemplate;
