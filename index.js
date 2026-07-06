const BOOKS_CONTAINER = document.querySelector(".books-container");
const ADD_BOOK_BTN = document.querySelector("#add-book-btn");
const NEW_BOOK_POPUP = document.querySelector("#new-book-popup");
const CANCEL_ADD_BTN = document.querySelector("#cancel-add");
const BOOK_DATA_FORM = document.querySelector("#book-data");

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

function findBookIndex(bookElement) {
  let bookId = bookElement.getAttribute("data-book-id");
  return books.findIndex((book) => book.id === bookId);
}

// delete and edit event listeners
function deleteBook(book) {
  let bookIndex = findBookIndex(book);
  book.remove();
  books.splice(bookIndex, 1);
  console.log(books);
}

function editBook(book) {}

Book.prototype.addToSite = function () {
  // create bookcard element
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("data-book-id", this.id);

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
  book.addToSite();
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

// Event Listeners for edit and delete
BOOKS_CONTAINER.addEventListener("click", (event) => {
  let bookCard;
  switch (event.target.classList[0]) {
    case "delete-btn":
      bookCard = event.target.closest(".book-card");
      deleteBook(bookCard);
      break;
    case "edit-btn":
      bookCard = event.target.closest(".book-card");
      editBook();
  }
});

function restartInputFields() {
  document.querySelectorAll("form input, form textarea").forEach((field) => {
    field.value = "";
  });
}

ADD_BOOK_BTN.addEventListener("click", (event) => {
  NEW_BOOK_POPUP.style.display = "block";
});

CANCEL_ADD_BTN.addEventListener("click", (event) => {
  NEW_BOOK_POPUP.style.display = "none";
  restartInputFields();
});

BOOK_DATA_FORM.addEventListener("submit", (event) => {
  NEW_BOOK_POPUP.style.display = "none";
  event.preventDefault();

  // fetching form data
  const formData = new FormData(event.target);
  const bookData = Object.fromEntries(formData.entries());
  console.log(bookData);

  // add book to array and document
  addBookToLibrary(
    bookData["book-title"],
    bookData["book-author"],
    bookData["book-pages"],
    bookData["book-progress"],
    bookData["book-description"],
  );

  // restart fields
  restartInputFields();
});
