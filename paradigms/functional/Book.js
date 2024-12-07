import { readFile, writeFile } from "../../utils/file.js";
import { randomUUID } from "crypto";

const bookDataPath = "./data/Book.json";

async function addBook(bookData) {
  const bookId = randomUUID();
}

async function removeBook(bookTitle) {
  console.log(bookTitle);
}

async function updateBook(bookTitle, newBookData) {}

async function searchBooks(filter) {}

export default { addBook, removeBook, updateBook, searchBooks };
