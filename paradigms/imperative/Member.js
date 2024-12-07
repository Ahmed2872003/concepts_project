import { readFile, writeFile } from "../../utils/file.js";
import { randomUUID } from "crypto";
import calcFee from "../../utils/feeCalc.js";

const memberDataPath = "./data/Member.json";
const borrowDataPath = "./data/Borrowings.json";

async function registerMember(memberData) {
  const memberId = randomUUID();
}

async function viewMemberDetails(memberName) {}

async function updateMemberDetails(memberName, newMemberData) {}

async function borrowBook(memberName, bookTitle, duration) {}

async function returnBook(bookTitle, memberName) {
  const returnDate = new Date();
}

export default {
  registerMember,
  viewMemberDetails,
  updateMemberDetails,
  borrowBook,
  returnBook,
};
