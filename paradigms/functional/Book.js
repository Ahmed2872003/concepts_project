import { readFile, writeFile } from "../../utils/file.js";
import { randomUUID } from "crypto";

const bookDataPath = "../../data/Book.json";

async function addBook(bookData) {
  const bookId = randomUUID();

  console.log(`From functional ${bookId}`);
}

async function removeBook(bookTitle) {}

async function updateBook(bookTitle, newBookData) {}

async function searchBooks(filter) {}

export default { addBook, removeBook, updateBook, searchBooks };
