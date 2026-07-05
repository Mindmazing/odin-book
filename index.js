// Books Arr
const books = [];

// Book Object
function Book(title, author, pages, progress, description) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.progress = progress;
  this.description = description;
  this.id = crypto.randomUUID();
}

Book.prototype.editBook = function (
  newTitle,
  newAuthor,
  newPages,
  newProgress,
) {
  this.title = newTitle;
  this.author = newAuthor;
  this.pages = newPages;
  this.progress = newProgress;
};

// function to add book to library
function addBookToLibrary(title, author, pages, progress) {
  let book = new Book(title, author, pages, progress);
  books.push(book);
}

addBookToLibrary("The merchant of venice", "Shakespear", 324, 20);
addBookToLibrary("No country for old men", "Cormac Mcarthy", 200, 100);
addBookToLibrary("Blood Meridian", "Cormac Mcarthy", 423, 150);
