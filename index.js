const BOOKS_CONTAINER = document.querySelector(".books-container");

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

// this function lets edition in a Book oject
Book.prototype.editBook = function (
  newTitle = this.title,
  newAuthor = this.author,
  newPages = this.pages,
  newProgress = this.progress,
) {
  this.title = newTitle;
  this.author = newAuthor;
  this.pages = newPages;
  this.progress = newProgress;
};

Book.prototype.addToSite = function () {
  // create bookcard element
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  // assign random int for header image selection
  let randomHeaderImg = Math.floor(Math.random() * 4) + 1;

  // create innerHTML for bookcard element
  bookCard.innerHTML = `
    <div class="book-header">
            <img src="./images/book-header-${randomHeaderImg}.jpg" alt="books"/>
          </div>
          <div class="book-details">
            <div book-title>
              <h2>${this.title}</h2>
              <span>${this.author}</span>
            </div>
            <div class="book-description">
              <p>
                ${this.description}
              </p>
            </div>
            <div class="book-progress">
              <progress max="${this.pages}" value="${this.progress}" id="book-progress"></progress>
              <div class="progress-numbers">
                <span>0</span>
                <span>${this.progress}</span>
                <span>${this.pages}</span>
              </div>
            </div>
            <div class="book-buttons">
              <button class="delete-btn">Delete</button>
              <button class="edit-btn">Edit</button>
            </div>
  `;

  // append bookcard to BOOKS_CONTAINER
  BOOKS_CONTAINER.appendChild(bookCard);
};

// function to add book to library
function addBookToLibrary(title, author, pages, progress, description) {
  let book = new Book(title, author, pages, progress, description);
  books.push(book);
}

// add some placeholder books to the books arr
addBookToLibrary(
  "The merchant of venice",
  "Shakespear",
  324,
  20,
  "The ultimate book created by shakespear",
);
addBookToLibrary(
  "No country for old men",
  "Cormac Mcarthy",
  200,
  100,
  "A book about a killer finding a cowboy who stole cartel money.",
);
addBookToLibrary(
  "Blood Meridian",
  "Cormac Mcarthy",
  423,
  150,
  "Dont ever read this book if you are weak",
);

for (let book of books) {
  book.addToSite();
}
