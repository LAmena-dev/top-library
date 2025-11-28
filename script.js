// script for library project
const bookForm = document.querySelector(".bookForm");
const openModal = document.querySelector(".openModal");
openModal.addEventListener("click", () => {
  bookForm.showModal();
});

const closeModal = document.querySelector(".closeModal");
closeModal.addEventListener("click", () => {
  bookForm.close();
});

const library = document.querySelector(".library");

function Book(bookID, title, author, genre, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.bookID = bookID;
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, genre, pages, read) {
  const id = crypto.randomUUID();
  myLibrary.push(new Book(id, title, author, genre, pages, read));
}

function elementHelper(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls) el.classList.add(cls);
  if (typeof text === "boolean") {
    el.textContent = text ? "read" : "not read";
  } else if (text != null) {
    el.textContent = text;
  }

  return el;
}

let bookLoader = (book) => {
  const card = elementHelper("article", "card");
  card.dataset.bookID = book.bookID;

  const cardTitle = elementHelper("h2", "cardTitle", book.title);

  const contentDiv = elementHelper("div", "contentDiv");
  const cardAuthor = elementHelper("h3", null, `Author: ${book.author || ""}`);
  const cardGenre = elementHelper("p", null, `Genre: ${book.genre || ""}`);
  const cardPages = elementHelper(
    "p",
    null,
    `No. of Pages: ${book.pages || ""}`
  );

  const footDiv = elementHelper("div", "footDiv");
  const readBtn = elementHelper("button", "readStatus", book.read);
  readBtn.addEventListener("click", () => {
    book.toggleRead();
    readBtn.textContent = book.read ? "read" : "not read";
  });

  const removeBook = elementHelper("button", "removeBook", "Remove");
  removeBook.addEventListener("click", () => {
    card.remove();
    const index = myLibrary.findIndex(
      (booktoRemove) => booktoRemove.bookID === book.bookID
    );
    if (index !== -1) myLibrary.splice(index, 1);
  });

  contentDiv.append(cardAuthor, cardGenre, cardPages)
  footDiv.append(readBtn, removeBook);

  card.append(
    cardTitle,
    document.createElement("hr"),
    contentDiv,
    document.createElement("hr"),
    footDiv
  );

  library.appendChild(card);
};

let libraryLoader = () => {
  myLibrary.forEach((entry) => {
    bookLoader(entry);
  });
};

const addBook = document.querySelector(".addBook");

addBook.addEventListener("click", (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookGenre = document.querySelector("#genre").value;
  const bookpages = document.querySelector("#pages").value;
  const bookRead = document.querySelector("#read").checked;

  addBookToLibrary(bookTitle, bookAuthor, bookGenre, bookpages, bookRead);
  const newBook = myLibrary[myLibrary.length - 1];

  bookLoader(newBook);
  bookForm.close();
});

const dummy1 = new Book(
  crypto.randomUUID(),
  "Deltora Quest",
  "Emily Rodda",
  "fantasy",
  "203",
  true
);
const dummy2 = new Book(
  crypto.randomUUID(),
  "Love in the Reaches of Space",
  "Hal Barry",
  "romance scifi",
  "403",
  true
);
const dummy3 = new Book(
  crypto.randomUUID(),
  "London Cases",
  "W.S. Lockson",
  "mystery",
  "530",
  false
);

const myLibrary = [
  dummy1,
  dummy2,
  dummy3,
];

libraryLoader();
