import promptSync from "prompt-sync";
import menues from "./menu.js";
import paradigms from "./paradigms/paradigmSelection.js";
import { placeGivenData } from "./utils/data.js";

const prompt = promptSync({ sigint: true });

const inputRegexSplitter = /\s*,\s*/i;
const genderMap = { ["0"]: "male", ["1"]: "female" };
const booleanMap = { ["0"]: false, ["1"]: true };

async function run({ book, member, report }) {
  let exit = false;

  while (1) {
    menues.showMainMenu();
    let inp = prompt("Input: ");

    switch (inp) {
      case "1":
        await handleBookMenu(book);
        break;
      case "2":
        await handleMemberMenu(member, book);
        break;
      case "3":
        await handleReportMenu(report);
        break;
      case "4":
        return exit;
      case "5":
        exit = true;
        return exit;
      default:
        console.log("Option not available.");
    }
  }

  return exit;
}

async function handleBookMenu(book) {
  while (1) {
    menues.showBookMenu();
    let inp = prompt("Input: ");

    try {
      switch (inp) {
        case "1": /* Add book */ {
          let [title = undefined, author = undefined, genre = undefined] =
            prompt(
              "Enter book title, author, genre resprectivily seperated by (,): "
            )
              .split(inputRegexSplitter)
              .map((inp) => (inp === "" ? undefined : inp));

          await book.addBook(
            placeGivenData({ title: title, author: author, genre: genre })
          );
          console.log("Book added successfully.");
          break;
        }
        case "2": /* Remove book */ {
          let bookTitle =
            prompt("Enter book title to be removed: ") || undefined;

          await book.removeBook({ title: bookTitle });

          console.log(`${bookTitle} book removed successfully.`);

          break;
        }
        case "3": /* Update book */ {
          let title = prompt("Enter book title to be updated: ") || undefined;

          console.log(
            "Enter new title, author, genre, available(1 or 0) respectivily seperated by (,). Leave a property empty between two commas if the update not include it."
          );

          let [
            newTitle = undefined,
            newAuthor = undefined,
            newGenre = undefined,
            newAvailable = undefined,
          ] = prompt()
            .split(inputRegexSplitter)
            .map((inp) => (inp === "" ? undefined : inp));

          const newData = placeGivenData({
            title: newTitle,
            author: newAuthor,
            genre: newGenre,
            available: booleanMap[newAvailable],
          });

          await book.updateBook({ title }, newData);

          console.log("Book updated successfully");

          break;
        }
        case "4": /* search for a book */ {
          console.log(
            "Enter book title, author, genre resprectivily seperated by (,) Leave a property empty between two commas if the search not include it."
          );

          let [title = undefined, author = undefined, genre = undefined] =
            prompt()
              .split(inputRegexSplitter)
              .map((inp) => (inp === "" ? undefined : inp));

          const foundBooks = await book.searchBooks(
            placeGivenData({ title: title, author: author, genre: genre })
          );
          if (!(foundBooks?.length > 0)) {
            console.log("No books found with that details");
            break;
          }

          console.log("----------------- Found books -----------------");

          console.log(foundBooks);

          console.log("-----------------------------------------------");

          break;
        }
        case "5":
          return;
        default:
          console.log("Option not available.");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

async function handleMemberMenu(member, book) {
  while (1) {
    menues.showMemberMenu();
    let inp = prompt("Input: ");

    try {
      switch (inp) {
        case "1": /*Register member*/ {
          let [
            name = undefined,
            age = undefined,
            gender = undefined,
            email = undefined,
          ] = prompt(
            "Enter member name, age, gender(0 for male, 1 for female), email resprectivily seperated by (,): "
          )
            .split(inputRegexSplitter)
            .map((inp) => (inp === "" ? undefined : inp));

          await member.registerMember(
            placeGivenData({
              name: name,
              age: age ? +age : age,
              gender: genderMap[gender],
              email: email,
            })
          );
          console.log("Member registered successfully.");
          break;
        }
        case "2": /*View profile*/ {
          let memberName = prompt("Enter member name: ") || undefined;

          const memberData = await member.viewMemberDetails({
            name: memberName,
          });

          console.log(memberData);
          break;
        }
        case "3": /*Update profile*/ {
          let memberName =
            prompt("Enter member name to update his profile: ") || undefined;

          console.log(
            "Enter new name, age, gender (0 for male, 1 for female), email respectivily seperated by (,). Leave a property empty between two commas if the update not include it."
          );

          let [
            newName = undefined,
            newAge = undefined,
            newGender = undefined,
            newEmail = undefined,
          ] = prompt()
            .split(inputRegexSplitter)
            .map((inp) => (inp === "" ? undefined : inp));

          const newData = placeGivenData({
            name: newName,
            age: newAge ? +newAge : newAge,
            gender: genderMap[newGender],
            email: newEmail,
          });

          await member.updateMemberDetails({ name: memberName }, newData);

          console.log("Member profile updated successfully");
          break;
        }
        case "4": /*Borrow Book*/ {
          let [
            memberName = undefined,
            bookTitle = undefined,
            duration = undefined,
          ] = prompt(
            "Enter member name, book title, borrow duration resprectivily seperated by (,): "
          )
            .split(inputRegexSplitter)
            .map((inp) => (inp === "" ? undefined : inp));

          await member.borrowBook(
            memberName,
            bookTitle,
            duration ? +duration : duration
          );

          console.log("Book is borrowed");
          break;
        }
        case "5": /*Return Book*/ {
          break;
        }
        case "6":
          return;
        default:
          console.log("Option not available.");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

async function handleReportMenu(report) {
  while (1) {
    menues.showReportMenu();
    let inp = prompt("Input: ");

    try {
      switch (inp) {
        case "1": /* List available books */ {
          const availableBooks = await report.listAvailableBooks();

          if (!(availableBooks?.length > 0)) {
            console.log("No available books found.");
            break;
          }

          console.log("\n--------------- Available books ---------------\n");

          console.log(availableBooks);

          console.log("---------------------------------------------------");
        }

        case "2": /*Borrowings history*/ {
          let memberName = prompt("Enter member name: ") || undefined;

          const borrowingsHistory = await report.borrowingHistory(memberName);

          if (!(borrowingsHistory?.length > 0)) {
            console.log("No history found for this member.");
            break;
          }

          console.log("\n--------------- History ---------------\n");

          console.log(borrowingsHistory);

          console.log("---------------------------------------------------");

          break;
        }
        case "3":
          return;
        default:
          console.log("Option not available.");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

(async () => {
  console.log("\n--------------- Library Management System ----------------\n");

  while (1) {
    menues.showAvailableParadigms();

    let paradigm = prompt("Input: ");
    let exit = false;

    switch (paradigm) {
      case "1": // Imperative
        exit = await run(paradigms.imperative);
        break;
      case "2": // Functional
        exit = await run(paradigms.functional);
        break;
      default:
        console.log("Option not available.");
    }
    if (exit) break;
  }
})();
