import { readFile, writeFile } from "../../utils/file.js";
import { randomUUID } from "crypto";
import calcFee from "../../utils/feeCalc.js";

import bookC from "./Book.js";

import { find, update } from "./functions/arrayUtilities.js";

const memberDataPath = "./data/Member.json";
const borrowDataPath = "./data/Borrowings.json";

const std_fee = 10;

async function registerMember(memberData) {
  const members = await readFile(memberDataPath);

  if (find(members, { name: memberData.name }).length >= 1)
    throw new Error("This name has been taken");

  memberData.id = randomUUID();

  members.push(memberData);

  await writeFile(memberDataPath, members);
}

async function viewMemberDetails(filter) {
  const members = await readFile(memberDataPath);

  const foundMembers = find(members, filter);

  if (foundMembers.length <= 0)
    throw new Error("No member found with that data");

  return foundMembers;
}

async function updateMemberDetails(filter, newMemberData) {
  const members = await readFile(memberDataPath);

  const foundMembers = find(members, filter);

  if (foundMembers.length <= 0)
    throw new Error("No member found with that data");

  update(foundMembers, newMemberData);

  await writeFile(memberDataPath, members);
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

  borrowings.push(borrowObj);

  await writeFile(borrowDataPath, borrowings);

  await bookC.updateBook(bookFilter, { available: false });
}

async function returnBook(bookTitle, memberName) {
  const member = (await viewMemberDetails({ name: memberName }))[0];

  const bookFilter = { title: bookTitle };

  const book = (await bookC.searchBooks(bookFilter))[0];

  if (book.available) throw new Error("This book is not borrowed yet.");

  const borrowings = await readFile(borrowDataPath);

  let memberBorrowing = find(borrowings, {
    memberId: member.id,
    bookId: book.id,
    returnDate: "",
  });

  memberBorrowing = memberBorrowing[memberBorrowing.length - 1];

  if (!memberBorrowing) throw new Error("This member doesn't borrow that book");

  const borrowDate = new Date(book.borrowDate);

  const returnDate = new Date();

  const duration = memberBorrowing.duration;

  const fee = calcFee(borrowDate, returnDate, duration, std_fee);

  update([memberBorrowing], {
    fines: fee,
    returnDate: returnDate.toISOString(),
  });

  await writeFile(borrowDataPath, borrowings);

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
