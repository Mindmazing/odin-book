const BOOKS_CONTAINER = document.querySelector(".book-container");

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
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  let randomHeaderImg = Math.floor(Math.random * 4) - 1;
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
};

// function to add book to library
function addBookToLibrary(title, author, pages, progress) {
  let book = new Book(title, author, pages, progress);
  books.push(book);
}

addBookToLibrary("The merchant of venice", "Shakespear", 324, 20);
addBookToLibrary("No country for old men", "Cormac Mcarthy", 200, 100);
addBookToLibrary("Blood Meridian", "Cormac Mcarthy", 423, 150);
