const booksContainer = document.querySelector(".main-container");
const numberOfBooks = document.querySelector(".number-of-books-digit");
const numberOfReadBooks = document.querySelector(".books-read-digit");
const numberOfUnreadBooks = document.querySelector(".books-digit-unread");
const addBookBtn = document.querySelector(".add-book-button");
const modal = document.querySelector(".modal");
const form = document.querySelector(".add-book-form");
const formAddBookBtn = document.querySelector(".form-add-book-button");
const formCloseBtn = document.querySelector(".form-close-button");
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
  modal.showModal();
});

formAddBookBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let unfilledRequiredFields = document.querySelectorAll(".required");

  if (unfilledRequiredFields.length != 0) {
    removeRequiredClass();
  }
  requiredFieldsFilled();
  unfilledRequiredFields = document.querySelectorAll(".required");

  if (unfilledRequiredFields.length != 0) {
    return;
  }

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

  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formGenre.value = "";
  formLanguage.value = "";
  formDate.value = "";
  formReadStatus.value = "Have you read this book already?";

  formTitle.placeholder = "Title";
  formAuthor.placeholder = "Author";
  formPages.placeholder = "Number of pages";
  formGenre.placeholder = "Genre";
  formLanguage.placeholder = "Language";
  modal.close();
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
  removeBookBtn.classList.add("remove-book-button");
  removeBookBtn.textContent = "+";

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
  readLabel.classList.add("switch");

  const readCheckbox = document.createElement("input");
  readCheckbox.type = "checkbox";
  readCheckbox.name = `toggle-${book.title.toLowerCase().split(" ").join("-")}`;
  readCheckbox.id = `toggle-${book.title.toLowerCase().split(" ").join("-")}`;

  const sliderSpan = document.createElement("span");
  sliderSpan.classList.add("slider", "round");

  readLabel.appendChild(readCheckbox);
  readLabel.appendChild(sliderSpan);

  if (book.read === "yes") {
    readCheckbox.checked = true;
    readCheckbox.classList.add("read");
    newCard.classList.add("card-read");
    numberOfReadBooks.textContent = Number(numberOfReadBooks.textContent) + 1;
  } else {
    readCheckbox.checked = false;
    readCheckbox.classList.add("unread");
    newCard.classList.add("card-unread");
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
  removeFromBooksArray(bookTitle);
  bookCard.remove();
  yourNumbers();
}

function changeReadStatus(readCheckbox) {
  if (readCheckbox.classList[0] === "read") {
    readCheckbox.classList.replace("read", "unread");
    readCheckbox.parentElement.parentElement.classList.replace(
      "card-read",
      "card-unread"
    );
  } else {
    readCheckbox.classList.replace("unread", "read");
    readCheckbox.parentElement.parentElement.classList.replace(
      "card-unread",
      "card-read"
    );
  }
  yourNumbers();
}

function requiredFieldsFilled() {
  const formRequiredElements = [
    formTitle,
    formAuthor,
    formPages,
    formGenre,
    formLanguage,
    formDate,
    formReadStatus,
  ];

  formRequiredElements.forEach((element) => {
    createIsRequiredMessage(element);
  });
}

function createIsRequiredMessage(formElement) {
  if (formElement.value === "") {
    const requiredElement = document.createElement("div");
    if (formElement.type === "date") {
      requiredElement.textContent = "Date is a required field";
    } else {
      requiredElement.textContent = `${formElement.placeholder} is a required field`;
    }
    requiredElement.classList.add("required");
    formElement.after(requiredElement);
  } else if (formElement.value === "Have you read this book already?") {
    const requiredElement = document.createElement("div");
    requiredElement.textContent = "This is a required field";
    requiredElement.classList.add("required");
    formElement.after(requiredElement);
  }
}

function removeRequiredClass() {
  const unfilledRequiredFields = document.querySelectorAll(".required");

  let unfilledArray = Array.from(unfilledRequiredFields);
  unfilledArray.forEach((field) => {
    field.remove();
  });
}

formCloseBtn.addEventListener("click", () => {
  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formGenre.value = "";
  formLanguage.value = "";
  formDate.value = "";
  formReadStatus.value = "Have you read this book already?";

  formTitle.placeholder = "Title";
  formAuthor.placeholder = "Author";
  formPages.placeholder = "Number of pages";
  formGenre.placeholder = "Genre";
  formLanguage.placeholder = "Language";
  modal.close();
});
