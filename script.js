// script for library project

const dummy1 = {
  bookID: crypto.randomUUID(),
  title: "Book 1",
  author: "Author 1",
  genre: "romance",
  pages: "20",
  read: true,
};
const dummy2 = {
  bookID: crypto.randomUUID(),
  title: "Book 2",
  author: "Author 2",
  genre: "scifi",
  pages: "203",
  read: true,
};
const dummy3 = {
  bookID: crypto.randomUUID(),
  title: "Book 3",
  author: "Author 3",
  genre: "mystery",
  pages: "530",
  read: false,
};

const myLibrary = [dummy1, dummy2, dummy3];

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

function addBookToLibrary(title, author, genre, pages, read) {
  const id = crypto.randomUUID();
  myLibrary.push(new Book(id, title, author, genre, pages, read));
}

let bookLoader = (book) => {
  const card = document.createElement("article");
  card.classList.add("card");

  const headDiv = document.createElement("div");
  headDiv.classList.add("headDiv");
  const cardTitle = document.createElement("h2");
  const cardAuthor = document.createElement("h3");

  const breaker = document.createElement("hr");
  const cardGenre = document.createElement("p");
  const cardpages = document.createElement("p");
  const breaker2 = document.createElement("hr");

  const footDiv = document.createElement("div");
  footDiv.classList.add("footDiv");

  const readSection = document.createElement("div")
  readSection.textContent = "Read?: "
  const readBtn = document.createElement("button");
  readBtn.classList.add("readStatus");

  const removeBook = document.createElement("button");
  removeBook.classList.add("removeBook");
  removeBook.textContent = "Remove";
  card.setAttribute("data-bookID", book.bookID);

  removeBook.addEventListener("click", () => {
    const chosenBook = document.querySelector(`[data-bookID="${book.bookID}"]`);

    chosenBook.remove();
    const index = myLibrary.findIndex(
      (booktoRemove) => booktoRemove.bookID === book.bookID
    );
    if (index !== -1) myLibrary.splice(index, 1);
  });

  cardTitle.textContent = `Title: ${book.title}`;
  cardAuthor.textContent = `Author: ${book.author || ""}`;
  cardGenre.textContent = `Genre: ${book.genre || ""}`;
  cardpages.textContent = `No. of Pages: ${book.pages || ""}`;
  readBtn.textContent = book.read;

  headDiv.appendChild(cardTitle);
  headDiv.appendChild(cardAuthor);
  card.appendChild(headDiv);

  card.appendChild(breaker);
  card.appendChild(cardGenre);
  card.appendChild(cardpages);
  card.appendChild(breaker2);

  readSection.appendChild(readBtn)
  footDiv.appendChild(readSection);
  footDiv.appendChild(removeBook);
  card.appendChild(footDiv);

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

libraryLoader();
