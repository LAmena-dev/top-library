// script for library project

const dummy1 = {
  id: crypto.randomUUID(),
  title: "Book 1",
  genre: "fiction",
  year: "1902",
};
const dummy2 = {
  id: crypto.randomUUID(),
  title: "Book 2",
  genre: "fiction",
  year: "1902",
};
const dummy3 = {
  id: crypto.randomUUID(),
  title: "Book 3",
  genre: "fiction",
  year: "1902",
};

const myLibrary = [
  dummy1,
  dummy2,
  dummy3,
  dummy1,
  dummy2,
  dummy3,
  dummy1,
  dummy2,
  dummy3,
  dummy1,
  dummy2,
  dummy3,
];

let libraryLoader = () => {
  myLibrary.forEach((book) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const cardTitle = document.createElement("h2");
    const cardGenre = document.createElement("p");
    const cardYear = document.createElement("p");

    cardTitle.textContent = `Title: ${book.title}`;
    cardGenre.textContent = `Genre: ${book.genre}`;
    cardYear.textContent = `Date Published: ${book.year}`;

    card.appendChild(cardTitle);
    card.appendChild(cardGenre);
    card.appendChild(cardYear);

    library.appendChild(card);
  });
};

function Book(id, title, genre, year) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = id;
  this.title = title;
  this.genre = genre;
  this.year = year;
}

function addBookToLibrary(title, genre, year) {
  const id = crypto.randomUUID();
  myLibrary.push(new Book(id, title, genre, year));
}

const addBook = document.querySelector(".addBook");
const library = document.querySelector(".library");

addBook.addEventListener("click", () => {
  const bookTitle = prompt("Enter a book title:");
  const bookGenre = prompt(`${bookTitle}'s genre:`);
  const bookYear = prompt("Year published:");

  addBookToLibrary(bookTitle, bookGenre, bookYear);
});

libraryLoader();
