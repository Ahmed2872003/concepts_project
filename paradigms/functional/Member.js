import { readFile, writeFile } from "../../utils/file.js";
import { randomUUID } from "crypto";
import calcFee from "../../utils/feeCalc.js";
import bookC from "./Book.js";

import { find, every, update } from "./functions/arrayUtilities.js";
import Book from "./Book.js";

const memberDataPath = "./data/Member.json";
const borrowDataPath = "./data/Borrowings.json";

const std_fee = 10; // 2 dollar pre day

async function registerMember(memberData) {
  const members = await readFile(memberDataPath);

  if (find(members, (member) => member.name === memberData.name).length >= 1)
    throw new Error("This name has been taken");

  memberData = { id: randomUUID(), ...memberData };

  const newMembers = [...members, memberData];

  await writeFile(memberDataPath, newMembers);
}

async function viewMemberDetails(filter) {
  const members = await readFile(memberDataPath);

  const filterEnteries = Object.entries(filter);

  const cb = (member) =>
    every(filterEnteries, ([key, val]) => member[key] === val);

  const foundMembers = find(members, cb);

  if (foundMembers.length <= 0)
    throw new Error("No member found with that data");

  return foundMembers;
}

async function updateMemberDetails(filter, newMemberData) {
  const members = await readFile(memberDataPath);

  const cb = (member) => member.name === filter.name;

  const foundMembers = find(members, cb);

  if (foundMembers.length <= 0)
    throw new Error("No member found with that data");

  if (find(members, (member) => member.name === newMemberData.name).length > 0)
    throw new Error("This name has been taken before");

  const newMembers = update(members, newMemberData, cb);

  await writeFile(memberDataPath, newMembers);
}

async function borrowBook(memberName, bookTitle, duration) {
  const member = (await viewMemberDetails({ name: memberName }))[0];

  const bookFilter = { title: bookTitle };

  const book = (await bookC.searchBooks(bookFilter))[0];

  if (!book.available) throw new Error("This book has already been taken");

  const borrowings = await readFile(borrowDataPath);

  const borrowObj = {
    memberId: member.id,
    bookId: book.id,
    bookTitle: book.title,
    borrowDate: new Date().toISOString(),
    returnDate: "",
    duration,
    fines: 0,
  };

  const newBorrowings = [...borrowings, borrowObj];

  await writeFile(borrowDataPath, newBorrowings);

  await bookC.updateBook(bookFilter, { available: false });
}

async function returnBook(bookTitle, memberName) {
  const member = (await viewMemberDetails({ name: memberName }))[0];

  const bookFilter = { title: bookTitle };

  const book = (await bookC.searchBooks(bookFilter))[0];

  if (book.available) throw new Error("This book is not borrowed yet.");

  const borrowings = await readFile(borrowDataPath);

  const cb = (borrowing) =>
    borrowing.memberId === member.id &&
    borrowing.bookId === book.id &&
    borrowing.returnDate === "";

  let memberBorrowing = find(borrowings, cb);

  memberBorrowing = memberBorrowing[memberBorrowing.length - 1];

  if (!memberBorrowing) throw new Error("This member doesn't borrow that book");

  const borrowDate = new Date(book.borrowDate);

  const returnDate = new Date();

  const duration = memberBorrowing.duration;

  const fee = calcFee(borrowDate, returnDate, duration, std_fee);

  const newBorrowings = update(
    borrowings,
    {
      fines: fee,
      returnDate: returnDate.toISOString(),
    },
    cb
  );

  await writeFile(borrowDataPath, newBorrowings);

  await bookC.updateBook({ id: book.id }, { available: true });

  return fee;
}

export default {
  registerMember,
  viewMemberDetails,
  updateMemberDetails,
  borrowBook,
  returnBook,
};
