const booksContainer = document.querySelector(".main-container");
const numberOfBooks = document.querySelector(".number-of-books-digit");
const numberOfReadBooks = document.querySelector(".books-read-digit");
const numberOfUnreadBooks = document.querySelector(".books-digit-unread");
const addBookBtn = document.querySelector(".add-book-button");
const addBookForm = document.querySelector(".modal");
const formAddBookBtn = document.querySelector(".form-add-book-button");
const formTitle = document.querySelector("#new-book-title");
const formAuthor = document.querySelector("#new-book-author");
const formPages = document.querySelector("#new-book-pages");
const formGenre = document.querySelector("#new-book-genre");
const formLanguage = document.querySelector("#new-book-language");
const formDate = document.querySelector("#new-book-publishing-date");
const formReadStatus = document.querySelector("#new-book-read-status");
const formClearFields = document.querySelector("#form-clear-fields-button");

const books = [
  {
    title: "A Song of Ice And Fire",
    author: "George R.R. Martin",
    pages: "786",
    genre: "Fantasy",
    language: "en",
    published: "7/08/1996",
    read: "yes",
  },
];

books.forEach((book) => {
  createCard(book);
  numberOfBooks.textContent = books.length;
});

addBookBtn.addEventListener("click", () => {
  addBookForm.showModal();
});

formAddBookBtn.addEventListener("click", () => {
  const newBook = new CreateBook(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formGenre.value,
    formLanguage.value,
    formDate.value,
    formReadStatus.value
  );
  books.push(newBook);
  createCard(newBook);
});

function CreateBook(title, author, pages, genre, language, published, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.language = language;
  this.published = published;
  this.read = read;
}

function createCard(book) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");

  const removeBookBtn = document.createElement("button");
  removeBookBtn.classList.add("form-close-button");
  removeBookBtn.textContent = "x";

  const newTitle = document.createElement("h3");
  newTitle.classList.add("book-title");
  newTitle.textContent = book.title;

  const newAuthor = document.createElement("p");
  newAuthor.classList.add("author");
  newAuthor.textContent = "By: " + book.author;

  const newPages = document.createElement("p");
  newPages.classList.add("pages");
  newPages.textContent = "Number of pages: " + book.pages;

  const newGenre = document.createElement("p");
  newGenre.classList.add("genre");
  newGenre.textContent = "Genre: " + book.genre;

  const newLanguage = document.createElement("p");
  newLanguage.classList.add("language");
  newLanguage.textContent = "Language: " + book.language;

  const newPublished = document.createElement("p");
  newPublished.classList.add("published");
  newPublished.textContent = "Published: " + book.published;

  const readLabel = document.createElement("label");
  readLabel.setAttribute(
    "for",
    `toggle-${book.title.toLowerCase().split(" ").join("-")}`
  );
  readLabel.textContent = "Mark as read: ";

  const readCheckbox = document.createElement("input");
  readCheckbox.type = "checkbox";
  readCheckbox.name = `toggle-${book.title.toLowerCase().split(" ").join("-")}`;
  readCheckbox.id = `toggle-${book.title.toLowerCase().split(" ").join("-")}`;

  if (book.read === "yes") {
    readCheckbox.checked = true;
    readCheckbox.classList.add("read");
    numberOfReadBooks.textContent = Number(numberOfReadBooks.textContent) + 1;
  } else {
    readCheckbox.checked = false;
    readCheckbox.classList.add("unread");
    numberOfUnreadBooks.textContent =
      Number(numberOfUnreadBooks.textContent) + 1;
  }
  numberOfBooks.textContent = books.length;

  newCard.appendChild(removeBookBtn);
  newCard.appendChild(newTitle);
  newCard.appendChild(newAuthor);
  newCard.appendChild(newPages);
  newCard.appendChild(newGenre);
  newCard.appendChild(newLanguage);
  newCard.appendChild(newPublished);
  newCard.appendChild(readLabel);
  newCard.appendChild(readCheckbox);
  booksContainer.appendChild(newCard);

  removeBookBtn.addEventListener("click", () => {
    removeBookBtnListener(removeBookBtn);
  });

  readCheckbox.addEventListener("click", () => {
    changeReadStatus(readCheckbox);
  });
}

function yourNumbers() {
  numberOfBooks.textContent = books.length;

  const elementsWithReadClass = document.querySelectorAll(".read");
  const elementsWithUnreadClass = document.querySelectorAll(".unread");

  numberOfReadBooks.textContent = elementsWithReadClass.length;

  numberOfUnreadBooks.textContent = elementsWithUnreadClass.length;
}

function removeFromBooksArray(bookTitle) {
  const index = books.findIndex((book) => book.title === bookTitle);
  books.splice(index, 1);
}

function removeBookBtnListener(removeBookBtn) {
  const bookCard = removeBookBtn.parentElement;
  const bookTitle = bookCard.children[1].textContent;
  const bookReadStatus = bookCard.children[8].classList[0]; //read or unread
  removeFromBooksArray(bookTitle);
  bookCard.remove();
  yourNumbers();
}

function changeReadStatus(readCheckbox) {
  readCheckbox.classList[0] === "read"
    ? readCheckbox.classList.replace("read", "unread")
    : readCheckbox.classList.replace("unread", "read");

  yourNumbers();
}

//eerste select nog onselecteerbaar maken
//values van dialog resetten
//your numbers parameter weg?
