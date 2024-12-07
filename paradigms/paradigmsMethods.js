import funcBook from "./functional/Book.js";
import funcMember from "./functional/Member.js";
import funcReport from "./functional/report.js";

import impBook from "./imperative/Book.js";
import impMember from "./imperative/Member.js";
import impReport from "./imperative/report.js";

const functional = { book: funcBook, member: funcMember, report: funcReport };

const imperative = { book: impBook, member: impMember, report: impReport };

export default { functional, imperative };
