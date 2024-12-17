import { readFile, writeFile } from "../../utils/file.js";
import Book from "./Book.js";

import { find } from "./functions/arrayUtilities.js";

const bookDataPath = "./data/Book.json";
const borrowingDataPath = "./data/Borrowings.json";
const memberDataPath = "./data/Member.json";

async function listAvailableBooks() {
  const books = await readFile(bookDataPath);

  return find(books, { available: true });
}

async function borrowingHistory(memberName) {
  const members = await readFile(memberDataPath);

  const foundMember = find(members, { name: memberName })[0];

  if (!foundMember) throw new Error("No user found with that name");

  const borrowings = await readFile(borrowingDataPath);

  return find(borrowings, { memberId: foundMember.id });
}

export default { listAvailableBooks, borrowingHistory };
