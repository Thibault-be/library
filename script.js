const booksContainer = document.querySelector(".main-container");
const addBookBtn = document.querySelector(".add-book-button");
const addBookForm = document.querySelector(".modal");
const formAddBookBtn = document.querySelector(".form-add-book-button");
const formTitle = document.querySelector("#new-book-title");
const formAuthor = document.querySelector("#new-book-author");
const formPages = document.querySelector("#new-book-pages");
const formGenre = document.querySelector("#new-book-genre");
const formDate = document.querySelector("#new-book-publishing-date");
const formReadStatus = document.querySelector("#new-book-read-status");
const formClearFields = document.querySelector("#form-clear-fields-button");

const books = [];

addBookBtn.addEventListener("click", () => {
  addBookForm.showModal();
});

formAddBookBtn.addEventListener("click", () => {
  const newBook = new CreateBook(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formGenre.value,
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

// function addCard(booksArray) {
//   booksArray.forEach((book) => {
//     createCard(book);
//   });
//   //loop over the array
//   //for each element create card
// }

function createCard(book) {
  console.log("here");
  console.log(book);

  const newCard = document.createElement("div");
  newCard.classList.add("card");

  const newTitle = document.createElement("h3");
  newTitle.classList.add("book-title");
  newTitle.textContent = "By" + book.title;

  const newAuthor = document.createElement("p");
  newAuthor.classList.add("author");
  newAuthor.textContent = "Author:" + book.author;

  const newPages = document.createElement("p");
  newPages.classList.add("pages");
  newPages.textContent = "Number of pages:" + book.pages;

  const newGenre = document.createElement("p");
  newGenre.classList.add("genre");
  newGenre.textContent = "Genre:" + book.genre;

  const newLanguage = document.createElement("p");
  newLanguage.classList.add("language");
  newLanguage.textContent = "Language" + book.language;

  //published is wrong; picking up read status
  const newPublished = document.createElement("p");
  newPublished.classList.add("published");
  newPublished.textContent = "Published:" + book.published;

  newCard.appendChild(newTitle);
  newCard.appendChild(newAuthor);
  newCard.appendChild(newPages);
  newCard.appendChild(newGenre);
  newCard.appendChild(newLanguage);
  newCard.appendChild(newPublished);

  console.log(newCard);

  booksContainer.appendChild(newCard);
}
