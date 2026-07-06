const BOOKS_CONTAINER = document.querySelector(".books-container");
const ADD_BOOK_BTN = document.querySelector("#add-book-btn");
const NEW_BOOK_POPUP = document.querySelector("#new-book-popup");
const CANCEL_ADD_BTN = document.querySelector("#cancel-add");
const BOOK_DATA_FORM = document.querySelector("#book-data");
const SAVE_CHANGES_BTN = document.querySelector("#save-changes");

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
Book.prototype.editBookObject = function (
  newTitle,
  newAuthor,
  newPages,
  newProgress,
  newDescription,
) {
  this.title = newTitle;
  this.author = newAuthor;
  this.pages = newPages;
  this.progress = newProgress;
  this.description = newDescription;
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

function editBook(bookCard) {
  let bookIndex = findBookIndex(bookCard);
  let bookElement = books[bookIndex];

  // open edit book pop up disable submit btn and enable edit-btn
  NEW_BOOK_POPUP.style.display = "block";
  NEW_BOOK_POPUP.querySelector("#submit-add-book").style.display = "none";
  SAVE_CHANGES_BTN.style.display = "block";

  // get header img source
  let imgSource = bookCard.querySelector("img").getAttribute("src");
  console.log(imgSource);

  // load data from book
  let newTitle = NEW_BOOK_POPUP.querySelector('[name="book-title"]');
  let newAuthor = NEW_BOOK_POPUP.querySelector('[name="book-author"]');
  let newPages = NEW_BOOK_POPUP.querySelector('[name="book-pages"]');
  let newProgress = NEW_BOOK_POPUP.querySelector('[name="book-progress"]');
  let newDescription = NEW_BOOK_POPUP.querySelector(
    '[name="book-description"]',
  );

  newTitle.value = bookElement.title;
  newAuthor.value = bookElement.author;
  newPages.value = bookElement.pages;
  newProgress.value = bookElement.progress;
  newDescription.value = bookElement.description;

  // save changes when btn clicked
  SAVE_CHANGES_BTN.addEventListener(
    "click",
    (event) => {
      bookElement.title = "Nigger";

      // save changes on books array
      bookElement.editBookObject(
        newTitle.value,
        newAuthor.value,
        +newPages.value,
        +newProgress.value,
        newDescription.value,
      );

      // change inner html of element to reflect changes
      bookCard.innerHTML = createBookCard(
        imgSource,
        bookElement.title,
        bookElement.author,
        bookElement.pages,
        bookElement.progress,
        bookElement.description,
      );

      // close pop up amd restart fields
      NEW_BOOK_POPUP.style.display = "none";
      restartInputFields();
    },
    { once: true },
  );
}

function createBookCard(
  headerImg,
  title,
  author,
  pages,
  progress,
  description,
) {
  return `
    <div class="book-header">
            <img src=${headerImg} alt="books"/>
          </div>
          <div class="book-details">
            <div book-title>
              <h2>${title}</h2>
              <em>${author}</em>
            </div>
            <div class="book-description">
              <p>
                ${description}
              </p>
            </div>
            <div class="book-progress">
              <progress max="${pages}" value="${progress}" id="book-progress"></progress>
              <div class="progress-numbers">
                <span>0</span>
                <span>${progress}</span>
                <span>${pages}</span>
              </div>
            </div>
            <div class="book-buttons">
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
            </div>
  `;
}

Book.prototype.addToSite = function () {
  // create bookcard element
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("data-book-id", this.id);

  // assign random int for header image selection
  let randomHeaderImg = Math.floor(Math.random() * 4) + 1;
  let randomHeaderSrc = `./images/book-header-${randomHeaderImg}.jpg`;

  // create innerHTML for bookcard element
  bookCard.innerHTML = createBookCard(
    randomHeaderSrc,
    this.title,
    this.author,
    this.pages,
    this.progress,
    this.description,
  );

  // append bookcard to BOOKS_CONTAINER
  BOOKS_CONTAINER.prepend(bookCard);
};

// function to add book to library
function addBookToLibrary(title, author, pages, progress, description) {
  let book = new Book(title, author, pages, progress, description);
  books.push(book);
}

// render books function
function renderBooks() {
  for (book of books) {
    book.addToSite();
  }
}

// add some placeholder books to the books arr
addBookToLibrary(
  "To Kill a Mockingbird",
  "Harper Lee",
  281,
  120,
  "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
);

addBookToLibrary(
  "1984",
  "George Orwell",
  328,
  328,
  "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
);

addBookToLibrary(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  180,
  45,
  "A tragic story of jazz-age decadence, unrequited love, and the American Dream.",
);

addBookToLibrary(
  "Pride and Prejudice",
  "Jane Austen",
  432,
  200,
  "A classic romance novel that charts the emotional development of the protagonist, Elizabeth Bennet.",
);

addBookToLibrary(
  "The Hobbit",
  "J.R.R. Tolkien",
  310,
  15,
  "A fantasy novel following the quest of home-loving Bilbo Baggins to win a share of the treasure guarded by Smaug.",
);

addBookToLibrary(
  "Fahrenheit 451",
  "Ray Bradbury",
  249,
  249,
  "A dystopian novel presenting a future American society where books are outlawed and firemen burn any that are found.",
);

addBookToLibrary(
  "Moby-Dick",
  "Herman Melville",
  378,
  89,
  "An epic tale of the obsessive quest of Ahab, captain of the whaler Pequod, for revenge on a white whale.",
);

addBookToLibrary(
  "Dune",
  "Frank Herbert",
  412,
  350,
  "A sweeping science fiction epic set on the desert planet Arrakis, focusing on politics, religion, and ecology.",
);

addBookToLibrary(
  "The Catcher in the Rye",
  "J.D. Salinger",
  277,
  277,
  "A novel about teenage rebellion and alienation, narrated by the iconic Holden Caulfield.",
);

addBookToLibrary(
  "Brave New World",
  "Aldous Huxley",
  311,
  50,
  "A dystopian vision of a futuristic society heavily controlled by technology, conditioning, and a pleasure-inducing drug.",
);

addBookToLibrary(
  "The Lord of the Rings",
  "J.R.R. Tolkien",
  1178,
  600,
  "An epic high-fantasy tale of a fellowship's journey to destroy the One Ring and defeat the Dark Lord Sauron.",
);

addBookToLibrary(
  "Frankenstein",
  "Mary Shelley",
  280,
  140,
  "A gothic science fiction novel about a young scientist who creates a sapient creature in an unorthodox scientific experiment.",
);

addBookToLibrary(
  "The Alchemist",
  "Paulo Coelho",
  208,
  208,
  "A philosophical book that tells the story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.",
);

addBookToLibrary(
  "Sapiens: A Brief History of Humankind",
  "Yuval Noah Harari",
  464,
  312,
  "An exploration of how biology and history have defined us and enhanced our understanding of what it means to be human.",
);

addBookToLibrary(
  "The Diary of a Young Girl",
  "Anne Frank",
  283,
  100,
  "The writings from the Dutch-language diary kept by Anne Frank while she was in hiding for two years with her family during the Nazi occupation of the Netherlands.",
);

addBookToLibrary(
  "Jane Eyre",
  "Charlotte Brontë",
  500,
  450,
  "A coming-of-age story following the emotions and experiences of its eponymous heroine and her love for Mr. Rochester.",
);

addBookToLibrary(
  "Crime and Punishment",
  "Fyodor Dostoevsky",
  671,
  22,
  "A psychological drama exploring the mental anguish and moral dilemmas of an impoverished ex-student who formulates a plan to kill an unscrupulous pawnbroker.",
);

addBookToLibrary(
  "The Hitchhiker's Guide to the Galaxy",
  "Douglas Adams",
  193,
  193,
  "A comedic science fiction adventure following the misadventures of the last surviving man, Arthur Dent.",
);

addBookToLibrary(
  "A Game of Thrones",
  "George R.R. Martin",
  835,
  701,
  "The first book in the epic fantasy series A Song of Ice and Fire, filled with political intrigue, magic, and dragons.",
);

addBookToLibrary(
  "The Picture of Dorian Gray",
  "Oscar Wilde",
  254,
  0,
  "A philosophical novel surrounding a portrait that ages and records every sin, while the subject remains youthful and beautiful.",
);

renderBooks();

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
      editBook(bookCard);
  }
});

function restartInputFields() {
  document.querySelectorAll("form input, form textarea").forEach((field) => {
    field.value = "";
  });
}

ADD_BOOK_BTN.addEventListener("click", (event) => {
  NEW_BOOK_POPUP.style.display = "block";
  NEW_BOOK_POPUP.querySelector("#submit-add-book").style.display = "block";
  SAVE_CHANGES_BTN.style.display = "none";
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

  // add book to array and document
  addBookToLibrary(
    bookData["book-title"],
    bookData["book-author"],
    bookData["book-pages"],
    bookData["book-progress"],
    bookData["book-description"],
  );

  // add book to site
  books.at(-1).addToSite();

  // restart fields
  restartInputFields();
});
