import { readFile, writeFile } from "../../utils/file.js";
import { randomUUID } from "crypto";
import { find, remove, update } from "./functions/arrayUtilities.js";

const bookDataPath = "./data/Book.json";

async function addBook(bookData) {
  const books = await readFile(bookDataPath);

  if (find(books, { title: bookData.title }).length >= 1)
    throw new Error("Book title has been taken");

  bookData.id = randomUUID();
  bookData.available = true;

  books.push(bookData);

  await writeFile(bookDataPath, books);
}

async function removeBook(filter) {
  const books = await readFile(bookDataPath);

  const removedBooks = find(books, filter);

  if (!removedBooks.length) throw new Error("No book found with this data");

  for (let removedBook of removedBooks) {
    if (!removedBook.available)
      throw new Error("Can not remove books borrowed by someone");
  }

  const newBooks = remove(books, filter);

  await writeFile(bookDataPath, newBooks);
}

async function updateBook(filter, newBookData) {
  const books = await readFile(bookDataPath);

  const foundBooks = find(books, filter);

  if (foundBooks.length <= 0) throw new Error("No book found with this data");

  update(foundBooks, newBookData);

  await writeFile(bookDataPath, books);
}

async function searchBooks(filter) {
  const books = await readFile(bookDataPath);

  const foundBooks = find(books, filter);

  if (foundBooks.length <= 0) throw new Error("No books found with that data");

  return foundBooks;
}

export default { addBook, removeBook, updateBook, searchBooks };
