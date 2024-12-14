import { readFile, writeFile } from "../../utils/file.js";
import { randomUUID } from "crypto";
import calcFee from "../../utils/feeCalc.js";

import customFind from "./functions/customFind.js"
import customFilter from "./functions/customFilter.js";
import { error } from "console";

const memberDataPath = "./data/Member.json";
const borrowDataPath = "./data/Borrowings.json";


// try{

// }catch (error) {
//   console.error("Error:", error);
//   throw error;
// }


async function registerMember(memberData) {
  try {
    const memberId = randomUUID();

    const data = await readFile(memberDataPath, "utf-8");
    const members = data ? JSON.parse(data) : [];

    const newMember = { id: memberId, ...memberData };

    members.push(newMember);

    await writeFile(memberDataPath, JSON.stringify(members, null, 2), "utf-8");
    console.log("Done!! member register successful")
    return newMember;
  } catch (error) {
    console.error("Error registering member:", error);
    throw error;
  }
}


async function viewMemberDetails(memberName) {
  try {
    const data = await readFile(memberDataPath, "utf-8");
    const members = data ? JSON.parse(data) : [];

    // Find the member by using customFind(not build-in)
    const member = customFind(members, m => m.name === memberName);

    if (!member) {
      throw new Error(`Member "${memberName}" not found.`);
    }

    return member;
  } catch (error) {
    console.error("cannot view member details:", error);
    throw error;
  }
}



async function updateMemberDetails(memberName, newMemberData) {
  const data = await readFile(memberDataPath, "utf-8");
  const members = data ? JSON.parse(data) : [];

  const matchMember = members.customFilter(members, (member) => member.name == memberName) //determine array
  //if Array not have the member after filtering
  if (matchMember.length === 0) {
    throw new Error(`'${memberName}' not found  `)
  }
  // else {
  const memberPlace = members.indexOf(matchMember[0])
  members[memberPlace] = { ...members[memberPlace], ...newMemberData };
  // }
  await writeFile(memberDataPath, JSON.stringify(members, null, 2), "utf-8");
}

async function borrowBook(memberName, bookTitle, duration) {
  try {
    const memberData = await readFile(memberDataPath, "utf-8");
    const members = memberData ? JSON.parse(memberData) : [];

    const borrowData = await readFile(borrowDataPath, "utf-8");
    const borrowingBooks = borrowData ? JSON.parse(borrowData) : [];

    //make sure the user is exist in members files 
    const member_name = members.customFind(members, member => member.name === memberName)
    if (!member_name) {
      throw new Error(`cannot found '${memberName}'`)
    }


    // calc fee
    const fee = calcFee(duration) 

    //create new record of borrowing book
    const borrowingEntity={
      id:randomUUID(),
      memberId:member_name.id,
      bookTitle,
      fee,
    }

    borrowingBooks.push(borrowingEntity);
    await writeFile(borrowDataPath, JSON.stringify(borrowingBooks, null, 2), "utf-8");

    return borrowingEntity;
  }catch (error) {
    console.error("Error:", error);
    throw error;
  }
  

}

async function returnBook(bookTitle, memberName) {
  try {

    const memberData = await readFile(memberDataPath, "utf-8");
    const members = memberData ? JSON.parse(memberData) : [];

    const borrowData = await readFile(borrowDataPath, "utf-8");
    const borrowings = borrowData ? JSON.parse(borrowData) : [];


    const member = members.find(m => m.name === memberName);
    if (!member) {
      throw new Error(`"${memberName}" not found.`);
    }

    // Find the borrowing record by book title and memberId
    const borrowingIndex = borrowings.findIndex(b => b.bookTitle === bookTitle && b.memberId === member.id);

    if (borrowingIndex === -1) {
      throw new Error(`No borrowing record found for "${bookTitle}" by member "${memberName}".`);
    }

    // Get the borrowing record
    const borrowingRecord = borrowings[borrowingIndex];

    // Set the return date
    const returnDate = new Date();
    
    // Calculate the duration the book was borrowed (in days)
    const borrowedAt = new Date(borrowingRecord.borrowedAt);
    const daysBorrowed = Math.ceil((returnDate - borrowedAt) / (1000 * 3600 * 24));

    // Optionally, you can adjust the fee or perform any additional logic based on the return duration

    // Remove the borrowing record from the list
    borrowings.splice(borrowingIndex, 1);

    // Write the updated borrowings back to the file
    await writeFile(borrowDataPath, JSON.stringify(borrowings, null, 2), "utf-8");

    // Return the return details
    return {
      bookTitle,
      memberName,
      borrowedAt: borrowingRecord.borrowedAt,
      returnDate: returnDate.toISOString(),
      daysBorrowed,
      fee: borrowingRecord.fee,
    };
  } catch (error) {
    console.error("Error returning book:", error);
    throw error;
  }
}

export default {
  registerMember,
  viewMemberDetails,
  updateMemberDetails,
  borrowBook,
  returnBook,
};
