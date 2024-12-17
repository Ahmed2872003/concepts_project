import { readFile, writeFile } from "../../utils/file.js";
import { randomUUID } from "crypto";

import { find, remove, update, every } from "./functions/arrayUtilities.js";

const bookDataPath = "./data/Book.json";

async function addBook(bookData) {
  const books = await readFile(bookDataPath);

  const booksWithSameTitle = find(
    books,
    (book) => book.title === bookData.title
  );

  if (booksWithSameTitle.length >= 1)
    throw new Error("Book title has been taken");

  bookData = { id: randomUUID(), ...bookData, available: true };

  const newBooks = [...books, bookData];

  await writeFile(bookDataPath, newBooks);
}

async function removeBook(filter) {
  const books = await readFile(bookDataPath);

  const cb = (book) => book.title === filter.title;

  const removedBooks = find(books, cb);

  if (!removedBooks.length) throw new Error("No book found with this data");

  if (!removedBooks[0].available)
    throw new Error("Can not remove books borrowed by someone");

  const newBooks = remove(books, cb);

  await writeFile(bookDataPath, newBooks);
}

async function updateBook(filter, newBookData) {
  const books = await readFile(bookDataPath);

  const filterEntries = Object.entries(filter);

  const cb = (book) => every(filterEntries, ([key, val]) => book[key] === val);

  const foundBooks = find(books, cb);

  if (foundBooks.length <= 0) throw new Error("No books found with that data");

  if (find(books, (book) => book.title === newBookData.title).length > 0)
    throw new Error("There exist a book with that title");

  const newBooks = update(books, newBookData, cb);

  await writeFile(bookDataPath, newBooks);
}

async function searchBooks(filter) {
  const books = await readFile(bookDataPath);

  const filterEntries = Object.entries(filter);

  const cb = (book) => every(filterEntries, ([key, val]) => book[key] === val);

  const foundBooks = find(books, cb);

  if (foundBooks.length <= 0) throw new Error("No books found with that data");

  return foundBooks;
}

export default { addBook, removeBook, updateBook, searchBooks };
