function showAvailableParadigms() {
  console.log("-------- Choose a paradigm --------");

  console.log("1- Imperative paradigm.");
  console.log("2- Functional paradigm.");
}

function showMainMenu() {
  console.log("-------- Main menu --------");

  console.log("1- Book Management.");
  console.log("2- Member Management.");
  console.log("3- Generate Reports.");
  console.log("4- Back.");
  console.log("5- Exit.");
}

function showBookMenu() {
  console.log("-------- Book --------");

  console.log("1- Add.");
  console.log("2- Remove.");
  console.log("3- Update.");
  console.log("4- Find.");
  console.log("5- Back");
}

function showMemberMenu() {
  console.log("-------- Member --------");

  console.log("1- Register.");
  console.log("2- View profile.");
  console.log("3- Update profile.");
  console.log("4- Borrow book.");
  console.log("5- Return book.");
  console.log("6- Back");
}

function showReportMenu() {
  console.log("-------- Report --------");

  console.log("1- List available books.");
  console.log("2- History of borrowings.");
  console.log("3- Back");
}

export default {
  showAvailableParadigms,
  showMainMenu,
  showBookMenu,
  showMemberMenu,
  showReportMenu,
};
