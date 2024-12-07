import { readFile, writeFile } from "../../utils/file.js";
import Book from "./Book.js";

const bookDataPath = "./data/Book.json";
const borrowingDataPath = "./data/Borrowings.json";

async function listAvailableBooks() {}

async function borrowingHistory(memberName) {}

export default { listAvailableBooks, borrowingHistory };
