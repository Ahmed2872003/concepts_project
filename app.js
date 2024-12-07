import promptSync from "prompt-sync";
import menues from "./menu.js";
import paradigms from "./paradigms/paradigmSelection.js";

const prompt = promptSync({ sigint: true });

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
        await handleMemberMenu(member);
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
          break;
        }
        case "2": /* Remove book */ {
          break;
        }
        case "3": /* Update book */ {
          break;
        }
        case "4": /* Find book */ {
          break;
        }
        case "5":
          return;
        default:
          console.log("Option not available.");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

async function handleMemberMenu(member) {
  while (1) {
    menues.showMemberMenu();
    let inp = prompt("Input: ");

    switch (inp) {
      case "1": /*Register member*/ {
        break;
      }
      case "2": /*View profile*/ {
        break;
      }
      case "3": /*Update profiler*/ {
        break;
      }
      case "4": /*Borrow Book*/ {
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
  }
}

async function handleReportMenu(report) {
  while (1) {
    menues.showReportMenu();
    let inp = prompt("Input: ");

    switch (inp) {
      case "1": /* List available books */ {
        break;
      }

      case "2": /*Borrowings history*/ {
        break;
      }
      case "3":
        return;
      default:
        console.log("Option not available.");
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
