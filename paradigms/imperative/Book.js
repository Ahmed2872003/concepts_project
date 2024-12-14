import { readFile, writeFile } from "../../utils/file.js";
import { randomUUID } from "crypto";

import customFilter from "./functions/customFilter.js";

const bookDataPath = "./data/Book.json";

async function addBook(bookData) {
  // const bookId = randomUUID();
  try {
    const fileC = await readFile(bookDataPath, "utf-8");
    const books = JSON.parse(fileC);


    const bookWithId = { id: randomUUID(), ...bookData };

    books.push(bookWithId);

    await writeFile(bookDataPath, JSON.stringify(books, null, 2), "utf-8");
    console.log("Book added successfully:", bookWithId);

    console.log(`From imperative ${JSON.stringify(bookData)}`);

  } catch (error) {
    console.error("Error Book not added", error);
  }
}


async function removeBook(bookTitle) {
  try {
    const fileC = await readFile(bookDataPath, "utf-8");
    const books = JSON.parse(fileC);

    const FilterBooks = customFilter(books, (book) => book.title !== bookTitle);

    await writeFile(bookDataPath, JSON.stringify(FilterBooks, null, 2), "utf-8");
    console.log(`Book with title "${bookTitle}" has been removed successfully.`);
  }

  catch (error) {
    console.error("book not remove!!", error)

  }

}

async function updateBook(bookTitle, newBookData) {
  try {
    const fileC = await readFile(bookDataPath, "utf-8");
    const books = JSON.parse(fileC);

    let updateSuccess = false;
    for (let i = 0; i < books.length; i++) {
      if (books[i].title == bookTitle) {
        books[i] = { ...books[i], ...newBookData };
        updateSuccess = true;
        break;
      }
    }
    if (!updateSuccess) {
      console.log(`no book has this title "${bookTitle}"`);
    }
    await writeFile(bookDataPath, JSON.stringify(books, null, 2), "utf-8");

    console.log(`Book with title "${bookTitle}" has been updated`);
  } catch (error) {
    console.error("Error cannot updating books:", error);
  }

}

async function searchBooks(filter) {
  try {
    const fileC = await readFile(bookDataPath, "utf-8");
    const books = JSON.parse(fileC);

    const matchingBooks = customFilter(books, (book) => {
      for (let key in filter) {
        if (book[key] !== filter[key]) {
          return false; 
        }
      }
      return true; 
    });

    if (matchingBooks.length > 0) {
      console.log("result:", matchingBooks);
    } else {
      console.log("Not found !");
    }

    return matchingBooks; 
  } catch (error) {
    console.error("Error searching for books:", error);
  }
}

export default { addBook, removeBook, updateBook, searchBooks };
