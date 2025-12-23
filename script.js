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

class Book {
  constructor(bookID, title, author, genre, pages, read) {
    this.bookID = bookID;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

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

const myLibrary = [dummy1, dummy2, dummy3];

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

const Library = (() => {
  function bookLoader(book) {
    const card = elementHelper("article", "card");
    card.dataset.bookID = book.bookID;

    const cardTitle = elementHelper("h2", "cardTitle", book.title);

    const contentDiv = elementHelper("div", "contentDiv");
    const cardAuthor = elementHelper(
      "h3",
      null,
      `Author: ${book.author || ""}`
    );
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

    contentDiv.append(cardAuthor, cardGenre, cardPages);
    footDiv.append(readBtn, removeBook);

    card.append(
      cardTitle,
      document.createElement("hr"),
      contentDiv,
      document.createElement("hr"),
      footDiv
    );

    library.appendChild(card);
  }

  function libraryLoader() {
    myLibrary.forEach(bookLoader);
  }

  return { bookLoader, libraryLoader };
})();

const form = document.querySelector(".bookForm form");
form.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");

  if (title.validity.valueMissing) {
    title.setCustomValidity("Enter the book's title");
  } else {
    title.setCustomValidity("");
  }
  if (author.validity.valueMissing) {
    author.setCustomValidity("Enter the book's author");
  } else {
    author.setCustomValidity("");
  }
  if (pages.validity.rangeUnderflow) {
    pages.setCustomValidity("Enter more than 0 pages");
  } else {
    pages.setCustomValidity("");
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const bookTitle = title.value;
  const bookAuthor = author.value;
  const bookGenre = document.querySelector("#genre").value;
  const bookpages = parseInt(pages.value, 10);
  const bookRead = document.querySelector("#read").checked;

  addBookToLibrary(bookTitle, bookAuthor, bookGenre, bookpages, bookRead);
  Library.bookLoader(myLibrary[myLibrary.length - 1]);

  bookForm.close();
  form.reset();
});

Library.libraryLoader();
