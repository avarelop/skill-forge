const createHomePageTemplate = () => /*html*/ `
  <!DOCTYPE html>
  <html>
    <head>
      <title>My Reading List</title>
      <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <header>
        <h1>My Reading List</h1>
      </header>

      <main>
        <div class="book-list">
          <button hx-get="/books" hx-swap="beforeend" hx-target=".book-list">Get Books</button>
        </div>

        <div class="add-book-form">
          <h2>What do you want to read?</h2>
          <form hx-post="/books" hx-swap="beforeend" hx-target=".book-list ul">
            <input 
              type="text" 
              name="title" 
              placeholder="Title"
              required>
            <input 
              type="text"
              name="author"
              placeholder="Author"
              required>
            <button type="submit">Add Book</button>
          </form>
        </div>
      </main>
    </body>
  </html>
`;

export default createHomePageTemplate;