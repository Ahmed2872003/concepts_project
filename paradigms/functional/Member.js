import { readFile, writeFile } from "../../utils/file.js";
import { randomUUID } from "crypto";

const memberDataPath = "../../data/Member.json";
const borrowDataPath = "../../data/Borrowings.json";

async function registerMember(memberData) {
  const memberId = randomUUID();
}

async function viewMemberDetails(memberName) {}

async function updateMemberDetails(memberName, newMemberData) {}

async function borrowBook(bookTitle, duration) {}

async function returnBook(bookTitle) {}

export default {
  registerMember,
  viewMemberDetails,
  updateMemberDetails,
  borrowBook,
  returnBook,
};
